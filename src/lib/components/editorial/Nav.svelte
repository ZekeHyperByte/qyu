<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { lenisStore } from '$lib/stores/lenis';

  const navItems = [
    { label: 'Home',    href: '#home' },
    { label: 'Works',   href: '#works' },
    { label: 'About',   href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  let navEl: HTMLElement;
  let contactLink: HTMLAnchorElement;
  let pillFill: HTMLSpanElement;
  let pillText: HTMLSpanElement;
  let circleFill: HTMLSpanElement;
  let arrowSpan: HTMLSpanElement;

  // Use scroll position rather than old sliderStore
  let scrolled = false;

  const PRIMARY = '#4d7cff';
  const WHITE   = '#ffffff';

  // Smooth-scroll via Lenis when clicking nav links
  function handleNavClick(e: MouseEvent, href: string) {
    const lenis = $lenisStore;
    if (!lenis) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) lenis.scrollTo(target as HTMLElement, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  }

  onMount(async () => {
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Detect scroll for nav shadow
    ScrollTrigger.create({
      start: 'top top-=80',
      onUpdate: (self) => { scrolled = self.progress > 0; },
    });

    // Contact button hover animation
    gsap.set(pillFill,   { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(circleFill, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(arrowSpan,  { x: 0 });

    const tl = gsap.timeline({ paused: true });
    tl
      .to(contactLink, { y: -3, scale: 1.04, duration: 0.3, ease: 'back.out(2)' }, 0)
      .to(pillFill,    { scaleX: 1, transformOrigin: 'left center', duration: 0.38, ease: 'power3.inOut' }, 0)
      .to(circleFill,  { scaleX: 1, transformOrigin: 'left center', duration: 0.32, ease: 'power3.inOut' }, 0.04)
      .to([pillText, arrowSpan], { color: WHITE, duration: 0.2, ease: 'power2.out' }, 0.1)
      .to(arrowSpan,   { x: 2, duration: 0.25, ease: 'power2.out' }, 0.12);

    const enter = () => tl.play();
    const leave = () => {
      gsap.set([pillFill, circleFill], { transformOrigin: 'right center' });
      tl.reverse().then(() => {
        gsap.set([pillFill, circleFill], { transformOrigin: 'left center' });
        gsap.set(arrowSpan, { x: 0 });
      });
    };

    contactLink.addEventListener('mouseenter', enter);
    contactLink.addEventListener('mouseleave', leave);

    return () => {
      contactLink.removeEventListener('mouseenter', enter);
      contactLink.removeEventListener('mouseleave', leave);
    };
  });
</script>

<nav bind:this={navEl} class="fixed top-0 w-full z-50 glass-nav" class:glass-nav--scrolled={scrolled}>
  <div class="flex justify-between items-center h-18 px-8 lg:px-10 max-w-[1440px] mx-auto relative">

    <!-- Wordmark -->
    <a href="#home" class="font-headline font-bold text-2xl tracking-tight text-on-surface hover:text-primary transition-colors duration-300">
      QYU
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex items-center gap-10 lg:gap-12">
      {#each navItems as item}
        <li>
          {#if item.label === 'Contact'}
            <a
              bind:this={contactLink}
              href={item.href}
              on:click={(e) => handleNavClick(e, item.href)}
              class="flex items-center gap-0 font-headline italic text-sm tracking-tight cursor-pointer select-none"
            >
              <span class="relative overflow-hidden rounded-full border px-4 py-1.5" style="border-color: {PRIMARY};">
                <span bind:this={pillFill} class="absolute inset-0 rounded-full" style="background: {PRIMARY}; transform: scaleX(0);" aria-hidden="true"></span>
                <span bind:this={pillText} class="relative z-10" style="color: {PRIMARY};">{item.label}</span>
              </span>
              <span class="relative overflow-hidden w-8 h-8 rounded-full border flex items-center justify-center -ml-px" style="border-color: {PRIMARY};">
                <span bind:this={circleFill} class="absolute inset-0 rounded-full" style="background: {PRIMARY}; transform: scaleX(0);" aria-hidden="true"></span>
                <span bind:this={arrowSpan} class="relative z-10" style="color: {PRIMARY}; display:flex;">
                  <svg width="12" height="9" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>
                  </svg>
                </span>
              </span>
            </a>
          {:else}
            <a
              href={item.href}
              on:click={(e) => handleNavClick(e, item.href)}
              class="font-headline italic text-[15px] tracking-tight transition-colors duration-300 text-on-surface-variant hover:text-on-surface pb-0.5 border-b border-transparent hover:border-primary"
            >
              {item.label}
            </a>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- Mobile hamburger -->
    <button class="md:hidden flex flex-col gap-1.5 p-1" aria-label="Open menu">
      <span class="w-6 h-0.5 bg-on-surface"></span>
      <span class="w-4 h-0.5 bg-on-surface"></span>
      <span class="w-6 h-0.5 bg-on-surface"></span>
    </button>
  </div>
  <div class="h-px w-full bg-outline-variant/30"></div>
</nav>
