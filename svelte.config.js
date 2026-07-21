import adapter from '@sveltejs/adapter-static';

export default {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},

	kit: {
		adapter: adapter({
			fallback: '404.html',
			strict: false
		}),
		prerender: {
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
