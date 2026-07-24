<script lang="ts">
  const languages = ['English', 'Indonesia'];
  let selected = $state('English');
  let open = $state(false);
  let root: HTMLDivElement;

  function toggle() {
    open = !open;
  }

  function select(lang: string) {
    selected = lang;
    open = false;
  }

  function handleClickOutside(e: MouseEvent) {
    if (root && !root.contains(e.target as Node)) open = false;
  }

  $effect(() => {
    if (!open) return;
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
</script>

<nav class="absolute top-6 right-6 z-50 flex items-center gap-2 md:top-8 md:right-8">
  <div class="relative" bind:this={root}>
    <button
      type="button"
      onclick={toggle}
      class="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      EN
      <svg class="h-3 w-3 transition-transform duration-200 {open ? 'rotate-180' : ''}" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    {#if open}
      <div class="absolute top-[calc(100%+8px)] right-0 w-40 rounded-2xl bg-white p-2 text-inverse-on-surface shadow-lg">
        {#each languages as lang}
          <button
            type="button"
            onclick={() => select(lang)}
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5"
          >
            {lang}
            {#if lang === selected}
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="currentColor" />
                <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="var(--color-inverse-surface)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</nav>
