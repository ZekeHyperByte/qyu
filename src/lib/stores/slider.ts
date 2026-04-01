import { writable } from 'svelte/store';

export const sliderStore = writable({ index: 0, total: 0 });
