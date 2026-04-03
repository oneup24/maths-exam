# Maths Quests 數學練習

AI-powered primary school maths diagnostic tool for Hong Kong students (P1–P6).

## Features
- Generates curriculum-aligned maths quizzes by grade level
- Automatic marking with per-topic weakness breakdown (各單元表現)
- Cloud save via Supabase (exam history, progress tracking)
- Mascot: Curlboo 🐻

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Mobile: Capacitor (iOS)
- Backend: Supabase (Auth + Database)

## Run Locally
npm install
cp .env.local.example .env.local   # Add your Supabase keys
npm run dev

## Environment Variables Required
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

## Status
- [x] Quiz generation engine
- [x] Auto-marking
- [x] Per-topic breakdown (各單元表現)
- [x] Cloud save (Supabase)
- [x] Auth (Google + Email)
- [ ] PDF export (in progress)
- [ ] Paywall (Phase 2)
- [ ] Progress history UI (Phase 2)

Built by oneup24.com
