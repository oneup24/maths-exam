-- RLS for questions (public read)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read questions"
  ON public.questions FOR SELECT
  USING (true);

-- RLS for user_errors (insert only)
ALTER TABLE public.user_errors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert errors"
  ON public.user_errors FOR INSERT
  WITH CHECK (true);
CREATE POLICY "No public read on errors"
  ON public.user_errors FOR SELECT
  USING (false);
