<script lang="ts">
  import StarIndicator from './StarIndicator.svelte';
  import { gsap } from 'gsap';
  
  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Home', href: '#home' },
    { label: 'Contact', href: '#contact' }
  ];
  
  let activeIndex = $state(2); // Home is default (index 2)
  let hoveredIndex = $state<number | null>(null);
  let itemRefs: HTMLElement[] = $state([]);
  let containerRef: HTMLElement;
  let mainStarRef: HTMLElement;
  let ghostStarRef: HTMLElement;
  let mounted = $state(false);
  
  // Store current positions to handle resize
  let currentPositions: number[] = $state([]);
  
  // Initialize positions when container and item refs are ready
  $effect(() => {
    if (itemRefs.length > 0 && containerRef) {
      updatePositions();
      
      // Add resize listener
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }
  });
  
  // Initialize main star after mount (first render when mainStarRef is set)
  $effect(() => {
    if (currentPositions.length > 0 && mainStarRef && !mounted) {
      const initialPos = currentPositions[activeIndex];
      gsap.set(mainStarRef, { 
        left: initialPos, 
        xPercent: -50,
        opacity: 0,
        scale: 1 
      });
      
      // Fade in the main star
      gsap.to(mainStarRef, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      mounted = true;
    }
  });
  
  // Initialize ghost star once it becomes available
  $effect(() => {
    if (ghostStarRef && currentPositions.length > 0) {
      const initialPos = currentPositions[activeIndex];
      gsap.set(ghostStarRef, {
        left: initialPos,
        xPercent: -50,
        opacity: 0
      });
    }
  });
  
  // Update all positions
  function updatePositions() {
    currentPositions = itemRefs.map((_, index) => getItemCenter(index));
  }
  
  // Handle window resize - recalculate positions
  function handleResize() {
    updatePositions();
    // Immediately update both stars to correct positions
    gsap.set(mainStarRef, { left: currentPositions[activeIndex] });
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      gsap.set(ghostStarRef, { left: currentPositions[hoveredIndex] });
    }
  }
  
  // Calculate the center position of a nav item relative to container
  function getItemCenter(index: number): number {
    if (!itemRefs[index] || !containerRef) return 0;
    const item = itemRefs[index];
    const container = containerRef;
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return itemRect.left - containerRect.left + itemRect.width / 2;
  }
  
  // Animate main star to new position with GSAP
  function animateMainStarTo(targetIndex: number) {
    if (!mainStarRef) return;
    
    const targetPos = currentPositions[targetIndex];
    
    // Kill any existing animation on main star to prevent conflicts
    gsap.killTweensOf(mainStarRef);
    
    // Smooth animation to new position
    gsap.to(mainStarRef, {
      left: targetPos,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Fade out ghost star after main star arrives
        if (ghostStarRef) {
          gsap.to(ghostStarRef, {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.out'
          });
        }
      }
    });
  }
  
  // Handle nav item click
  function handleNavClick(index: number, href: string) {
    if (index === activeIndex) return;
    
    // Update URL hash
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', href);
    }
    
    // Animate main star from its current position to the clicked item
    // Ghost star will fade out after main star arrives (handled in onComplete)
    animateMainStarTo(index);
    
    // Update active index
    activeIndex = index;
  }
  
  // Handle hover - move ghost star smoothly
  function handleMouseEnter(index: number) {
    if (index === activeIndex) return;
    
    hoveredIndex = index;
    
    if (ghostStarRef) {
      const targetPos = currentPositions[index];
      
      // Kill any existing ghost animation
      gsap.killTweensOf(ghostStarRef);
      
      // Set position immediately, then fade in
      gsap.set(ghostStarRef, { left: targetPos });
      
      // Fade in ghost star
      gsap.to(ghostStarRef, {
        opacity: 0.4,
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  }
  
  function handleMouseLeave() {
    hoveredIndex = null;
    
    // Fade out ghost star
    if (ghostStarRef) {
      gsap.killTweensOf(ghostStarRef);
      gsap.to(ghostStarRef, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out'
      });
    }
  }
</script>

<nav class="flex items-center justify-center">
  <div bind:this={containerRef} class="relative flex items-center gap-1 sm:gap-2 md:gap-6 bg-white/30 px-2 sm:px-3 md:px-6 py-1 sm:py-2 md:py-3 rounded-full">
    
    <!-- Main Star - GSAP animated -->
    <div 
      bind:this={mainStarRef}
      class="absolute -top-5 pointer-events-none z-20"
      style="left: 0px; transform: translateX(-50%); opacity: 0;"
    >
      <div class="star-icon">
        <StarIndicator size={20} class="text-black" />
      </div>
    </div>
    
    <!-- Ghost Star - single element -->
    {#if mounted}
    <div 
      bind:this={ghostStarRef}
      class="absolute -top-5 pointer-events-none ghost-star z-10"
      style="left: 0px; transform: translateX(-50%); opacity: 0;"
    >
      <StarIndicator size={20} class="text-black" />
    </div>
    {/if}
    
    {#each navItems as item, index}
      <div 
        bind:this={itemRefs[index]}
        class="flex flex-col items-center px-2"
        onmouseenter={() => handleMouseEnter(index)}
        onmouseleave={handleMouseLeave}
        role="button"
        tabindex="0"
      >
        <a
          href={item.href}
          class="text-black text-[10px] sm:text-xs md:text-base hover:opacity-60 transition-opacity duration-200 font-medium whitespace-nowrap"
          onclick={(e) => {
            e.preventDefault();
            handleNavClick(index, item.href);
          }}
        >
          {item.label}
        </a>
      </div>
    {/each}
    
  </div>
</nav>

<style>
  .ghost-star {
    /* GSAP controls all animations */
  }
  
  .star-icon {
    transform-origin: center center;
  }
</style>
