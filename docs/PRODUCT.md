# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: prospective supervisors, research collaborators, and technical peers evaluating Xiaoyan's research direction, rigor, and collaboration fit.
- Secondary: recruiters, fellow graduate students, and readers who want to understand the work, methods, writing, and life beyond research.
- Visitors typically scan the homepage first, then open a focused project, publication, capability, experience, or personal-detail route for evidence.

## Product Purpose

This is Xiaoyan's multi-page official personal website. It presents a coherent research identity, routes visitors to detailed evidence, and keeps research, outputs, experience, knowledge, and life content distinct rather than expanding everything on one homepage.

Success means a visitor can understand the research focus within the first viewport, reach any major module or detail page without friction, and distinguish verified facts from placeholders.

## Positioning

The site connects a specific industrial context, copper electrowinning and electrolyte purification, with process modeling, surrogate models, multi-objective optimization, safe reinforcement learning, explainable machine learning, and causal machine learning. Its defining position is the path from understanding a process to making decisions that are reliable, explainable, and bounded by evidence.

## Operating Context

- Public responsive website used on desktop and mobile.
- Content is organized as a homepage overview, module landing pages, index pages, and independent detail routes.
- Research visitors move between problem framing, methods, evaluation boundaries, outputs, and related capabilities.
- The site is deployed through OpenAI Sites and uses the existing public project configured in `.openai/hosting.json`.

## Capabilities and Constraints

- Existing Vinext App Router application with React 19 and TypeScript.
- Fixed module routes and data-driven project, knowledge, animation-review, annual-recommendation, and watch-archive detail routes are implemented.
- Native document-navigation anchors are a production compatibility requirement; do not replace them with `next/link`.
- The header's keyboard, focus-restoration, mobile-dialog, body-scroll-lock, and responsive state behavior must be preserved.
- Existing route slugs, primary navigation labels, metadata model, and sitemap are stable contracts.
- Content is static and does not currently require D1 or R2.
- Public name, affiliation, city and three platform links are verified in `app/_data/profiles.ts`. Formal education dates, department, adviser, publication details, DOI, award evidence, project metrics, email and a verified portrait remain pending.

## Current visual direction

The Celestial Atlas redesign uses an astronomical homepage, a cinematic animation section and daylight-led life pages, with a shared accessible navigation and motion controls. `docs/CELESTIAL_REDESIGN.md` supersedes older visual restrictions while preserving evidence and navigation contracts.

## Brand Commitments

- Name: 小闫 / XIAOYAN.
- Identity: master's student and industrial-intelligence researcher.
- Voice: direct, precise, calm, professional Chinese with restrained English utility labels only where they aid navigation or technical meaning.
- Core idea: move from complex industrial processes to trustworthy decisions.
- Do not fabricate scale, impact, awards, publications, affiliations, or performance claims for visual effect.

## Evidence on Hand

- `app/_data/site.ts`: identity, navigation hierarchy, focus areas, and confirmed research framing.
- `app/_data/content.ts`: project themes, capabilities, education and experience placeholders, honors, knowledge, thoughts, life records, and the animation-review archive.
- `app/_data/animation/`: extracted annual recommendations, original review text, 2,276-entry watch archive, timeline, poster mappings, and explicit source-boundary notes.
- Existing route templates and metadata cover module and detail pages.
- `public/og-editorial.jpg` is the current 1200×630 social-preview asset; earlier source images remain at their original public URLs for backward compatibility with older shared links.
- No verified portrait, laboratory photography, institution logo, publication cover, award certificate, project dashboard, or measured outcome image is currently available.

## Product Principles

1. Lead with a clear research thesis, then route to evidence.
2. Keep verified facts, research topics, and placeholders visibly distinct.
3. Make complex methods understandable without reducing them to decorative technology language.
4. Give each module a content-appropriate structure instead of repeating one card template.
5. Preserve fast loading, keyboard access, responsive navigation, and readable long-form pages.

## Animation Observatory

- The animation area is an intentional dark editorial sub-brand within the official site, based on the selected cinematic-observatory concept in `docs/animation/design-reference.png`.
- Its landing page only routes visitors onward. Annual recommendations, reviews, the watch archive, and the timeline each have an independent index, with year or article detail routes where the source material is long.
- Recommendations and reviews preserve the original wording. Title-only records state the exact material required, such as a recommendation reason and viewing notes; the site must not invent reviews to fill them.
- Every displayed recommendation and review uses a local poster asset with explicit dimensions, alt text, lazy loading away from the first viewport, and a traceable public source in `docs/animation/poster-sources.json`.
- The starfield is a real generated bitmap asset; orbit positions and timeline nodes are deterministic, chronological, and disabled or simplified under reduced-motion preferences.

## Accessibility & Inclusion

- Target WCAG 2.2 AA for contrast, keyboard interaction, focus visibility, semantic landmarks, and accessible names.
- Interactive targets should be at least 44 by 44 CSS pixels where practical.
- Respect reduced-motion and reduced-transparency preferences.
- Page meaning and current state must never rely on color or animation alone.
