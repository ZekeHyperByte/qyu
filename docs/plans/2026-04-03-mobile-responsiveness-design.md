# Mobile Responsiveness Design

**Date:** 2026-04-03  
**Status:** Approved  
**Priority:** Essential - same quality as desktop  

## Overview

Remove desktop-only restriction and implement full mobile support for the editorial portfolio, maintaining all animations, background imagery, and typography quality at 390px breakpoint (modern iPhones).

## Current State

### Already Mobile-Optimized Components
- **Works.svelte**: Complete mobile implementation with `isMobile` detection, separate ScrollTrigger logic, responsive classes
- **Footer**: Responsive padding and text sizing `p-3 sm:p-5 md:p-6 lg:p-8`
- **Hero**: Progressive typography `text-[3.5rem] sm:text-[5rem] lg:text-[7rem]`
- **Lenis**: Smooth scroll configured with `touchMultiplier: 2`
- **Typography**: Uses `clamp()` and `vw` units for fluid scaling

### Components Requiring Modification
- **MobileNotice.svelte**: Currently blocks mobile access (< 768px)
- **Hero.svelte**: Gundam background image needs mobile positioning
- **Story.svelte**: Container width `max-w-[50vw]` too narrow on mobile
- **About.svelte**: Typography/layout verification needed
- **Footer.svelte**: 3D tilt effect (mousemove) needs touch alternative

## Design Decisions

### Navigation Strategy
**Decision:** Keep current nav-less approach  
**Rationale:** Users scroll through sections naturally. No section jumping needed on mobile.

### MobileNotice Component
**Decision:** Remove completely  
**Rationale:** Desktop-only restriction no longer desired. All viewports welcome.

### Footer 3D Tilt Effect
**Decision:** Disable on mobile (< 768px)  
**Rationale:** Mouse-based interaction not applicable to touch. Users won't expect 3D tilt on mobile. Keeps implementation simple.

### Typography Strategy
**Decision:** Progressive enhancement with Tailwind responsive classes and CSS `clamp()`  
**Rationale:** Already implemented throughout. Extend to Story width adjustments.

## Implementation Plan

### Phase 1: Remove Mobile Blocker
- Delete `src/lib/components/editorial/MobileNotice.svelte`
- Remove `<MobileNotice />` from `src/routes/+page.svelte`

### Phase 2: Hero Optimization
- Adjust Gundam positioning for mobile viewports
- Test text-Gundam overlap at 390px
- Consider opacity reduction on mobile

### Phase 3: Story Width
- Change `max-w-[50vw]` to responsive width
- Adjust `clamp()` minimum for mobile readability

### Phase 4: About Verification
- Test scramble animation performance
- Verify headline sizing
- Check padding adequacy

### Phase 5: Footer Touch
- Add mobile detection
- Conditionally disable 3D tilt effect on mobile

### Phase 6: Marquee Enhancement
- Optional: Add intermediate responsive text sizes

### Phase 7: Global Mobile CSS
- Add mobile-specific optimizations to `app.css`
- Ensure touch targets are 44px minimum
- Adjust animation performance

## Quality Criteria

- [ ] All text readable at 390px width
- [ ] GSAP animations perform smoothly on mobile
- [ ] Lenis scroll works with touch gestures
- [ ] Background images (Gundam, footer) scale properly
- [ ] No horizontal overflow
- [ ] Touch targets meet 44px minimum
- [ ] No horizontal scroll issues
- [ ] Tested on iPhone 12/13/14 (390×844)
- [ ] Tested on iPhone SE (375×667)

## Technical Constraints

- Target breakpoint: 390px (modern iPhones)
- Must maintain all existing animations
- Must keep background imagery
- All devices receive full experience (no graceful degradation)
- Build tool: Vite + SvelteKit
- Styling: TailwindCSS v4
- Animation: GSAP + ScrollTrigger
- Smooth scroll: Lenis