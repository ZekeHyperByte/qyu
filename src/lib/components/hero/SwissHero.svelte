<script lang="ts">
  import HeroHeader from './HeroHeader.svelte';
  import HeroFooter from './HeroFooter.svelte';
  import Lanyard from './Lanyard.svelte';
</script>

<div id="home" class="h-screen w-full bg-white p-4 md:p-6 lg:p-8 overflow-hidden flex flex-col relative">
  <!-- Header with clock, nav, etc. -->
  <HeroHeader />
  
  <!-- Main content area -->
  <main class="flex-grow flex flex-col justify-center relative">
    <div class="grid grid-cols-12 gap-4 items-start">
      <!-- Name: Left side -->
      <div class="col-span-12 md:col-span-6 lg:col-span-7 z-10">
        <h2 class="text-6xl md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black kerning-tight leading-[0.85] uppercase">
          MHMMD<br/>
          <span class="text-[#E60012]">FIQI</span><br/>
          FRMNSYH<span class="text-[#E60012]">.</span>
        </h2>
      </div>
      
      <!-- Empty placeholder for grid alignment -->
      <div class="hidden md:block col-span-6 lg:col-span-5"></div>
    </div>
  </main>
  
  <!-- Footer -->
  <HeroFooter />
  
  <!-- Lanyard: Absolute positioned to overlay everything -->
  <div class="hidden md:block absolute top-0 right-0 w-[45%] h-full overflow-visible pointer-events-none">
    <div class="relative w-full h-full" style="padding-top: 0px;">
      <div class="relative w-full h-[600px] pointer-events-auto">
        <Lanyard />
      </div>
    </div>
  </div>
</div>

<style>
  .kerning-tight {
    letter-spacing: -0.06em;
  }
</style>
