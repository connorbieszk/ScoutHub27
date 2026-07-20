<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/styles/style.css';
	import { onMount } from 'svelte';
	import { getTheme, setTheme } from '$lib/themes';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	let { children } = $props();

	onMount(() => {
        setTheme(getTheme());
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavigationBar />

{@render children()}
