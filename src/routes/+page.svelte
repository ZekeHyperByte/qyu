<script lang="ts">
  import Hero from '$lib/components/editorial/Hero.svelte';
  import Works from '$lib/components/editorial/Works.svelte';
  import About from '$lib/components/editorial/About.svelte';
  import Footer from '$lib/components/editorial/Footer.svelte';
</script>

<svelte:head>
  <title>M. Fiqi Firmansyah — Full-Stack Engineer &amp; ML Practitioner</title>
  <meta name="description" content="Portfolio of Muhammad Fiqi Firmansyah, full-stack engineer and ML practitioner based in Indonesia." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="bg-surface text-on-surface w-full" style="overflow-x: clip;">
  <Hero />
  <Works />
  <About />
  <Footer />
</div>

