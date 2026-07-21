/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, prerendered, version } from '$service-worker';
	import { version as gitVersion } from '$app/environment';

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `sveltekit-cache-${version}-${gitVersion}`;

const ASSETS = [
	...build,
	...files,
	...prerendered
];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);

			await Promise.all(
				ASSETS.map(async (asset) => {
					const url = new URL(asset, sw.location.origin).pathname;

					try {
						await cache.add(url);
					} catch (err) {
						console.warn('Failed caching:', url, err);
					}
				})
			);

			await sw.skipWaiting();
		})()
	);
});


sw.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();

			await Promise.all(
				keys
					.filter((key) => key !== CACHE)
					.map((key) => caches.delete(key))
			);

			await sw.clients.claim();
		})()
	);
});


sw.addEventListener('fetch', (event) => {
	const request = event.request;

	if (request.method !== 'GET') return;

	const isNavigation =
		request.mode === 'navigate';

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			if (!isNavigation) {
				const cached = await cache.match(request);

				if (cached) return cached;
			}

			try {
				const response = await fetch(request);

				if (response.ok) {
					await cache.put(request, response.clone());
				}

				return response;
			} catch {
				if (isNavigation) {
					const fallback = await cache.match('/');

					if (fallback) {
						return fallback;
					}

					return new Response('Offline', {
						status: 503,
						statusText: 'Service Unavailable'
					});
				}

				throw new Error('Offline');
			}
		})()
	);
});