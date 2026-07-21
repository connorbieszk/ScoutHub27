<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let {
		href = undefined,
		onclick = undefined,
		children,
		variant = 'default',
		type = 'button',
		size = 'lg',
		class: className = undefined
	}: {
		href?: string;
		onclick?: () => void;
		children: Snippet;
		variant?: 'default' | 'primary' | 'danger';
		type?: 'button' | 'submit' | 'reset';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	} = $props();

	const sizeStyles = {
		sm: {
			fontSize: '0.95rem',
			padding: '0.4rem 0.7rem',
			minHeight: '1.8rem'
		},
		md: {
			fontSize: '1.1rem',
			padding: '0.55rem 0.85rem',
			minHeight: '2.25rem'
		},
		lg: {
			fontSize: '1.3rem',
			padding: '0.7rem 1rem',
			minHeight: '2.75rem'
		}
	} as const;

	const currentSize = $derived(sizeStyles[size]);
	const resolvedHref = $derived(
		href ? (resolve as unknown as (value: string) => string)(href) : undefined
	);
</script>

{#if href}
	<a
		class={[variant, className].filter(Boolean).join(' ')}
		style={`--button-font-size: ${currentSize.fontSize}; --button-padding: ${currentSize.padding}; --button-min-height: ${currentSize.minHeight}`}
		href={resolvedHref}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		class={[variant, className].filter(Boolean).join(' ')}
		style={`--button-font-size: ${currentSize.fontSize}; --button-padding: ${currentSize.padding}; --button-min-height: ${currentSize.minHeight}`}
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
		font-size: var(--button-font-size);
		font-weight: 600;
		touch-action: manipulation;

		padding: var(--button-padding);
		min-height: var(--button-min-height);
		margin: var(--default-margin);

		text-decoration: none;

		color: var(--foreground-2);

		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

		cursor: pointer;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease,
			border-color 0.2s ease;
	}

	a:hover,
	button:hover {
		background-color: var(--button-hover);
		transform: translateY(-2px);
		border-color: var(--foreground-2);
	}

	@media (max-width: 700px) {
		a,
		button {
			min-height: 2.5rem; /* 40px */
			max-height: 2.5rem;
			padding: 0.45rem 0.7rem;
			font-size: 0.95rem;
		}
	}

	.primary {
		background-color: var(--green);
		color: white;
		border-color: var(--green);
	}

	.danger {
		background-color: var(--red);
		color: white;
		border-color: var(--red);
	}
</style>
