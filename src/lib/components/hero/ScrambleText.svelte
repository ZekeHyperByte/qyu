<script lang="ts">
  import { gsap } from 'gsap';
  
  interface Props {
    text: string;
    class?: string;
    scrambleChars?: string;
    duration?: number;
  }
  
  let { 
    text, 
    class: className = '', 
    scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    duration = 0.8
  }: Props = $props();
  
  let containerRef: HTMLSpanElement;
  let charSpans: HTMLSpanElement[] = [];
  let isHovering = $state(false);
  let masterTimeline: gsap.core.Timeline | null = null;
  
  function getRandomChar() {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  }
  
  function createScrambleTimeline(isEnter: boolean) {
    // Kill any existing timeline
    if (masterTimeline) {
      masterTimeline.kill();
      masterTimeline = null;
    }
    
    const tl = gsap.timeline();
    const staggerDelay = 0.03;
    
    if (isEnter) {
      // HOVER ENTER: Scramble then reveal each character
      charSpans.forEach((span, index) => {
        const targetChar = text[index];
        const charDelay = index * staggerDelay;
        
        // Create a timeline for this character that starts at the right delay
        const charTl = gsap.timeline({ delay: charDelay });
        
        // Phase 1: Show random characters (scramble effect)
        charTl.to({}, {
          duration: 0.15,
          ease: 'none',
          onUpdate: function() {
            if (this.progress() < 0.7) {
              // Scramble phase - update frequently
              if (Math.random() > 0.5) {
                span.textContent = getRandomChar();
              }
            } else {
              // Settle phase - show correct character
              span.textContent = targetChar;
            }
          }
        });
        
        // Add character timeline to master
        tl.add(charTl, 0);
      });
    } else {
      // HOVER LEAVE: Quick scramble back
      charSpans.forEach((span, index) => {
        const targetChar = text[index];
        const charDelay = index * (staggerDelay * 0.5);
        
        const charTl = gsap.timeline({ delay: charDelay });
        
        // Quick scramble back
        charTl.to({}, {
          duration: 0.12,
          ease: 'none',
          onUpdate: function() {
            if (this.progress() < 0.6) {
              if (Math.random() > 0.4) {
                span.textContent = getRandomChar();
              }
            } else {
              span.textContent = targetChar;
            }
          }
        });
        
        tl.add(charTl, 0);
      });
    }
    
    masterTimeline = tl;
    return tl;
  }
  
  function handleMouseEnter() {
    if (!containerRef || isHovering) return;
    isHovering = true;
    createScrambleTimeline(true);
  }
  
  function handleMouseLeave() {
    if (!containerRef || !isHovering) return;
    isHovering = false;
    createScrambleTimeline(false);
  }
  
  // Initialize characters on mount
  $effect(() => {
    if (charSpans.length > 0) {
      charSpans.forEach((span, i) => {
        if (span) span.textContent = text[i];
      });
    }
  });
</script>

<span 
  bind:this={containerRef}
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="button"
  tabindex="0"
  style="cursor: default; user-select: none; white-space: nowrap;"
>
  {#each text.split('') as char, i}
    <span bind:this={charSpans[i]} class="inline-block">{char}</span>
  {/each}
</span>
