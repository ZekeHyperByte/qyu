# Mobile Responsiveness Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove desktop-only restriction and implement full mobile support at 390px breakpoint with identical quality to desktop.

**Architecture:** Progressive enhancement approach leveraging existing responsive classes. Remove MobileNotice blocker, adjust component layouts for mobile viewports, disable desktop-only interactions (3D mouse tilt), optimize typography widths for readability.

**Tech Stack:** SvelteKit, TailwindCSS v4, GSAP + ScrollTrigger, Lenis smooth scroll

---

## Task 1: Remove Mobile Blocker

**Files:**
- Delete: `src/lib/components/editorial/MobileNotice.svelte`
- Modify: `src/routes/+page.svelte:1-18`

**Step 1: Remove MobileNotice import and usage**

Open `src/routes/+page.svelte` and remove:

```svelte
<script lang="ts">
  import Hero from '$lib/components/editorial/Hero.svelte';
  import Story from '$lib/components/editorial/Story.svelte';
  import Works from '$lib/components/editorial/Works.svelte';
  import About from '$lib/components/editorial/About.svelte';
  import Footer from '$lib/components/editorial/Footer.svelte';
</script>

<div class="bg-surface text-on-surface w-full" style="overflow-x: clip;">
  <Hero />
  <Story />
  <Works />
  <About />
  <Footer />
</div>
```

**Step 2: Delete MobileNotice component file**

```bash
rm src/lib/components/editorial/MobileNotice.svelte
```

**Step 3: Verify in browser**

- Open http://localhost:5173 on mobile viewport (resize browser to 390px width)
- Expected: No "Desktop Only" notice, content visible
- Check: `document.body.style.overflow` should not be 'hidden'

**Step 4: Commit**

```bash
git add src/routes/+page.svelte
git rm src/lib/components/editorial/MobileNotice.svelte
git commit -m "feat: remove desktop-only restriction for mobile responsiveness"
```

---

## Task 2: Hero Mobile Optimization

**Files:**
- Modify: `src/lib/components/editorial/Hero.svelte:40-81`

**Step 1: Adjust Gundam positioning for mobile**

Modify the Gundam image container at line 43-55:

```svelte
<!-- Gundam artwork -->
<div
  bind:this={gundamEl}
  style="opacity: 0;"
  class="absolute right-0 top-0 bottom-0 h-full pointer-events-none z-0 mix-blend-luminosity opacity-40 md:opacity-40 opacity-20"
>
  <img
    src="/Gundam3.png"
    alt="Gundam Art"
    class="h-full w-auto object-contain object-right scale-90 md:scale-100"
    fetchpriority="high"
    loading="eager"
  />
</div>
```

Changes:
- Add `opacity-20` for mobile (reduced from 40% for less distraction)
- Add `md:opacity-40` for tablet/desktop
- Add `scale-90 md:scale-100` to reduce Gundam size slightly on mobile

**Step 2: Verify heading readability**

The heading already has responsive sizing:
- `text-[3.5rem]` (56px) on mobile
- `sm:text-[5rem]` (80px) on small screens
- `lg:text-[7rem]` (112px) on large screens
- `xl:text-[8rem]` (128px) on extra-large

Check at 390px viewport:
- Text should be readable
- No overlap with Gundam image
- Proper line spacing

**Step 3: Adjust container padding if needed**

Line 40 already has:
- `px-8` (32px padding) on mobile
- `lg:px-10` (40px) on large
- `xl:px-20` (80px) on extra-large

This should be adequate. If text touches edges at 390px, consider:
- `px-6 sm:px-8 lg:px-10 xl:px-20`

**Step 4: Test on mobile viewport**

- Resize browser to 390px width
- Check Gundam doesn't overlap heading text
- Verify text is readable
- Ensure animations still trigger on scroll into view

**Step 5: Commit**

```bash
git add src/lib/components/editorial/Hero.svelte
git commit -m "feat(hero): optimize gundam positioning for mobile viewports"
```

---

## Task 3: Story Width Adjustment

**Files:**
- Modify: `src/lib/components/editorial/Story.svelte:49`
- Modify: `src/lib/components/editorial/Story.svelte:58-60` (CSS)

**Step 1: Adjust container width for mobile**

Change line 49 from:
```svelte
<p class="story-text max-w-[50vw]">
```

To:
```svelte
<p class="story-text max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw]">
```

This provides:
- 90% width on mobile (< 640px)
- 70% width on small tablets (640px+)
- 50% width on medium+ screens (768px+)

**Step 2: Adjust base font size for mobile**

In the `<style>` section (lines 57-60), change:

```css
.story-text {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.8vw, 1.6rem);
}
```

Changes:
- Reduce minimum from `1.1rem` to `0.95rem` for better mobile readability
- Kept `1.8vw` for fluid scaling
- Kept `1.6rem` maximum

**Step 3: Test text readability**

- Resize browser to 390px width
- Check text width is ~351px (90% of 390px)
- Verify text doesn't wrap excessively
- Ensure words are readable (not too small)

**Step 4: Test animation performance**

- Scroll to Story section
- Verify word-by-word animation triggers
- Check animation is smooth on mobile
- Ensure no janky performance during scroll

**Step 5: Commit**

```bash
git add src/lib/components/editorial/Story.svelte
git commit -m "feat(story): optimize text width and sizing for mobile readability"
```

---

## Task 4: About Section Verification

**Files:**
- Verify: `src/lib/components/editorial/About.svelte`

**Step 1: Check headline sizing**

The About component uses SplitType for headline text. Verify at 390px:
- Headline should be readable
- Not too large for viewport
- Gradient text on "SURFACE" should work

If headline is too large at 390px, look for where `.about-headline` is styled and add responsive sizing.

**Step 2: Check scramble animation**

The scramble text effect (lines 12-33) should work on mobile:
- No mobile-specific adjustments needed
- Verify animation is smooth
- Check performance on scroll trigger

**Step 3: Check padding and spacing**

The section uses (line 47):
```svelte
class="min-h-screen flex flex-col justify-center py-32 lg:py-48 px-8 lg:px-10 xl:px-20 bg-[#0c0c0b]"
```

- `py-32` (128px) on mobile
- `px-8` (32px) on mobile
- This should be adequate

**Step 4: Test on mobile viewport**

- Resize to 390px
- Scroll to About section
- Verify headline animation triggers
- Check text is readable
- Ensure proper line breaks

**Step 5: If adjustments needed, commit changes**

If no changes needed:
```bash
git commit --allow-empty -m "test(about): verify mobile responsiveness"
```

If changes made:
```bash
git add src/lib/components/editorial/About.svelte
git commit -m "feat(about): optimize typography for mobile"
```

---

## Task 5: Footer 3D Tilt Mobile Fix

**Files:**
- Modify: `src/lib/components/editorial/Footer.svelte:4-57`

**Step 1: Add mobile detection**

Add at the top of the script after imports (line 7):

```svelte
<script lang="ts">
  import { lenisStore } from '$lib/stores/lenis';
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  export let isActive = false;

  let footerEl: HTMLElement;
  let layer2El: HTMLElement;
  let isMobile = false;

  function scrollToTop() {
    const lenis = $lenisStore;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (isMobile) return; // Skip on mobile
    if (!footerEl || !layer2El) return;
    const rect = footerEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 24;
    const rotateX = (0.5 - y) * 16;

    gsap.to(layer2El, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true
    });
  }

  function handleMouseLeave() {
    if (isMobile) return; // Skip on mobile
    if (!layer2El) return;
    gsap.to(layer2El, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  }

  onMount(() => {
    isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      footerEl.addEventListener('mousemove', handleMouseMove);
      footerEl.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onDestroy(() => {
    if (!isMobile) {
      footerEl?.removeEventListener('mousemove', handleMouseMove);
      footerEl?.removeEventListener('mouseleave', handleMouseLeave);
    }
  });
</script>
```

**Step 2: Test 3D tilt behavior**

Desktop (> 768px):
- Mouse over footer
- Layer 2 image should tilt
- Mouse leave should reset tilt

Mobile (< 768px):
- Touch footer
- No tilt should occur
- Image remains static

**Step 3: Verify footer layout on mobile**

The footer already has responsive classes:
- `p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10`
- `text-[clamp(5rem,min(12vw,15vh),14rem)]`
- `text-[10px] md:text-[11px]`

Verify at 390px:
- Text is readable
- Social icons are tappable (44px touch target)
- "Top" button is tappable
- Layout doesn't overflow

**Step 4: Test smooth scroll to top**

- Tap "Top" button (↑)
- Should trigger `scrollToTop()`
- Verify Lenis smooth scroll works on mobile

**Step 5: Commit**

```bash
git add src/lib/components/editorial/Footer.svelte
git commit -m "feat(footer): disable 3D tilt effect on mobile devices"
```

---

## Task 6: Marquee Responsive Enhancement (Optional)

**Files:**
- Modify: `src/lib/components/editorial/Marquee.svelte:8-24`

**Step 1: Add intermediate responsive text sizes**

Change all instances of:
```svelte
<span class="font-headline text-5xl lg:text-6xl ...">
```

To:
```svelte
<span class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl ...">
```

This provides:
- `text-3xl` (1.875rem/30px) on mobile
- `sm:text-4xl` (2.25rem/36px) on small screens
- `md:text-5xl` (3rem/48px) on medium screens
- `lg:text-6xl` (3.75rem/60px) on large screens

**Step 2: Test readability**

- Resize to 390px
- Text should be readable
- Not too large to overflow viewport
- Marquee animation still smooth

**Step 3: Commit**

```bash
git add src/lib/components/editorial/Marquee.svelte
git commit -m "feat(marquee): add progressive text sizing for mobile"
```

---

## Task 7: Global Mobile CSS Optimizations

**Files:**
- Modify: `src/app.css:290` (append to end)

**Step 1: Add mobile-specific CSS optimizations**

Append after the last line (line 290):

```css

/* ── Mobile Optimizations ─────────────────────────────────────── */
@media (max-width: 767px) {
  /* Improve animation performance on mobile */
  .animate-marquee {
    animation-duration: 45s; /* Slower marquee for mobile readability */
  }
  
  /* Ensure touch targets meet minimum 44x44px */
  button,
  a[role="button"],
  .touch-target {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Reduce GPU-intensive effects on mobile */
  body::before {
    opacity: 0.02; /* Reduce noise overlay opacity */
  }
  
  /* Improve scroll performance */
  .will-change-transform {
    will-change: transform;
  }
  
  /* Ensure text doesn't overflow horizontally */
  h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
}

/* Enhance touch scrolling */
@media (hover: none) and (pointer: coarse) {
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
}
```

**Step 2: Test mobile optimizations**

- Resize to mobile viewport
- Check marquee animation is smooth
- Verify all touch targets are 44px+ (use browser DevTools)
- Ensure no horizontal scroll bars
- Test smooth scrolling feels natural

**Step 3: Verify no regression on desktop**

- Resize to desktop (> 1024px)
- Ensure animations still work
- Check 3D tilt in footer still functions
- Verify noise texture is visible (opacity 0.03)

**Step 4: Commit**

```bash
git add src/app.css
git commit -m "feat(css): add mobile-specific performance optimizations"
```

---

## Task 8: Final Testing & Verification

**Files:**
- No code changes, testing only

**Step 1: Test on mobile viewport (390×844)**

Use browser DevTools to simulate:
- iPhone 12/13/14 (390×844)
- iPhone SE (375×667)

**Testing Checklist:**

1. **Hero Section**
   - [ ] Gundam image visible, doesn't overlap text
   - [ ] Heading text readable
   - [ ] Animation triggers on load
   - [ ] No horizontal overflow

2. **Story Section**
   - [ ] Text width appropriate (not too narrow)
   - [ ] Word-by-word animation smooth
   - [ ] Readable font size

3. **Works Section**
   - [ ] Mobile layout displays correctly (stacked)
   - [ ] ScrollTrigger animations work
   - [ ] Project metadata readable
   - [ ] Touch targets adequate

4. **About Section**
   - [ ] Headline animation triggers
   - [ ] Scramble effect smooth
   - [ ] Text readable

5. **Footer Section**
   - [ ] 3D tilt disabled on mobile
   - [ ] Social icons tappable (44px+)
   - [ ] "Top" button works
   - [ ] Lenis smooth scroll functional
   - [ ] Background images load properly

6. **Marquee Section**
   - [ ] Text readable
   - [ ] Animation smooth

7. **Global**
   - [ ] Lenis smooth scroll works with touch
   - [ ] No horizontal scrollbar
   - [ ] All touch targets 44px+
   - [ ] Animations perform smoothly
   - [ ] No layout shifts during scroll

**Step 2: Test on real device (if available)**

- Deploy to staging/preview URL
- Test on actual mobile device
- Verify performance on 3G/4G network simulation

**Step 3: Test on tablet viewport (768×1024)**

- Verify desktop layout at breakpoint
- Check 3D tilt works at 768px+
- Ensure responsive classes transition correctly

**Step 4: Document any issues**

If issues found:
- Create GitHub issues or notes
- Prioritize for follow-up fixes
- Document workarounds

**Step 5: Final commit (if any fixes needed)**

```bash
git add .
git commit -m "fix(mobile): address responsive issues found in testing"
```

---

## Execution Notes

**Testing Commands:**
```bash
# Run development server
npm run dev

# Build for production (test build)
npm run build
npm run preview

# Type check
npm run check
```

**Viewport Sizes to Test:**
- Mobile: 390×844 (iPhone 12/13/14)
- Mobile: 375×667 (iPhone SE)
- Mobile: 360×800 (Android standard)
- Tablet: 768×1024 (iPad)
- Desktop: 1440×900 (MacBook)

**Key Files Modified:**
1. `src/routes/+page.svelte` - Remove MobileNotice
2. `src/lib/components/editorial/MobileNotice.svelte` - Deleted
3. `src/lib/components/editorial/Hero.svelte` - Gundam positioning
4. `src/lib/components/editorial/Story.svelte` - Width & typography
5. `src/lib/components/editorial/Footer.svelte` - Disable 3D tilt on mobile
6. `src/lib/components/editorial/Marquee.svelte` - Optional responsive text
7. `src/app.css` - Mobile optimizations

**Estimated Time:** 2-3 hours for full implementation and testing

---

## Success Criteria

- [ ] All sections visible and functional at 390px width
- [ ] Text readable throughout (no microscopic text)
- [ ] All animations perform smoothly on mobile
- [ ] Lenis smooth scroll works with touch gestures
- [ ] No horizontal overflow or scroll bars
- [ ] Touch targets meet 44px minimum
- [ ] Background images scale properly
- [ ] Tested on multiple mobile viewport sizes
- [ ] No regressions on desktop/tablet viewports