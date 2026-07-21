<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/styles/style.css';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getTheme, setTheme } from '$lib/themes';
	import NavigationBar from '$lib/components/ui/NavigationBar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

<<<<<<< HEAD
	const basePath = import.meta.env.BASE_URL || '/ScoutHub27/';

	afterNavigate(async () => {
		if (!browser || !('serviceWorker' in navigator)) return;

		const registration = await navigator.serviceWorker.getRegistration(basePath);
		await registration?.update();
	});
=======
	
>>>>>>> parent of d00dd69 (fix service worker)

	let { children } = $props();

	onMount(() => {
<<<<<<< HEAD
		setTheme(getTheme());

		if (!browser || !('serviceWorker' in navigator)) return;

		navigator.serviceWorker
			.register(`${basePath}sw.js`, { scope: basePath })
			.then((registration) => registration.update())
			.catch((error) => {
				console.error('Service worker registration failed:', error);
			});
	});
=======
        setTheme(getTheme());
    });
>>>>>>> parent of d00dd69 (fix service worker)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavigationBar />

<main>
	{@render children()}
</main>

<Footer />