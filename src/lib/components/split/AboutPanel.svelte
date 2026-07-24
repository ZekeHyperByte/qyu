<script lang="ts">
  import gsap from 'gsap';
  import Nav from '$lib/components/Nav.svelte';
  import profilePhoto from '$lib/assets/profile.jpg';
  import type { Project } from '$lib/data/projects';

  let { project, active }: { project: Project | null; active: boolean } = $props();

  let textEl: HTMLDivElement;
  let imageEl: HTMLDivElement;
  let imgEl: HTMLElement;
  let firstRun = true;

  let currentIndex = $state(0);
  let images = $derived(project?.gallery?.length ? project.gallery : []);

  $effect(() => {
    project;
    currentIndex = 0;
  });

  $effect(() => {
    if (!active || images.length <= 1) return;
    const id = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 3000);
    return () => clearInterval(id);
  });

  $effect(() => {
    const isActive = active;

    const isPortrait = project?.id === 3;
    const hidden = isPortrait ? 'inset(0% 0% 100% 0%)' : 'inset(0% 100% 0% 0%)';
    const revealed = 'inset(0% 0% 0% 0%)';

    gsap.killTweensOf([textEl, imageEl, imgEl]);

    if (firstRun) {
      firstRun = false;
      gsap.set(imageEl, { opacity: 0 });
      gsap.set(imgEl, { clipPath: hidden, scale: 1.06 });
      return;
    }

    if (isActive) {
      gsap.to(textEl, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(imageEl, { opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.15 });
      gsap.to(imgEl, { clipPath: revealed, duration: 1, ease: 'power2.inOut', delay: 0.15 });
      gsap.to(imgEl, { scale: 1, duration: 1.1, ease: 'power2.out', delay: 0.15 });
    } else {
      gsap.to(imgEl, { clipPath: hidden, duration: 0.8, ease: 'power2.inOut' });
      gsap.set(imgEl, { scale: 1.06, delay: 0.8 });
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
    <img
      src={profilePhoto}
      alt="Muhammad Fiqi Firmansyah — Software Engineer"
      class="mb-6 aspect-video w-full max-w-lg rounded-2xl object-cover"
    />
    <h1 class="font-headline mb-6 max-w-md text-4xl leading-[1.05] font-bold tracking-tight text-on-surface sm:text-5xl">
      <span class="sr-only">Muhammad Fiqi Firmansyah — </span>M Fiqi F <span
        class="font-light text-primary italic">— Qiiyu</span
      >
    </h1>
    <p class="font-body max-w-sm text-base leading-relaxed text-on-surface/65 sm:text-lg">
      Full-stack & mobile engineer — React, Flutter, Node — shipping production systems, with
      machine learning close behind.
    </p>
  </div>

  <div
    bind:this={imageEl}
    class="pointer-events-none absolute inset-x-0 top-0 flex h-full flex-col items-center justify-center gap-3 bg-surface p-6 opacity-0 lg:h-[85%]"
    class:pointer-events-auto={active}
  >
    {#if project}
      {#if project.video}
        <video
          bind:this={imgEl}
          src={project.video}
          class="max-h-full max-w-full object-contain"
          autoplay
          muted
          loop
          playsinline
        ></video>
      {:else if images.length > 1}
        <div bind:this={imgEl} class="relative w-full min-h-0 flex-1">
          {#each images as src, i (src)}
            <img
              {src}
              alt={project.title}
              class="absolute inset-x-0 w-full object-contain transition-opacity duration-700 ease-in-out {project.id ===
              3
                ? 'bottom-0 h-[82%]'
                : 'inset-y-0 h-full'}"
              style="opacity: {i === currentIndex ? 1 : 0}"
            />
          {/each}
        </div>

        <p class="font-label text-sm tracking-[0.15em] text-on-surface-variant uppercase">
          {project.captions?.[currentIndex] ?? ''}
        </p>

        <div class="flex items-center gap-2.5">
          {#each images as _, i}
            <button
              type="button"
              aria-label={`Show image ${i + 1} of ${images.length}`}
              onclick={() => (currentIndex = i)}
              class="h-2 rounded-full transition-all {i === currentIndex
                ? 'w-6 bg-primary'
                : 'w-2 bg-on-surface/30'}"
            ></button>
          {/each}
        </div>
      {:else}
        <img
          bind:this={imgEl}
          src={project.img}
          alt={project.title}
          class="max-h-full max-w-full object-contain"
        />
      {/if}
    {/if}
  </div>
</section>
