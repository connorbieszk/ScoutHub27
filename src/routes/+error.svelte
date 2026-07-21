<script>
	import { page } from '$app/state';
    import Button from '$lib/components/forms/Button.svelte';
</script>

<div class="content">
	<h1>Error {page.status}</h1>
	<p>{page.error?.message}</p>
	<Button href="/">Return Home</Button>
</div>

<style>
	h1 {
		color: #ff3e00;
	}
</style>