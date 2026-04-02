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
  let gundamEl: HTMLDivElement;
  let mainTl: gsap.core.Timeline;

  function collectChar(el: HTMLSpanElement) {
    charEls.push(el);
  }

  onMount(() => {
    mainTl = gsap.timeline()
      .fromTo(charEls,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: { each: 0.024, from: 'start' } }, 0
      )
      .fromTo(gundamEl,
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, '-=0.45'
      );
  });
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" />

<!-- Dark hero section -->
<section id="home" class="relative h-screen w-full flex flex-col justify-between px-8 lg:px-10 xl:px-20 max-w-[1440px] mx-auto py-8 lg:py-16">

  <!-- Gundam artwork -->
  <div
    bind:this={gundamEl}
    style="opacity: 0;"
    class="absolute right-0 top-0 bottom-0 h-full pointer-events-none z-0 mix-blend-luminosity opacity-20 md:opacity-40"
  >
    <img
      src="/Gundam3.png"
      alt="Gundam Art"
      class="h-full w-auto object-contain object-right scale-90 md:scale-100 drop-shadow-2xl"
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


  </div>
</section>
