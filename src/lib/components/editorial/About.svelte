<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  export let isActive = false;

  let sectionRef: HTMLElement;
  let headlineSplit: any;
  let ctx: any;
  let scrambleScrollTrigger: any = null;

  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  onMount(async () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const [{ default: ScrollTrigger }, { default: SplitType }] = await Promise.all([
      import('gsap/ScrollTrigger'),
      import('split-type')
    ]);

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      headlineSplit = new SplitType('.about-headline', { types: 'lines,words' });

      if (headlineSplit.words && headlineSplit.words.length > 0) {
        headlineSplit.words[headlineSplit.words.length - 1].classList.add('gradient-text');
      }

      gsap.set('.about-headline .line', { overflow: 'hidden' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top 60%',
          toggleActions: prefersReducedMotion ? 'none none none none' : 'play none play reverse'
        }
      });

      tl.from(headlineSplit.words, {
        yPercent: 140,
        rotate: 4,
        transformOrigin: "0% 100%",
        duration: 1.5,
        stagger: 0.12,
        ease: 'expo.out',
      });

      const subheadlineEl = sectionRef.querySelector('.subheadline') as HTMLElement;
      if (subheadlineEl && !prefersReducedMotion) {
        const originalText = subheadlineEl.textContent || '';
        let lastProgress = 0;

        const scrambleTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef,
            start: 'top 60%',
            toggleActions: 'play none play reverse'
          }
        });

        scrambleScrollTrigger = scrambleTl.scrollTrigger;

        const updateInterval = isMobile ? 1000 / 30 : 1000 / 60;
        let lastUpdateTime = 0;

        scrambleTl.to({}, {
          duration: isMobile ? 1.2 : 1.8,
          ease: 'none',
          onUpdate: function() {
            const now = performance.now();
            if (now - lastUpdateTime < updateInterval) return;
            lastUpdateTime = now;

            const progress = this.progress();
            const chars = originalText.split('');
            const isReversing = progress < lastProgress;
            lastProgress = progress;

            const resolvedCount = isReversing
              ? Math.floor(progress * chars.length)
              : Math.ceil(progress * chars.length);

            subheadlineEl.textContent = chars.map((char, i) => {
              if (char === ' ') return ' ';
              if (isReversing ? i >= resolvedCount : i < resolvedCount) return originalText[i];
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join('');
          },
          onComplete: () => {
            subheadlineEl.textContent = originalText;
            lastProgress = 1;
          },
          onReverseComplete: () => {
            subheadlineEl.textContent = originalText;
            lastProgress = 0;
          }
        });
      } else if (subheadlineEl && prefersReducedMotion) {
        gsap.set(subheadlineEl, { opacity: 1 });
      }
    }, sectionRef);

  });

  onDestroy(() => {
    if (scrambleScrollTrigger) scrambleScrollTrigger.kill();
    if (ctx) ctx.revert();
    if (headlineSplit) headlineSplit.revert();
  });
</script>

<section id="about" bind:this={sectionRef} class="min-h-screen flex flex-col justify-center items-center py-20 md:py-32 lg:py-48 px-6 md:px-8 lg:px-10 bg-[#0c0c0b]">
  <div class="w-full max-w-[1440px] mx-auto text-center px-0 sm:px-4">

    <h2 class="about-headline">
      ENGINEERING BEYOND THE SURFACE.
    </h2>

    <p class="subheadline">
      Algorithms that learn. Architecture that scales. Code that connects.
    </p>

  </div>
</section>

<style>
  /* Prevent descender clipping from overflow: hidden on split lines */
  :global(.about-headline .line) {
    padding-bottom: 0.15em;
    margin-bottom: -0.15em;
  }

  .about-headline {
    font-family: var(--font-headline);
    font-size: clamp(2.25rem, 8vw, 9rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #e8e8e4;
    margin-bottom: clamp(24px, 5vw, 48px);
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  :global(.gradient-text) {
    background: linear-gradient(135deg, #4d7cff, #0035c5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    padding-right: 0.05em;
  }

  .subheadline {
    font-family: var(--font-body);
    font-size: clamp(0.75rem, 3vw, 1.2rem);
    font-weight: 300;
    color: rgba(232, 232, 228, 0.45);
    letter-spacing: 0.02em;
    line-height: 1.5;
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
    overflow: visible;
  }

  @media (max-width: 767px) {
    .subheadline {
      white-space: normal;
      font-size: clamp(0.65rem, 3.2vw, 0.9rem);
      letter-spacing: 0;
      padding: 0 1rem;
      max-width: 100%;
    }
  }

  </style>
