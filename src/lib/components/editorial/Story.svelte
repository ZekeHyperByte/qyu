<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  let sectionRef: HTMLElement;
  let ctx: any;
  let wordEls: HTMLSpanElement[] = [];
  let animationReady = false;

  const storyText = "I'm Muhammad Fiqi Firmansyah — Qyu. Writing code since the 10th grade, now pursuing Informatics Engineering at Semarang State University, Indonesia. Fascinated by the architecture of massive codebases — the kind thousands of engineers shape over decades. I study how big tech builds systems that outlive their creators. When I'm not deep in a repository, I'm reading, watching films and anime, or tracking the latest in machine learning. Software engineering and ML aren't just fields I study — they're the craft I'm committed to mastering.";

  const words = storyText.split(' ');

  function collectWord(el: HTMLSpanElement) {
    const inner = el.querySelector('.story-word-inner') as HTMLSpanElement;
    if (inner && !wordEls.includes(inner)) {
      wordEls.push(inner);
    }
  }

  // Use tick to ensure all DOM elements are rendered before animating
  function setupAnimation() {
    if (wordEls.length === 0 || animationReady) return;
    
    animationReady = true;
    
    gsap.set(wordEls, { opacity: 0, x: 80, rotate: 3, filter: 'blur(4px)' });

    gsap.to(wordEls, {
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.035,
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        fastScrollEnd: true
      }
    });
  }

  onMount(async () => {
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // Small delay to ensure all word elements are collected
      setTimeout(() => {
        setupAnimation();
      }, 50);
    }, sectionRef);
  });

  onDestroy(() => {
    if (ctx) ctx.revert();
    animationReady = false;
    wordEls = [];
  });
</script>

<section id="story" bind:this={sectionRef} class="min-h-screen flex flex-col justify-center py-16 md:py-24 lg:py-32 px-8 lg:px-10 xl:px-20 bg-[#0c0c0b]">
  <div class="max-w-[1440px] mx-auto w-full">
    <p class="story-text max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw]">
      {#each words as word, i}
        <span use:collectWord class="story-word-outer"><span class="story-word-inner">{word}</span>{i < words.length - 1 ? ' ' : ''}</span>
      {/each}
    </p>
  </div>
</section>

<style>
  .story-text {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.8vw, 1.6rem);
    font-weight: 300;
    color: rgba(232, 232, 228, 0.75);
    line-height: 1.7;
    text-align: justify;
    letter-spacing: 0.01em;
  }

  .story-word-outer {
    display: inline;
  }

  .story-word-inner {
    display: inline-block;
    will-change: transform, opacity;
  }
</style>
