/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker';

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;

const ASSETS = [
	...build,
	...files
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);

			await cache.addAll(
				ASSETS.map((asset) =>
					new URL(asset, self.location.origin).pathname
				)
			);

			await self.skipWaiting();
		})()
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();

			await Promise.all(
				keys
					.filter((key) => key !== CACHE)
					.map((key) => caches.delete(key))
			);

			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			const cached = await cache.match(event.request);

			if (cached) {
				return cached;
			}

			try {
				const response = await fetch(event.request);

				if (response.ok) {
					await cache.put(
						event.request,
						response.clone()
					);
				}

				return response;
			} catch {
				const fallback = await cache.match('/');

				return (
					fallback ??
					new Response('Offline', {
						status: 503,
						statusText: 'Service Unavailable'
					})
				);
			}
		})()
	);
});