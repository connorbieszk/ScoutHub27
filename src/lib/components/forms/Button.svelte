<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let {
		href = undefined,
		onclick = undefined,
		children,
		layer = 3,
		variant = 'default',
		type = 'button'
	}: {
		href?: Parameters<typeof resolve>[0];
		onclick?: () => void;
		children: Snippet;
		layer?: 1 | 2 | 3 | 4;
		variant?: 'default' | 'primary' | 'danger';
		type?: 'button' | 'submit' | 'reset';
	} = $props();

	const layers = {
		1: {
			background: 'var(--background-1)',
			hover: 'var(--background-2)'
		},
		2: {
			background: 'var(--background-2)',
			hover: 'var(--background-3)'
		},
		3: {
			background: 'var(--background-3)',
			hover: 'var(--background-4)'
		},
		4: {
			background: 'var(--background-4)',
			hover: 'var(--background-3)'
		}
	} as const;

	// svelte-ignore state_referenced_locally
	var currentLayer = layers[layer];
</script>

{#if href}
	<a
		class={variant}
		style={`--button-bg: ${currentLayer.background}; --button-hover: ${currentLayer.hover}`}
		href={resolve(href)}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		class={variant}
		style={`--button-bg: ${currentLayer.background}; --button-hover: ${currentLayer.hover}`}
		{type}
		{onclick}
	>
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

		padding: var(--default-padding);
		margin: var(--default-margin);

		text-decoration: none;

		color: var(--foreground-2);

		background-color: var(--button-bg);

		border: none;
		border-radius: var(--default-border-radius);

		cursor: pointer;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	a:hover,
	button:hover {
		background-color: var(--button-hover);
		transform: translateY(-2px);
	}

	.primary {
		background-color: var(--green);
		color: white;
	}

	.danger {
		background-color: var(--red);
		color: white;
	}
</style>