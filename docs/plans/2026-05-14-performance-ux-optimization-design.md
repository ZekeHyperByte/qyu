# Performance & UX Optimization Design

**Date:** 2026-05-14
**Status:** Approved

## Problem

Portfolio feels fast locally but laggy on deployed servers. Root causes:
- Large unused assets (345MB orphaned images, 2.8MB unused .glb files)
- No image optimization pipeline (3MB+ images, no responsive variants)
- Render-blocking Google Fonts via CSS @import
- All components eagerly loaded in single bundle
- 8 unused heavy npm dependencies (React, Three.js, etc.)
- Runtime animation inefficiencies (per-frame GSAP .set() calls, unthrottled mousemove)

## Solution Design

### Phase 1: Clean House

Remove all dead weight:
- Delete `static/images/qyu-*` (345MB, 82 files, zero references)
- Delete `Gundam.png`, `Gundam2.png` (1.3MB, unused variants)
- Delete `card.glb`, `card2.glb` (2.8MB, never imported)
- Delete Nav.svelte, Marquee.svelte, SliderShell.svelte (never mounted)
- Remove react, react-dom, @react-three/*, three, meshline, @gsap/react from package.json
- Remove @vitejs/plugin-react from vite.config.ts
- Remove `assetsInclude: ['**/*.glb']` from vite.config.ts
- Remove react/meshline module declarations from global.d.ts

### Phase 2: Loading Performance

1. **Self-host fonts** — Download Montserrat + Plus Jakarta Sans, subset Latin+Vietnamese, add font-display:swap, preload in app.html <head>
2. **@sveltejs/enhanced-img** — Replace raw <img> with <enhanced:img> for automatic WebP/AVIF + responsive srcset
3. **Lazy-load below-fold components** — Story, Works, About, Footer load via dynamic import() + IntersectionObserver
4. **Preload hero image** — Add explicit <link rel="preload"> for hero Gundam image

### Phase 3: Runtime Smoothness

1. **GSAP import consolidation** — Single gsap core import in layout, pass via Svelte context
2. **ScrollTrigger batch refresh** — Single ScrollTrigger.refresh() call after all sections mount
3. **Footer parallax throttle** — requestAnimationFrame throttle on mousemove handler
4. **CSS content-visibility: auto** — Apply to all below-fold sections
5. **Reduce GSAP .set() calls** — Cache computed values in Works scrub

### UX Improvements

- Add <noscript> fallback message
- Add loading skeleton for lazy-loaded sections
- Apply will-change on hover only (not always), save GPU memory
