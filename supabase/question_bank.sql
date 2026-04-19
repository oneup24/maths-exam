-- ============================================================
-- question_bank — Phase 3C schema
-- Run this in your Supabase SQL editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.question_bank (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Classification
  grade            smallint  NOT NULL CHECK (grade BETWEEN 1 AND 6),
  topic_id         text      NOT NULL,          -- e.g. '4N3', '5N2'
  difficulty       smallint  NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  q_type           text      NOT NULL CHECK (q_type IN ('calc','fill','mc','short','work')),

  -- Content (full question JSON matching engine output schema)
  question_json    jsonb     NOT NULL,
  -- Shape: { q, a, sc, tp, d, s[], isMC?, opts?, fig?, trap?, topicId, topicName }

  -- Provenance
  source           text      NOT NULL DEFAULT 'hardcode'
                   CHECK (source IN ('hardcode','ai_v32','ai_r1','exam_mimic')),
  hash             text      NOT NULL UNIQUE,   -- SHA-256 of (q || '|' || a)
  context_version  integer   NOT NULL DEFAULT 1,

  -- Quality signals (updated by usage)
  quality_score    smallint  NOT NULL DEFAULT 50 CHECK (quality_score BETWEEN 0 AND 100),
  times_served     integer   NOT NULL DEFAULT 0,
  times_correct    integer   NOT NULL DEFAULT 0,
  avg_time_spent   real      DEFAULT NULL,      -- seconds

  -- Lifecycle
  status           text      NOT NULL DEFAULT 'verified'
                   CHECK (status IN ('verified','flagged','retired')),

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- ── Indexes ──────────────────────────────────────────────────
-- Primary query pattern: fetch questions by grade + topic + difficulty + type
CREATE INDEX IF NOT EXISTS qb_grade_topic_diff_type
  ON public.question_bank (grade, topic_id, difficulty, q_type)
  WHERE status = 'verified';

-- Quality-sorted fetch (best questions first)
CREATE INDEX IF NOT EXISTS qb_quality
  ON public.question_bank (quality_score DESC)
  WHERE status = 'verified';

-- Hash lookup for dedup
CREATE UNIQUE INDEX IF NOT EXISTS qb_hash ON public.question_bank (hash);

-- ── Auto-update updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS qb_updated_at ON public.question_bank;
CREATE TRIGGER qb_updated_at
  BEFORE UPDATE ON public.question_bank
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;

-- Verified questions are publicly readable (for engine serving)
CREATE POLICY "Anyone can read verified questions"
  ON public.question_bank FOR SELECT
  USING (status = 'verified');

-- Only service role can insert/update (seed script uses service key)
-- No INSERT/UPDATE policy for anon role — service key bypasses RLS.

-- ============================================================
-- student_question_history — tracks which questions each user has seen
-- Prevents showing the same bank question twice to the same student.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_question_history (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id     uuid NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
  seen_at         timestamptz NOT NULL DEFAULT now(),
  was_correct     boolean,
  time_spent      smallint,   -- seconds
  UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS sqh_user ON public.student_question_history (user_id);
CREATE INDEX IF NOT EXISTS sqh_question ON public.student_question_history (question_id);

ALTER TABLE public.student_question_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their history"
  ON public.student_question_history
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
