<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/styles/style.css';
	import { onMount } from 'svelte';
	import { getTheme, setTheme } from '$lib/themes';
	import NavigationBar from '$lib/components/ui/NavigationBar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import { registerSW } from 'virtual:pwa-register';

	registerSW({
		immediate: true
	});
	import { afterNavigate } from '$app/navigation';

	afterNavigate(async () => {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.getRegistration();
			await registration?.update();
		}
	});

	let { children } = $props();

	onMount(() => {
		setTheme(getTheme());
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavigationBar />

<main>
	{@render children()}
</main>

<Footer />
