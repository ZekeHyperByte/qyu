<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  const lines: { text: string; italic?: boolean; dot?: boolean }[][] = [
    [
      { text: 'Crafting\u00a0' },
      { text: 'Digital', italic: true },
    ],
    [
      { text: 'Experiences' },
      { text: '.', dot: true },
    ],
  ];

  let charEls: HTMLSpanElement[] = [];
  let subtitleEl: HTMLParagraphElement;
  let gundamEl: HTMLDivElement;
  let mainTl: gsap.core.Timeline;

  let ctaEl: HTMLAnchorElement;
  let ctaCircleFill: HTMLSpanElement;
  let ctaArrowSpan: HTMLSpanElement;

  function collectChar(el: HTMLSpanElement) {
    charEls.push(el);
  }

  onMount(() => {
    mainTl = gsap.timeline()
      .fromTo(charEls,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: { each: 0.024, from: 'start' } }, 0
      )
      .fromTo(subtitleEl,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.2'
      )
      .fromTo(gundamEl,
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, '-=0.45'
      )
      .fromTo(ctaEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35'
      );

    gsap.set(ctaCircleFill, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(ctaArrowSpan,  { x: 0 });

    const ctaTl = gsap.timeline({ paused: true });
    ctaTl
      .to(ctaEl, { y: -3, scale: 1.04, duration: 0.3, ease: 'back.out(2)' }, 0)
      .to(ctaCircleFill, { scaleX: 1, duration: 0.32, ease: 'power3.inOut' }, 0)
      .to([ctaArrowSpan], { color: 'var(--color-primary)', x: 2, duration: 0.25, ease: 'power2.out' }, 0.08);

    const enterCta = () => {
      gsap.set(ctaCircleFill, { transformOrigin: 'left center' });
      ctaTl.play();
    };
    const leaveCta = () => {
      gsap.set(ctaCircleFill, { transformOrigin: 'right center' });
      ctaTl.reverse().then(() => {
        gsap.set(ctaCircleFill, { transformOrigin: 'left center' });
        gsap.set(ctaArrowSpan, { x: 0 });
      });
    };

    if (ctaEl) {
      ctaEl.addEventListener('mouseenter', enterCta);
      ctaEl.addEventListener('mouseleave', leaveCta);
    }
  });
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" />

<!-- Dark hero section -->
<section id="home" class="relative h-screen w-full flex flex-col justify-between px-8 lg:px-10 xl:px-20 max-w-[1440px] mx-auto py-8 lg:py-16">

  <!-- Gundam artwork -->
  <div
    bind:this={gundamEl}
    style="opacity: 0;"
    class="absolute right-0 top-0 bottom-0 h-full pointer-events-none z-0 mix-blend-luminosity opacity-40"
  >
    <img
      src="/Gundam3.png"
      alt="Gundam Art"
      class="h-full w-auto object-contain object-right drop-shadow-2xl"
      fetchpriority="high"
      loading="eager"
    />
  </div>

  <!-- Heading -->
  <div class="relative z-10 flex-1 flex flex-col justify-center max-w-4xl xl:max-w-6xl pointer-events-auto">
    <h1
      class="font-headline text-[3.5rem] sm:text-[5rem] lg:text-[7rem] xl:text-[8rem] leading-[0.88] tracking-[-0.03em] font-medium mb-12 cursor-default select-none text-on-surface"
    >
      {#each lines as lineWords}
        <span class="block">
          {#each lineWords as word}
            {#each word.text.split('') as char}
              <span
                use:collectChar
                class="inline-block
                  {word.italic ? 'italic font-light' : ''}
                  {word.dot    ? 'text-primary'      : ''}"
                style="will-change: transform, opacity;"
              >{char === ' ' ? '\u00a0' : char}</span>
            {/each}
          {/each}
        </span>
      {/each}
    </h1>

    <p
      bind:this={subtitleEl}
      style="opacity: 0;"
      class="font-body text-lg md:text-xl text-on-surface-variant max-w-xl mb-16 leading-relaxed"
    >
      Full-stack engineer &amp; ML Engineer based in Indonesia.<br/>
      I bridge the gap between human storytelling and precise technical implementation.
    </p>

    <div class="flex flex-col sm:flex-row gap-6 items-start">
      <a
        bind:this={ctaEl}
        href="#contact"
        class="group flex items-center justify-between gap-4 bg-primary text-on-primary font-body font-bold text-sm uppercase tracking-widest pl-7 pr-2 py-2 rounded-full shadow-sm"
      >
        <span>Get in Touch</span>
        <div class="relative overflow-hidden flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary border border-transparent">
          <span bind:this={ctaCircleFill} class="absolute inset-0 bg-on-primary"></span>
          <span bind:this={ctaArrowSpan} class="relative z-10 material-symbols-outlined text-[1rem]">arrow_forward</span>
        </div>
      </a>
    </div>
  </div>
</section>
