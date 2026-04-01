<script lang="ts">
  import { lenisStore } from '$lib/stores/lenis';

  export let isActive = false;

  function scrollToTop() {
    const lenis = $lenisStore;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>

<footer id="contact" class="w-full h-screen min-h-[500px] bg-[#0c0c0b] flex flex-col justify-center p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10">
  
  <div class="relative w-full h-full max-w-[1700px] mx-auto flex flex-col justify-between overflow-hidden bg-[#0c0c0b] text-[#f2efe9] border border-white/10 rounded-[6px] shadow-2xl">
    
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
    <img 
      src="/footer.jpg" 
      alt="Footer Background" 
      class="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity blur-[6px]" 
    />
    <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0b] via-transparent to-[#0c0c0b]/60"></div>
    <div class="absolute inset-0 bg-black/20"></div>
  </div>

  <div class="relative z-10 flex flex-col justify-between h-full w-full p-6 sm:p-8 lg:p-10">
    
    <!-- Top Row -->
    <div class="flex justify-between items-start font-label text-[10px] md:text-[11px] tracking-[0.2em] uppercase opacity-75">
      <!-- Removed Name and Copyright -->
    </div>

    <!-- Middle Section -->
    <div class="flex flex-col justify-center items-center md:items-end w-full flex-1 mt-4 sm:mt-8 mb-4 sm:mb-8">
      
      <!-- Huge text -->
      <h2 class="font-headline text-[clamp(5rem,min(12vw,15vh),14rem)] leading-[0.85] tracking-tight uppercase font-bold text-center md:text-right drop-shadow-2xl text-[#f2efe9] mix-blend-plus-lighter w-full">
        Let's<br/>
        Start<br/>
        Talking
      </h2>

    </div>

    <!-- Bottom Row -->
    <div class="flex flex-row justify-between items-center w-full pt-6 opacity-90">
      
      <button on:click={scrollToTop} class="hover:text-primary transition-colors cursor-pointer p-2 group flex-shrink-0 flex items-center gap-2 font-label text-[10px] md:text-[11px] tracking-[0.2em] uppercase" aria-label="Back to top">
        <span class="text-lg md:text-xl leading-none font-normal block transition-transform group-hover:-translate-y-1.5 opacity-60">&uarr;</span>
        <span class="opacity-60 hidden sm:inline">Top</span>
      </button>

      <div class="flex gap-4 sm:gap-6 md:gap-8 items-center justify-end">
        <a href="https://www.linkedin.com/in/fiqifirmansyah" target="_blank" rel="noopener noreferrer" class="text-[#f2efe9] hover:text-primary transition-colors" aria-label="LinkedIn">
          <svg class="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM8.5 18H6V10H8.5V18ZM7.25 8.75C6.4 8.75 5.75 8.1 5.75 7.25C5.75 6.4 6.4 5.75 7.25 5.75C8.1 5.75 8.75 6.4 8.75 7.25C8.75 8.1 8.1 8.75 7.25 8.75ZM19 18H16.5V13.75C16.5 12.5 15.5 12 14.75 12C13.75 12 13 12.75 13 14V18H10.5V10H13V11.25C13.5 10.5 14.5 10 15.75 10C17.5 10 19 11.25 19 14V18Z" />
          </svg>
        </a>
        <a href="mailto:fiqifirmansyah5535@gmail.com" class="text-[#f2efe9] hover:text-primary transition-colors" aria-label="Email">
          <svg class="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/fiqifirmansyahz" target="_blank" rel="noopener noreferrer" class="text-[#f2efe9] hover:text-primary transition-colors" aria-label="Instagram">
          <svg class="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5Z"/>
          </svg>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" class="text-[#f2efe9] hover:text-primary transition-colors" aria-label="Discord">
          <svg class="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.02.02.05.03.08.02c1.71-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
          </svg>
        </a>
        <a href="https://open.spotify.com/user/kx48ivg92us142j8utdlyogs1?si=3c2e2cfb5189463e" target="_blank" rel="noopener noreferrer" class="text-[#f2efe9] hover:text-primary transition-colors" aria-label="Spotify">
          <svg class="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.18.29-.56.38-.85.21-2.34-1.43-5.3-1.75-8.79-.96-.33.08-.67-.13-.75-.47-.08-.33.13-.67.47-.75 3.82-.87 7.1-.51 9.72 1.12.29.18.38.56.2.85zm1.22-2.72c-.23.37-.72.49-1.09.26-2.7-1.66-6.81-2.14-9.96-1.17-.42.13-.86-.1-.99-.52-.13-.42.1-.86.52-.99 3.59-1.1 8.13-.56 11.26 1.35.37.23.49.72.26 1.07zm.11-2.83C14.52 8.86 8.92 8.68 5.64 9.69c-.49.15-1.01-.12-1.16-.61-.15-.49.12-1.01.61-1.16 3.79-1.16 9.99-.94 13.83 1.34.44.26.58.83.32 1.27-.26.43-.83.58-1.33.32z"/>
          </svg>
        </a>
      </div>
    </div>

    </div>
  </div>
</footer>
