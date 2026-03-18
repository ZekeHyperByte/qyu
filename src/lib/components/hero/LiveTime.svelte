<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let currentTime = $state('');
  let intervalId: ReturnType<typeof setInterval>;
  
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }
  
  onMount(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  });
  
  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<span class="text-xs font-bold font-mono">{currentTime}</span>
