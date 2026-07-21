import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			}, adapter: adapter()
		}),

		SvelteKitPWA({
			registerType: 'autoUpdate',

			workbox: {
				globPatterns: [
					'**/*.{js,css,html,ico,png,svg,woff2,webp}'
				],

				navigateFallback: '/'
			},

			manifest: {
				name: 'HexScouter BioCore',
				short_name: 'BioCore',
				description: 'FRC scouting application',
				display: 'standalone',
				start_url: '/',
				background_color: '#000000',
				theme_color: '#000000'
			}
		})
	]
});