import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const appBase = "/ScoutHub27"


export default defineConfig({
	base: appBase,
	plugins: [
		sveltekit()
	]
});