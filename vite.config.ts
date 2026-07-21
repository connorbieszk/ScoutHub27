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
					'**/*.{js,css,html,png,svg,ico,woff2,json}'
				]
			},

			manifest: {
				name: 'HexScouter BioCore',
				short_name: 'HexScouter',
				description: 'FRC scouting and team management app',
				start_url: '.',
				display: 'standalone',
				background_color: '#000000',
				theme_color: '#000000',
				icons: [
					{
						src: '/favicon.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});