import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react(), tailwindcss(), sveltekit()],
	assetsInclude: ['**/*.glb']
});