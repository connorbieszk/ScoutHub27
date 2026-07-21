/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker';

declare const __ROUTES__: string[];

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;

const ASSETS = [
	...build,
	...files,
	...__ROUTES__
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);

			await cache.addAll(
				ASSETS.map((asset) => new URL(asset, self.location.origin).pathname)
			);

			await self.skipWaiting();
		})()
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys()) {
				if (key !== CACHE) {
					await caches.delete(key);
				}
			}

			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		(async (): Promise<Response> => {
			const cache = await caches.open(CACHE);

			const cached = await cache.match(event.request);

			if (cached) {
				return cached;
			}

			try {
				const response = await fetch(event.request);

				if (
					response.ok &&
					!response.headers.get('cache-control')?.includes('no-store')
				) {
					await cache.put(event.request, response.clone());
				}

				return response;
			} catch {
				const fallback = await cache.match('/');

				if (fallback) {
					return fallback;
				}

				return new Response('Offline', {
					status: 503,
					statusText: 'Service Unavailable'
				});
			}
		})()
	);
});