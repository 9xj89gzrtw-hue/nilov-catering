<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NiloV Catering — project context

Hermes Project. Premium catering site. Operator: ИП Нилов Дмитрий Игоревич (brand NiloV Catering / nilov-catering.ru). Do NOT use legacy "ООО Интерфуд" / "Интерфуд Кейтеринг" strings — they are WRONG.

## Verified stack
- Next.js 16.2.10 + React 19.2.4 + TypeScript
- Tailwind CSS 4
- framer-motion ^12.42.2, lenis ^1.3.25 (smooth scroll)
- zod ^4.4.3 (validation)
- @react-pdf/renderer (PDF generation)
- shadcn/ui ^4.13.0 (components)
- pnpm (package manager)
- framer-motion ^12 (animations) + lenis ^1.3 (smooth-scroll, gated by prefers-reduced-motion)

## Build / dev
- `pnpm i` then `pnpm dev` to run.
- `node_modules/` (≈599M) and `.next/` (≈318M) are safe to delete and rebuild — do not treat as precious.
- Run `pnpm build` / typecheck before declaring a change done.

## Agent behavior rules (user corrections — apply in every session)
- FIX errors before moving on. Never claim a visual/quality verdict ("premium", "looks good") without actually seeing output — show file/screenshot via MEDIA or verify code.
- ALWAYS web-search FIRST for how others solved a problem (config, bug, optimization, model choice) before improvising.
- On "каждый / все / каждый блок" requests: cover EVERY item in the enumerated set with real work. Enumerate the full list from the source doc first (e.g. 04_BLOCKS.md), then web_search+extract per item. Do NOT cherry-pick only headline blocks.
- User distrusts agent self-assessment — prefer honest low verdicts; enforce separate critic (diff model, no self-scoring) + objective metrics (Lighthouse/CWV/axe) + fixed-weight rubric.
