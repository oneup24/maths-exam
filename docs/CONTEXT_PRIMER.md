# Context Primer

Architecture, tech stack, and file map for **Maths Quests**.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React, React Icons |
| Backend | Supabase (Auth + PostgreSQL) |
| Mobile | Capacitor 8 (iOS/Android) + React Native 0.84 + Expo 55 |
| Audio | Web Audio API (custom, no library) |
| PWA | manifest.json + service worker |
| Package manager | pnpm |

---

## Architecture

**Monolithic single-page app.** All routing and state lives in `App.jsx` via `useState` + a `view` variable. No React Router wired up (installed but unused).

```
User opens app
  -> useAuth() checks Supabase session
  -> Login page (or skip to guest mode)
  -> Onboarding (first time only)
  -> Home (pick grade P1-P6)
  -> Settings (difficulty, topics, exam type, timer)
  -> Exam (generated questions, timer, answer input)
  -> Results (score, mascot, confetti, cloud save)
  -> Profile (stats, PIN, birthday, streak)
```

### State layers
- **React useState** — all runtime state in App.jsx
- **localStorage** — persistence: name, streak, PIN, lang, sound, grade bests, onboarding flag
- **Supabase DB** — cloud: exam_sessions table (authenticated users only)

---

## File Map

### Core (where the real code lives)

```
src/
  App.jsx              — Main app: routing, exam UI, state, marking (~1200 lines)
  main.jsx             — React root mount
  index.css            — Tailwind imports + global styles

  lib/
    engine.js          — Question engine: generators, exam builder, answer checker (~1000+ lines)
    i18n.js            — zh/en translation strings
    sounds.js          — Web Audio sound effects (correct, wrong, tick, fanfare, submit)

  hooks/
    useAuth.js         — Supabase auth: session, signUp, signIn, signOut, skip

  services/
    supabase.js        — Supabase client init (reads env vars)
    api.js             — Cloud ops: saveExamResult, loadExamHistory, getUserStats

  pages/
    Login.jsx          — Email auth + guest skip

  Onboarding.jsx       — 4-step welcome wizard
  Profile.jsx          — Settings, stats, PIN, streak, cloud history
  PrivacyPolicy.jsx    — COPPA/PDPO compliance modal
```

### Config
```
vite.config.js         — Vite + React + Tailwind plugins
capacitor.config.json  — appId: com.oneup24.mathsquest, webDir: dist
app.json               — Expo config
.env.local             — VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
supabase/setup.sql     — exam_sessions table DDL
```

### Assets (public/)
```
mascot.png             — Default Curlboo Bear
mascot-happy.png       — Score >= 80% or birthday
mascot-ok.png          — Score 50-79%
mascot-sad.png         — Score < 50%
icon.png               — App icon
manifest.json          — PWA manifest
sw.js                  — Service worker
```

---

## Question Engine (engine.js)

- **Coverage**: P1-P6, all HK EDB primary maths topics
- **Generators**: ~600+ procedural functions, each producing random variations
- **Topics per grade**: P1 has 6, P2 has 8, ... P6 has 11
- **Question types**: calc, fill, MC, short answer, show working
- **Difficulty**: 3 levels (Basic/Standard/Challenge)
- **Trap items**: Story problems with irrelevant data to train filtering
- **SVG figures**: Rect, triangle, parallelogram, trapezoid, circle, cuboid, bar chart, line graph
- **Answer checker** (`chkAns`): normalizes units, fractions, multi-part, +/-0.5% tolerance

### Exam builder
```
buildExam(grade, topics[], examType, difficulty)
  -> Targets: practice=12, test=15, exam=24 questions
  -> Section ratios: calc 28%, fill 18%, MC 12%, short 22%, working 20%
  -> Sections labeled: 甲, 乙, 丙, 丁, 戊
```

---

## Supabase Schema

```sql
exam_sessions (
  id uuid PK,
  user_id uuid FK -> auth.users,
  grade text,
  topic text DEFAULT 'mixed',
  total_questions int,
  correct_answers int,
  score_percent int,
  time_spent int DEFAULT 0,
  created_at timestamptz
)
```

**RLS enabled** — users can only SELECT/INSERT/UPDATE/DELETE their own rows (`auth.uid() = user_id`).

---

## Key Patterns

- **No React Router** — navigation via `setView('home'|'settings'|'exam'|'profile'|...)`
- **No Redux/Context** — all state in App.jsx useState
- **Offline-first** — localStorage always works; Supabase is additive
- **Bilingual** — `t(lang, key)` for all UI strings
- **Parent PIN** — 4-digit lock on answer reveal; managed in Profile, session-scoped unlock
- **Guest mode** — full functionality except cloud sync and print
