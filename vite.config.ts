import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),

		SvelteKitPWA({
			registerType: 'autoUpdate',

			manifest: {
				name: 'HexScouter BioCore',
				short_name: 'BioCore',
				description: 'FRC scouting application',
				display: 'standalone',
				start_url: '/ScoutingHub27/',
				background_color: '#000000',
				theme_color: '#000000'
			},

			workbox: {
				globPatterns: [
					'**/*.{js,css,html,png,svg,ico,woff2,json}'
				]
			}
		})
	]
});