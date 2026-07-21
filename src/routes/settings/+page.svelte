<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { Themes, setTheme } from '$lib/themes';

	var confirm: boolean = $state(false);

	async function aggressiveWipeAndReload() {
		if (!confirm) {
			confirm = true;
			return;
		}
		if ('serviceWorker' in navigator) {
			const registrations = await navigator.serviceWorker.getRegistrations();
			for (const registration of registrations) {
				await registration.unregister();
			}
		}

		if ('caches' in window) {
			const cacheNames = await caches.keys();
			await Promise.all(cacheNames.map((name) => caches.delete(name)));
		}

		localStorage.clear();
		sessionStorage.clear();

		document.cookie.split(';').forEach((cookie) => {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
		});

		window.location.reload();
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
