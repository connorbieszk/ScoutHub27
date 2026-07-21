import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function generateRoutes() {
	return {
		name: 'generate-routes',
		configResolved() {
			const routesDir = path.resolve('src/routes');

			function scan(dir: string, base = ''): string[] {
				const routes: string[] = [];

				for (const file of fs.readdirSync(dir)) {
					const full = path.join(dir, file);

					if (fs.statSync(full).isDirectory()) {
						routes.push(...scan(full, `${base}/${file}`));
					}

					if (file.startsWith('+page.')) {
						routes.push(base || '/');
					}
				}

				return routes;
			}

			const routes = [...new Set(scan(routesDir))];

			process.env.SVELTE_ROUTES = JSON.stringify(routes);
		},

		transform(code: string) {
			if (code.includes('__ROUTES__')) {
				return code.replace(
					'__ROUTES__',
					process.env.SVELTE_ROUTES || '[]'
				);
			}
		}
	};
}
export default defineConfig({
	plugins: [
		generateRoutes(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	]
});
