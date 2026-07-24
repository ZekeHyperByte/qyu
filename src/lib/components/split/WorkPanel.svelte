<script lang="ts">
  import { projects } from '$lib/data/projects';
  import type { Project } from '$lib/data/projects';

  let { onselect }: { onselect: (project: Project) => void } = $props();
</script>

<section
  id="work"
  class="animate-fade-in-up animation-delay-300 flex h-full w-full flex-col justify-start px-8 py-10 lg:px-12 xl:px-16"
>
  <p class="font-label mb-4 text-xs tracking-[0.3em] text-on-surface-variant uppercase">Work Collection</p>

  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
    {#each projects as project (project.id)}
      <li>
        <button
          type="button"
          onclick={() => onselect(project)}
          class="project-card group relative block aspect-[4/3] w-full overflow-hidden bg-surface-container text-left"
        >
          <img
            src={project.img}
            alt={project.title}
            class="project-image absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
          <span class="font-label absolute right-3 bottom-3 left-3 text-sm font-semibold tracking-tight text-white sm:text-base">
            {project.title}
          </span>
          <span class="sr-only">{project.subtitle}</span>
        </button>
      </li>
    {/each}
  </ul>
</section>
