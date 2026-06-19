# DESIGN.md — nagizaaz.vercel.app

Spec for the portfolio of Nagizaaz Shaik (AI / LLM Engineer). Reference: samanastudio.es (dark cinematic editorial). Interaction tier: **L3 — immersive**.

## 1. Visual Theme & Atmosphere
Cinematic dark luxury. Warm near-black canvas, editorial serif, restrained champagne-gold accent, generous negative space, slow film-grade motion. One-liner: *"A quiet, expensive room where the work speaks."* Keywords: editorial, atmospheric, precise, warm-dark, unhurried.

## 2. Color Palette & Roles
```css
--color-bg:    #0a0a0b;  /* rgb(10,10,11)   canvas */
--color-bg2:   #101012;  /* rgb(16,16,18)   alt section */
--color-bg3:   #16161a;
--color-ink:   #f0ece4;  /* rgb(240,236,228) display text */
--color-text:  #e8e3d9;  /* body */
--color-muted: #9a948a;  /* rgb(154,148,138) secondary */
--color-faint: #6b665e;
--color-accent:  #c8b08a; /* rgb(200,176,138) champagne gold */
--color-accent2: #d9c4a0;
--color-accent3: #b59b73;
--color-border:  rgba(240,236,228,0.12);
--live: #4ade80;          /* live-repo LED only */
```
Gold = accent/hover/eyebrows only (never large fills). Green reserved for the live-status LED.

## 3. Typography Rules
- Display/serif: **Fraunces** (Google Fonts, opsz 9–144, wght 300–600) — italic for emphasis.
- Body/UI: system sans (`-apple-system, "Helvetica Neue", Arial`).
- Mono: JetBrains Mono (eyebrows, labels).
- Scale: hero `clamp(3.6rem,13vw,12rem)`/wght 340; H2 `clamp(2.4rem,7vw,6rem)`; body 1–1.18rem/line-height 1.7.
- Banned: Inter, Roboto, Arial-as-display, system serif for headlines.

## 4. Component Stylings
Buttons/links: editorial underline CTAs — default `1px var(--color-border)`; hover → border+text gold, arrow translateX; focus-visible ring. Cards: `--color-surface` + gold spotlight `::before` tracking `--mx/--my` on hover, lift `translateY(-6px)`. Nav: fixed, translucent dark `rgba(10,10,12,0.62)` + blur. Tags/pills: hairline border, muted text. All states (default/hover/active/focus/disabled) inherit tokens.

## 5. Layout Principles
Max content 1100–1400px, section padding `clamp(8rem,16vw,16rem)`. Asymmetric editorial: text-left, 3D-right hero. Grids use `auto-fill minmax()` (self-collapsing). Radius 4–8px (sharp/editorial).

## 6. Depth & Elevation
Flat-but-atmospheric: depth via the 3D crystal, gold spotlight glows, and soft shadows `0 30px 80px -30px rgba(0,0,0,0.8)`. No heavy borders. `backdrop-filter` ≤ 20px, used sparingly.

## 7. Animation & Interaction (L3)
Lenis smooth scroll · GSAP ScrollTrigger reveals/parallax/grow · scroll-pinned word-reveal manifesto · scroll-fade hero · R3F gold-crystal centerpiece (1 WebGL scene, reduced-motion off) · custom lagging cursor · magnetic CTAs · kinetic marquee · ClickSpark · live-LED pulse. All gated by `prefers-reduced-motion`.

## 8. Do's and Don'ts
**Do:** lead with serif scale; keep gold scarce; one WebGL scene max; slow eases (0.22,1,0.36,1); respect reduced-motion; CSS vars for every color.
**Don't:** ❌ purple/violet (it's gold now) ❌ memoji/cartoon avatars ❌ stark white sections ❌ external HDRI fetches (CSP) ❌ blur on moving elements ❌ >1 WebGL scene ❌ emoji as UI icons ❌ hardcoded hex in components.

## 9. Responsive Behavior
Breakpoints 700/768px. Hero stacks; 3D dims to 40% on mobile; custom cursor + ClickSpark auto-off on touch (`hover:hover` gate); grids collapse via auto-fill; nav links hide < 768px; no horizontal overflow; touch targets ≥ 44px.
