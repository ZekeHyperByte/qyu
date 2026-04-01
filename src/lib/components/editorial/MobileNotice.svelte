<script lang="ts">
  import { onMount } from 'svelte';

  let isDesktop = true;

  onMount(() => {
    const check = () => {
      isDesktop = window.innerWidth >= 768;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  });
</script>

{#if !isDesktop}
  <div class="mobile-notice">
    <div class="notice-content">
      <div class="notice-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>
      <h1>Desktop Only</h1>
      <p>This portfolio is designed for desktop viewing. Please switch to a desktop browser for the full experience.</p>
    </div>
  </div>
{/if}

<style>
  .mobile-notice {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #0c0c0b;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .notice-content {
    text-align: center;
    color: #f2efe9;
    max-width: 320px;
  }

  .notice-icon {
    margin-bottom: 1.5rem;
    color: rgba(242, 239, 234, 0.3);
  }

  h1 {
    font-family: var(--font-headline, 'Montserrat', sans-serif);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.75rem;
    color: #f2efe9;
  }

  p {
    font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.6;
    color: rgba(242, 239, 234, 0.5);
  }
</style>
