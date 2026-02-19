<script lang="ts">
  interface Props {
    size?: number;
    opacity?: number;
    class?: string;
  }
  
  let { size = 18, opacity = 1, class: className = '' }: Props = $props();
</script>

<!-- Simple star using SVG with black fill -->
<div 
  class="star-indicator {className}"
  style="width: {size}px; height: {size}px; opacity: {opacity};"
>
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
</div>

<style>
  .star-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
