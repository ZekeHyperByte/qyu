<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }
  
  let { size = 120, class: className = '' }: Props = $props();
</script>

<div 
  class="relative {className}"
  style="width: {size}px; height: {size}px;"
>
  <!-- Long shadow layers -->
  <div 
    class="absolute inset-0 text-swiss-red font-black select-none flex items-center justify-center"
    style="
      font-size: {size * 0.9}px;
      line-height: 1;
      text-shadow: 
        1px 1px 0 rgba(230, 0, 18, 0.9),
        2px 2px 0 rgba(230, 0, 18, 0.85),
        3px 3px 0 rgba(230, 0, 18, 0.8),
        4px 4px 0 rgba(230, 0, 18, 0.75),
        5px 5px 0 rgba(230, 0, 18, 0.7),
        6px 6px 0 rgba(230, 0, 18, 0.65),
        7px 7px 0 rgba(230, 0, 18, 0.6),
        8px 8px 0 rgba(230, 0, 18, 0.55),
        9px 9px 0 rgba(230, 0, 18, 0.5),
        10px 10px 0 rgba(230, 0, 18, 0.45),
        11px 11px 0 rgba(230, 0, 18, 0.4),
        12px 12px 0 rgba(230, 0, 18, 0.35),
        13px 13px 0 rgba(230, 0, 18, 0.3),
        14px 14px 0 rgba(230, 0, 18, 0.25),
        15px 15px 0 rgba(230, 0, 18, 0.2),
        16px 16px 0 rgba(230, 0, 18, 0.15),
        17px 17px 0 rgba(230, 0, 18, 0.1),
        18px 18px 0 rgba(230, 0, 18, 0.05);
    "
  >
    Q
  </div>
</div>

<style>
  .text-swiss-red {
    color: #E60012;
  }
</style>
