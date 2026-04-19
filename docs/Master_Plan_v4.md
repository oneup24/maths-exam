# Master Plan v4.0 — Dev Roadmap (April 9, 2026)

## Company: OneUp24 (oneup24.com)
## Product: Maths Quests (數學特訓)
## Target: HK primary school kids P1-P6 + parents
## Brand IP: Curlboo Bear mascot

---

## HOW TO READ THIS PLAN

This plan has TWO tracking systems:

1. **Diagnostic Milestones (D0–D3)** — tracks the GAP DETECTION + RECOMMENDATION engine specifically. These cut across multiple delivery phases.
2. **Delivery Phases (Phase 1–6)** — tracks the overall product build in chronological order.

They are SEPARATE. D1 work happens inside Phase 4B. D3 work happens inside Phase 5. Do not confuse them.

---

## DIAGNOSTIC MILESTONES (Cross-cutting)

### D0 — Foundation
| Item | Description | Status | Evidence | Ships In |
|------|------------|--------|----------|----------|
| D0a | Tag questions with topicId in buildExam() | ✅ DONE | engine.js:1238,1247 | Phase 1 |
| D0b | Save topic breakdown in api.js | ✅ DONE | api.js:11, api.js:39 | Phase 2 |
| D0c | Fix level in profiles (onboarding only) | ⚠️ PARTIAL | Level saved per exam_session, NOT in a profiles table | Phase 3 |

### D1 — Gap Detection
| Item | Description | Status | Ships In |
|------|------------|--------|----------|
| D1a | topic_map table with prerequisite chains | ❌ NOT DONE | Phase 4B |
| D1b | Detect gaps (wrong >= 3/5 per topic) | ❌ NOT DONE | Phase 4B |
| D1c | knowledge_gaps table | ❌ NOT DONE | Phase 4B |
| D1d | Gap alert on results screen with "Start Topic Quest" entry point (Pro) | ❌ NOT DONE | Phase 4B |

### D2 — Recommendations
| Item | Description | Status | Ships In |
|------|------------|--------|----------|
| D2a | "Re-practice this topic" button (per-topic, not retryWrong all) — also serves as Quest single-station practice | ⚠️ PARTIAL | Phase 4B |
| D2b | Importance display ("HIGH — affects P4-P6") — shown on Quest map per station | ❌ NOT DONE | Phase 4B |
| D2c | Basic parent report (free tier) — includes Topic Quest progress summary | ⚠️ PARTIAL | Phase 4B |
| D2d | **Topic Quest** — Learning Curve Replay (see Phase 4B for full spec) | ❌ NOT DONE | Phase 4B |

### D3 — Premium Diagnostics
| Item | Description | Status | Ships In |
|------|------------|--------|----------|
| D3a | Knowledge Health Map (visual) | ❌ NOT DONE | Phase 5 |
| D3b | Full parent report (paid, behind paywall) | ❌ NOT DONE | Phase 5 |
| D3c | Spaced repetition | ❌ NOT DONE | Phase 6 |

---

## Phase 1: Core Engine — ✅ DONE

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

### Question Generator: Layer 1 — Hardcode Engine
- [x] 217 generators across 6 grades, 5 question types
- [x] Basic word problem context (hardcoded in each generator)
- Note: Layer 1 is NOT throwaway — it becomes: offline fallback, free-tier engine, context library for AI prompts, and math validation backbone

---

## Phase 2: Auth + Cloud — ✅ DONE

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

---

## Phase 3: Stabilize + Prepare — 🔄 IN PROGRESS

**RULE: This phase is hardening and preparation ONLY. No new user-facing features. No AI. The goal is: test everything, fix everything, instrument everything, then put it in front of real humans.**

### 3A — Testing & Fixes
- [x] Merge `supabase-auth` branch to `main`
- [x] Supabase RLS policies (SELECT/INSERT/UPDATE/DELETE own rows)
- [x] Clean up 20 unused stub files
- [x] Fix broken import in main.jsx
- [x] Pin Vite dev server to port 5175
- [x] Fix all 33 lint errors (0 remaining) + qty bug in engine.js
- [x] Per-topic performance breakdown on results screen
- [x] PDF exam report export (`ExportPDFButton`)
- [x] Production env vars + deployment (Vercel) — v1.2-beta live
- [ ] End-to-end testing: full exam flow (all grades, all types)
- [ ] Test guest mode flow (no auth, localStorage only)
- [ ] Test auth flow (signup, confirm email, login, session restore)
- [ ] Test cloud sync (save, load history, stats)
- [ ] Test parent PIN (set, lock, unlock, reset)
- [ ] Test i18n (switch lang mid-session, all strings render)
- [ ] Test edge cases: empty answers, special chars, fraction formats
- [x] Add password reset flow (currently missing) ✅ DONE
- [x] Fix Capacitor build (capacitor.js fails in vite build) ✅ DONE — removed dead capacitor.js loader; Capacitor v8 injects bridge natively
- [x] Lighthouse audit (performance, accessibility, PWA score) ✅ DONE

### 3B — Instrumentation (NEW — required before launch)
- [x] Integrate PostHog analytics (free tier, self-hostable, GDPR/PDPO-friendly) ✅ DONE
  - Tracking 12 events: onboarding_complete, exam_start, exam_complete, results_view, pdf_export, retry_click, grade_selected, lang_switch, parent_pin_set, guest_signup_prompt_shown, guest_signup_prompt_clicked, signup_complete
  - VITE_POSTHOG_KEY configured in .env.local — also add to Vercel env vars for production
  - PostHog + Supabase dual-destination (track.js fires both simultaneously)
  - Set up retention cohort (D1/D3/D7/D30) + funnel dashboards in PostHog — TODO
- [x] Integrate Sentry error monitoring (free tier, 5K events/mo) ✅ DONE
  - Capture JS exceptions, unhandled promise rejections
  - Tag errors with: grade, question type, auth status (guest vs logged in)
  - Alert on spike > 10 errors/hour (configure in Sentry dashboard manually)

### 3C — Data Layer Prep
- [x] Data schema documentation ✅ DONE — `docs/data_schema.md`
- [x] Create `question_bank` table in Supabase with schema: ✅ DONE — `supabase/question_bank.sql`
  - id, grade, topic_id, difficulty, q_type, question_json (jsonb), source (hardcode|ai_v32|ai_r1|exam_mimic), hash (SHA256 for dedup, UNIQUE), quality_score (0-100), times_served, times_correct, avg_time_spent, status (verified|flagged|retired), context_version, created_at
  - Index: (grade, topic_id, difficulty, q_type, status)
  - Index: (quality_score DESC) WHERE status = 'verified'
- [ ] Seed question bank: run all 217 generators × multiple seeds = ~2,000+ initial questions (script ready: `scripts/seed_question_bank.mjs`, needs SUPABASE_SERVICE_KEY env var)
- [x] Add dedup logic: hash(question + answer) to prevent duplicates ✅ DONE — in seed script
- [x] Separate context pools into `contexts.js` ✅ DONE — `src/engine/contexts.js`
- [x] Add `gradeRules` validation ✅ DONE — `src/engine/gradeRules.js`
- [x] Wire contexts.js + gradeRules into existing engine.js generators ✅ DONE — config.js re-exports from contexts.js; exam.js filters via validateQuestion()
- [x] Design future tables schema (DO NOT build UI yet, schema only):
  - `student_profiles` — enables multi-child (Phase 4A)
  - `subscriptions` — enables paywall state checking (Phase 5)
  - `quest_progress` — Topic Quest session state (Phase 4B)
  - `topic_map` — prerequisite chains, powers D1 + Quest (Phase 4B)
  - `knowledge_gaps` — computed gap records per user per topic (Phase 4B)
  - Schema documented in `docs/future_tables.md` ✅

### 3D — 🚀 SOFT LAUNCH
- [ ] Recruit 10 real HK parent-child pairs (WhatsApp, parent groups, personal network)
- [ ] Create feedback WhatsApp group
- [ ] Each family completes minimum 3 sessions over 1 week
- [ ] Collect qualitative feedback: What confused you? What did your child like? Would you pay?
- [ ] Measure from PostHog: completion rate, avg score, D1/D3/D7 retention, drop-off point in funnel
- [ ] Fix top 3 issues found in soft launch
- [ ] ✅ GATE: Do not proceed to Phase 4 until 10 families have used the product and feedback is incorporated

---

## Phase 4A: Mobile App — NOT STARTED

- [ ] Build Capacitor iOS project (`npx cap sync ios`)
- [ ] Test on iOS simulator + real device
- [ ] Handle safe areas, notch, keyboard avoidance
- [ ] Splash screen + app icon asset generation
- [ ] Offline mode: ensure full functionality without network (Layer 1 engine + localStorage)
- [ ] App Store submission (Apple developer account, review guidelines)
- [ ] Android build + Play Store submission
- [ ] Deep link support (for future "practice now" links in parent emails)

---

## Phase 4B: Smart Features + AI Engine — NOT STARTED

**RULE: Every feature in this phase must generate more exam_sessions (and therefore more topic_breakdown data). If it doesn't produce data, it doesn't belong here.**

### Smart Features
- [ ] Smart retry per topic — replace current retryWrong() (retries ALL wrong) with per-topic drill. When parent taps a red topic in 各單元表現, generate a new mini-exam for THAT topic only. This is the natural action after seeing the diagnostic. (D2a completion). Also serves as Topic Quest single-station practice.
- [ ] Smart practice auto-generate — after 3+ sessions, auto-suggest "Your weakest topic is 分數的加減. Practice now?" on the home screen. Uses aggregated topic_breakdown data across sessions. This is the bridge between diagnostic (passive) and remediation (active).
- [ ] Trap Item Engine v1 — upgrade from basic distractor text to a structured engine that generates trap data points per question type. Track trap_fall_rate per session. This is the #1 differentiator vs every competitor. Must ship BEFORE paywall goes live so Pro tier has clear value.

### Gamification (Dark Souls philosophy — Phase 4B) ⭐
**Rule: NEVER put gamification in core learning experience. Reward overcoming difficulty, not just showing up.**

| Priority | Feature | Description |
|---|---|---|
| P0 (must ship) | Daily Challenge 每日挑戰 | 3-5 error-based questions + spaced repetition. Once per day, no redo. Streak counter. |
| P1 (light v1) | Stardust 星塵 + Curlboo Shop | Correct answer = 1 stardust. Daily challenge = 3×. 10-15 cosmetic items to unlock. NO real-money purchase of stardust. |
| P1 (light v1) | Curlboo State Reflection | 5 states on Home Screen (瞓覺/正常/興奮/慶祝/溫書) reflecting student's actual activity. Computed from existing exam_sessions — zero extra storage. |

**Build order:** Daily Challenge → Stardust + Shop → Curlboo State (each depends on prior's data)
**❌ Rejected:** Idle Game, buying stardust with money, excessive gamification, deducting points for wrong answers.

### Gap Detection (D1 completion)
- [ ] Create topic_map table with prerequisite chains (D1a) ← **Topic Quest route data source**
- [ ] Implement gap detection: wrong >= 3/5 per topic triggers gap flag (D1b) ← **Topic Quest trigger condition**
- [ ] Create knowledge_gaps table (D1c)
- [ ] Gap alert on results screen with "Start Topic Quest" entry point — Pro gate (D1d)
- [ ] Importance display: "HIGH — affects P4-P6" shown per station on Quest map (D2b)
- [ ] Parent report: basic free-tier version, includes Topic Quest progress summary (D2c)

### Topic Quest — Learning Curve Replay (D2d) 🆕
**Core insight:** When a student is stuck on a topic (e.g. P4 fraction addition), the problem is rarely "not enough practice" — it's a broken link earlier in the prerequisite chain. Topic Quest traces the chain to its root, then replays the entire learning curve as a forward adventure.

**UX framing (critical):**
- For students: this is an "adventure", not remediation. They don't know they're doing lower-grade work.
- For parents: this is a "path to mastery", not "your child is behind".
- No grade labels shown inside a Quest — only station names and topic names.

**Implementation:**
- [ ] Quest route generator — given a stuck topic, walk topic_map prerequisite chain to root, return ordered station list (depends on D1a)
- [ ] Quest mini-exam — 5 questions per station, same topic, generated by Layer 1 engine
- [ ] Unlock logic — 4/5 correct → unlock next station; <4/5 → retry same station
- [ ] Quest progress persistence — save to `quest_progress` table (schema in `docs/future_tables.md`)
- [ ] Quest map UI — visual station-by-station progress, Curlboo emotional companion per station
- [ ] Quest completion celebration — fanfare animation on full chain cleared
- [ ] Quest entry point — triggered from D1d gap alert on results screen (Pro users only)
- [ ] Quest analytics — track quest_start, quest_station_pass, quest_station_fail, quest_complete events

### Question Bank Learning System
- [ ] After student answers: update times_served, times_correct, avg_time_spent on question_bank
- [ ] Track student-question history: ensure same student doesn't get same Bank question twice
- [ ] Add "Report wrong answer" button → flags question (status: flagged)
- [ ] Auto-compute quality_score = f(correct_rate, avg_time, report_count, source)
- [ ] Auto-retire questions with quality_score < threshold
- [ ] Questions with 40-70% correct rate = ideal difficulty, boost score
- [ ] Modify `buildExam()` flow: try Bank first → fill gaps with Layer 1 → AI only if both insufficient

### AI Generator MVP (DeepSeek)
- [ ] **PREREQUISITE: Benchmark V3.2 (with reasoning mode) vs R1 on 20 sample P5-P6 multi-step problems. Compare: answer accuracy, solution step quality, cost, latency. Decision: if V3.2 reasoning handles P5-P6 adequately, use V3.2 for ALL tiers and skip R1 entirely. Document results in `docs/ai_benchmark.md`.**
- [ ] Generate 應用題 (word problems) only — hardcode handles calc/fill fine
- [ ] System prompt includes: grade, topicId, difficulty, contexts from contexts.js, gradeRules constraints, forbidden rules (no negatives for P1-P5, no decimals before P4, etc.)
- [ ] Output format: standard question JSON {d, tp, q, a, sc, isMC, opts, trap, fig, s[], topicId, topicName}
- [ ] Validation pipeline (auto, before serving):
  1. Structure check: all required fields present, correct types
  2. Math verification: parse question, solve independently (use Layer 1 chkAns logic), verify AI answer matches
  3. Context check: numbers within gradeRules, realistic quantities, Traditional Chinese
  4. Duplicate check: hash not already in Bank
- [ ] If validation passes → save to Bank (source: ai_v32, status: verified)
- [ ] If validation fails → log to qa_issues table, retry or discard
- [ ] **IRON RULE: NEVER serve unvalidated AI questions to students**
- [ ] Model routing logic (IF benchmark shows R1 is needed):
  - Simple 應用題 → V3.2 (cheap, fast)
  - Complex multi-step / challenge → R1 (reasoning needed)
  - Basic calc/fill → Layer 1 only (no AI needed)
  - Answer validation → Layer 1 chkAns ($0)

---

## Phase 5: Monetization — NOT STARTED

### Subscription Infrastructure
- [ ] RevenueCat integration for iOS/Android subscription management
- [ ] Stripe integration for web billing (PWA users who don't go through App Store)
- [ ] RevenueCat ↔ Stripe integration for unified cross-platform entitlements
- [ ] Wire `subscriptions` table (schema from Phase 3C) to RevenueCat/Stripe webhooks
- [ ] Receipt validation (server-side via RevenueCat)
- [ ] Trial period logic (7-day free Pro trial on first install)
- [ ] Family plan: multiple child profiles under one parent account (wire `student_profiles` table)

### Pricing Tiers
| Tier | Price | Includes |
|------|-------|----------|
| Free | $0 | 3 quizzes/day, basic topics, no PDF, no diagnostic breakdown, basic Curlboo |
| Pro | HKD 48/month (HKD 388/year) | Unlimited quizzes, all topics, trap items, PDF export, full 各單元表現 sorted worst-first, **Topic Quest (gap detection + learning curve replay)**, progress history, all Curlboo moods |
| Family | HKD 78/month (HKD 628/year) | Pro + up to 3 children + cross-child comparison |

**Topic Quest is the #1 Pro upgrade hook.** It automates what a tutor charges HKD 300-500/hr to do manually: detect the weak link, trace it to the root, design a personalised learning path. The paywall message: "找出根源，重建基礎 — Curlboo 幫你設計學習路徑 🗺️"

### Paywall Gates — EXACTLY 4, NO MORE ⭐

| # | Gate | Trigger | Message |
|---|---|---|---|
| 1 | Blurred 各單元表現 | Tap diagnostic | "Unlock detailed topic analysis 🔒" |
| 2 | Daily limit hit | 4th exam attempt | "Upgrade for unlimited practice 🔒" |
| 3 | PDF tap | Tap export | "Pro members can print exams 🔒" |
| 4 | Topic Quest locked ⭐ | Gap detected + Quest available | Curlboo paywall: "找出根源，重建基礎 — Curlboo 幫你設計學習路徑 🗺️" |

**Gate 4 is the HIGHEST-INTENT gate** — it fires at the exact moment a parent discovers their child has a foundation gap. Peak anxiety + peak intent = highest conversion.

**These are the ONLY 4 conversion moments. Do not add more.** Sell the INSIGHT, not the tool. The per-topic diagnostic (各單元表現) is the #1 hook. Topic Quest (gate #4) sells a designed PATH, not more questions.

### Early Retention & Viral (Moved from Phase 6) ⭐
- [ ] Weekly progress email to parents — automated every Sunday: topics practiced, improvement vs last week, weakest topic + "practice now" deep link, Curlboo encouragement. Supabase Edge Functions + Resend/Postmark.
- [ ] Viral share image — "Share Result" button generates branded image (Curlboo + topic breakdown + score + QR code) for WhatsApp. Parents share organically.
- [ ] Topic Quest viral loop — push: "Your child completed Station 3/5 on Fractions Quest!" → parent screenshots → other parents ask → install → conversion.

### Premium Diagnostics (D3 completion)
- [ ] Knowledge Health Map — visual topic mastery overview (D3a)
- [ ] Full parent report — detailed, behind paywall (D3b)

---

## Phase 6: Growth + Advanced AI — NOT STARTED

### Viral & Retention (Moved: Weekly email + viral share → Phase 5) ⭐
- [ ] Weekly progress email to parents (**MOVED to Phase 5**) — automated every Sunday. Supabase Edge Functions + Resend/Postmark. #1 retention mechanism.
- [ ] Viral Loop: "Share Report" button (**MOVED to Phase 5**) — branded image (Curlboo + topic breakdown + score + QR code) for WhatsApp. Highest-ROI growth channel.
- [ ] Referral system (invite code, reward: 1 week free Pro)
- [ ] Push notifications (streak reminders, challenge alerts)
- [ ] Social sharing (score cards, achievements)

### Engagement
- [ ] Leaderboard (school / district / global — opt-in only, PDPO compliant)
- [ ] Weekly challenge (curated exam, time-limited, Curlboo special badge)
- [ ] Parent dashboard (view child progress, set goals)
- [ ] Teacher mode (assign exams, view class stats) — potential B2B channel

### Advanced AI (only if benchmark from Phase 4B justifies R1)
- [ ] R1 for complex multi-step problems (P5-P6 challenge mode) — only if V3.2 benchmark was insufficient
- [ ] Exam mimicking feature (Premium): user uploads photo of real exam → AI analyzes question types, topics, difficulty, structure → generates N similar-but-original questions matching format
- [ ] Spaced repetition algorithm (D3c completion)
- [ ] Monthly context refresh in contexts.js (trending HK topics, seasonal)
- [ ] Target: 30,000-50,000+ verified questions in Bank, <$5/month AI cost even at 5,000+ users

### Strategic Data & Fundraise Prep
- [ ] Student improvement case study — once 50+ users have 4+ weeks of data, query topic_breakdown trends to find 1 real student whose weakest topic improved significantly. Package as: "小明's 分數 score went from 20% to 75% in 4 weeks using Maths Quests." Hero story for pitch deck, App Store screenshots, IG content. MUST have before fundraise.
- [ ] AI-as-Factory architecture documentation — document the core innovation: AI generates content ONCE, stores in question_bank, serves FOREVER at $0. This is NOT AI-as-service. Draw diagram: Input → AI generates → Validate → Store in Supabase → Serve from DB → Learn from usage → Improve. Include compounding cost model. For investors and future team.
- [ ] AI cost model enforcement — every AI-generated question MUST be saved to question_bank before serving. Never call AI twice for same content pattern. Target: Month 1 ~$50/mo, Month 6 ~$10/mo, Month 12 ~$0/mo. Track actual_ai_cost_per_quiz as KPI.
- [ ] Cognitive fingerprint documentation — topic_breakdown JSONB across all users is the company's most valuable asset. After 10K+ sessions: hardest topics by grade, trap types that fool most students, mastery time per topic, seasonal patterns. This anonymized data = future B2B product for school licensing.

---

## Appendix A: Question Generator — 3-Layer Architecture

| Layer | What | Cost | Status |
|-------|------|------|--------|
| Layer 1: Hardcode Engine | 217 generators, instant, offline, free | $0 | ✅ BUILT |
| Layer 2: AI Generator | DeepSeek V3.2 (all tiers, pending benchmark). R1 only if V3.2 insufficient for P5-P6 | ~$0.14-0.28/M tokens | Phase 4B |
| Layer 3: Question Bank | Supabase table, reuses across students, self-improving quality score | $0 per serve | Schema in Phase 3C, Learning in Phase 4B |

**Flywheel: More Users → More Questions in Bank → Less AI Cost Per User → Better Margins**

### Cost Projection

| Users | Bank Qs | AI Calls/mo | AI Cost/mo | Cost/User |
|-------|---------|-------------|------------|-----------|
| 100 | 2,000 | ~500 | ~$0.70 | $0.007 |
| 1,000 | 8,000 | ~2,000 | ~$2.80 | $0.003 |
| 5,000 | 30,000 | ~3,000 | ~$4.20 | $0.001 |
| 20,000 | 50,000+ | ~1,000 | ~$1.40 | $0.00007 |

### Model Selection (pending Phase 4B benchmark)

| Task | Model | Cost | Why |
|------|-------|------|-----|
| All 應用題 generation | DeepSeek V3.2 | ~$0.14/$0.28 per M tokens | Unified model, handles reasoning. Benchmark first. |
| Complex multi-step (P5-P6) | V3.2 or R1 (TBD) | TBD after benchmark | Use R1 ONLY if V3.2 fails P5-P6 accuracy test |
| Exam paper mimicking | V3.2 or R1 (TBD) | TBD after benchmark | Must understand paper structure |
| Basic calc/fill questions | Layer 1 Hardcode | $0 | No AI needed |
| Answer validation | Layer 1 chkAns | $0 | Computational, not AI |

---

## Appendix B: Strategic Principles

1. **Every feature must produce data.** Prioritize features that generate more exam_sessions (and therefore more topic_breakdown records) over features that are flashy but don't produce data. More data → better recommendations → more engagement → more data. Topic Quest generates 2-3× data per session: 1 Quest = 4-5 stations × 5 questions = 20-25 topic_breakdown data points.

2. **AI-as-Factory, not AI-as-Service.** Generate once, store forever, serve at $0. Competitors who use AI-as-service pay per query forever. We don't.

3. **Sell the INSIGHT, not the tool.** Parents don't pay for "unlimited quizzes." They pay for "see exactly where your child needs help." Topic Quest sells a designed PATH, not more questions.

4. **4 paywall gates, no more.** ⭐ Discipline. More gates = less trust. (Updated from 3 to 4 with Topic Quest gate.)

5. **Validate before serve. Always.** One wrong math answer shown to a child destroys parent trust permanently. The validation pipeline is not optional.

6. **Ship to real humans first, optimize later.** No amount of AI, spaced repetition, or flywheel optimization matters if zero parents have used the app.

7. **topic_breakdown JSONB is the moat.** Protect it. Back it up. Never delete it. It becomes the B2B product.

8. **"Would a tutor do this?"** ⭐ Yes → build. No → don't. Every feature decision starts here.

9. **Dark Souls, not Mario.** ⭐ Reward overcoming difficulty, not just showing up. Streak/points gradually fade out (training wheels off). NEVER put gamification in the core learning experience.

10. **Maths Quests first. Everything else frozen.** ⭐ No FoodSwipe, no English app, no STEM app until MRR > HKD 50K.

11. **Ability is a journey, not a state.** ⭐ You can't copy-paste ability. You can only design a path and let them walk it. This is why Topic Quest exists. "能力唔係一個狀態，係一個旅程。"

---

## Appendix C: Known Generator Bugs — Fix Plan ⭐

**Root Cause:** Question schema lacks `given` vs `unknown` separation.

| # | Bug | Fix |
|---|---|---|
| 1 | Diagram leaks answer (labels show unknown) | 3-layer schema: given/unknown/display |
| 2 | Non-integer division (177 ÷ 16 = 11.06) | gradeRules validation gate |
| 3 | Question/diagram contradiction | Single source of truth per question |
| 4 | Answer = given value | Validation: answer ≠ any given value |
| 5 | Unrealistic shape proportions | Aspect ratio constraints |
| 6 | Negative/zero answers | Min-value constraints per grade |
| 7 | Duplicate questions in session | Hash-based dedup |
| 8 | MC options leak answer | Distractor generation rules |

**Fix Strategy:** 3-layer schema + validation gate + automated audit script. Ships in Phase 3C / 4B.

---

## Appendix D: Claude Code Integration Notes ⭐

**Priority order when working on this repo:**
1. Fix bugs that affect math correctness FIRST
2. Fix bugs that affect data integrity SECOND
3. New features THIRD

**NEVER:**
- Serve unvalidated AI questions to students
- Delete or modify topic_breakdown data
- Add more than 4 paywall gates
- Add gamification to core learning experience
- Break guest mode

**Architecture rules:**
- All quiz generation = engine.js (Layer 1, $0 cost)
- All user data = Supabase with RLS
- Every question MUST have topicId + topicName
- Every exam MUST save topic_breakdown as JSONB
- Frontend: React + Vite + Tailwind CSS
- Package manager: pnpm

**Topic Quest build context:**
- Ability is a JOURNEY, not a state. It's NOT remediation (retry with max gear). It IS learning curve replay (new game from Level 1).
- Students should NEVER feel "sent back" — they should feel "on a new Quest"
- Depends on D1a (topic_map) prerequisite chains
- 5 stations × 5 questions, 4/5 pass gate per station
- Curlboo accompanies each station with escalating reactions:
  - Station 1: 開心跳 「你記得平均分！好叻！」
  - Station 2: 驚訝 「你仲記得分數係咩！」
  - Station 3: 興奮 「就快到終點啦！」
  - Final: 戴皇冠 「你掌握咗分數！🏆」
  - Abandoned: 鼓勵 「下次再嚟，Curlboo 等你！」
- Pro-only feature (paywall gate #4)
- See `docs/future_tables.md` for quest_progress + topic_map schemas

---

## Appendix E: Key Dates & Gates

| Milestone | Target | Gate Condition |
|-----------|--------|----------------|
| Phase 3 complete | April 2026 | All tests pass, PostHog live, Sentry live, 0 critical bugs |
| 🚀 Soft launch (10 families) | Late April 2026 | 10 families recruited, feedback group active |
| Soft launch feedback incorporated | May 2026 | Top 3 issues fixed, D1/D7 retention measured |
| Phase 4A (iOS app) submitted | June 2026 | App Store review passed |
| Phase 4B (AI + Smart features) | July-August 2026 | V3.2 benchmark done, Bank learning live |
| Phase 5 (Paywall live) | September 2026 | Trap Engine shipped, 3 gates implemented, RevenueCat live |
| Phase 6 (Growth) | Q4 2026 | 100+ paying users, case study ready |

**These dates are targets, not commitments. The GATES are commitments. Do not skip gates.**
