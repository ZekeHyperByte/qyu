import { writable } from 'svelte/store';
import type Lenis from 'lenis';

export const lenisStore = writable<Lenis | null>(null);
