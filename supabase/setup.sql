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
