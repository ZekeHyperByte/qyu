<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
</script>

<section
  id="about"
  class="animate-fade-in-up animation-delay-200 relative flex h-full w-full flex-col justify-center border-outline-variant/60 px-8 py-20 lg:border-r lg:px-12 xl:px-16"
>
  <Nav />
  <p class="font-label mb-4 text-xs tracking-[0.3em] text-on-surface-variant uppercase">About</p>
  <h1 class="font-headline mb-6 max-w-md text-4xl leading-[1.05] font-bold tracking-tight text-on-surface sm:text-5xl">
    M Fiqi F <span class="font-light text-primary italic">— Qiiyu</span>
  </h1>
  <p class="font-body max-w-sm text-base leading-relaxed text-on-surface/65 sm:text-lg">
    Full-stack & mobile engineer — React, Flutter, Node — shipping production systems, with
    machine learning close behind.
  </p>
</section>
