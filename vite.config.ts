import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const appBase = "/ScoutHub27"

function getRoutes(dir: string, base = ''): string[] {
	const routes: string[] = [];

	for (const file of readdirSync(dir)) {
		const path = join(dir, file);
		const stat = statSync(path);

		if (stat.isDirectory()) {
			// Ignore SvelteKit special folders
			if (
				file.startsWith('(') ||
				file.startsWith('_') ||
				file === 'api'
			) {
				continue;
			}

			routes.push(...getRoutes(path, `${base}/${file}`));
		} else if (file === '+page.svelte' || file === '+page.ts' || file === '+page.js') {
			routes.push(base || '/');
		}
	}

	return routes;
}

function generateRoutes() {
	return {
		name: 'generate-routes',
		buildStart() {
			const routes = getRoutes(resolve('src/routes'));

			writeFileSync(
				resolve('static/routes.json'),
				JSON.stringify(routes, null, 2)
			);

			console.log('Generated routes:', routes);
		}
	};
}

export default defineConfig({
	base: appBase,
	plugins: [
		generateRoutes(),
		sveltekit()
	]
});