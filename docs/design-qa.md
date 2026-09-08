# Design QA — Animation Cinematic Observatory

Date: 2026-08-21
Selected concept: `docs/animation/design-reference.png`
Implementation route: `/life/animation`
Browser: Google Chrome through the installed browser extension

## Visual comparison

- Native desktop viewport: 1488 × 1057.
- Mobile viewport: 390 × 844.
- Combined reference/implementation comparison: `C:/Users/12141/.codex/visualizations/2026/08/16/01a00980-35ae-7002-87a8-1075c6a19047/animation-reference-vs-implementation.png`.
- Desktop implementation capture: `C:/Users/12141/.codex/visualizations/2026/08/16/01a00980-35ae-7002-87a8-1075c6a19047/animation-observatory-desktop-final.png`.
- Mobile implementation capture: `C:/Users/12141/.codex/visualizations/2026/08/16/01a00980-35ae-7002-87a8-1075c6a19047/animation-observatory-mobile.png`.
- Mobile navigation capture: `C:/Users/12141/.codex/visualizations/2026/08/16/01a00980-35ae-7002-87a8-1075c6a19047/animation-mobile-menu-final.png`.

Five-point comparison:

1. Composition: the implementation retains the concept's left year rail, expansive starfield hero, featured review, horizontal review strip, and four module exits. A functional local sub-navigation row was added because the requested result is a multi-page official site.
2. Color: deep navy, cobalt blue, teal, and copper remain closely aligned with the selected concept; borders stay thin and square rather than becoming generic cards.
3. Typography: the oversized Chinese editorial headline, compact monospaced metadata, and restrained body scale match the concept's hierarchy while using production-safe system fonts.
4. Assets: the orbit field uses a real generated bitmap, and the concept poster placeholders were replaced with traceable real work posters. The different EVA poster is intentional and content-correct.
5. Density and motion: the first viewport is slightly taller because it contains the real global and local navigation plus authentic longer copy. Motion is restrained, deterministic, and disabled under reduced-motion preferences.

## Copy and source fidelity

- 54 annual recommendations from 2017–2025 are rendered; every source title is preserved and every item has a local poster.
- All 16 public review routes render original or previously confirmed text and real local posters. The two collection reviews use three-poster editorial compositions.
- The complete 2,276-entry master watch archive is split across 2019–2026 plus an undated group; the browser-verified total is exactly 2,276.
- Title-only records directly state that recommendation reasons and viewing notes are required; no missing review was invented.
- Hathaway exposes only the confirmed 2025 text and excludes candidate/AI-assisted drafts.

## Interaction and responsive QA

- Clicked and verified all four animation module links.
- Clicked and verified all nine annual recommendation buttons; browser counts sum to 54 and poster count equals entry count for every year.
- Clicked and verified all 16 review buttons; every detail page has a non-empty heading, at least one real poster, and no fallback poster.
- Clicked and verified all nine archive group buttons; counts sum to 2,276.
- Verified all six desktop mega-navigation toggle buttons.
- Verified the mobile menu, scroll lock, Escape close path, and all six mobile group toggles. Three pointer checks were obstructed by the user's Immersive Translate overlay, then passed through the same controls with keyboard activation; this was confirmed as a browser-extension overlay rather than site code.
- Verified all four module routes at 390 px with no horizontal document overflow.
- Chrome console errors and warnings: 0.

## Automated verification

- `npm run lint`: passed with 0 warnings/errors.
- `npm test`: passed, 17/17 tests.
- Production build: passed, including fixed and dynamic animation routes.
- Internal server-rendered link resolver: passed, with no 404 links.

## Asset generation record

- Built-in ImageGen mode was used for the decorative orbit field.
- Prompt: “Derive a clean standalone deep navy sparse starfield with one thin copper orbital trajectory, no text, no UI, no posters, no characters, a stronger star cluster on the right and generous negative space on the left.”
- Production asset: `public/images/animation/cinematic-orbit-background.webp` (1536 × 1024, optimized WebP).

## Issues found and corrected during Chrome QA

- Increased dark-header brand text contrast.
- Rebuilt the mobile navigation drawer as one coherent dark surface; removed the mixed light/dark panel state.
- Improved the undated archive page title to “未标注时间的番剧总表”.

final result: passed
