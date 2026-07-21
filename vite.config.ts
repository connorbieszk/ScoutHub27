import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const appBase = '/ScoutHub27/';

export default defineConfig({
	plugins: [
		sveltekit(),

		SvelteKitPWA({
			registerType: 'autoUpdate',

			workbox: {
				navigateFallback: `${appBase}index.html`
			},

			manifest: {
				name: 'HexScouter BioCore',
				short_name: 'BioCore',
				scope: appBase,
				start_url: appBase,
				display: 'standalone',
				background_color: '#000000',
				theme_color: '#000000'
			}
		})
	]
});