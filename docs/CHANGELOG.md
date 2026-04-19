# Changelog

All notable changes to **Maths Quests** (數學特訓).

---

## [v1.3-beta] — 2026-04-19

### feat: Phase 3A hardening — Vitest suite, password reset, Sentry

**Vitest unit tests (409 tests, 0 failures)**
- `src/engine/__tests__/chkAns.test.js` — 39 cases: exact match, unit stripping, fraction/tolerance, multi-part, fullwidth normalisation, MC, edge cases
- `src/engine/__tests__/generators.test.js` — every P1–P6 generator run 3×; asserts `{tp,q,a,sc}` shape, valid types/difficulty, MC opts correctness
- `src/engine/__tests__/buildExam.test.js` — all grades × practice/test/exam; asserts section structure, question count within ±3 of target, no duplicate q+a; edge cases (empty topics, invalid topics, difficulty 1/3)
- `vite.config.js` — `test: { environment: 'node', globals: true }` added

**Password reset flow**
- `useAuth.js` — added `resetPassword(email)`, `updatePassword(newPassword)`, `isRecovery` state (set on `PASSWORD_RECOVERY` Supabase event)
- `Login.jsx` — new `'forgot'` mode (email → send link → success screen) and `'update'` mode (shown when `isRecovery`); "Forgot password?" link in login mode; fully bilingual
- `i18n.js` — 8 new keys: `forgotPassword`, `resetPasswordTitle`, `resetEmailSent`, `resetPasswordBtn`, `newPasswordPH`, `setPasswordBtn`, `passwordUpdated`, `backToLogin` (zh + en)
- `App.jsx` — passes `isRecovery`, `resetPassword`, `updatePassword` through `onAuth` prop to Login

**Sentry error monitoring**
- `pnpm add @sentry/react` (v10.49.0)
- `src/lib/sentry.js` (new) — key-gated `initSentry()`, `setSentryUser(id)`, `setSentryContext(grade, authStatus)`, `SentryErrorBoundary` export; `beforeSend` strips email (PII)
- `main.jsx` — calls `initSentry()` before render; wraps `<App>` in `<SentryErrorBoundary>` with bilingual-free crash fallback + reload button
- `App.jsx` — `setSentryUser` effect on auth change; `setSentryContext` effect on grade/user change
- `.env.local` — `VITE_SENTRY_DSN=` placeholder added (paste DSN from sentry.io project settings)

---

### fix: D6 generator bugs — diagram leak, proportions, negatives, cross-session dedup

**Bug #1/#3 — Diagram leaks answer (parent-visible, critical)**
- `FIG.rect(w,h)` extended with optional `hide` param (`'w'|'h'`): shows `?` for the unknown dimension instead of the value
- 3 generators fixed in `grade4.js` (4M1: find-side-from-perimeter, find-area-from-perimeter; 4M2: find-side-from-area) — diagram now consistent with question

**Bug #4 — Answer equals a given value**
- Same 3 generators: `do-while` guard ensures answer `h` ≠ given `w` or `peri`

**Bug #5 — Unrealistic shape proportions**
- All 8 `FIG.rect` generators in 4M1/4M2: max 2.5:1 aspect ratio enforced
- Zero-difference guard added to 4M1 compare-shapes generator (`s1 ≠ s2`)

**Bug #6 — Negative/zero answers**
- `grade2.js` 2M rope problem: `part` capped to 110, `do-while` ensures positive remainder

**Bug #7 — Duplicate questions across sessions**
- `exam.js buildExam()` pre-seeds `gSeen` from `sessionStorage` (keyed per grade)
- Persists new question hashes after each exam; capped at 200 entries to bound storage

### feat: curriculum alignment — add 2N4 四位數, fix 6D34→6D3
- Added `2N4` (四位數, 4-digit numbers) to P2: 5 generators covering reading/writing by place value, thousand-digit identification, comparison, ordering, word problem
- P2 now has 9 topics (was 8); `config.js` TOPICS updated
- Renamed topic key `6D34` → `6D3` in both `config.js` and `grade6.js` (was conflating EDB units 6D3 圓形圖 and 6D4 統計的應用)

---

## [v1.3-beta] — 2026-04-18

### feat: full EDB curriculum audit — 10 new topics, ~60 new generators (all grades)
Audited engine against 4 HK EDB reference PDFs (`docs/reference/`): KS1 2018, KS2 2020, pmc2017, ME_KLACG 2017.

**New topic modules added:**
- P2: generators for `2N5` (fractions — halves/thirds/quarters), `2N6` (division with remainder), `2D1` (bar charts + pictographs)
- P3: `3N1` (large numbers to 100,000, rounding to 千/萬), `3N6` (decimals — tenths), `3D2` (line graphs — read, total, trend)
- P4: `4S2` (shape partition/assembly, tessellation), `4S3` (8 compass directions — N/S/E/W + NE/SE/NW/SW)
- P5: `5N1` (large numbers — 百萬/億, place value, rounding), `5S2` (3D solids — faces/edges/vertices, cross-sections, nets)
- P6: `6N2` (fraction↔decimal conversions, mixed ordering), `6M2` (volume II — cuboid formula, water displacement), `6D4` (statistics application — choose graph type, misleading graphs, sample size)

**Enhancements to existing topics:**
- `4N3`: +3 generators for prime/composite identification (including "1 is neither") and prime listing
- `4N5`: +2 generators for distributive property expand/factor
- `4S1`: +2 generators for rhombus properties
- `5A`: +2 generators for algebraic expression evaluation and formation
- `5N4`: +3 generators for ×10/÷10/×100/÷100 decimal point shift
- `5S1`: +2 generators for circle part identification (半徑/直徑/圓心) and diameter↔radius conversion
- `6A1`: +2 generators for bracket equations `a(x+b)=c` and grouped terms `dx+ex=c`
- `6D34[0]`: wired `FIG.pie()` figure into the pie chart recognition question

**Updated generator counts:**
- grade2.js: 5→8 topics, 17→32 generators; `FIG` added to imports
- grade3.js: 7→10 topics, 28→41 generators; `shuffle`, `FIG` added to imports
- grade4.js: 11→13 topics, 65→82 generators; `shuffle`, `_nm2` added to imports
- grade5.js: 9→11 topics, 38→56 generators; `shuffle` added to imports
- grade6.js: 11→14 topics, 42→63 generators; `gcd`, `shuffle` added to imports

**config.js:** Registered all 10 new topic keys in `TOPICS` (P3–P6 additions)

---

### refactor: extract engine.js into modular src/engine/ (Phases 1–9)
- **Phase 1** (f3293e7): `core.js` — 7 utilities (`ri, pk, gcd, lcm, fOf, fS, shuffle`), `chkAns`, SVG helpers (`SV`×7, `FIG`×9); private: `norm, stripU, parseFrac`
- **Phase 2** (e385051): `config.js` — `TOPICS, GRADE_INFO, DIFF_INFO, DIFF_ALLOW, EXAM_TARGETS, SECT_*`; CTX pools; 7 helpers (`nm, pl, fd, it, _nm2, _pl, _it`)
- **Phase 3** (fcd216d): `history.js` — `saveHistory, loadHistory, clearHistory`; `STORAGE_KEY` private
- **Phase 4** (04cdd0f): `grade1.js` — P1 generators (6 topics, 25 functions)
- **Phase 5** (14e8946): `grades/grade2.js` — P2 generators (5 topics, 17 functions)
- **Phase 6** (5df1dfa): `grades/grade3.js` — P3 generators (7 topics, 28 functions)
- **Phase 7** (0ee2b21): `grades/grade4.js` — P4 generators (11 topics, 65 functions)
- **Phase 8** (5f00ab4): `grades/grade5.js` — P5 generators (9 topics, 38 functions)
- **Phase 9** (e6e8e8f): `grades/grade6.js` — P6 generators (11 topics, 42 functions)
- All `_addQ` calls inlined into topic arrays; ES module named exports throughout
- `engine.js` still the runtime entry point — grade files not yet wired in

### fix: parameterize hardcoded 5N2[2] fraction question (91bb206)
- Was always "3/4 + 1/6 − 1/3 = ?" on every run
- Replaced with 5 denominator triplets + random numerators; safety loop ensures result > 0
- Produces 44 distinct questions in 50 runs

---

## [v1.3-beta] — 2026-04-17

### ecb5083 — docs: three-way sync — v4, v5.1, and future_tables
- Master_Plan_v4.md updated from v5.1: PostHog ✅, gamification section (Daily Challenge/Stardust/Curlboo State), paywall gates 3→4, weekly email+viral share moved Phase 6→5, 8 known generator bugs appendix, Appendix D Claude Code notes, principles 8-11 added
- OU_MASTER_PLAN_V5.1.md updated from v4 + future_tables: PostHog marked live, I3 schemas upgraded with full RLS/indexes/JSONB examples/bilingual topic_map
- future_tables.md: knowledge_gaps gains `quest_id UUID` field (links gap to its Quest)

### fix: remove stale signupDone reference causing blank screen at onboarding step 5
- Root cause: `{step===5&&!signupDone&&(` still referenced `signupDone` which was removed
- JavaScript ReferenceError → React tree unmount → blank screen
- Fix: `{step===5&&(` — removed stale guard entirely

### fix: guard PostHog calls to prevent crash when key not configured
- Root cause: `posthog.capture()` called on uninitialized instance when `VITE_POSTHOG_KEY` absent
- Refactored `src/lib/posthog.js`: `enabled` boolean guard + try/catch on all calls
- Exported named functions `capture/identify/reset` instead of raw posthog object
- App now works correctly whether or not PostHog key is configured

### feat: PostHog analytics integration (Phase 3B — partial complete)
- New `src/lib/posthog.js` — key-gated init, `capture/identify/reset` exports
- `src/lib/track.js` — dual-destination: every `track()` fires PostHog + Supabase simultaneously
- `src/hooks/useAuth.js` — `identify(userId)` on login, `reset()` on logout, `signup_complete` event
- 12 events wired across App.jsx, Profile.jsx, Onboarding.jsx, ExportPDFButton.jsx:
  `onboarding_complete`, `exam_start`, `exam_complete`, `results_view`, `pdf_export`, `retry_click`, `grade_selected`, `lang_switch`, `parent_pin_set`, `guest_signup_prompt_shown`, `guest_signup_prompt_clicked`, `signup_complete`
- `VITE_POSTHOG_KEY` added to `.env.local` and `.env.local.example`

### feat: remove email verification gate from signup (keep only for PDF export)
- Signup now completes immediately — no "check your email" screen
- `src/Onboarding.jsx` — removed `signupDone` state; `finish()` called immediately after signUp
- `src/components/ExportPDFButton.jsx` — PDF gate checks `user.email_confirmed_at`; unverified users see resend-verification modal (bilingual)
- `src/services/api.js` — added `resendVerificationEmail(email)`
- `src/lib/i18n.js` — removed `obCheckEmail*` keys; added `pdfVerifyTitle/pdfVerifyBtn/pdfVerifySent`
- `src/components/exam/ScoreReport.jsx` — passes `user` prop to `ExportPDFButton`

### chore: asset folder structure
- `public/mascot/`, `public/icons/`, `public/splash/` — runtime URL-referenced assets
- `src/assets/brand/`, `src/assets/illustrations/`, `src/assets/animations/`, `src/assets/ui/` — Vite-processed imports
- All folders created with `.gitkeep`
- Removed unused Vite boilerplate: `src/assets/hero.png`, `react.svg`, `vite.svg`

### docs: integrate Topic Quest (D2d) into Master_Plan_v4.md
- D2d added: Topic Quest — Learning Curve Replay (full spec with UX framing, implementation checklist)
- D1d updated: gap alert now includes "Start Topic Quest" entry point
- Phase 4B: Topic Quest implementation checklist (8 items)
- Phase 5 pricing: Topic Quest in Pro tier; paywall message for gate #4
- future_tables.md created: production SQL schemas for student_profiles, subscriptions, quest_progress, topic_map, knowledge_gaps (with RLS, indexes, JSONB examples, analytics events)

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
