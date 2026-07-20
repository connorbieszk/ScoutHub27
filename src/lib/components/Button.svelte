<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Snippet } from "svelte";

	let {
		href = undefined,
		onclick = undefined,
		children,
		variant = 'default',
		type = 'button'
	}: {
		href?: Parameters<typeof resolve>[0];
		onclick?: () => void;
		children: Snippet;
		variant?: 'default' | 'primary' | 'danger';
		type?: 'button' | 'submit' | 'reset';
	} = $props();
</script>

{#if href}
	<a class={variant} href={resolve(href)} onclick={onclick}>
		{@render children()}
	</a>
{:else}
	<button class={variant} {type} onclick={onclick}>
		{@render children()}
	</button>
{/if}

<style>
	a,
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		font-family: var(--font-family);
		font-size: 1.5rem;

		padding: 0.5rem;

		text-decoration: none;

		color: var(--foreground-2);
		background-color: var(--background-3);

		border: none;
		border-radius: var(--default-border-radius);

		cursor: pointer;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	a:hover,
	button:hover {
		background-color: var(--background-4);
		transform: translateY(-2px);
	}

	.primary {
		background-color: var(--orange);
		color: white;
	}

	.danger {
		background-color: var(--red);
		color: white;
	}
</style>