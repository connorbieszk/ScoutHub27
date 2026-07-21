import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),

		SvelteKitPWA({
			registerType: 'autoUpdate',

			scope: '/ScoutHub27/',

			manifest: {
				name: 'HexScouter BioCore',
				short_name: 'BioCore',
				display: 'standalone',
				start_url: '/ScoutHub27/',
				background_color: '#000000',
				theme_color: '#000000'
			},

			workbox: {
				navigateFallback: '/ScoutHub27/index.html'
			}
		})
	]
});