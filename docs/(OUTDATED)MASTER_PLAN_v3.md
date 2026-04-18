# Master Plan v3.0 — Dev Roadmap (April 3, 2026)


## Company: OneUp24 (oneup24.com)
## Product: Maths Quests (數學特訓)
## Target: HK primary school kids P1-P6 + parents
## Brand IP: Curlboo Bear mascot


---


## CURRENT BUILD STATUS (Audited April 3, 2026)


### Phase 0 — Foundation
| Item | Description | Status | Evidence |
|------|------------|--------|----------|
| 0a | Tag questions with topicId in buildExam() | ✅ DONE | engine.js:1238,1247 |
| 0b | Save topic breakdown in api.js | ✅ DONE | api.js:11, api.js:39 |
| 0c | Fix level in profiles (onboarding only) | ⚠️ PARTIAL | Level saved per exam_session, NOT in a profiles table |


### Phase 1 — Gap Detection
| Item | Description | Status | Evidence |
|------|------------|--------|----------|
| 1 | topic_map table with prerequisite chains | ❌ NOT DONE | No SQL, no references |
| 2 | Detect gaps (wrong >= 3/5 per topic) | ❌ NOT DONE | Topic pct for display only, no threshold logic |
| 3 | knowledge_gaps table | ❌ NOT DONE | No SQL, no references |
| 4 | Gap alert on results screen | ❌ NOT DONE | Color indicators exist but no alert text |


### Phase 2 — Recommendations
| Item | Description | Status | Evidence |
|------|------------|--------|----------|
| 5 | "Re-practice this topic" button | ⚠️ PARTIAL | retryWrong() retries ALL wrong, not per-topic |
| 6 | Importance display ("HIGH — affects P4-P6") | ❌ NOT DONE | No prerequisite/importance UI |
| 7 | Basic parent report (free tier) | ⚠️ PARTIAL | ExportPDFButton.jsx exists but not parent-oriented |


### Phase 3 — Premium
| Item | Description | Status | Evidence |
|------|------------|--------|----------|
| 8 | Knowledge Health Map (visual) | ❌ NOT DONE | No component |
| 9 | Full parent report (paid) | ❌ NOT DONE | No paywall |
| 10 | Spaced repetition | ❌ NOT DONE | No SRS algorithm |


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

### Question Generator (3-Layer Engine)
- [x] Layer 1 hardcode engine — 217 generators across 6 grades, 5 question types
- [x] Basic word problem context (hardcoded in each generator)
- [ ] Separate context pools into `contexts.js` (HK-specific: 蛋撻, 港鐵, 百佳, 八達通, etc.)
- [ ] Add `gradeRules` validation (max number, decimal/fraction/negative allowed per grade)
- [ ] Wire contexts.js + gradeRules into existing engine.js generators
- Note: Layer 1 is NOT throwaway — it becomes: offline fallback, free-tier engine, context library for AI prompts, and math validation backbone


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

### Question Generator (3-Layer Engine)
- [ ] Create `question_bank` table in Supabase with schema:
  - id, grade, topic_id, difficulty, q_type, question_json (jsonb), source (hardcode|ai_v32|ai_r1|exam_mimic), hash (SHA256 for dedup, UNIQUE), quality_score (0-100), times_served, times_correct, avg_time_spent, status (verified|flagged|retired), context_version, created_at
  - Index: (grade, topic_id, difficulty, q_type, status)
  - Index: (quality_score DESC) WHERE status = 'verified'
- [ ] Seed question bank: run all 217 generators × multiple seeds = ~2,000+ initial questions
- [ ] Modify `buildExam()` flow: try Bank first → fill gaps with Layer 1 → AI only if both insufficient
- [ ] Add dedup logic: hash(question + answer) to prevent duplicates
- [ ] Track student-question history: ensure same student doesn't get same Bank question twice


## Phase 3: Stabilize — IN PROGRESS


- [x] Merge `supabase-auth` branch to `main`
- [x] Supabase RLS policies (SELECT/INSERT/UPDATE/DELETE own rows)
- [x] Clean up 20 unused stub files
- [x] Fix broken import in main.jsx
- [x] Pin Vite dev server to port 5175
- [x] Fix all 33 lint errors (0 remaining) + qty bug in engine.js
- [x] Per-topic performance breakdown on results screen
- [x] PDF exam report export (`ExportPDFButton`)
- [x] Production env vars + deployment (Vercel) — **v1.2-beta live**
- [ ] End-to-end testing: full exam flow (all grades, all types)
- [ ] Test guest mode flow (no auth, localStorage only)
- [ ] Test auth flow (signup, confirm email, login, session restore)
- [ ] Test cloud sync (save, load history, stats)
- [ ] Test parent PIN (set, lock, unlock, reset)
- [ ] Test i18n (switch lang mid-session, all strings render)
- [ ] Test edge cases: empty answers, special chars, fraction formats
- [ ] Add password reset flow (currently missing)
- [ ] Fix Capacitor build (capacitor.js fails in vite build)
- [ ] Lighthouse audit (performance, accessibility, PWA score)
- [ ] [STRATEGIC] Data schema documentation — document exam_sessions table structure, column types, JSONB shape, RLS policies. This is the single source of truth for the data layer. Include example topic_breakdown JSONB so any future dev or AI agent knows the exact shape.

### Question Generator (3-Layer Engine)
- [ ] Bank Learning System:
  - After student answers: update times_served, times_correct, avg_time_spent on question_bank
  - Add "Report wrong answer" button → flags question (status: flagged)
  - Auto-compute quality_score = f(correct_rate, avg_time, report_count, source)
  - Auto-retire questions with quality_score < threshold
  - Questions with 40-70% correct rate = ideal difficulty, boost score
- [ ] AI Generator MVP (DeepSeek V3.2):
  - Generate 應用題 (word problems) only — hardcode handles calc/fill fine
  - System prompt includes: grade, topicId, difficulty, contexts from contexts.js, gradeRules constraints, forbidden rules (no negatives for P1-P5, no decimals before P4, etc.)
  - Output format: standard question JSON {d, tp, q, a, sc, isMC, opts, trap, fig, s[], topicId, topicName}
  - Validation pipeline (auto, before serving):
    1. Structure check: all required fields present, correct types
    2. Math verification: parse question, solve independently (use Layer 1 chkAns logic), verify AI answer matches
    3. Context check: numbers within gradeRules, realistic quantities, Traditional Chinese
    4. Duplicate check: hash not already in Bank
  - If validation passes → save to Bank (source: ai_v32, status: verified)
  - If validation fails → log to qa_issues table, retry or discard
  - NEVER serve unvalidated AI questions to students
  - Estimated cost: ~$0.14/M input tokens, ~$0.28/M output tokens (DeepSeek V3.2)


## Phase 4: Mobile App + Product Hardening


- [ ] Build Capacitor iOS project (`npx cap sync ios`)
- [ ] Test on iOS simulator + real device
- [ ] Handle safe areas, notch, keyboard avoidance
- [ ] Splash screen + app icon asset generation
- [ ] Offline mode: ensure full functionality without network
- [ ] App Store submission (Apple developer account, review guidelines)
- [ ] Android build + Play Store (if desired)
- [ ] [STRATEGIC] Trap Item Engine v1 — upgrade from basic distractor text to a structured engine that generates trap data points per question type. Track trap_fall_rate per session. This is the #1 differentiator vs every competitor. Must ship BEFORE paywall goes live so Pro tier has clear value.
- [ ] [STRATEGIC] Smart retry per topic — replace current retryWrong() (retries ALL wrong) with per-topic drill. When parent taps a red topic in 各單元表現, generate a new mini-exam for THAT topic only. This is the natural action after seeing the diagnostic.
- [ ] [STRATEGIC] Smart practice auto-generate — after 3+ sessions, auto-suggest "Your weakest topic is 分數的加減. Practice now?" on the home screen. Uses aggregated topic_breakdown data across sessions. This is the bridge between diagnostic (passive) and remediation (active).
- [ ] [STRATEGIC] Future tables: student_profiles, content_bank, subscriptions — design and create Supabase tables BEFORE Phase 5 needs them. student_profiles enables multi-child. content_bank enables AI-as-Factory storage. subscriptions enables paywall state checking. Ship the schema now, wire the UI in Phase 5.

### Question Generator (3-Layer Engine)
- [ ] AI Generator Advanced (DeepSeek R1):
  - R1 for complex multi-step problems (P5-P6 challenge mode)
  - R1 for exam mimicking feature (user uploads real exam paper → AI generates similar questions with different numbers/contexts)
  - Cost: ~$0.55/M input, ~$2.19/M output — justify with premium subscription revenue
  - Same validation pipeline as V3.2, but stricter for multi-step (verify each solution step)
- [ ] Model routing logic:
  - Simple 應用題 → V3.2 (cheap, fast)
  - Complex multi-step / challenge → R1 (reasoning needed)
  - Exam mimicking → R1 (must understand paper structure)
  - Basic calc/fill → Layer 1 only (no AI needed)
- [ ] Exam mimicking feature (Premium):
  - User uploads photo of real exam paper
  - R1 analyzes: question types, topics, difficulty, structure
  - Generates N similar-but-original questions
  - Matches exam format (sections, scoring, layout)
- [ ] Question Bank flywheel optimization:
  - Bank should have 30,000-50,000+ verified questions
  - AI costs dropping as Bank serves majority of requests
  - Monthly context refresh in contexts.js (trending HK topics, seasonal)
  - Target: <$5/month AI cost even at 5,000+ users


## Phase 5: Monetization (Subscription)


- [ ] Define free vs paid feature split
- [ ] Stripe or RevenueCat integration
- [ ] Paywall UI (gate premium features)
- [ ] Family plan (multiple child profiles under one parent account)
- [ ] Receipt validation (server-side)
- [ ] Trial period logic
- [ ] [STRATEGIC] Pricing tiers — Free / Pro HKD 48 per month (HKD 388/yr) / Family HKD 78 per month (HKD 628/yr). Free = 3 quizzes/day, basic topics, no PDF, no diagnostic. Pro = unlimited, all topics, trap items, PDF, full 各單元表現, progress history. Family = Pro + up to 3 children + cross-child comparison.
- [ ] [STRATEGIC] Paywall trigger points — implement exactly 3 gates: (1) Free user completes exam → sees blurred 各單元表現 → "Unlock detailed topic analysis 🔒", (2) Free user hits 3 daily quiz limit → "Upgrade for unlimited practice 🔒", (3) Free user taps PDF export → "Pro members can print exams 🔒". These are the ONLY 3 conversion moments. Do not add more.
- [ ] [STRATEGIC] 各單元表現 as #1 paywall hook — the per-topic diagnostic is the single highest-value feature for parents. Free users see their overall score. Pro users see the full color-coded topic breakdown sorted worst-first. This is what tutors charge HKD 300-500/hr to tell parents manually. The paywall message must communicate: "See exactly where your child needs help" — not "unlock more features." Sell the INSIGHT, not the tool.


## Phase 6: Growth


- [ ] Referral system (invite code, reward)
- [ ] Leaderboard (school / district / global)
- [ ] Weekly challenge (curated exam, time-limited)
- [ ] Parent dashboard (view child progress, set goals)
- [ ] Teacher mode (assign exams, view class stats)
- [ ] Push notifications (streak reminders, challenge alerts)
- [ ] Social sharing (score cards, achievements)
- [ ] [STRATEGIC] Viral Loop #2: 各單元表現 screenshot sharing — build a "Share Report" button on the results screen that generates a clean, branded image (Curlboo + topic breakdown + score + date). Parents share this to WhatsApp groups organically because it proves they invest in their child's education. Other parents see it and ask "what app is this?" This is the highest-ROI growth channel because parents do the marketing for you. Design the share image to include the app name and a QR code.
- [ ] [STRATEGIC] Weekly progress email to parents — automated email every Sunday showing: topics practiced this week, improvement vs last week, weakest topic with "practice now" deep link, and Curlboo encouragement. Powered by aggregating topic_breakdown JSONB across that week's exam_sessions. This is the #1 retention mechanism — parents who see progress STAY subscribed. Use Supabase Edge Functions + Resend or Postmark.
- [ ] [STRATEGIC] Student improvement case study — once 50+ users have 4+ weeks of data, query topic_breakdown trends to find 1 real student whose weakest topic improved significantly. Package as: "小明's 分數 score went from 20% to 75% in 4 weeks using Maths Quests." This becomes the hero story for pitch deck slide 5, App Store screenshots, and IG content. MUST have before fundraise.
- [ ] [STRATEGIC] AI-as-Factory architecture documentation — document the core innovation: AI generates content ONCE, stores in content_bank table, serves FOREVER at $0. This is NOT AI-as-service (pay per query). Draw the diagram: Input → AI generates → Store in Supabase → Serve from DB. Include the compounding cost model. This doc is for investors and future team members to understand WHY the architecture matters.
- [ ] [STRATEGIC] AI cost model implementation — when AI generation layer is added, enforce this rule: every AI-generated question MUST be saved to content_bank before serving. Never call AI twice for the same content pattern. Target cost curve: Month 1 = ~$50/mo (generating seed content), Month 6 = ~$10/mo (mostly serving stored), Month 12 = ~$0/mo (full library built). Track actual_ai_cost_per_quiz as a KPI. This is the economic moat — competitors who use AI-as-service pay per query forever.
- [ ] [STRATEGIC] Cognitive fingerprint data moat — document and communicate that topic_breakdown JSONB collected across all users is the company's most valuable asset. After 10K+ sessions, this dataset reveals: which topics are hardest by grade, which trap types fool the most students, how long mastery takes per topic, and seasonal difficulty patterns. This anonymized data becomes the B2B product for school licensing. Protect it. Back it up. Never delete it.
- [ ] [STRATEGIC] topic_breakdown JSONB as strategic asset — every product decision should ask "does this create more topic_breakdown records?" More records = richer cognitive fingerprints = better AI recommendations = stronger moat. When evaluating new features, prioritize ones that generate MORE exam sessions (and therefore more topic_breakdown data) over features that are flashy but don't produce data. This is the flywheel: more data → better recommendations → more engagement → more data.


---


## Appendix: Question Generator — 3-Layer Architecture

The question generation system has 3 layers:
- **Layer 1: Hardcode Engine** — 217 generators, instant, offline, free, already built
- **Layer 2: AI Generator** — DeepSeek V3.2 for basic, R1 for complex/exam-mimicking
- **Layer 3: Question Bank** — Supabase table, reuses questions across students, self-improving quality score

The flywheel: **More Users → More Questions in Bank → Less AI Cost Per User → Better Margins**


### Cost Projection

| Users   | Bank Qs  | AI Calls/mo | AI Cost/mo | Cost/User |
|---------|----------|-------------|------------|-----------|
| 100     | 2,000    | ~500        | ~$0.70     | $0.007    |
| 1,000   | 8,000    | ~2,000      | ~$2.80     | $0.003    |
| 5,000   | 30,000   | ~3,000      | ~$4.20     | $0.001    |
| 20,000  | 50,000+  | ~1,000      | ~$1.40     | $0.00007  |

AI cost DROPS as question bank GROWS. This is the structural cost advantage.


### Model Selection Guide

| Task | Model | Cost | Why |
|------|-------|------|-----|
| Basic 應用題 generation | DeepSeek V3.2 | $0.14/$0.28 per M tokens | Cheap, fast, good enough |
| Complex multi-step (P5-P6) | DeepSeek R1 | $0.55/$2.19 per M tokens | Needs reasoning chain |
| Exam paper mimicking | DeepSeek R1 | $0.55/$2.19 per M tokens | Must understand structure |
| Basic calc/fill questions | Layer 1 Hardcode | $0 | No AI needed |
| Answer validation | Layer 1 chkAns | $0 | Computational, not AI |