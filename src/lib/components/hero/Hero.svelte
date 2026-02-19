<script lang="ts">
  import RandomName from './RandomName.svelte';
  import LiveTime from './LiveTime.svelte';
  import Location from './Location.svelte';
  import TransparentNav from './TransparentNav.svelte';
</script>

<div id="home" class="min-h-screen w-full bg-white p-2 sm:p-3 md:p-6 lg:p-8">
  <div class="min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] w-full border border-black sm:border-2 rounded md:rounded-lg lg:rounded-xl relative flex flex-col">
    
    <!-- Time - Top Left -->
    <div class="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 z-10">
      <LiveTime />
    </div>
    
    <!-- Location - Top Right -->
    <div class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-6 md:right-6 z-10">
      <Location />
    </div>
    
    <!-- Main Content - Centered -->
    <div class="flex-1 flex flex-col items-center justify-center px-2 sm:px-3 md:px-8 lg:px-16">
      <!-- Animated Name -->
      <div class="w-full max-w-[200px] sm:max-w-[280px] md:max-w-md lg:max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-12">
        <RandomName />
      </div>
    </div>
    
    <!-- Navigation - Bottom -->
    <div class="pb-3 sm:pb-4 md:pb-8 px-2 sm:px-3 -mt-5">
      <TransparentNav />
    </div>
    
  </div>
</div>
