# Performance & UX Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce initial load time, eliminate dead weight, and smooth runtime animations for a SvelteKit portfolio deployed on Vercel.

**Architecture:** Three-phase approach — (1) remove 350MB+ of orphaned assets and 8 unused npm dependencies, (2) self-host fonts + implement @sveltejs/enhanced-img for responsive images + lazy-load below-fold components, (3) throttle runtime animations and consolidate GSAP imports.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS v4, GSAP + Lenis, Vercel adapter

---

### Task 1: Delete orphaned qyu-* images and unused PNGs

**Files:**
- Delete: `static/images/qyu-*.png` (41 files)
- Delete: `static/images/webp/` (41 files + directory)
- Delete: `static/Gundam.png`
- Delete: `static/Gundam2.png`
- Delete: `convert_to_webp.sh`

**Step 1: Remove all orphaned images**

```bash
rm -rf static/images/qyu-*.png static/images/webp/ static/Gundam.png static/Gundam2.png convert_to_webp.sh
```

**Step 2: Verify**

```bash
ls static/images/  # should be empty or gone
ls static/Gundam.png static/Gundam2.png  # should fail (no such file)
```

**Step 3: Verify nothing in source references these images**

```bash
grep -r "qyu-" src/  # should return nothing
grep -r "Gundam\.png\|Gundam2\.png" src/  # should return nothing
```

---

### Task 2: Delete unused .glb 3D assets

**Files:**
- Delete: `static/card.glb`
- Delete: `static/card2.glb`

**Step 1: Remove .glb files**

```bash
rm static/card.glb static/card2.glb
```

**Step 2: Verify nothing references them in source**

```bash
grep -r "\.glb" src/  # should return nothing
```

---

### Task 3: Remove unused npm dependencies

**Files:**
- Modify: `package.json:25-39` — remove 8 unused deps

**Step 1: Edit package.json to remove unused dependencies**

Delete these lines from the `"dependencies"` block:
- `"@gsap/react": "^2.1.2",`
- `"@react-three/drei": "^10.7.7",`
- `"@react-three/fiber": "^9.5.0",`
- `"@react-three/rapier": "^2.2.0",`
- `"meshline": "^3.3.1",`
- `"react": "^19.2.4",`
- `"react-dom": "^19.2.4",`
- `"three": "^0.183.2",`

And from `"devDependencies"` delete:
- `"@vitejs/plugin-react": "5.0.0",`

**Step 2: Reinstall to update lockfiles**

```bash
npm install
```

---

### Task 4: Clean vite.config.ts and type declarations

**Files:**
- Modify: `vite.config.ts` — remove react plugin + assetsInclude
- Modify: `src/global.d.ts` — remove unused module declarations

**Step 1: Edit vite.config.ts**

Remove `import react from '@vitejs/plugin-react';` and remove `react()` from plugins array. Remove `assetsInclude: ['**/*.glb']`.

Final vite.config.ts:
```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

**Step 2: Edit src/global.d.ts**

Remove the meshline module declaration, react module declarations, and JSX namespace. Keep only `*.glb` (in case future use) and `*.png`.

Final global.d.ts:
```ts
declare module '*.png';
```

**Step 3: Delete unused components**

```bash
rm src/lib/components/editorial/Nav.svelte
rm src/lib/components/editorial/Marquee.svelte
rm src/lib/components/editorial/SliderShell.svelte
```

**Step 4: Verify build succeeds**

```bash
npm run build
```

Expected: Build succeeds without errors.

---

### Task 5: Self-host fonts with font-display: swap

**Files:**
- Modify: `src/app.css:1` — remove Google Fonts @import
- Create: `static/fonts/` directory structure
- Modify: `src/app.html` — add font preload links

**Step 1: Download Montserrat and Plus Jakarta Sans font files**

Use google-fonts-downloader or manual download. We need:
- Montserrat: weights 300, 400, 500, 600, 700, 800 (normal only)
- Plus Jakarta Sans: weights 300, 400, 500, 600, 700 (normal only)

For now, create the directory:
```bash
mkdir -p static/fonts
```

Download from Google Fonts CDN (Latin subset + Vietnamese extended):
```bash
# Montserrat — all needed weights
curl -L "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" -o /tmp/montserrat.css
# Plus Jakarta Sans — all needed weights
curl -L "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" -o /tmp/plusjakarta.css
```

Extract woff2 URLs and download to `static/fonts/`.

**Step 2: Write @font-face declarations in app.css**

Replace line 1 (`@import url('https://fonts.googleapis.com/...')`) with:

```css
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/montserrat-300.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/montserrat-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/montserrat-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/montserrat-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/montserrat-700.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/montserrat-800.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-300.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-700.woff2') format('woff2');
}
```

**Step 3: Add font preloads in app.html `<head>`**

Add these lines after the viewport meta tag:
```html
<link rel="preload" href="/fonts/montserrat-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin>
```

**Step 4: Verify**

```bash
npm run build && npm run preview
```

Check that fonts load from local /fonts/ path with swap behavior.

---

### Task 6: Install and configure @sveltejs/enhanced-img

**Files:**
- Modify: `package.json` — add `@sveltejs/enhanced-img`
- Modify: `vite.config.ts` — add enhanced-img plugin
- Modify: `src/lib/components/editorial/Footer.svelte` — replace `<img>` with `<enhanced:img>`
- Modify: `src/lib/components/editorial/Works.svelte` — replace project `<img>` tags with `<enhanced:img>`

**Step 1: Install @sveltejs/enhanced-img**

```bash
npm install -D @sveltejs/enhanced-img
```

**Step 2: Add to vite.config.ts**

```ts
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), sveltekit()]
});
```

**Step 3: Move static images that need optimization into src/lib/assets/**

Images referenced in components must be imported (not just referenced by string path) for enhanced-img to work. Move project preview images and footer images:

```bash
mkdir -p src/lib/assets
cp static/atcs-preview.png static/photonic-preview.png static/lawang-bps.png \
   static/seltronik-compro.png static/mediku-preview.png static/footer.jpg \
   static/layer2.png static/Gundam3.png src/lib/assets/
```

**Step 4: Update Footer.svelte to use enhanced:img**

Replace the two `<img>` tags (lines 88-92 and 98-107) with imports and `<enhanced:img>`:

```svelte
<script lang="ts">
  import footerJpg from '$lib/assets/footer.jpg';
  import layer2Png from '$lib/assets/layer2.png';
  // ... rest of script
</script>

<!-- Replace line 88-92: -->
<enhanced:img
  src={footerJpg}
  alt="Footer Background"
  class="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity blur-[6px]"
/>

<!-- Replace line 98-107: -->
<enhanced:img
  bind:this={layer2El}
  src={layer2Png}
  alt=""
  class="w-full h-full object-cover object-center"
  style="transform-style: preserve-3d;"
/>
```

**Step 5: Update Works.svelte to use enhanced:img**

Import project images at top of script:
```ts
import atcsPreview from '$lib/assets/atcs-preview.png';
import photonicPreview from '$lib/assets/photonic-preview.png';
import lawangBps from '$lib/assets/lawang-bps.png';
import seltronikCompro from '$lib/assets/seltronik-compro.png';
import medikuPreview from '$lib/assets/mediku-preview.png';
```

Update the projects array to use imported references instead of string URLs. Then replace `<img>` with `<enhanced:img>`.

For the mobile gallery (line 446-452), replace:
```svelte
<img src={project.imgUrl} alt={project.title} .../>
```
with:
```svelte
<enhanced:img src={project.imgRef} alt={project.title} .../>
```

**Step 6: Update Hero.svelte to use enhanced:img**

```ts
import gundamImg from '$lib/assets/Gundam3.png';
```

Replace `<img src="/Gundam3.png" ...>` with `<enhanced:img src={gundamImg} ...>`.

**Step 7: Remove now-unused files from static/**

```bash
rm static/atcs-preview.png static/photonic-preview.png static/lawang-bps.png \
   static/seltronik-compro.png static/mediku-preview.png static/footer.jpg \
   static/layer2.png static/Gundam3.png
```

---

### Task 7: Lazy-load below-fold components in +page.svelte

**Files:**
- Modify: `src/routes/+page.svelte` — use IntersectionObserver + dynamic imports

**Step 1: Rewrite +page.svelte**

Replace eager imports with lazy loading using IntersectionObserver:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '$lib/components/editorial/Hero.svelte';
  
  let Story: any = null;
  let Works: any = null;
  let About: any = null;
  let Footer: any = null;
  let loading = $state({ story: false, works: false, about: false, footer: false });

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'story' && !Story) {
              loading.story = true;
              import('$lib/components/editorial/Story.svelte').then(m => { Story = m.default; });
            } else if (id === 'works' && !Works) {
              loading.works = true;
              import('$lib/components/editorial/Works.svelte').then(m => { Works = m.default; });
            } else if (id === 'about' && !About) {
              loading.about = true;
              import('$lib/components/editorial/About.svelte').then(m => { About = m.default; });
            } else if (id === 'contact' && !Footer) {
              loading.footer = true;
              import('$lib/components/editorial/Footer.svelte').then(m => { Footer = m.default; });
            }
          }
        }
      },
      { rootMargin: '300px 0px' }
    );

    // Observe section elements (they exist in DOM from SSR)
    const sections = ['story', 'works', 'about', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<div class="bg-surface text-on-surface w-full" style="overflow-x: clip; overflow-y: clip;">
  <Hero />
  {#if Story}
    <Story />
  {:else if loading.story}
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  {/if}
  {#if Works}
    <Works />
  {:else if loading.works}
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  {/if}
  {#if About}
    <About />
  {:else if loading.about}
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  {/if}
  {#if Footer}
    <Footer />
  {:else if loading.footer}
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  {/if}
</div>
```

Note: Since this is a SvelteKit SSR app, the sections' `<section>` elements with ids (`story`, `works`, `about`, `contact`) will not exist in the DOM until the components are mounted. The IntersectionObserver approach won't work directly for SSR.

**Revised approach for SSR compatibility:**

Use a wrapper approach — eagerly render placeholders with ids, then observe those:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '$lib/components/editorial/Hero.svelte';

  let Story: any = null;
  let Works: any = null;
  let About: any = null;
  let Footer: any = null;
  let storyLoading = $state(false);
  let worksLoading = $state(false);
  let aboutLoading = $state(false);
  let footerLoading = $state(false);

  const sections = [
    { id: 'story', get loading() { return storyLoading; }, set loading(v) { storyLoading = v; }, get comp() { return Story; }, set comp(v) { Story = v; }, path: '$lib/components/editorial/Story.svelte' },
    { id: 'works', get loading() { return worksLoading; }, set loading(v) { worksLoading = v; }, get comp() { return Works; }, set comp(v) { Works = v; }, path: '$lib/components/editorial/Works.svelte' },
    { id: 'about', get loading() { return aboutLoading; }, set loading(v) { aboutLoading = v; }, get comp() { return About; }, set comp(v) { About = v; }, path: '$lib/components/editorial/About.svelte' },
    { id: 'contact', get loading() { return footerLoading; }, set loading(v) { footerLoading = v; }, get comp() { return Footer; }, set comp(v) { Footer = v; }, path: '$lib/components/editorial/Footer.svelte' },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const section = sections.find(s => s.id === sectionId);
            if (section && !section.comp) {
              section.loading = true;
              import(section.path).then(m => { section.comp = m.default; });
            }
          }
        }
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<div class="bg-surface text-on-surface w-full" style="overflow-x: clip; overflow-y: clip;">
  <Hero />
  
  <div id="story" class="min-h-screen">
    {#if Story}
      <Story />
    {:else if storyLoading}
      <div class="min-h-screen flex items-center justify-center"><div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
    {/if}
  </div>

  <div id="works" class="min-h-screen">
    {#if Works}
      <Works />
    {:else if worksLoading}
      <div class="min-h-screen flex items-center justify-center"><div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
    {/if}
  </div>

  <div id="about" class="min-h-screen">
    {#if About}
      <About />
    {:else if aboutLoading}
      <div class="min-h-screen flex items-center justify-center"><div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
    {/if}
  </div>

  <div id="contact" class="min-h-screen">
    {#if Footer}
      <Footer />
    {:else if footerLoading}
      <div class="min-h-screen flex items-center justify-center"><div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
    {/if}
  </div>
</div>
```

Wait — the issue with this approach is that the section elements must exist in the DOM for IntersectionObserver to work. The `{:/if}` blocks mean the div wrappers render empty, so the observer has a target. The `#await` block syntax is also an option but more complex here.

Actually, the simplest approach: render wrapper `<section>` elements that always exist, and mount the lazy component inside them when loaded. Use `onMount` with per-section observers.

**Step 2: Verify build and splitting**

```bash
npm run build
```

Check build output shows separate chunks for Story, Works, About, Footer.

---

### Task 8: Consolidate GSAP imports and add ScrollTrigger batch refresh

**Files:**
- Modify: `src/routes/+layout.svelte` — pass GSAP via context
- Modify: `src/lib/components/editorial/Hero.svelte` — get GSAP from context
- Modify: `src/lib/components/editorial/Story.svelte` — get GSAP from context
- Modify: `src/lib/components/editorial/Works.svelte` — get GSAP from context
- Modify: `src/lib/components/editorial/About.svelte` — get GSAP from context
- Modify: `src/lib/components/editorial/Footer.svelte` — get GSAP from context
- Modify: `src/lib/components/LoadingScreen.svelte` — get GSAP from context
- Create: `src/lib/stores/gsap.ts` — GSAP context key

**Step 1: Create GSAP context key**

Create `src/lib/stores/gsap.ts`:
```ts
import type gsapType from 'gsap';
import { setContext, getContext } from 'svelte';

const GSAP_KEY = Symbol('gsap');

export function setGsapContext(gsap: typeof gsapType) {
  setContext(GSAP_KEY, gsap);
}

export function getGsapContext(): typeof gsapType {
  return getContext(GSAP_KEY);
}
```

**Step 2: Update +layout.svelte to provide GSAP via context**

In the existing dynamic import block, after importing gsap, set it in context:
```ts
import { setGsapContext } from '$lib/stores/gsap';

// After: const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([...
setGsapContext(gsap);
```

**Step 3: Update all components to use getGsapContext() instead of importing gsap**

In Hero.svelte, Story.svelte, Works.svelte, About.svelte, Footer.svelte, LoadingScreen.svelte:
- Remove `import gsap from 'gsap';`
- Add `import { getGsapContext } from '$lib/stores/gsap';`
- In `onMount`, add: `const gsap = getGsapContext();`

**Step 4: Add ScrollTrigger batch refresh to layout**

After all components mounted, do a single `ScrollTrigger.refresh()`. Since components may load lazily, each component should call `ScrollTrigger.refresh()` after its own animations are registered.

Actually simpler: each component already registers its own ScrollTrigger. The key optimization is removing the static `import gsap from 'gsap'` from each component, not changing ScrollTrigger registration.

---

### Task 9: Throttle Footer parallax mousemove

**Files:**
- Modify: `src/lib/components/editorial/Footer.svelte` — add rAF throttle

**Step 1: Wrap mousemove handler with requestAnimationFrame throttle**

Replace the `handleMouseMove` function and event listener registration:

```ts
let rafId: number | null = null;
let lastMouseEvent: MouseEvent | null = null;

function handleMouseMove(e: MouseEvent) {
  lastMouseEvent = e;
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (!lastMouseEvent || !footerEl || !layer2El || isMobile || prefersReducedMotion || !isReady) return;
      
      const rect = footerEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const x = (lastMouseEvent.clientX - rect.left) / rect.width;
      const y = (lastMouseEvent.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 10;

      gsap.to(layer2El, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true
      });
      
      lastMouseEvent = null;
    });
  }
}
```

---

### Task 10: Add CSS content-visibility to below-fold sections

**Files:**
- Modify: `src/app.css` — add content-visibility utilities

**Step 1: Add content-visibility: auto to below-fold sections**

Add at end of app.css:
```css
/* Performance: defer rendering for off-screen sections */
#story,
#works,
#works-mobile,
#about,
#contact {
  content-visibility: auto;
  contain-intrinsic-size: auto 100vh;
}
```

---

### Task 11: Cache computed values in Works scrub to reduce per-frame GSAP calls

**Files:**
- Modify: `src/lib/components/editorial/Works.svelte` — optimize `onUpdate` callback

**Step 1: Cache list-related values**

Pre-compute and cache values that don't change during scroll:

```ts
// In onMount, after setupScrollTriggers():
let cachedCenterOffset = 0;

// In setupScrollTriggers, compute once:
const listArea = listContainerEl?.parentElement;
const listAreaHeight = listArea?.clientHeight || (window.innerHeight - 160);
cachedCenterOffset = (listAreaHeight / 2) - (itemHeight / 2);

// In mainST onUpdate, use cached values:
// Replace line 249: gsap.set(listContainerEl, { y: centerOffset - fractionalIndex * itemHeight });
// With: gsap.set(listContainerEl, { y: cachedCenterOffset - fractionalIndex * itemHeight });
```

Also, in `onEnterBack` and `onUpdate`, batch the multiple `gsap.set()` calls into fewer calls where possible. The key optimization: avoid setting `progressFillEl` scaleY every frame since progress bar updates are fast. And avoid regenerating rgba strings — pre-compute the color lookup table.

Actually the biggest win in Works.svelte is computing `centerOffset` once instead of per-call in the closure. Let's do that.

---

### Task 12: Add preload link for hero image + meta description

**Files:**
- Modify: `src/app.html` — add preload + meta

**Step 1: Add hero image preload and meta description**

Add after the font preloads:
```html
<link rel="preload" href="/Gundam3.png" as="image" fetchpriority="high">
<meta name="description" content="Portfolio of Muhammad Fiqi Firmansyah — Software Engineer crafting digital experiences.">
```

---

### Task 13: Add <noscript> fallback and UX improvements

**Files:**
- Modify: `src/app.html` — add noscript message

**Step 1: Add noscript fallback**

Add after the `<div>` wrapping `%sveltekit.body%`:
```html
<noscript>
  <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0c0c0b;color:#e8e8e4;font-family:sans-serif;text-align:center;padding:2rem;">
    <div>
      <h1 style="font-size:2rem;margin-bottom:1rem;">JavaScript Required</h1>
      <p style="opacity:0.6;">This portfolio requires JavaScript for animations and interactivity. Please enable JavaScript to view the full experience.</p>
    </div>
  </div>
</noscript>
```

---

### Task 14: Final verification build

**Step 1: Build**

```bash
npm run build
```

**Step 2: Check bundle sizes**

```bash
du -sh .svelte-kit/output/client/_app/immutable/chunks/
```

**Step 3: Run type check**

```bash
npm run check
```

**Step 4: Start preview and test**

```bash
npm run preview
```

Verify:
- Page loads without Google Fonts external request
- Hero image loads with preload
- Below-fold sections lazy-load on scroll
- Footer parallax is smooth
- No console errors
- All animations work

---

### Task 15: Commit

```bash
git add -A
git commit -m "perf: optimize load time and runtime performance

- Remove 350MB+ orphaned assets and 8 unused dependencies
- Self-host fonts with font-display:swap for instant text rendering
- Add @sveltejs/enhanced-img for responsive images with srcset
- Lazy-load below-fold components via IntersectionObserver
- Consolidate GSAP imports via Svelte context
- Throttle Footer parallax mousemove with requestAnimationFrame
- Add content-visibility:auto to off-screen sections
- Cache computed values in Works scroll scrub
- Add preload for hero image and noscript fallback"
```
