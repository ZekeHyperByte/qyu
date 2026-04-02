<script lang="ts">
  import Hero from '$lib/components/editorial/Hero.svelte';
  import Story from '$lib/components/editorial/Story.svelte';
  import Works from '$lib/components/editorial/Works.svelte';
  import About from '$lib/components/editorial/About.svelte';
  import Footer from '$lib/components/editorial/Footer.svelte';
</script>

<div class="bg-surface text-on-surface w-full" style="overflow-x: clip;"><Hero />
  <Story />
  <Works />
  <About />
  <Footer />
</div>

