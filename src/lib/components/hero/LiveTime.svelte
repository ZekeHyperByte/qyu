<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let currentTime = $state('');
  let timeZone = $state('');
  let intervalId: ReturnType<typeof setInterval>;
  
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }
  
  function getTimeZone() {
    // Get timezone abbreviation (e.g., WIB, PST, EST)
    const timeZoneName = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short'
    }).formatToParts(new Date()).find(part => part.type === 'timeZoneName')?.value || '';
    return timeZoneName;
  }
  
  onMount(() => {
    timeZone = getTimeZone();
    updateTime(); // Initial time
    intervalId = setInterval(updateTime, 1000);
  });
  
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="font-mono text-xs sm:text-sm md:text-base tracking-wider">
  <span class="text-black">{currentTime}</span>
  <span class="text-red-500">{timeZone}</span>
</div>
