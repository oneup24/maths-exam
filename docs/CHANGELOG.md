# Changelog

All notable changes to **Maths Quests** (數學特訓).

---

## [supabase-auth] — 2026-04

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

## [main] — Pre-auth baseline

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
