# CLAUDE.md — Maths Quests

## Project
HK primary school maths exam app (P1-P6). Brand: OneUp24 / Curlboo Bear mascot.
React 19 + Vite 8 + Tailwind 4 + Supabase + Capacitor (iOS).

## Quick reference
- `pnpm dev` — start dev server
- `pnpm build` — production build to dist/
- `pnpm preview` — preview production build
- `pnpm dev` runs on port 5175 (strictPort — won't auto-increment)
- Main branch: `main` (supabase-auth merged)

## Architecture
- **Monolithic SPA** — all routing + state in `src/App.jsx` via useState + `view` variable
- **Question engine** — `src/lib/engine.js` (~1000+ lines, ~600+ procedural generators)
- **Auth** — `src/hooks/useAuth.js` wraps Supabase; guest mode supported
- **Cloud** — `src/services/api.js` saves exam results to Supabase `exam_sessions` table
- **i18n** — `src/lib/i18n.js`, use `t(lang, key)` — always support both zh and en
- **Sounds** — `src/lib/sounds.js` via Web Audio API

## Key files
| File | What |
|------|------|
| `src/App.jsx` | Main app: routing, exam UI, state, marking |
| `src/lib/engine.js` | Question generators, exam builder, answer checker |
| `src/hooks/useAuth.js` | Supabase session management |
| `src/services/api.js` | Cloud save/load operations |
| `src/pages/Login.jsx` | Auth page |
| `src/Profile.jsx` | Settings, stats, PIN |
| `src/Onboarding.jsx` | Welcome wizard |
| `supabase/setup.sql` | Database schema |

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

## Docs
- `docs/CHANGELOG.md` — commit history and features
- `docs/CONTEXT_PRIMER.md` — architecture deep dive
- `docs/MASTER_PLAN_v2.md` — dev roadmap
