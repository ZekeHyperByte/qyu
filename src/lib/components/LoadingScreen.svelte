<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  let isLoading = true;
  let progress = 0;
  let fillEl: SVGPathElement;
  let containerEl: HTMLElement;
  let maskRect: SVGRectElement;
  let loadingText: HTMLSpanElement;

  // Simulate loading progress
  function simulateLoading() {
    const duration = 2000; // 2 seconds total loading time
    const startTime = Date.now();

    function updateProgress() {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1);

      // Update mask position to reveal the fill from bottom to top
      if (maskRect) {
        const height = 200;
        const newY = height - (progress * height);
        maskRect.setAttribute('y', String(newY));
        maskRect.setAttribute('height', String(progress * height));
      }

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Loading complete - animate out
        setTimeout(hideLoading, 300);
      }
    }

    requestAnimationFrame(updateProgress);
  }

  function hideLoading() {
    if (!containerEl) return;

    // Animate out
    gsap.to(containerEl, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        isLoading = false;
      }
    });

    // Animate Q letter flying up
    gsap.to('.q-letter', {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      delay: 0.1
    });

    // Animate text
    gsap.to(loadingText, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in'
    });
  }

  onMount(() => {
    // Small delay to ensure everything is ready
    setTimeout(() => {
      simulateLoading();
    }, 100);
  });

  onDestroy(() => {
    isLoading = false;
  });
</script>

{#if isLoading}
  <div 
    bind:this={containerEl}
    class="fixed inset-0 z-[9999] bg-[#0c0c0b] flex flex-col items-center justify-center"
  >
    <!-- Q Letter with Fill Animation -->
    <div class="relative q-letter">
      <svg 
        width="120" 
        height="140" 
        viewBox="0 0 120 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        class="drop-shadow-2xl"
      >
        <defs>
          <!-- Gradient for the fill -->
          <linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#4d7cff" />
            <stop offset="100%" stop-color="#0035c5" />
          </linearGradient>
          
          <!-- Mask for the fill animation -->
          <mask id="fillMask">
            <rect 
              bind:this={maskRect}
              x="0" 
              y="200" 
              width="120" 
              height="0" 
              fill="white"
            />
          </mask>
        </defs>
        
        <!-- Outline (always visible, darker) -->
        <path 
          d="M60 10C32.4 10 10 32.4 10 60C10 79.5 21.5 96.2 38 104.2L28 124H40L48.5 107.5C52.2 108.5 56 109 60 109C87.6 109 110 86.6 110 59C110 31.4 87.6 10 60 10ZM60 97C39.5 97 23 80.5 23 60C23 39.5 39.5 23 60 23C80.5 23 97 39.5 97 60C97 80.5 80.5 97 60 97Z"
          stroke="rgba(255,255,255,0.15)"
          stroke-width="2"
          fill="none"
        />
        
        <!-- Filled Q (animated via mask) -->
        <path 
          bind:this={fillEl}
          d="M60 10C32.4 10 10 32.4 10 60C10 79.5 21.5 96.2 38 104.2L28 124H40L48.5 107.5C52.2 108.5 56 109 60 109C87.6 109 110 86.6 110 59C110 31.4 87.6 10 60 10ZM60 97C39.5 97 23 80.5 23 60C23 39.5 39.5 23 60 23C80.5 23 97 39.5 97 60C97 80.5 80.5 97 60 97Z"
          fill="url(#fillGradient)"
          mask="url(#fillMask)"
        />
        
        <!-- The tail of Q (always visible) -->
        <path 
          d="M38 104.2L28 124H40L48.5 107.5"
          stroke="rgba(255,255,255,0.15)"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Loading Text -->
    <span 
      bind:this={loadingText}
      class="mt-8 font-label text-[11px] tracking-[0.3em] uppercase text-white/40"
    >
      Loading
    </span>

    <!-- Progress percentage -->
    <span class="mt-2 font-body text-[10px] text-white/25">
      {Math.round(progress * 100)}%
    </span>
  </div>
{/if}

<style>
  .q-letter {
    will-change: transform, opacity;
  }
</style>
