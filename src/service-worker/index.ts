/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `sveltekit-cache-${version}`;

/**
 * Everything that should exist offline immediately:
 * - Vite/SvelteKit generated assets
 * - static/ folder
 * - prerendered routes
 */
const ASSETS = [
	...build,
	...files,
	...prerendered
];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);

			await cache.addAll(
				ASSETS.map((asset) => new URL(asset, sw.location.origin).pathname)
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

	// Only cache GET requests
	if (request.method !== 'GET') return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			/**
			 * Cache-first:
			 * - Great for JS/CSS/images/static files
			 * - Makes the app work offline
			 */
			const cached = await cache.match(request);

			if (cached) {
				return cached;
			}

			try {
				const response = await fetch(request);

				// Cache successful responses
				if (
					response.ok &&
					response.status === 200 &&
					response.type !== 'opaque'
				) {
					await cache.put(request, response.clone());
				}

				return response;
			} catch {
				/**
				 * Offline fallback:
				 * Try cached page assets
				 */
				const fallback = await cache.match('/');

				if (fallback) {
					return fallback;
				}

				throw new Error('Offline and resource not cached');
			}
		})()
	);
});