<script lang="ts">
  import { onMount, tick } from 'svelte';
  import gsap from 'gsap';
  import { Observer } from 'gsap/Observer';
  import { sliderStore } from '$lib/stores/slider';

  export let slides: { label: string, component: any }[] = [];

  let sections: HTMLElement[] = [];
  let outerWrappers: HTMLElement[] = [];
  let innerWrappers: HTMLElement[] = [];
  let bgWrappers: HTMLElement[] = [];

  let currentIndex = -1;
  let animating = false;
  let wrap: (value: number) => number;

  function gotoSection(index: number, direction: number) {
    index = wrap(index); // make sure it's valid (infinite loop)
    animating = true;
    
    let fromTop = direction === -1;
    let dFactor = fromTop ? -1 : 1;
    
    // If this is the very first load, snap it into place instantly
    let isInitialLoad = currentIndex === -1;
    let dur = isInitialLoad ? 0 : 1.25;
    
    let tl = gsap.timeline({
      defaults: { duration: dur, ease: "power1.inOut" },
      onComplete: () => { animating = false; }
    });

    if (currentIndex >= 0) {
      gsap.set(sections[currentIndex], { zIndex: 0 });
      tl.to(bgWrappers[currentIndex], { yPercent: -15 * dFactor })
        .set(sections[currentIndex], { autoAlpha: 0 });
    }
    
    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
        yPercent: i => i ? -100 * dFactor : 100 * dFactor
      }, { 
        yPercent: 0 
      }, 0)
      .fromTo(bgWrappers[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

    sliderStore.set({ index: index, total: slides.length });
    currentIndex = index;
  }

  onMount(async () => {
    gsap.registerPlugin(Observer);
    wrap = gsap.utils.wrap(0, slides.length);
    
    await tick();

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    let observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true
    });

    // We can still use arrow keys just like the example logic but trigged manually
    const onKeyDown = (e: KeyboardEvent) => {
      if (animating) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        gotoSection(currentIndex + 1, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        gotoSection(currentIndex - 1, -1);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    gotoSection(0, 1);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      observer.kill();
    };
  });
</script>

<div class="slider-container">
  {#each slides as slide, i}
    <section class="slider-section-obs" bind:this={sections[i]}>
      <div class="outer" bind:this={outerWrappers[i]}>
        <div class="inner" bind:this={innerWrappers[i]}>
          <div class="bg" bind:this={bgWrappers[i]}>
            <svelte:component this={slide.component} isActive={i === currentIndex} />
          </div>
        </div>
      </div>
    </section>
  {/each}

</div>
