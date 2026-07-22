<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { Themes, setTheme } from '$lib/themes';

	var confirm: boolean = $state(false);

	async function aggressiveWipeAndReload(): Promise<void> {
	if (!confirm) {
		confirm = true;
		return;
	}

	// Remove service workers
	if ('serviceWorker' in navigator) {
		const registrations = await navigator.serviceWorker.getRegistrations();

		for (const registration of registrations) {
			await registration.unregister();
		}
	}

	// Remove Cache Storage
	if ('caches' in window) {
		const cacheNames = await caches.keys();

		await Promise.all(
			cacheNames.map((name: string) => caches.delete(name))
		);
	}

	// Remove IndexedDB databases
	if ('indexedDB' in window && 'databases' in indexedDB) {
		const databases = await indexedDB.databases();

		await Promise.all(
			databases.map(
				(db: IDBDatabaseInfo): Promise<void> =>
					new Promise((resolve) => {
						if (!db.name) {
							resolve();
							return;
						}

						const request = indexedDB.deleteDatabase(db.name);

						request.onsuccess = () => resolve();
						request.onerror = () => resolve();
						request.onblocked = () => resolve();
					})
			)
		);
	}

	// Clear Web Storage
	localStorage.clear();
	sessionStorage.clear();

	// Clear cookies accessible to JavaScript
	document.cookie.split(';').forEach((cookie: string) => {
		const name = cookie.split('=')[0]?.trim();

		if (!name) return;

		const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';

		document.cookie = `${name}=; ${expire}; path=/`;
		document.cookie = `${name}=; ${expire}; path=/; domain=${location.hostname}`;
		document.cookie = `${name}=; ${expire}; path=/; domain=.${location.hostname}`;
	});

	if ('storageBuckets' in navigator) {
		try {
			const buckets = await navigator.storageBuckets.keys();

			await Promise.all(
				buckets.map((bucket: string) =>
					navigator.storageBuckets.delete(bucket)
				)
			);
		} catch {
			// Unsupported or blocked
		}
	}

	if (navigator.storage?.persisted) {
		try {
			await navigator.storage.persisted();
		} catch {
			// Ignore
		}
	}

	// Force a true reload
	window.location.replace(
		`${window.location.pathname}?reset=${Date.now()}`
	);
}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="content">
	<div class="title">
		<h1>Settings</h1>
	</div>
	<div class="title">
		<h2>Theme</h2>
	</div>
	<Button
		onclick={() => {
			setTheme(Themes.DARK);
		}}
	>
		Dark Theme
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.HEX_DARK);
		}}
	>
		Dark Theme (Hexy)
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.LIGHT);
		}}
	>
		Light Theme
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.HEX_LIGHT);
		}}
	>
		Light Theme (Hexy)
	</Button>
	<br />
	<div class="title">
		<h2>Debug</h2>
	</div>
	<Button onclick={aggressiveWipeAndReload} type="reset" variant="danger"
		>{confirm ? 'Confirm?' : 'Wipe Site Data'}</Button
	>
	<br />
	<div class="title">
		<h2>Menus</h2>
	</div>
	<Button href="/admin">Admin Menu</Button>
	<Button href="/debug">Testing Menu</Button>
</div>

<style>
	div.title {
		padding: var(--default-padding);
	}
</style>
