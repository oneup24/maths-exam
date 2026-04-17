# Context Primer

Architecture, tech stack, and file map for **Maths Quests** (v1.3-beta, live on Vercel).

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React, React Icons |
| Backend | Supabase (Auth + PostgreSQL) |
| PDF Export | jsPDF + jspdf-autotable (Noto Sans TC for Chinese) |
| Mobile | Capacitor 8 (iOS/Android) + React Native 0.84 + Expo 55 |
| Hosting | Vercel (production) |
| Analytics | PostHog (primary) + Supabase `events` table (dual-destination via track.js) |
| Audio | Web Audio API (custom, no library) |
| PWA | manifest.json + service worker |
| Package manager | pnpm |

---

## Architecture

**Monolithic single-page app.** All routing and state lives in `App.jsx` (~426 lines) via `useState` + a `view` variable. UI is composed from 15+ extracted components. No React Router wired up (installed but unused).

```
User opens app
  -> useAuth() checks Supabase session
  -> Onboarding (first time only — 6-step "hook before ask" flow)
     1. Language picker → 2. Value splash → 3. Grade picker
     4. Try one question → 5. Result → 6. Auth gate (signup/login/guest)
  -> Login page (returning users only, if not signed in)
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
  App.jsx              — Main app: routing, exam UI, state, marking (~426 lines)
  main.jsx             — React root mount
  index.css            — Tailwind imports + global styles

  lib/
    engine.js          — Question engine entry point (~1000+ lines); being extracted into src/engine/
    i18n.js            — zh/en translation strings
    sounds.js          — Web Audio sound effects (correct, wrong, tick, fanfare, submit)
    track.js           — Event tracking: dual-destination (PostHog + Supabase), 12 events
    posthog.js         — PostHog wrapper: key-gated init, capture/identify/reset exports
    colors.js          — Grade colors, category colors, difficulty colors
    animations.js      — Shared Framer Motion variants (pageTransition, fadeInUp, stagger)

  engine/                — Modular extraction of engine.js (Phases 1–9 complete)
    core.js              — Utilities (ri, pk, gcd, lcm, fOf, fS, shuffle), chkAns, FIG SVG helpers
    config.js            — TOPICS, GRADE_INFO, DIFF_INFO, EXAM_TARGETS, SECT_*, CTX pools, helpers
    history.js           — saveHistory, loadHistory, clearHistory (localStorage)
    grade1.js            — P1 generators (6 topics, 25 functions)
    grades/
      grade2.js          — P2 generators (5 topics, 17 functions)
      grade3.js          — P3 generators (7 topics, 28 functions)
      grade4.js          — P4 generators (11 topics, 65 functions)
      grade5.js          — P5 generators (9 topics, 38 functions)
      grade6.js          — P6 generators (11 topics, 42 functions)

  hooks/
    useAuth.js         — Supabase auth: session, signUp, signIn, signOut; PostHog identify/reset on auth change

  services/
    supabase.js        — Supabase client init (reads env vars)
    api.js             — Cloud ops: saveExamResult, loadExamHistory, getUserStats, resendVerificationEmail

  pages/
    Login.jsx          — Email auth + guest skip (returning users only)

  Onboarding.jsx       — 6-step "hook before ask" wizard (lang→value→grade→question→result→auth)
  Profile.jsx          — Settings, stats, PIN, streak, cloud history
  PrivacyPolicy.jsx    — COPPA/PDPO compliance modal

  components/
    ExportPDFButton.jsx — PDF exam report export (jsPDF + autotable, Chinese font support)
    ui/
      Modal.jsx        — Base modal (AnimatePresence + backdrop)
      PageShell.jsx    — Warm gradient wrapper
    home/
      GradeCard.jsx, GradeGrid.jsx, HistoryList.jsx, GuestBanner.jsx, TrapInfoBox.jsx
    settings/
      SettingsView.jsx — Complete settings view
    exam/
      ExamHeader.jsx, ScoreReport.jsx, ExamActions.jsx, FloatingSubmit.jsx
    modals/
      SubmitModal.jsx, PrintModal.jsx, SignUpPromptModal.jsx, PinModal.jsx
```

### Config
```
vite.config.js         — Vite + React + Tailwind plugins
capacitor.config.json  — appId: com.oneup24.mathsquest, webDir: dist
app.json               — Expo config
.env.local             — VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY + VITE_POSTHOG_KEY
supabase/setup.sql     — Applied RLS policies (documentation only)
```

### Assets
```
public/
  mascot.png           — Default Curlboo Bear
  mascot-happy.png     — Score >= 80% or birthday
  mascot-ok.png        — Score 50-79%
  mascot-sad.png       — Score < 50%
  icon.png             — App icon
  manifest.json        — PWA manifest
  sw.js                — Service worker
  mascot/              — Future: additional mascot states (Curlboo variants)
  icons/               — Future: app icons, favicons
  splash/              — Future: iOS/Android splash screens

src/assets/
  brand/               — Logos, wordmarks (Vite-processed/hashed)
  illustrations/       — Scene illustrations
  animations/          — Lottie / APNG animations
  ui/                  — UI decoration assets
```

---

## Question Engine (engine.js → src/engine/)

`engine.js` is the original monolithic file and current runtime entry point (~1000+ lines). It is being extracted phase-by-phase into ES modules under `src/engine/` — all 9 phases complete.

| Module | Contents |
|--------|----------|
| `core.js` | `ri, pk, gcd, lcm, fOf, fS, shuffle`, `chkAns`, `FIG` (9 SVG methods) |
| `config.js` | `TOPICS`, grade/diff/exam configs, CTX context pools, 7 generator helpers |
| `history.js` | `saveHistory`, `loadHistory`, `clearHistory` |
| `grade1.js` | P1 — 6 topics, 25 generators |
| `grades/grade2.js` | P2 — 5 topics, 17 generators |
| `grades/grade3.js` | P3 — 7 topics, 28 generators |
| `grades/grade4.js` | P4 — 11 topics, 65 generators |
| `grades/grade5.js` | P5 — 9 topics, 38 generators |
| `grades/grade6.js` | P6 — 11 topics, 42 generators |

- **Coverage**: P1–P6, all HK EDB primary maths topics
- **Generators**: ~600+ procedural functions, each producing random variations
- **Question types**: `calc`, `fill`, `mc`, `short`, `work`
- **Difficulty**: 3 levels (Basic d:1 / Standard d:2 / Challenge d:3)
- **Trap items**: Story problems with irrelevant data to train filtering
- **SVG figures**: Rect, square, triangle, parallelogram, trapezoid, circle, cuboid, bar chart, line graph
- **Answer checker** (`chkAns`): normalizes units, fractions, multi-part answers, ±0.5% tolerance

### Exam builder
```
buildExam(grade, topics[], examType, difficulty)
  -> Targets: practice=12, test=15, exam=24 questions
  -> Section ratios: calc 28%, fill 18%, MC 12%, short 22%, working 20%
  -> Sections labeled: 甲, 乙, 丙, 丁, 戊
```

---

## Supabase Schema

### Live tables

```sql
-- exam_sessions (LIVE ✅)
exam_sessions (
  id               uuid PK,
  user_id          uuid FK → auth.users,
  level            int,          -- 1-6 = P1-P6
  topic_code       text,         -- 'mixed' or specific topic
  total_questions  int,
  correct_count    int,
  score_percent    decimal,
  time_spent       int,          -- seconds
  topic_breakdown  jsonb,        -- {"3M":{"total":3,"wrong":3},"3N5":{"total":2,"wrong":1}}
  completed_at     timestamptz,
  created_at       timestamptz
)
-- RLS: auth.uid() = user_id for all operations

-- events (LIVE ✅) — analytics dual-destination
events (
  id          uuid PK,
  device_id   text,
  event_name  text,
  props       jsonb,
  created_at  timestamptz
)
```

**topic_breakdown** is the company moat — per-topic correct/wrong counts per exam. Never delete or modify.

### Future tables (schemas in `docs/future_tables.md`)
- `question_bank` — Phase 3C
- `student_profiles` — Phase 4A (multi-child)
- `topic_map` — Phase 4B (prerequisite chains, Topic Quest route source)
- `knowledge_gaps` — Phase 4B (detected weak topics)
- `quest_progress` — Phase 4B (Topic Quest session state)
- `subscriptions` — Phase 5 (paywall entitlements)

---

## Key Patterns

- **Event tracking** — `track(eventName, props)` in `src/lib/track.js`, dual-destination: fires PostHog AND Supabase `events` table simultaneously. 12 events total. Key-gated — works without PostHog key (Supabase-only fallback).
- **No React Router** — navigation via `setView('home'|'settings'|'exam'|'profile'|...)`
- **No Redux/Context** — all state in App.jsx useState
- **Offline-first** — localStorage always works; Supabase is additive
- **Bilingual** — `t(lang, key)` for all UI strings
- **Parent PIN** — 4-digit lock on answer reveal; managed in Profile, session-scoped unlock
- **Guest mode** — full functionality except cloud sync and print
- **Email verification** — NOT required for signup. Signup completes immediately. `email_confirmed_at` is only checked for PDF export — unverified users see a resend-verification modal instead of the PDF gate.
- **PostHog** — key-gated: set `VITE_POSTHOG_KEY` in .env.local + Vercel env vars. App functions normally without the key (Supabase-only analytics fallback).
