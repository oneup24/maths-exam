-- ========================================
-- exam_sessions: stores each completed exam
-- ========================================
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  grade text NOT NULL,
  topic text DEFAULT 'mixed',
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  score_percent integer NOT NULL,
  time_spent integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exam_sessions_user ON public.exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_created ON public.exam_sessions(created_at DESC);

-- ========================================
-- Row Level Security: users own their rows
-- ========================================
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own rows"
  ON public.exam_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rows"
  ON public.exam_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rows"
  ON public.exam_sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own rows"
  ON public.exam_sessions FOR DELETE
  USING (auth.uid() = user_id);
