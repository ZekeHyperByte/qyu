<script lang="ts">
  import gsap from 'gsap';
  import AboutPanel from '$lib/components/split/AboutPanel.svelte';
  import WorkPanel from '$lib/components/split/WorkPanel.svelte';
  import ContactPanel from '$lib/components/split/ContactPanel.svelte';
  import type { Project } from '$lib/data/projects';

  let selectedProject: Project | null = $state(null);
  let lastProject: Project | null = $state(null);

  let curtainEl: HTMLDivElement;
  let detailTextEl: HTMLDivElement;
  let firstRun = true;

  $effect(() => {
    if (selectedProject) lastProject = selectedProject;
  });

  function close() {
    selectedProject = null;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  $effect(() => {
    const isOpen = selectedProject !== null;

    const textItems = detailTextEl.children;

    if (firstRun) {
      firstRun = false;
      gsap.set(curtainEl, { scaleY: 0 });
      gsap.set(textItems, { opacity: 0, y: 16 });
      return;
    }

    if (isOpen) {
      gsap
        .timeline()
        .to(curtainEl, { scaleY: 1, duration: 1.1, ease: 'power2.inOut' })
        .to(
          textItems,
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.07 },
          '-=0.5'
        );
    } else {
      gsap
        .timeline()
        .to(textItems, { opacity: 0, y: 12, duration: 0.3, ease: 'power2.in', stagger: { each: 0.03, from: 'end' } })
        .to(curtainEl, { scaleY: 0, duration: 1, ease: 'power2.inOut' }, '-=0.15');
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="bg-surface text-on-surface relative h-dvh w-full overflow-hidden">
  <span class="font-doodle fixed top-6 left-6 z-50 text-5xl text-white md:top-8 md:left-8 md:text-6xl">
    qiiyu
  </span>

  {#if selectedProject}
    <button
      type="button"
      onclick={close}
      aria-label="Close"
      class="fixed top-6 right-6 z-[70] flex h-11 w-11 items-center justify-center text-on-surface transition-colors hover:text-primary md:top-8 md:right-8"
    >
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  {/if}

  <div class="flex h-full min-h-0 w-full flex-col lg:flex-row">
    <div class="h-1/2 min-h-0 w-full overflow-hidden lg:h-full lg:w-2/5">
      <AboutPanel project={lastProject} active={selectedProject !== null} />
    </div>
    <div class="flex h-1/2 min-h-0 w-full flex-col lg:h-full lg:w-3/5">
      <div class="scrollbar-modern relative h-3/4 min-h-0 w-full overflow-y-auto border-b border-outline-variant/60">
        <WorkPanel onselect={(project) => (selectedProject = project)} />

        <div
          bind:this={curtainEl}
          class="scrollbar-none pointer-events-none absolute inset-0 z-20 origin-top scale-y-0 overflow-y-auto bg-surface"
          class:pointer-events-auto={selectedProject}
        >
          <div
            bind:this={detailTextEl}
            class="flex min-h-full w-full flex-col justify-center px-8 py-12 lg:px-16"
            inert={!selectedProject}
          >
            {#if lastProject}
              <p class="font-label mb-3 text-xs tracking-[0.3em] text-on-surface-variant uppercase">
                {lastProject.year} — {lastProject.category}
              </p>
              <h2 class="font-headline mb-6 text-4xl leading-[0.95] font-bold tracking-tight sm:text-5xl">
                {lastProject.title}
              </h2>
              <p class="font-body mb-8 max-w-md text-base leading-relaxed text-on-surface/70">
                {lastProject.subtitle}
              </p>

              <dl class="mb-8 grid max-w-md grid-cols-2 gap-y-4 text-sm">
                <dt class="font-label text-xs tracking-widest text-on-surface-variant uppercase">Industry</dt>
                <dd class="font-body text-on-surface/80">{lastProject.industry}</dd>
                <dt class="font-label text-xs tracking-widest text-on-surface-variant uppercase">Client</dt>
                <dd class="font-body text-on-surface/80">{lastProject.client}</dd>
              </dl>

              <div class="flex flex-wrap gap-2">
                {#each lastProject.tags as tag}
                  <span class="font-label border-ghost px-3 py-1 text-xs tracking-wide text-on-surface/70">{tag}</span>
                {/each}
              </div>

              {#if lastProject.link}
                <a
                  href={lastProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-label group mt-10 inline-flex w-fit items-center gap-2 text-xs tracking-[0.24em] text-on-surface/60 uppercase transition-colors hover:text-primary"
                >
                  Visit project
                  <svg
                    class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              {/if}
            {/if}
          </div>
        </div>
      </div>
      <div class="h-1/4 min-h-0 w-full overflow-hidden">
        <ContactPanel />
      </div>
    </div>
  </div>
</div>
