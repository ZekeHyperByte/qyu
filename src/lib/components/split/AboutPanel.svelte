<script lang="ts">
  import gsap from 'gsap';
  import Nav from '$lib/components/Nav.svelte';
  import profilePhoto from '$lib/assets/profile.jpg';
  import type { Project } from '$lib/data/projects';

  let { project, active }: { project: Project | null; active: boolean } = $props();

  let textEl: HTMLDivElement;
  let imageEl: HTMLDivElement;
  let imgEl: HTMLImageElement;
  let firstRun = true;

  $effect(() => {
    const isActive = active;

    const hidden = 'inset(0% 100% 100% 0%)';
    const revealed = 'inset(0% 0% 0% 0%)';

    if (firstRun) {
      firstRun = false;
      gsap.set(imageEl, { opacity: 0 });
      gsap.set(imgEl, { clipPath: hidden });
      return;
    }

    if (isActive) {
      gsap.to(textEl, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(imageEl, { opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.15 });
      gsap.to(imgEl, { clipPath: revealed, duration: 0.9, ease: 'power2.out', delay: 0.15 });
    } else {
      gsap.to(imgEl, { clipPath: hidden, duration: 0.8, ease: 'power2.inOut' });
      gsap.to(imageEl, { opacity: 0, duration: 0.15, ease: 'power2.in', delay: 0.65 });
      gsap.to(textEl, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.85 });
    }
  });
</script>

<section
  id="about"
  class="animate-fade-in-up animation-delay-200 relative flex h-full w-full flex-col justify-center border-outline-variant/60 px-8 py-20 lg:border-r lg:px-12 xl:px-16"
>
  {#if !active}
    <Nav />
  {/if}

  <div bind:this={textEl}>
    <enhanced:img
      src={profilePhoto}
      alt="M Fiqi F"
      class="mb-6 aspect-video w-full max-w-md rounded-2xl object-cover"
    />
    <h1 class="font-headline mb-6 max-w-md text-4xl leading-[1.05] font-bold tracking-tight text-on-surface sm:text-5xl">
      M Fiqi F <span class="font-light text-primary italic">— Qiiyu</span>
    </h1>
    <p class="font-body max-w-sm text-base leading-relaxed text-on-surface/65 sm:text-lg">
      Full-stack & mobile engineer — React, Flutter, Node — shipping production systems, with
      machine learning close behind.
    </p>
  </div>

  <div
    bind:this={imageEl}
    class="pointer-events-none absolute inset-x-0 top-0 h-full flex items-center justify-center bg-surface p-8 opacity-0 lg:h-3/4 lg:items-start lg:pt-[150px]"
    class:pointer-events-auto={active}
  >
    {#if project}
      <enhanced:img
        bind:this={imgEl}
        src={project.img}
        alt={project.title}
        class="max-h-full max-w-full object-contain"
      />
    {/if}
  </div>
</section>
