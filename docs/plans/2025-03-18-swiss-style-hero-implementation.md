# Swiss Style Hero Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the hero section with Swiss Style 12-column grid layout, incorporating all user requirements (name display, Q letter with shadow, cycling images, live clock, bio, navigation)

**Architecture:** Replace monolithic Hero.svelte with composable Swiss-style components using CSS Grid. Migrate existing functionality (image carousel, clock, nav) into new layout structure while preserving GSAP animations and state management.

**Tech Stack:** Svelte 5, Tailwind CSS v4, GSAP, TypeScript

**Design Reference:** `/home/qiu/Work/Web Portfolio/docs/plans/2025-03-18-swiss-style-hero-design.md`

---

## Pre-Implementation Setup

### Task 0: Verify Project State

**Files:**
- Check: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/` directory
- Check: `/home/qiu/Work/Web Portfolio/src/routes/+page.svelte`

**Step 1: List current hero components**
```bash
cd "/home/qiu/Work/Web Portfolio" && ls -la src/lib/components/hero/
```

**Step 2: Verify development server works**
```bash
cd "/home/qiu/Work/Web Portfolio" && timeout 5 bun run dev || echo "Dev check complete"
```

**Step 3: Commit current state**
```bash
git add .
git commit -m "chore: pre-swiss-redesign checkpoint" || echo "Nothing to commit"
```

---

## Phase 1: Foundation & Layout

### Task 1: Update Global Styles for Swiss Design

**Files:**
- Modify: `/home/qiu/Work/Web Portfolio/src/app.css`

**Step 1: Add Swiss color variables and typography utilities**

Add to `/home/qiu/Work/Web Portfolio/src/app.css`:
```css
@import "tailwindcss";

/* Swiss Style Design System */
:root {
  --swiss-red: #E60012;
  --swiss-black: #1A1A1A;
}

/* Typography utilities */
.kerning-tight {
  letter-spacing: -0.06em;
}

.kerning-normal {
  letter-spacing: -0.02em;
}

/* Hairline borders */
.border-hairline {
  border-width: 0.5px;
}

/* Vertical text for decorative elements */
.vertical-text {
  writing-mode: vertical-rl;
}
```

**Step 2: Verify styles load**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```
Expected: No TypeScript errors

**Step 3: Commit**
```bash
git add src/app.css
git commit -m "feat: add Swiss style CSS utilities and color variables"
```

---

### Task 2: Create QLetter Component with Long Shadow

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/QLetter.svelte`

**Step 1: Write the component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/QLetter.svelte`:
```svelte
<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }
  
  let { size = 120, class: className = '' }: Props = $props();
</script>

<div 
  class="relative {className}"
  style="width: {size}px; height: {size}px;"
>
  <!-- Long shadow layers -->
  <div 
    class="absolute inset-0 text-swiss-red font-black select-none"
    style="
      font-size: {size * 0.9}px;
      line-height: 1;
      text-shadow: 
        1px 1px 0 rgba(230, 0, 18, 0.9),
        2px 2px 0 rgba(230, 0, 18, 0.85),
        3px 3px 0 rgba(230, 0, 18, 0.8),
        4px 4px 0 rgba(230, 0, 18, 0.75),
        5px 5px 0 rgba(230, 0, 18, 0.7),
        6px 6px 0 rgba(230, 0, 18, 0.65),
        7px 7px 0 rgba(230, 0, 18, 0.6),
        8px 8px 0 rgba(230, 0, 18, 0.55),
        9px 9px 0 rgba(230, 0, 18, 0.5),
        10px 10px 0 rgba(230, 0, 18, 0.45),
        11px 11px 0 rgba(230, 0, 18, 0.4),
        12px 12px 0 rgba(230, 0, 18, 0.35),
        13px 13px 0 rgba(230, 0, 18, 0.3),
        14px 14px 0 rgba(230, 0, 18, 0.25),
        15px 15px 0 rgba(230, 0, 18, 0.2),
        16px 16px 0 rgba(230, 0, 18, 0.15),
        17px 17px 0 rgba(230, 0, 18, 0.1),
        18px 18px 0 rgba(230, 0, 18, 0.05);
    "
  >
    Q
  </div>
</div>

<style>
  .text-swiss-red {
    color: #E60012;
  }
</style>
```

**Step 2: Verify component compiles**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```
Expected: No errors for QLetter.svelte

**Step 3: Commit**
```bash
git add src/lib/components/hero/QLetter.svelte
git commit -m "feat: add QLetter component with long shadow"
```

---

### Task 3: Create HeroHeader Component

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroHeader.svelte`
- Use: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/LiveTime.svelte` (existing)
- Use: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/Location.svelte` (existing)

**Step 1: Write HeroHeader component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroHeader.svelte`:
```svelte
<script lang="ts">
  import LiveTime from './LiveTime.svelte';
  import Location from './Location.svelte';
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];
</script>

<header class="grid grid-cols-12 gap-4 w-full mb-16 lg:mb-24 items-start">
  <!-- Col 1-3: Identity -->
  <div class="col-span-6 md:col-span-3">
    <h1 class="text-[10px] font-bold uppercase tracking-[0.2em] leading-tight">
      Selected Works<br/>
      <span class="font-normal opacity-50">2020 — 2024</span>
    </h1>
  </div>
  
  <!-- Col 4-6: Clock & Location -->
  <div class="hidden md:block col-span-3">
    <div class="flex items-baseline gap-4">
      <div class="text-[10px] uppercase font-bold tracking-widest opacity-40">Local Time</div>
      <LiveTime />
    </div>
    <div class="flex flex-col mt-1 gap-1">
      <Location />
      <span class="text-[10px] font-medium tracking-wide text-[#E60012]">#fullstack #ML</span>
    </div>
  </div>
  
  <!-- Col 7-9: Archive Counter -->
  <div class="hidden md:block col-span-3">
    <div class="flex items-baseline gap-4">
      <div class="text-[10px] uppercase font-bold tracking-widest opacity-40">Archive</div>
      <div class="text-xs font-bold">Nº 41</div>
    </div>
  </div>
  
  <!-- Col 10-12: Navigation -->
  <nav class="col-span-6 md:col-span-3 text-right">
    <ul class="text-[10px] uppercase font-bold tracking-widest space-y-1">
      {#each navItems as item}
        <li>
          <a 
            href={item.href} 
            class="hover:text-[#E60012] transition-colors duration-300"
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>
```

**Step 2: Update LiveTime component styling**

Modify `/home/qiu/Work/Web Portfolio/src/lib/components/hero/LiveTime.svelte`:
```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let currentTime = $state('');
  let intervalId: ReturnType<typeof setInterval>;
  
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }
  
  onMount(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  });
  
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<span class="text-xs font-bold font-mono">{currentTime}</span>
```

**Step 3: Update Location component**

Modify `/home/qiu/Work/Web Portfolio/src/lib/components/hero/Location.svelte`:
```svelte
<span class="text-[9px] font-black tracking-tighter text-[#E60012]">INDONESIA</span>
```

**Step 4: Verify both components**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 5: Commit**
```bash
git add src/lib/components/hero/
git commit -m "feat: create HeroHeader with clock, location, and nav"
```

---

### Task 4: Create HeroName Component

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroName.svelte`

**Step 1: Write the component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroName.svelte`:
```svelte
<div class="col-span-12 md:col-span-4 z-10">
  <h2 class="text-6xl md:text-7xl lg:text-[8rem] font-black kerning-tight leading-[0.85] uppercase">
    MHMMD<br/>
    FQ<br/>
    FRMNSYH<span class="text-[#E60012]">.</span>
  </h2>
</div>

<style>
  .kerning-tight {
    letter-spacing: -0.06em;
  }
</style>
```

**Step 2: Verify**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 3: Commit**
```bash
git add src/lib/components/hero/HeroName.svelte
git commit -m "feat: add HeroName component with Swiss typography"
```

---

### Task 5: Adapt ImageCarousel Component

**Files:**
- Modify: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/RandomName.svelte` → rename to `ImageCarousel.svelte`

**Step 1: Rename and refactor RandomName to ImageCarousel**

Rename `/home/qiu/Work/Web Portfolio/src/lib/components/hero/RandomName.svelte` to `ImageCarousel.svelte` and update:

```svelte
<script lang="ts">
  // Generate array of 41 WebP image paths
  const images = Array.from({ length: 41 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `/images/webp/qyu-${num}.webp`;
  });
  
  let currentImage = $state(images[0]);
  let currentIndex = $state(0);
  let isLoading = $state(true);
  
  // Preload all images upfront
  async function preloadAllImages() {
    await Promise.all(images.map(src => 
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })
    ));
    isLoading = false;
  }
  
  // Initialize - preload images
  $effect(() => {
    preloadAllImages();
  });
  
  // Start cycling when ready
  $effect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        currentImage = images[randomIndex];
        currentIndex = randomIndex;
      }, 2000);
      
      return () => clearInterval(interval);
    }
  });
</script>

<div class="col-span-12 md:col-span-5 relative">
  {#if isLoading}
    <div class="flex items-center justify-center p-8 aspect-[4/3] bg-gray-100 rounded-[32px]">
      <span class="text-black text-sm">Loading...</span>
    </div>
  {:else}
    <!-- Three-layer pill container with counter outside -->
    <div class="relative flex items-center justify-center">
      <!-- Image frame -->
      <div class="relative w-full">
        <!-- Layer 3: Black pill (outer frame - 2px wider than white) -->
        <div class="bg-black rounded-[32px] p-[2px] relative z-10">
          <!-- Layer 2: White pill (middle frame - 4px gap around image) -->
          <div class="bg-white rounded-[30px] p-[4px]">
            <!-- Layer 1: Image container with 4:3 aspect ratio -->
            <div class="relative rounded-[26px] overflow-hidden aspect-[4/3]">
              <!-- Single image with hard cut -->
              <img 
                src={currentImage} 
                alt="Qyu"
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Counter positioned outside on the right -->
      <div class="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div class="h-6 w-8 overflow-hidden relative">
          {#key currentIndex}
            <span 
              class="text-black text-sm font-mono font-bold tracking-wider whitespace-nowrap h-6 flex items-center justify-center animate-slide"
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
          {/key}
        </div>
        <div class="w-4 h-[1px] bg-black my-1"></div>
        <span class="text-black text-[10px] font-mono">41</span>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide {
    animation: slideDown 150ms ease-out;
  }
</style>
```

**Step 2: Delete old RandomName.svelte if needed**
```bash
rm "/home/qiu/Work/Web Portfolio/src/lib/components/hero/RandomName.svelte" 2>/dev/null || echo "Already renamed"
```

**Step 3: Verify**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 4: Commit**
```bash
git add src/lib/components/hero/
git commit -m "refactor: adapt RandomName to ImageCarousel for grid layout"
```

---

### Task 6: Create HeroDescription Component

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroDescription.svelte`

**Step 1: Write the component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroDescription.svelte`:
```svelte
<div class="col-span-12 md:col-span-3 flex flex-col justify-start pt-4 md:pt-8 pl-0 md:pl-8">
  <div class="space-y-6">
    <div class="w-8 h-[1px] bg-[#1A1A1A]"></div>
    <div class="max-w-[200px]">
      <h3 class="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40">About</h3>
      <p class="text-xs leading-relaxed kerning-normal opacity-80">
        "Code that works on the first try is suspicious. Code that works on the 41st try is production."
      </p>
      <p class="text-xs leading-relaxed kerning-normal opacity-80 mt-4">
        Building things that shouldn't work but do. Fullstack developer with ML experiments on the side. Probably debugging something right now.
      </p>
    </div>
  </div>
</div>

<style>
  .kerning-normal {
    letter-spacing: -0.02em;
  }
</style>
```

**Step 2: Verify**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 3: Commit**
```bash
git add src/lib/components/hero/HeroDescription.svelte
git commit -m "feat: add HeroDescription with humorous bio"
```

---

### Task 7: Create HeroFooter Component

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroFooter.svelte`

**Step 1: Write the component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroFooter.svelte`:
```svelte
<footer class="pt-8 border-t border-black/10 grid grid-cols-12 gap-4 items-end mt-auto">
  <div class="col-span-6 md:col-span-3">
    <p class="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-2">Format / Layout</p>
    <p class="text-[11px] font-medium">4:3 Variable Swiss Grid</p>
  </div>
  <div class="col-span-6 md:col-span-3">
    <p class="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-2">Typography</p>
    <p class="text-[11px] font-medium">Inter / Neo-Grotesque</p>
  </div>
  <div class="hidden md:block col-span-3">
    <p class="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-2">Social Hub</p>
    <div class="flex gap-4 text-[11px] font-bold">
      <a class="hover:text-[#E60012] transition-colors" href="https://instagram.com" target="_blank" rel="noopener">IG</a>
      <a class="hover:text-[#E60012] transition-colors" href="https://twitter.com" target="_blank" rel="noopener">TW</a>
      <a class="hover:text-[#E60012] transition-colors" href="https://linkedin.com" target="_blank" rel="noopener">LI</a>
      <a class="hover:text-[#E60012] transition-colors" href="https://github.com" target="_blank" rel="noopener">GH</a>
    </div>
  </div>
  <div class="col-span-12 md:col-span-3 flex flex-col items-end gap-4 mt-4 md:mt-0">
    <div class="text-right">
      <p class="text-[9px] uppercase font-bold tracking-widest opacity-40 mb-2">Status</p>
      <div class="flex items-center gap-2 justify-end">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span class="text-[11px] font-medium">Available for work</span>
      </div>
    </div>
  </div>
</footer>
```

**Step 2: Verify**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 3: Commit**
```bash
git add src/lib/components/hero/HeroFooter.svelte
git commit -m "feat: add HeroFooter with social links and status"
```

---

## Phase 2: Integration

### Task 8: Create SwissHero Main Container

**Files:**
- Create: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/SwissHero.svelte`
- Delete: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/Hero.svelte`

**Step 1: Write SwissHero component**

Create `/home/qiu/Work/Web Portfolio/src/lib/components/hero/SwissHero.svelte`:
```svelte
<script lang="ts">
  import HeroHeader from './HeroHeader.svelte';
  import HeroName from './HeroName.svelte';
  import ImageCarousel from './ImageCarousel.svelte';
  import HeroDescription from './HeroDescription.svelte';
  import HeroFooter from './HeroFooter.svelte';
  import QLetter from './QLetter.svelte';
</script>

<div id="home" class="min-h-screen w-full bg-white p-6 md:p-12 lg:p-16 flex flex-col">
  <!-- Header with clock, nav, etc. -->
  <HeroHeader />
  
  <!-- Main content area -->
  <main class="flex-grow flex flex-col justify-center mb-16 lg:mb-24 relative">
    <div class="grid grid-cols-12 gap-4 items-start">
      <!-- Name: Cols 1-4 -->
      <HeroName />
      
      <!-- Image: Cols 5-9 -->
      <ImageCarousel />
      
      <!-- Description: Cols 10-12 -->
      <HeroDescription />
    </div>
    
    <!-- Q Letter decoration - positioned absolutely in bottom right -->
    <div class="absolute -bottom-8 -right-8 md:bottom-0 md:right-0 pointer-events-none hidden md:block">
      <QLetter size={100} />
    </div>
  </main>
  
  <!-- Footer -->
  <HeroFooter />
</div>
```

**Step 2: Remove old Hero.svelte**
```bash
rm "/home/qiu/Work/Web Portfolio/src/lib/components/hero/Hero.svelte"
```

**Step 3: Update page to use SwissHero**

Modify `/home/qiu/Work/Web Portfolio/src/routes/+page.svelte`:
```svelte
<script>
  import SwissHero from '$lib/components/hero/SwissHero.svelte';
</script>

<SwissHero />
```

**Step 4: Verify everything compiles**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```
Expected: No errors

**Step 5: Test in browser**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run dev -- --open
```
Expected: Swiss style hero loads with:
- 12-column grid layout
- Name displayed large
- Image cycling
- Clock ticking
- Q letter visible

**Step 6: Commit**
```bash
git add src/
git commit -m "feat: integrate SwissHero with all components"
```

---

## Phase 3: Polish & Testing

### Task 9: Add Responsive Breakpoints

**Files:**
- Modify: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/SwissHero.svelte`
- Modify: `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroHeader.svelte`

**Step 1: Test on mobile viewport**
Open dev tools, switch to mobile viewport (375px width)

**Step 2: Fix mobile layout issues**

Update `/home/qiu/Work/Web Portfolio/src/lib/components/hero/SwissHero.svelte`:
```svelte
<div id="home" class="min-h-screen w-full bg-white p-4 md:p-8 lg:p-12 xl:p-16 flex flex-col">
```

Update `/home/qiu/Work/Web Portfolio/src/lib/components/hero/HeroHeader.svelte` navigation for mobile:
```svelte
<!-- Mobile nav - horizontal -->
<nav class="col-span-6 md:col-span-3 text-right md:text-right">
  <ul class="text-[10px] uppercase font-bold tracking-widest space-y-1 hidden md:block">
    <!-- Desktop vertical nav -->
    {#each navItems as item}
      <li>
        <a href={item.href} class="hover:text-[#E60012] transition-colors duration-300">
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
  
  <!-- Mobile horizontal nav -->
  <ul class="text-[10px] uppercase font-bold tracking-widest flex gap-3 md:hidden justify-end">
    {#each navItems as item}
      <li>
        <a href={item.href} class="hover:text-[#E60012] transition-colors duration-300">
          {item.label.slice(0, 4)}
        </a>
      </li>
    {/each}
  </ul>
</nav>
```

**Step 3: Verify responsive behavior**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```

**Step 4: Commit**
```bash
git add src/
git commit -m "fix: add responsive breakpoints for mobile"
```

---

### Task 10: Verify All Requirements

**Files:**
- All hero components

**Step 1: Create verification checklist**

Test each requirement:
- [ ] "MHMMD FQ FRMNSYH" displayed in large bold typography
- [ ] Swiss Red dot after name
- [ ] Q letter with long shadow in bottom-right corner
- [ ] 41 images cycling every 2 seconds
- [ ] Counter showing "01/41" format
- [ ] Live clock updating every second
- [ ] Location showing "INDONESIA" in Swiss Red
- [ ] Tags "#fullstack #ML" visible
- [ ] Humorous bio description present
- [ ] 4 navigation items working
- [ ] Social links (IG, TW, LI, GH) in footer
- [ ] 4:3 aspect ratio maintained
- [ ] Swiss Red (#E60012) used for accents
- [ ] 12-column grid layout
- [ ] Inter font applied

**Step 2: Run visual verification**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run dev
```

Manually verify all checklist items in browser.

**Step 3: Run type check**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check
```
Expected: No TypeScript errors

**Step 4: Final commit**
```bash
git add .
git commit -m "feat: complete Swiss Style hero redesign

- 12-column asymmetric grid layout
- Large typography for MHMMD FQ FRMNSYH
- Q letter with long shadow decoration
- Image carousel with 41 images (4:3 ratio)
- Live clock and Indonesia location
- #fullstack #ML tags
- Humorous bio description
- Swiss Red (#E60012) accent color
- Social links in footer
- Responsive design"
```

---

## Post-Implementation

### Task 11: Cleanup and Documentation

**Step 1: Remove any unused imports or components**

Check for and remove:
- Unused component files in `/home/qiu/Work/Web Portfolio/src/lib/components/hero/`
- Any old code comments
- Console.log statements

**Step 2: Update README if needed**

**Step 3: Final verification**
```bash
cd "/home/qiu/Work/Web Portfolio" && bun run check && bun run build
```

Expected: Build succeeds without errors

---

## Summary of Changes

| File | Action | Purpose |
|------|--------|---------|
| `src/app.css` | Modify | Add Swiss style utilities |
| `src/lib/components/hero/QLetter.svelte` | Create | Decorative Q with shadow |
| `src/lib/components/hero/HeroHeader.svelte` | Create | Top header grid |
| `src/lib/components/hero/HeroName.svelte` | Create | Large name typography |
| `src/lib/components/hero/ImageCarousel.svelte` | Create | Image cycling (renamed from RandomName) |
| `src/lib/components/hero/HeroDescription.svelte` | Create | Bio text |
| `src/lib/components/hero/HeroFooter.svelte` | Create | Footer with social links |
| `src/lib/components/hero/SwissHero.svelte` | Create | Main container |
| `src/lib/components/hero/Hero.svelte` | Delete | Replaced by SwissHero |
| `src/lib/components/hero/RandomName.svelte` | Delete | Renamed to ImageCarousel |
| `src/lib/components/hero/LiveTime.svelte` | Modify | Updated styling |
| `src/lib/components/hero/Location.svelte` | Modify | Updated styling |
| `src/routes/+page.svelte` | Modify | Import SwissHero |

---

**Plan Complete!** Ready for implementation.
