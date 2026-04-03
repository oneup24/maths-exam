# Master Plan v2 — Dev Roadmap

## Company: OneUp24 (oneup24.com)
## Product: Maths Quests (數學特訓)
## Target: HK primary school kids P1-P6 + parents
## Brand IP: Curlboo Bear mascot

---

## Phase 1: Core Engine — DONE

- [x] Question engine with ~600+ procedural generators (P1-P6)
- [x] HK EDB curriculum-aligned topics (6-11 topics per grade)
- [x] 5 question types: calc, fill, MC, short answer, show working
- [x] 3 difficulty levels (Basic / Standard / Challenge)
- [x] Exam builder with configurable targets (practice 12, test 15, exam 24)
- [x] Section ratios: calc 28%, fill 18%, MC 12%, short 22%, working 20%
- [x] Answer checker with unit stripping, fraction parsing, multi-part, tolerance
- [x] Trap items (distractor training in story problems)
- [x] SVG figure generation (shapes, charts, graphs)
- [x] Timer system (configurable minutes)
- [x] Onboarding wizard (4 steps, name input)
- [x] Curlboo mascot with 4 mood states
- [x] Confetti celebration on good scores
- [x] Sound effects (Web Audio API)
- [x] Daily streak tracker
- [x] Grade star badges (best score per grade)
- [x] Chinese/English toggle (i18n)
- [x] Wrong answer review mode
- [x] Kid-friendly UI (large text, warm colors, big touch targets)
- [x] Privacy policy (COPPA/PDPO)
- [x] PWA support (manifest, service worker)
- [x] Profile page (name, birthday, settings)

## Phase 2: Auth + Cloud — DONE

- [x] Supabase email auth (signup, login, session restore)
- [x] Guest mode (skip auth, full features minus sync/print)
- [x] Guest mode banners + sign-up prompts
- [x] Cloud save exam results to Supabase (exam_sessions table)
- [x] Cloud status indicators (Saved / Saving / Local only)
- [x] Cloud stats in Profile (total exams, avg score, best score)
- [x] Recent exam history list
- [x] Sign out flow
- [x] Print gate (auth required)
- [x] Parent PIN lock (4-digit, gates answer reveal)
- [x] Flexible multi-part answer matching (space/newline/comma)
- [x] Defensive optional chaining for guest mode stability
- [x] CSS conflict fixes

## Phase 3: Stabilize — IN PROGRESS

- [x] Merge `supabase-auth` branch to `main`
- [x] Supabase RLS policies (SELECT/INSERT/UPDATE/DELETE own rows)
- [x] Clean up 20 unused stub files
- [x] Fix broken import in main.jsx
- [x] Pin Vite dev server to port 5175
- [ ] End-to-end testing: full exam flow (all grades, all types)
- [ ] Test guest mode flow (no auth, localStorage only)
- [ ] Test auth flow (signup, confirm email, login, session restore)
- [ ] Test cloud sync (save, load history, stats)
- [ ] Test parent PIN (set, lock, unlock, reset)
- [ ] Test i18n (switch lang mid-session, all strings render)
- [ ] Test edge cases: empty answers, special chars, fraction formats
- [ ] Add password reset flow (currently missing)
- [ ] Fix Capacitor build (capacitor.js fails in vite build)
- [ ] Production env vars + deployment (Vercel / Netlify)
- [ ] Lighthouse audit (performance, accessibility, PWA score)

## Phase 4: Mobile App (Capacitor iOS)

- [ ] Build Capacitor iOS project (`npx cap sync ios`)
- [ ] Test on iOS simulator + real device
- [ ] Handle safe areas, notch, keyboard avoidance
- [ ] Splash screen + app icon asset generation
- [ ] Offline mode: ensure full functionality without network
- [ ] App Store submission (Apple developer account, review guidelines)
- [ ] Android build + Play Store (if desired)

## Phase 5: Monetization (Subscription)

- [ ] Define free vs paid feature split
- [ ] Stripe or RevenueCat integration
- [ ] Paywall UI (gate premium features)
- [ ] Family plan (multiple child profiles under one parent account)
- [ ] Receipt validation (server-side)
- [ ] Trial period logic

## Phase 6: Growth

- [ ] Referral system (invite code, reward)
- [ ] Leaderboard (school / district / global)
- [ ] Weekly challenge (curated exam, time-limited)
- [ ] Parent dashboard (view child progress, set goals)
- [ ] Teacher mode (assign exams, view class stats)
- [ ] Push notifications (streak reminders, challenge alerts)
- [ ] Social sharing (score cards, achievements)
