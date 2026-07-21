import adapter from '@sveltejs/adapter-static';
import { execSync } from 'node:child_process';

let gitHash;
try {
	gitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
	console.log(e);
	gitHash = 'development';
}

export default {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},

	kit: {
		adapter: adapter({
			fallback: '404.html',
			strict: false
		}),
		version: {
			name: gitHash
		},
		prerender: {
			entries: ['*'],
			handleHttpError: 'warn'
		},
		paths: {
			base: '/ScoutHub27'
		},
		alias: {
			$lib: 'src/lib'
		}
	}
};
