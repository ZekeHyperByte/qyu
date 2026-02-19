<script lang="ts">
  // Generate array of 41 WebP image paths
  const images = Array.from({ length: 41 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `/images/webp/qyu-${num}.webp`;
  });
  
  let currentImage = $state(images[0]);
  let currentIndex = $state(0);
  let isLoading = $state(true);
  
  // Preload all images upfront
  async function preloadAllImages() {
    await Promise.all(images.map(src => 
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })
    ));
    isLoading = false;
  }
  
  // Initialize - preload images
  $effect(() => {
    preloadAllImages();
  });
  
  // Start cycling when ready
  $effect(() => {
    if (!isLoading) {
      // Start cycling every 2 seconds
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        currentImage = images[randomIndex];
        currentIndex = randomIndex;
      }, 2000);
      
      return () => clearInterval(interval);
    }
  });
</script>

<div class="flex flex-col items-center justify-center">
  {#if isLoading}
    <!-- Loading placeholder -->
    <div class="flex items-center justify-center p-8">
      <span class="text-black text-sm">Loading...</span>
    </div>
  {:else}
    <!-- Three-layer pill container with counter outside -->
    <div class="relative flex items-center justify-center">
      <!-- Image frame -->
      <div class="relative">
        <!-- Layer 3: Black pill (outer frame - 2px wider than white) -->
        <div class="bg-black rounded-[32px] p-[2px] relative z-10">
          <!-- Layer 2: White pill (middle frame - 4px gap around image) -->
          <div class="bg-white rounded-[30px] p-[4px]">
            <!-- Layer 1: Image container with 4:3 aspect ratio -->
            <div class="relative rounded-[26px] overflow-hidden" style="aspect-ratio: 4/3; width: min(500px, 70vw); max-height: 35vh;">
              <!-- Single image with hard cut -->
              <img 
                src={currentImage} 
                alt="Qyu"
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Counter positioned outside on the right (absolute, not part of flow) -->
      <div class="absolute left-full ml-3 flex flex-col items-center">
        <div class="h-6 w-8 overflow-hidden relative">
          {#key currentIndex}
            <span 
              class="text-black text-sm font-mono font-bold tracking-wider whitespace-nowrap h-6 flex items-center justify-center animate-slide"
            >
              {currentIndex + 1}
            </span>
          {/key}
        </div>
        <div class="w-4 h-[1px] bg-black my-1"></div>
        <span class="text-black text-[10px] font-mono">41</span>
      </div>
    </div>
    

  {/if}
</div>

<style>
  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .animate-slide {
    animation: slideDown 150ms ease-out;
  }
</style>
