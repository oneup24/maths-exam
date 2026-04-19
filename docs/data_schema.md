# Data Schema — Maths Quests

Single source of truth for all Supabase tables, column types, JSONB shapes, and RLS policies.

---

## Live Tables

### `exam_sessions`

Stores every completed exam. Core analytics moat — never delete or modify.

```sql
exam_sessions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid FK → auth.users,
  level            smallint,         -- 1–6 = P1–P6
  topic_code       text,             -- 'mixed' or single topic id e.g. '4N3'
  total_questions  int,
  correct_count    int,
  score_percent    decimal,
  time_spent       int,              -- seconds
  topic_breakdown  jsonb,            -- ← SEE SHAPE BELOW
  completed_at     timestamptz,
  created_at       timestamptz
)
```

**`topic_breakdown` JSONB shape:**
```json
{
  "4N3": { "total": 3, "wrong": 2 },
  "4M1": { "total": 4, "wrong": 0 },
  "4S1": { "total": 2, "wrong": 1 }
}
```
- Key: `topic_id` string matching `TOPICS[grade][n].id` in `config.js`
- `total`: number of questions from this topic in the exam
- `wrong`: number answered incorrectly (0 = perfect on this topic)
- `correct = total - wrong`

**RLS:** `auth.uid() = user_id` for SELECT, INSERT, UPDATE, DELETE.

---

### `events`

Analytics dual-destination. Every `track(event, props)` call in `src/lib/track.js` writes here AND to PostHog simultaneously.

```sql
events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id   text,             -- persistent UUID in localStorage, set on first visit
  event_name  text,
  props       jsonb,
  created_at  timestamptz
)
```

**12 tracked events:**

| Event | Where fired | Key props |
|-------|-------------|-----------|
| `onboarding_complete` | Onboarding.jsx | `lang`, `grade`, `guest` |
| `exam_start` | App.jsx | `grade`, `topic` |
| `exam_complete` | App.jsx | `grade`, `topic`, `score`, `total` |
| `results_view` | App.jsx | `grade`, `pct`, `total` |
| `pdf_export` | ExportPDFButton.jsx | `grade` |
| `retry_click` | App.jsx | `grade` |
| `grade_selected` | App.jsx | `grade` |
| `lang_switch` | App.jsx | `lang` |
| `parent_pin_set` | Profile.jsx | — |
| `guest_signup_prompt_shown` | App.jsx | — |
| `guest_signup_prompt_clicked` | App.jsx | — |
| `signup_complete` | useAuth.js | `method` |

**RLS:** Public INSERT (fire-and-forget), no SELECT for anon.

---

## Phase 3C Tables (schema written, NOT YET CREATED in Supabase)

### `question_bank`

See `supabase/question_bank.sql` for full DDL + RLS.

```sql
question_bank (
  id               uuid PRIMARY KEY,
  grade            smallint,         -- 1–6
  topic_id         text,             -- e.g. '4N3'
  difficulty       smallint,         -- 1–3
  q_type           text,             -- 'calc'|'fill'|'mc'|'short'|'work'
  question_json    jsonb,            -- ← SEE SHAPE BELOW
  source           text,             -- 'hardcode'|'ai_v32'|'ai_r1'|'exam_mimic'
  hash             text UNIQUE,      -- SHA-256(q || '|' || a) first 32 chars
  context_version  int,
  quality_score    smallint,         -- 0–100; ideal difficulty = 40–70% correct rate
  times_served     int,
  times_correct    int,
  avg_time_spent   real,             -- seconds
  status           text,             -- 'verified'|'flagged'|'retired'
  created_at       timestamptz,
  updated_at       timestamptz
)
```

**`question_json` JSONB shape** (matches engine output schema exactly):
```json
{
  "tp":        "work",
  "d":         2,
  "q":         "小明有48粒糖果，平均分成6份，每份有多少粒？",
  "a":         "8",
  "sc":        2,
  "s":         ["48 ÷ 6 = 8"],
  "trap":      null,
  "fig":       null,
  "isMC":      false,
  "opts":      null,
  "topicId":   "2N6",
  "topicName": "2N6 基本除法"
}
```

**Seed:** Run `node scripts/seed_question_bank.mjs` with `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`.
Expected output: ~2,000–3,000 verified questions from all P1–P6 generators × 8 runs each.

**Quality score lifecycle:**
- Seeded at 50 (neutral)
- Increases when `times_correct / times_served > 0.7` (too easy → deprioritise, but keep)
- Decreases when `times_correct / times_served < 0.3` (too hard → may retire)
- Optimal range: 40–70% correct rate → quality_score boosted
- Auto-retire: `quality_score < 15` after 20+ serves

### `student_question_history`

Prevents showing the same bank question twice to the same student.

```sql
student_question_history (
  id            uuid PRIMARY KEY,
  user_id       uuid FK → auth.users,
  question_id   uuid FK → question_bank,
  seen_at       timestamptz,
  was_correct   boolean,
  time_spent    smallint,     -- seconds
  UNIQUE (user_id, question_id)
)
```

---

## Future Tables (schemas in `docs/future_tables.md`)

| Table | Phase | Purpose |
|-------|-------|---------|
| `student_profiles` | 4A | Multi-child under one parent account |
| `subscriptions` | 5 | RevenueCat/Stripe entitlement state |
| `topic_map` | 4B | Prerequisite chains powering Topic Quest |
| `knowledge_gaps` | 4B | Per-user per-topic gap flags |
| `quest_progress` | 4B | Topic Quest session state (station, pass/fail) |

---

## Key Invariants

1. **Never delete `topic_breakdown`** — it's the company's data moat. All per-topic insight, trend analysis, and AI training will derive from it.
2. **Every `exam_session` must have `topic_breakdown`** — enforced in `api.js → saveExamResult()`.
3. **Every question served must have `topicId` + `topicName`** — enforced in `buildExam()` in `exam.js`.
4. **question_bank serves only `status = 'verified'`** — the RLS SELECT policy enforces this at DB level.
5. **Seed script uses service role key** — never expose service key to client. The anon key can only read verified questions.
