<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { lenisStore } from '$lib/stores/lenis';

  let { children } = $props();

  let lenisInstance: import('lenis').default | null = null;

  onMount(async () => {
    if (!browser) return;

    // Lock scroll position immediately during load to prevent mobile scroll jump
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';

    const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    gsap.registerPlugin(ScrollTrigger);

    // Initialise Lenis with premium easing
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Official GSAP + Lenis integration
    // ScrollTrigger reads position from Lenis, not raw window.scrollY
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Ensure page starts at top after Lenis takes over
    window.scrollTo(0, 0);
    lenisInstance.scrollTo(0, { immediate: true });

    // Unlock scroll after Lenis is ready
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';

    lenisStore.set(lenisInstance);
  });

  onDestroy(() => {
    lenisInstance?.destroy();
    lenisStore.set(null);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
