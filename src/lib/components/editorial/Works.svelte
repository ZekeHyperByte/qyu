<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  export let isActive = false;

  const projects = [
    {
      id: 1,
      year: '2024',
      title: 'Seltronik ATCS',
      subtitle: 'Adaptive Traffic Control System with multi-instance deployment, real-time monitoring, and IoT device integration for Indonesian cities.',
      category: 'Full-Stack / IoT',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      industry: 'Industrial / Automation',
      client: 'PT. Seltronik',
      imgUrl: '/atcs-preview.png',
    },
    {
      id: 2,
      year: '2024',
      title: 'Photonic Booth',
      subtitle: 'Commercial-grade photo booth system with code-based workflow, QRIS payment, multi-channel delivery, and enterprise analytics.',
      category: 'Full-Stack / Systems',
      tags: ['React', 'Fastify', 'Electron', 'SQLite'],
      industry: 'Events / Entertainment',
      client: 'Photonic',
      imgUrl: '/photonic-preview.png',
    },
    {
      id: 3,
      year: '2024',
      title: 'Lawang BPS',
      subtitle: 'Offline-first Flutter mobile app delivering statistical data for Semarang City across 10 categories — no internet required.',
      category: 'Mobile / UX Design',
      tags: ['Flutter', 'Dart', 'Material Design', 'fl_chart'],
      industry: 'Government / Public Sector',
      client: 'BPS Kota Semarang',
      imgUrl: '/lawang-bps.png',
    },
    {
      id: 4,
      year: '2023',
      title: 'Seltronik Website',
      subtitle: 'Company portal with tiered product access, admin dashboard, and Supabase-powered authentication and content management.',
      category: 'Full-Stack / UI System',
      tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
      industry: 'Corporate / SaaS',
      client: 'PT. Seltronik',
      imgUrl: '/seltronik-compro.png',
    },
    {
      id: 5,
      year: '2023',
      title: 'Mediku',
      subtitle: 'Multi-role healthcare app with AI-assisted diagnostics, health tracking, family profiles, and educational content.',
      category: 'Mobile / Healthcare',
      tags: ['Flutter', 'sqflite', 'fl_chart', 'Flutter Quill'],
      industry: 'Healthcare / Education',
      client: 'PPKO BEM FK',
      imgUrl: '/mediku-preview.png',
    },
  ];

  const N = projects.length;

  let activeIndex = 0;
  let isMobile = false;

  // Desktop refs
  let sectionEl: HTMLElement;
  let panelEl: HTMLElement;
  let leftPanelEl: HTMLElement;
  let rightPanelEl: HTMLElement;
  let imgContainerEl: HTMLElement;
  let metaEls: HTMLElement[] = [];
  let headerEl: HTMLElement;
  let listContainerEl: HTMLElement;
  let listItemsEl: HTMLElement[] = [];
  let yearBadgeEl: HTMLElement;
  let bottomHintEl: HTMLElement;
  let imgEls: HTMLElement[] = [];
  let progressFillEl: HTMLElement;

  // Mobile refs
  let mobileSectionEl: HTMLElement;
  let mobileCardEls: HTMLElement[] = [];

  let entryST: any = null;
  let mainST: any = null;
  let ScrollTrigger: any = null;
  let capturedVH = 0;

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  function getItemHeight() {
    if (isMobile) return 64;
    return 100;
  }

  function setInitialState() {
    imgEls.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: 1 }));
    metaEls.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 12 }));

    listItemsEl.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0.2,
        color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.2)',
      });
    });
  }

  function updateListVisuals(fractionalIndex: number) {
    const roundedIdx = Math.round(fractionalIndex);

    listItemsEl.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(i - fractionalIndex);
      const alpha = Math.max(0.05, 1 - dist * 0.8);
      const colorVal = Math.max(0.2, 1 - dist * 0.8);
      gsap.set(el, {
        autoAlpha: alpha,
        color: `rgba(255,255,255,${colorVal})`,
      });
    });

    if (yearBadgeEl) {
      gsap.set(yearBadgeEl, { autoAlpha: 1, y: 0 });
    }

    if (roundedIdx !== activeIndex) {
      const prev = activeIndex;
      activeIndex = roundedIdx;

      gsap.set(imgEls[prev], { autoAlpha: 0 });
      gsap.set(imgEls[activeIndex], { autoAlpha: 1, scale: 1 });

      gsap.set(metaEls[prev], { autoAlpha: 0 });
      gsap.set(metaEls[activeIndex], { autoAlpha: 1, y: 0 });
    }
  }

  function cleanup() {
    entryST?.kill();
    mainST?.kill();
    if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
  }

  function setupScrollTriggers() {
    cleanup();
    gsap.registerPlugin(ScrollTrigger);

    capturedVH = window.innerHeight;

    const itemHeight = getItemHeight();

    if (isMobile) {
      // Mobile: Card scroll animation
      mobileCardEls.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
      return;
    }

    const entryH = window.innerHeight * 0.9;

    entryST = ScrollTrigger.create({
      trigger: sectionEl,
      start: `top bottom+=${entryH}`,
      end: () => `top+=${entryH} top`,
      scrub: 1.2,
      onUpdate(self) {
        const p = self.progress;
        const eased = gsap.parseEase('power2.out')(p);

        gsap.set(leftPanelEl, { y: (1 - eased) * 140 });
        gsap.set(rightPanelEl, { y: (1 - eased) * 140 });
        gsap.set(imgContainerEl, { y: (1 - eased) * 30 });
        gsap.set(headerEl, { y: (1 - eased) * 15 });
        gsap.set(bottomHintEl, { y: (1 - eased) * 10 });
      },
    });

    const listArea = listContainerEl?.parentElement;
    const listAreaHeight = listArea?.clientHeight || (window.innerHeight - 160);
    const centerOffset = (listAreaHeight / 2) - (itemHeight / 2);

    gsap.set(listContainerEl, { y: centerOffset });

    mainST = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: () => `+=${(N - 1) * capturedVH}`,
      pin: panelEl,
      pinSpacing: true,
      anticipatePin: 1,
      onEnterBack(self) {
        const fractionalIndex = self.progress * (N - 1);
        activeIndex = Math.round(fractionalIndex);

        imgEls.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === activeIndex ? 1 : 0, scale: 1 }));
        metaEls.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === activeIndex ? 1 : 0, y: i === activeIndex ? 0 : 12 }));
        if (progressFillEl) gsap.set(progressFillEl, { scaleY: self.progress });

        listItemsEl.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(i - fractionalIndex);
          const alpha = Math.max(0.05, 1 - dist * 0.8);
          const colorVal = Math.max(0.2, 1 - dist * 0.8);
          gsap.set(el, { autoAlpha: alpha, color: `rgba(255,255,255,${colorVal})` });
        });

        if (listContainerEl) gsap.set(listContainerEl, { y: centerOffset - fractionalIndex * itemHeight });
        if (yearBadgeEl) gsap.set(yearBadgeEl, { autoAlpha: 1, y: 0 });
      },
      onUpdate(self) {
        const fractionalIndex = self.progress * (N - 1);

        if (progressFillEl) gsap.set(progressFillEl, { scaleY: self.progress });

        if (listContainerEl) gsap.set(listContainerEl, { y: centerOffset - fractionalIndex * itemHeight });
        updateListVisuals(fractionalIndex);
      },
    });
  }

  onMount(async () => {
    const { default: ST } = await import('gsap/ScrollTrigger');
    ScrollTrigger = ST;

    checkMobile();
    
    if (!isMobile) {
      setInitialState();
    }
    
    setupScrollTriggers();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = isMobile;
        checkMobile();
        if (wasMobile !== isMobile) {
          if (!isMobile) {
            setInitialState();
          }
          setupScrollTriggers();
        }
      }, 300);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  });

  onDestroy(cleanup);
</script>

<!-- Desktop Version -->
<section id="works" bind:this={sectionEl} class="relative w-full hidden md:block">

  <div
    bind:this={panelEl}
    class="w-full h-screen flex flex-col md:flex-row bg-[#0c0c0b]"
  >

    <div bind:this={leftPanelEl} class="relative flex flex-col w-full md:w-[42%] h-auto md:h-full flex-shrink-0">

      <div bind:this={imgContainerEl} class="relative flex-shrink-0 overflow-hidden" style="height: 65vh;">
        {#each projects as project, i}
          <div
            bind:this={imgEls[i]}
            class="absolute inset-0 overflow-hidden"
          >
            <img
              src={project.imgUrl}
              alt={project.title}
              class="w-full h-full object-contain object-center bg-[#0c0c0b]"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        {/each}
      </div>

      <div class="relative flex-1 overflow-hidden">
        {#each projects as project, i}
          <div
            bind:this={metaEls[i]}
            class="absolute inset-0 px-4 md:px-6 py-6 md:py-8 flex flex-col justify-between"
            style="will-change: transform, opacity;"
          >
            <dl class="grid grid-cols-[70px_1fr] md:grid-cols-[90px_1fr] gap-y-5 md:gap-y-6 text-sm">
              <dt class="font-label text-[8px] md:text-[9px] uppercase tracking-widest text-white/35 pt-0.5">Overview</dt>
              <dd class="font-body text-white/65 text-[11px] md:text-[12px] leading-relaxed">{project.subtitle}</dd>

              <dt class="font-label text-[8px] md:text-[9px] uppercase tracking-widest text-white/35 pt-0.5">Tags</dt>
              <dd class="flex flex-wrap gap-1.5">
                {#each project.tags as tag}
                  <span class="text-white/55 border border-white/15 px-2 py-[3px] text-[8px] md:text-[9px] font-label tracking-wide">{tag}</span>
                {/each}
              </dd>

              <dt class="font-label text-[8px] md:text-[9px] uppercase tracking-widest text-white/35 pt-0.5">Industry</dt>
              <dd class="font-body text-white/65 text-[11px] md:text-[12px]">{project.industry}</dd>

              <dt class="font-label text-[8px] md:text-[9px] uppercase tracking-widest text-white/35 pt-0.5">Client</dt>
              <dd class="font-body text-white/65 text-[11px] md:text-[12px]">{project.client}</dd>
            </dl>

            <a href="#"
              class="group inline-flex items-center gap-2 mt-auto pt-6 md:pt-8 text-white/40 hover:text-white transition-colors duration-300 font-label text-[8px] md:text-[9px] uppercase tracking-[0.24em]">
              Explore the case
              <svg class="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </div>

    <div bind:this={rightPanelEl} class="relative flex-1 h-full flex flex-col">

      <div bind:this={headerEl} class="flex items-start justify-between px-5 md:px-12 pt-5 md:pt-8 pb-0">
        <div>
          <p class="font-label text-[8px] md:text-[9px] uppercase tracking-[0.28em] text-white/35">Selected Works</p>
          <p class="font-label text-[8px] md:text-[9px] uppercase tracking-[0.18em] text-white/20 mt-0.5">Vol. 01 — 2023–2025</p>
        </div>
        <div class="relative w-px h-8 md:h-10 bg-white/10 overflow-hidden flex-shrink-0">
          <div bind:this={progressFillEl} class="absolute top-0 left-0 w-full bg-primary origin-top" style="height: 100%; transform: scaleY(0);"></div>
        </div>
      </div>

      <div class="flex-1 relative px-5 md:px-12 list-mask">
        <div
          bind:this={yearBadgeEl}
          class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4"
        >
          <span class="font-label text-[10px] text-white/35 tracking-[0.2em]">{projects[activeIndex]?.year}</span>
        </div>

        <div bind:this={listContainerEl} class="list-column" style="will-change: transform;">
          {#each projects as project, i}
            <div
              bind:this={listItemsEl[i]}
              class="list-item"
              style="will-change: transform, opacity, color;"
            >
              <span class="list-num">{String(i + 1).padStart(2, '0')}</span>
              <span class="list-title">{project.title}</span>
            </div>
          {/each}
        </div>
      </div>

      <div bind:this={bottomHintEl} class="flex items-center gap-3 px-5 md:px-12 pb-5 md:pb-8">
        <span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
        <p class="font-label text-[8px] md:text-[9px] uppercase tracking-[0.26em] text-white/25">Scroll to explore</p>
      </div>
    </div>

  </div>
</section>

<!-- Mobile Version - Card Stack -->
<section id="works-mobile" bind:this={mobileSectionEl} class="relative w-full block md:hidden bg-[#0c0c0b] py-16 px-4">
  
  <!-- Mobile Header -->
  <div class="mb-12">
    <p class="font-label text-[10px] uppercase tracking-[0.28em] text-white/35 mb-1">Selected Works</p>
    <p class="font-label text-[10px] uppercase tracking-[0.18em] text-white/20">Vol. 01 — 2023–2025</p>
  </div>

  <!-- Mobile Cards -->
  <div class="flex flex-col gap-8">
    {#each projects as project, i}
      <article 
        bind:this={mobileCardEls[i]}
        class="mobile-card group"
      >
        <!-- Image Container -->
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#1a1a18] mb-5">
          <img
            src={project.imgUrl}
            alt={project.title}
            class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading={i < 2 ? 'eager' : 'lazy'}
          />
          <!-- Year Badge -->
          <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded">
            <span class="font-label text-[9px] text-white/70 tracking-wider">{project.year}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-4">
          <!-- Title & Category -->
          <div>
            <h3 class="font-headline text-2xl font-bold text-white mb-1 leading-tight">
              {project.title}
            </h3>
            <p class="font-label text-[10px] uppercase tracking-wider text-primary">
              {project.category}
            </p>
          </div>

          <!-- Description -->
          <p class="font-body text-sm text-white/60 leading-relaxed line-clamp-3">
            {project.subtitle}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            {#each project.tags as tag}
              <span class="text-white/50 border border-white/10 px-2.5 py-1 text-[10px] font-label tracking-wide rounded">
                {tag}
              </span>
            {/each}
          </div>

          <!-- Meta Info -->
          <div class="flex items-center justify-between pt-3 border-t border-white/10">
            <div>
              <p class="font-label text-[9px] uppercase tracking-wider text-white/30 mb-0.5">Client</p>
              <p class="font-body text-xs text-white/70">{project.client}</p>
            </div>
            <div class="text-right">
              <p class="font-label text-[9px] uppercase tracking-wider text-white/30 mb-0.5">Industry</p>
              <p class="font-body text-xs text-white/70">{project.industry}</p>
            </div>
          </div>

          <!-- CTA -->
          <a 
            href="#" 
            class="inline-flex items-center gap-2 mt-2 text-white/40 hover:text-primary transition-colors duration-300 font-label text-[10px] uppercase tracking-[0.2em] group/link"
          >
            Explore case
            <svg class="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </article>
    {/each}
  </div>

  <!-- Mobile Bottom Spacer -->
  <div class="h-16"></div>
</section>

<style>
  .list-mask {
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 10%,
      rgba(0, 0, 0, 1) 25%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 0.4) 90%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.4) 10%,
      rgba(0, 0, 0, 1) 25%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 0.4) 90%,
      transparent 100%
    );
  }

  .list-column {
    display: flex;
    flex-direction: column;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 100px;
    cursor: default;
    box-sizing: border-box;
  }

  .list-num {
    font-family: var(--font-body);
    font-size: 11px;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
    width: 20px;
  }

  .list-title {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    line-height: 1;
    letter-spacing: -0.03em;
    white-space: nowrap;
  }

  .meta-enter {
    animation: metaIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes metaIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Mobile Card Styles */
  .mobile-card {
    will-change: transform, opacity;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Hide scrollbar for mobile cards */
  #works-mobile::-webkit-scrollbar {
    display: none;
  }
</style>
