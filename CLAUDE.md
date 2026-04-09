# CLAUDE.md — Maths Quests

## Project
HK primary school maths exam app (P1-P6). Brand: OneUp24 / Curlboo Bear mascot.
React 19 + Vite 8 + Tailwind 4 + Supabase + Capacitor (iOS).
Current version: **v1.2-beta** — live on Vercel.

## Quick reference
- `pnpm dev` — start dev server
- `pnpm build` — production build to dist/
- `pnpm preview` — preview production build
- `pnpm dev` runs on port 5175 (strictPort — won't auto-increment)
- Main branch: `main` (supabase-auth merged)
- Deployed: Vercel (production)

## Architecture
- **Monolithic SPA** — routing + state in `src/App.jsx` (~426 lines) via useState + `view` variable
- **15+ extracted components** — `src/components/{ui,home,settings,exam,modals}/`
- **Question engine** — `src/lib/engine.js` (~1000+ lines, ~600+ procedural generators)
- **Design system** — `src/lib/colors.js` (grade/category/difficulty colors), `src/lib/animations.js` (shared Framer Motion variants)
- **Onboarding** — `src/Onboarding.jsx` — 6-step "hook before ask" flow (runs BEFORE auth)
- **Auth** — `src/hooks/useAuth.js` wraps Supabase; guest mode supported
- **Cloud** — `src/services/api.js` saves exam results to Supabase `exam_sessions` table
- **i18n** — `src/lib/i18n.js`, use `t(lang, key)` — always support both zh and en
- **Sounds** — `src/lib/sounds.js` via Web Audio API
- **Analytics** — `src/lib/track.js` — fire-and-forget Supabase insert, 9 events (no third-party)

## Key files
| File | What |
|------|------|
| `src/App.jsx` | Main app: routing, exam UI, state, marking |
| `src/lib/engine.js` | Question generators, exam builder, answer checker |
| `src/hooks/useAuth.js` | Supabase session management |
| `src/services/api.js` | Cloud save/load operations |
| `src/pages/Login.jsx` | Auth page (returning users only) |
| `src/Profile.jsx` | Settings, stats, PIN |
| `src/Onboarding.jsx` | 6-step onboarding (lang→value→grade→question→result→auth) |
| `src/lib/colors.js` | Grade/category/difficulty color tokens |
| `src/lib/animations.js` | Shared Framer Motion variants |
| `src/components/` | 15+ extracted components (ui, home, settings, exam, modals) |
| `src/lib/track.js` | Event tracking (fire-and-forget Supabase insert) |
| `src/components/ExportPDFButton.jsx` | PDF exam report export |
| `supabase/setup.sql` | Applied RLS policies (documentation only) |

## Conventions
- All UI strings must be bilingual (zh + en) via i18n
- localStorage for offline persistence; Supabase for cloud (authenticated only)
- Parent PIN (4-digit) protects answer reveal during exams
- Guest mode = full features minus cloud sync and print
- Question generators are pure functions returning `{d, tp, q, a, sc, ...}`
- Answer checker `chkAns()` handles units, fractions, multi-part, tolerance
- Mascot mood: happy (>=80%), ok (50-79%), sad (<50%)

## Do NOT
- Break guest mode — app must work without auth
- Add questions without matching HK EDB curriculum
- Hardcode Chinese-only strings — always use i18n
- Modify engine.js question format without updating chkAns + marking logic in App.jsx

## Business Context
- Brand mascot: Curlboo Bear (emotional IP layer)
- Key differentiator: "Trap Item Training" system
- Revenue model: Freemium → subscription
- See full business plan: github.com/oneup24/Oneup24 (private)

## App Flow
1. Onboarding (first time): language → value splash → grade → try question → result → auth gate
2. Login (returning users only, if not signed in)
3. Home → Settings → Exam → Results → Profile

## Docs
- `docs/CHANGELOG.md` — commit history and features
- `docs/CONTEXT_PRIMER.md` — architecture deep dive
- `docs/MASTER_PLAN_v3.md` — dev roadmap (current)
