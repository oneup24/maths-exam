# Future Tables Schema

Schema definitions for tables not yet built. Do NOT build UI for these until their Phase.
Build the schema in Supabase when the Phase begins, not before.

All tables require RLS policies scoped to `auth.uid()`.

---

## student_profiles
**Phase:** 4A (Family plan — multi-child support)
**Why:** Enables one parent account to manage multiple children. Required before Family tier launches.

```sql
CREATE TABLE student_profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name   TEXT NOT NULL,
  grade        INT NOT NULL CHECK (grade BETWEEN 1 AND 6),
  avatar       TEXT,                    -- emoji or asset key
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON student_profiles
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Index
CREATE INDEX ON student_profiles (user_id);
```

---

## subscriptions
**Phase:** 5 (Monetization)
**Why:** Source of truth for entitlement checks. Populated by RevenueCat (mobile) and Stripe (web) webhooks. Do not trust client-side plan claims — always check this table server-side.

```sql
CREATE TABLE subscriptions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan         TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'family')),
  status       TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  started_at   TIMESTAMPTZ NOT NULL,
  expires_at   TIMESTAMPTZ,
  provider     TEXT CHECK (provider IN ('revenuecat', 'stripe')),
  provider_id  TEXT,                    -- RevenueCat or Stripe subscription ID
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON subscriptions
  USING (user_id = auth.uid());

-- Index
CREATE INDEX ON subscriptions (user_id, status);
```

---

## quest_progress
**Phase:** 4B (Topic Quest — D2d)
**Why:** Persists the state of a Topic Quest session across devices. One row per active or completed quest per user. A user may have multiple quests (different target topics) over time.

**Depends on:** D1a `topic_map` table (prerequisite chain data source)

```sql
CREATE TABLE quest_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_type   TEXT NOT NULL,           -- topic category, e.g. 'fractions', 'decimals'
  target_topic TEXT NOT NULL,           -- the topic student was originally stuck on
  chain        JSONB NOT NULL,          -- ordered prerequisite chain: [{topicId, topicName, grade}]
  current_step INT DEFAULT 0,           -- 0-indexed station pointer
  step_results JSONB DEFAULT '[]',      -- [{step, score, passed, attempts, timestamp}]
  status       TEXT DEFAULT 'active'
                CHECK (status IN ('active', 'completed', 'abandoned')),
  started_at   TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE quest_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON quest_progress
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Indexes
CREATE INDEX ON quest_progress (user_id, status);
CREATE INDEX ON quest_progress (user_id, target_topic);
```

### quest_progress JSONB shapes

**chain** example:
```json
[
  { "topicId": "p2_addition", "topicName": "加法", "grade": 2 },
  { "topicId": "p3_fractions_intro", "topicName": "分數入門", "grade": 3 },
  { "topicId": "p4_fractions_add", "topicName": "分數加減", "grade": 4 }
]
```

**step_results** example:
```json
[
  { "step": 0, "score": 5, "passed": true, "attempts": 1, "timestamp": "2026-04-14T10:00:00Z" },
  { "step": 1, "score": 3, "passed": false, "attempts": 1, "timestamp": "2026-04-14T10:05:00Z" },
  { "step": 1, "score": 4, "passed": true, "attempts": 2, "timestamp": "2026-04-14T10:12:00Z" }
]
```

### Analytics events (track via track.js)
| Event | When | Props |
|-------|------|-------|
| `quest_start` | Quest begins | `{ target_topic, chain_length }` |
| `quest_station_pass` | 4/5 correct | `{ step, topic_id, attempts }` |
| `quest_station_fail` | <4/5 correct | `{ step, topic_id, score, attempts }` |
| `quest_complete` | All stations cleared | `{ target_topic, chain_length, total_time_spent }` |
| `quest_abandoned` | User exits mid-quest | `{ step, chain_length }` |

---

## topic_map (D1a)
**Phase:** 4B (Gap Detection)
**Why:** Prerequisite chain data. Powers both D1 gap detection and Topic Quest route generation.

```sql
CREATE TABLE topic_map (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id        TEXT NOT NULL UNIQUE,   -- matches topicId in engine.js
  topic_name_zh   TEXT NOT NULL,
  topic_name_en   TEXT NOT NULL,
  grade           INT NOT NULL CHECK (grade BETWEEN 1 AND 6),
  prerequisites   TEXT[] DEFAULT '{}',    -- array of topic_ids that must be mastered first
  unlocks         TEXT[] DEFAULT '{}',    -- array of topic_ids this topic enables
  importance      TEXT CHECK (importance IN ('critical', 'high', 'medium', 'low')),
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS (read-only for all authenticated users — this is curriculum data, not user data)
ALTER TABLE topic_map ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_all" ON topic_map FOR SELECT USING (auth.role() = 'authenticated');

-- Index
CREATE INDEX ON topic_map (grade);
CREATE INDEX ON topic_map USING gin (prerequisites);
```

---

## knowledge_gaps (D1c)
**Phase:** 4B (Gap Detection)
**Why:** Computed gap records, one per user per detected weak topic. Refreshed after each exam.

```sql
CREATE TABLE knowledge_gaps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id      TEXT NOT NULL,
  wrong_count   INT NOT NULL DEFAULT 0,
  total_count   INT NOT NULL DEFAULT 0,
  last_seen     TIMESTAMPTZ DEFAULT now(),
  gap_severity  TEXT CHECK (gap_severity IN ('critical', 'moderate', 'watch')),
  quest_id      UUID,                    -- link to active/completed quest for this gap
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, topic_id)
);

-- RLS
ALTER TABLE knowledge_gaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON knowledge_gaps
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Index
CREATE INDEX ON knowledge_gaps (user_id, gap_severity);
```
