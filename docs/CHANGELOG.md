# Changelog

All notable changes to **Maths Quests** (數學特訓).

---

## [v1.2-beta] — 2026-04-04

### 7b88236 — docs: Master Plan v4.0 complete rewrite
- Replace MASTER_PLAN_v3.md with Master_Plan_v4.md — full rewrite of dev roadmap
- Dual tracking: Diagnostic Milestones (D0–D3) + Delivery Phases (Phase 1–6)
- Phase 3 expanded: 3A Testing, 3B Instrumentation (PostHog + Sentry), 3C Data Layer Prep, 3D Soft Launch gate
- Phase 4 split: 4A Mobile App, 4B Smart Features + AI Engine
- 3-Layer Question Generator architecture integrated (Hardcode → AI → Bank)
- AI benchmark prerequisite added (V3.2 vs R1 before committing to model)
- Appendices: cost projections, model selection, strategic principles, key dates & gates

### f289901 — feat: add event tracking via Supabase
- Add `src/lib/track.js` — fire-and-forget analytics using existing Supabase `events` table
- Generate persistent `device_id` (UUID) in localStorage on first visit
- 7 onboarding events: `onboarding_start`, `onboarding_language`, `onboarding_grade`, `onboarding_question_answered`, `onboarding_signup`, `onboarding_guest`, `onboarding_login`
- 2 quiz events: `quiz_start` (grade, topic), `quiz_complete` (grade, topic, score, total)
- No third-party analytics — pure Supabase insert
- Clean up `supabase/setup.sql` to only contain applied RLS policies (questions read-only, user_errors insert-only)

### e647f83 — feat: redesign onboarding — 6-step "hook before ask" flow
- Replace 4-step text-heavy onboarding with interactive 6-step flow:
  1. Language picker (zh/en, auto-advance)
  2. Value splash (3 icon cards: Smart Questions, Trap Training, Track Score)
  3. Grade picker (3×2 grid with stagger animation, auto-advance on tap)
  4. Try one question (grade-matched MC, correct/wrong feedback)
  5. Result screen (scale pop celebration or shake encouragement)
  6. Auth gate (soft sell with benefits, inline signup/login, guest always available)
- Onboarding now runs BEFORE auth ("hook before ask" pattern)
- Auth embedded in step 6 instead of separate login page
- Horizontal slide transitions (x: 80→0→-80)
- Back button on steps 1-5, smart auth form handling
- 5-dot progress indicator (orange active, completed, gray future)
- Warm orange/amber CTA buttons matching app palette
- Grade selection saved to localStorage, applied on app load
- All strings bilingual via i18n (26 new keys)

### 522b99c — feat: full UI/UX redesign — component extraction, design system, animations
- Extract App.jsx from 672→426 lines into 15 reusable components
- 4 exam components (ExamHeader, ScoreReport, ExamActions, FloatingSubmit)
- 5 home components (GradeCard, GradeGrid, HistoryList, GuestBanner, TrapInfoBox)
- 4 modal components (SubmitModal, PrintModal, SignUpPromptModal, PinModal)
- 2 UI primitives (Modal, PageShell) + SettingsView
- Design system: rounding/shadow/spacing/typography tokens, glass card effect
- Visual upgrades: animated score counter, view transitions, skeleton loading
- Streak flame pulse, MC whileTap, history stagger, empty states
- Accessibility: aria-live, role=progressbar, WCAG contrast fixes
- iOS safe area: env(safe-area-inset-*) padding
- Delete 226-line dead App.css

### e99c4ba — deploy: live on Vercel with env vars
- Production deployment on Vercel with environment variables configured
- Shorten PDF export filename format: `MQ_P{grade}_{username}_{MMdd}_{HHmm}.pdf`
- Fallback to "guest" instead of "Student" when no username available
- Add `.vercel` to `.gitignore`

### bdbc8de — chore: fix all 33 lint errors, fix qty bug in engine.js
- Fix all 33 ESLint errors across the codebase (0 remaining)
- Fix quantity bug in engine.js

### df153c2 — v1.0-beta: clean codebase, README, env template
- Clean up codebase for v1.0-beta release
- Add README and `.env.template` for onboarding

### dabc4f4 — feat: add per-topic performance breakdown on results screen
- Show per-topic score breakdown after exam marking
- Topic summary table with correct/total/percentage per topic
- Visual indicators: checkmark (>=80%), triangle (50-79%), cross (<50%)

## [pre-v1.0] — 2026-04-03

### eaed8a2 — feat: cleanup 20 dead files, fix imports, add RLS policies
- Delete 20 unused stub files (components/, engines/, hooks/, utils/, pages/, data/, styles/, app/)
- Fix broken import in main.jsx (was pointing to deleted app/App.jsx)
- Add RLS policies to exam_sessions table (SELECT/INSERT/UPDATE/DELETE own rows only)
- Add RLS policies for profiles table
- Pin Vite dev server to port 5175 with strictPort

### 1130339 — docs: add project docs + CLAUDE.md for AI context
- Add CLAUDE.md (auto-loaded every session)
- Add docs/CHANGELOG.md, CONTEXT_PRIMER.md, MASTER_PLAN_v2.md

### 0d6461d — fix: CSS conflict in Profile + defensive optional chaining
- Fix conflicting `block` class on birthday label in Profile.jsx
- Add optional chaining for `supabase?.auth` calls in useAuth
- Fix `subscription?.unsubscribe()` to prevent guest mode crashes

### e6ae454 — feat: parent PIN lock + flexible multi-part answer matching
- Parent PIN (4-digit) gates Eye/Steps buttons during exam
- PIN managed in Profile only, session unlock (enter once per exam)
- `chkAns` now accepts space/newline/comma as answer delimiters
- Strip units (cm, kg, etc.) per part before comparing
- Fix "5 25" vs "5,25" and "11 cm\n88" vs "11,88" mismatches

### a092e68 — feat: save exam scores to Supabase + cloud stats in Profile
- `api.js`: saveExamResult, loadExamHistory, getUserStats, updateProfileScore
- Cloud save after marking with status indicator (Saved / Saving / Local only)
- Profile: cloud stats card (total/avg/best) + recent exams list
- `supabase/setup.sql`: exam_sessions table schema + indexes

### 647893a — feat: guest mode banners, sign out, and print gate
- Guest mode banner on home screen before grade grid
- Profile shows signed-in banner or guest mode warning
- Print button gated for guests with sign-up prompt modal
- Pass user/signOut/goToLogin props to Profile
- All strings bilingual (zh/en)

### 04a41db — feat: add login/signup with Supabase email auth
- `useAuth` hook wrapping Supabase session management
- Login page with signup/login/skip flow
- Auth gate in App.jsx before onboarding
- Guest mode (skip) supported

---

## Pre-auth baseline

### ef91693 — modular src/ structure + dependency setup
- Add modular folder structure: pages/, components/, engines/, hooks/, services/, data/, utils/, styles/
- Add stub files for future migration (useExam, useTimer, OptionButton, etc.)
- Add deps: Supabase, Chakra UI, React Router, React Icons

### 9501609 — onboarding, mascot, PWA, i18n, profile, exam improvements
- Onboarding flow (4 steps, student name, bilingual)
- Curlboo & Fluffy mascot on home, score report, onboarding
- 4 mascot mood states (happy/ok/sad/default)
- Confetti celebration on good scores (canvas-confetti)
- Daily streak tracker with fire badge
- Sound effects via Web Audio API (correct, wrong, tick, fanfare, submit)
- Privacy policy modal (COPPA/PDPO compliant)
- Grade star badges (1-3 stars based on best %)
- PWA support: manifest.json, service worker, installable
- Chinese/English UI toggle (i18n system)
- Wrong answer review mode (retry only missed)
- Kid-friendly UI pass (larger text, warm bg, bigger touch targets)
- Profile/Settings screen (name, birthday, daily challenge slot)
- Switch from npm to pnpm

### cb9c721 — first commit
- Initial Vite + React scaffold
- Full question engine: P1-P6, ~600+ procedural generators
- 5 question types: calc, fill, MC, short answer, show working
- 3 difficulty levels per topic
- Exam builder with section ratios and point targets
- Timer system, trap items (distractor training)
- SVG figure generation (shapes, charts, graphs)
- Bilingual question bank (HK EDB curriculum aligned)
