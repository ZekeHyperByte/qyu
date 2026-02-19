<script lang="ts">
  import ScrambleText from './ScrambleText.svelte';
</script>

<div class="font-mono text-xs sm:text-sm md:text-base tracking-wider flex items-baseline gap-1">
  <span class="text-red-500 text-[0.6em] align-super relative -top-1">
    [<svg class="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>]
  </span>
  <ScrambleText 
    text="INDONESIA" 
    class="text-black font-medium"
    duration={0.5}
  />
</div>
