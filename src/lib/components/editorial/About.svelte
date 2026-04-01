<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  export let isActive = false;

  let sectionRef: HTMLElement;
  let headlineSplit: any;
  let ctx: any;

  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  function scrambleSentence(sentenceEl: HTMLElement, duration: number, tl: any) {
    const original = sentenceEl.textContent || '';
    const chars = original.split('');

    tl.to({}, {
      duration,
      delay: 0,
      onUpdate: () => {
        const progress = tl.progress();
        const resolvedCount = Math.ceil(progress * chars.length);

        sentenceEl.textContent = chars.map((char, i) => {
          if (char === ' ') return ' ';
          if (i < resolvedCount) return original[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
      },
      onComplete: () => {
        sentenceEl.textContent = original;
      }
    });
  }

  onMount(async () => {
    // Dynamic import to avoid SSR errors
    const [{ default: ScrollTrigger }, { default: SplitType }] = await Promise.all([
      import('gsap/ScrollTrigger'),
      import('split-type')
    ]);

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // Split headline only
      headlineSplit = new SplitType('.about-headline', { types: 'lines, words' });

      // Dynamically apply gradient safely to the last word ("SURFACE.") so it moves flawlessly with GSAP properties
      if (headlineSplit.words && headlineSplit.words.length > 0) {
        headlineSplit.words[headlineSplit.words.length - 1].classList.add('gradient-text');
      }

      gsap.set('.about-headline .line', { overflow: 'hidden' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      // Pure mask reveal for the headline
      tl.from(headlineSplit.words, {
        yPercent: 140,
        rotate: 4,
        transformOrigin: "0% 100%",
        duration: 1.5,
        stagger: 0.12,
        ease: 'expo.out',
      })
      // CTA button
      .from('.about-cta', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, "-=0.8");

      // Scramble animation on the subheadline, triggered at the same time as the headline
      const subheadlineEl = sectionRef.querySelector('.subheadline') as HTMLElement;
      if (subheadlineEl) {
        const originalText = subheadlineEl.textContent || '';
        let lastProgress = 0;
        
        const scrambleTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        });
        
        scrambleTl.to({}, {
          duration: 1.8,
          ease: 'none',
          onUpdate: function() {
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
            subheadlineEl.textContent = '';
            lastProgress = 0;
          }
        });
      }
    }, sectionRef);

  });

  onDestroy(() => {
    if (ctx) ctx.revert();
    if (headlineSplit) headlineSplit.revert();
  });
</script>

<section id="about" bind:this={sectionRef} class="min-h-screen flex flex-col justify-center items-center py-32 lg:py-48 px-8 lg:px-10 bg-[#0c0c0b]">
  <div class="max-w-[1440px] mx-auto text-center">

    <h2 class="about-headline">
      ENGINEERING BEYOND THE SURFACE.
    </h2>

    <p class="subheadline">
      Algorithms that learn. Architecture that scales. Code that connects.
    </p>

    <a href="/profile" class="about-cta">
      <span>View Full Profile</span>
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="square"/>
      </svg>
      <span class="cta-line"></span>
    </a>

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
    font-size: clamp(3rem, 10vw, 9rem);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: #e8e8e4;
    margin-bottom: 48px;
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
    font-size: clamp(0.9rem, 1.4vw, 1.2rem);
    font-weight: 300;
    color: rgba(232, 232, 228, 0.45);
    letter-spacing: 0.02em;
    line-height: 1.6;
    white-space: nowrap;
  }

  .about-cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 56px;
    font-family: var(--font-label);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232, 232, 228, 0.35);
    text-decoration: none;
    position: relative;
    cursor: pointer;
  }

  .about-cta span:first-child {
    transition: letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
  }

  .about-cta:hover span:first-child {
    letter-spacing: 0.35em;
    color: #4d7cff;
  }

  .about-cta svg {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
  }

  .about-cta:hover svg {
    transform: translateX(6px) scaleX(1.15) rotate(-30deg);
    color: #4d7cff;
  }

  .cta-line {
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #4d7cff, #0035c5);
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about-cta:hover .cta-line {
    width: 100%;
  }
</style>
