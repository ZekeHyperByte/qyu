<script lang="ts">
  import AboutPanel from '$lib/components/split/AboutPanel.svelte';
  import WorkPanel from '$lib/components/split/WorkPanel.svelte';
  import ContactPanel from '$lib/components/split/ContactPanel.svelte';
  import ProjectDetail from '$lib/components/split/ProjectDetail.svelte';
  import type { Project } from '$lib/data/projects';

  let selectedProject: Project | null = $state(null);
</script>

<div class="bg-surface text-on-surface relative h-dvh w-full overflow-hidden">
  <span class="font-doodle fixed top-6 left-6 z-50 text-5xl text-white md:top-8 md:left-8 md:text-6xl">
    qiiyu
  </span>

  <div class="flex h-full min-h-0 w-full flex-col lg:flex-row">
    <div class="h-1/2 min-h-0 w-full overflow-hidden lg:h-full lg:w-2/5">
      <AboutPanel />
    </div>
    <div class="flex h-1/2 min-h-0 w-full flex-col lg:h-full lg:w-3/5">
      <div class="scrollbar-modern h-3/4 min-h-0 w-full overflow-y-auto">
        <WorkPanel onselect={(project) => (selectedProject = project)} />
      </div>
      <div class="h-1/4 min-h-0 w-full overflow-hidden">
        <ContactPanel />
      </div>
    </div>
  </div>
</div>

{#if selectedProject}
  <ProjectDetail project={selectedProject} onclose={() => (selectedProject = null)} />
{/if}
