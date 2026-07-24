<script lang="ts">
  import type { Project } from '$lib/data/projects';

  let { project, onclose }: { project: Project; onclose: () => void } = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-surface text-on-surface lg:flex-row">
  <button
    type="button"
    onclick={onclose}
    aria-label="Close"
    class="fixed top-6 right-6 z-10 flex h-11 w-11 items-center justify-center text-on-surface transition-colors hover:text-primary md:top-8 md:right-8"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  </button>

  <div class="relative aspect-[4/3] w-full shrink-0 bg-surface-container lg:aspect-auto lg:h-full lg:w-1/2">
    <enhanced:img src={project.img} alt={project.title} class="h-full w-full object-cover" />
  </div>

  <div class="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
    <p class="font-label mb-3 text-xs tracking-[0.3em] text-on-surface-variant uppercase">{project.year} — {project.category}</p>
    <h2 class="font-headline mb-6 text-4xl leading-[0.95] font-bold tracking-tight sm:text-5xl">{project.title}</h2>
    <p class="font-body mb-8 max-w-md text-base leading-relaxed text-on-surface/70">{project.subtitle}</p>

    <dl class="mb-8 grid max-w-md grid-cols-2 gap-y-4 text-sm">
      <dt class="font-label text-xs tracking-widest text-on-surface-variant uppercase">Industry</dt>
      <dd class="font-body text-on-surface/80">{project.industry}</dd>
      <dt class="font-label text-xs tracking-widest text-on-surface-variant uppercase">Client</dt>
      <dd class="font-body text-on-surface/80">{project.client}</dd>
    </dl>

    <div class="flex flex-wrap gap-2">
      {#each project.tags as tag}
        <span class="font-label border-ghost px-3 py-1 text-xs tracking-wide text-on-surface/70">{tag}</span>
      {/each}
    </div>

    {#if project.link}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        class="font-label group mt-10 inline-flex w-fit items-center gap-2 text-xs tracking-[0.24em] text-on-surface/60 uppercase transition-colors hover:text-primary"
      >
        Visit project
        <svg class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    {/if}
  </div>
</div>
