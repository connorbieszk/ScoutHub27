<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/styles/style.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { getTheme, setTheme } from '$lib/themes';
	import NavigationBar from '$lib/components/ui/NavigationBar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import { addHistory, pullStoredHistory } from '$lib/stores/history';
	import { page } from '$app/state';


	let { children } = $props();

	onMount(() => {
		pullStoredHistory();

		setTheme(getTheme());
	});

	afterNavigate(() => {
		if (page.route.id && page.route.id != "/scouting/offline/edit") {
			addHistory(page.route.id);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
</svelte:head>

<NavigationBar />

<main>
	{@render children()}
</main>

<Footer />
