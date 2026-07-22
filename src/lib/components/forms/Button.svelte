<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
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
		href?: RouteId;
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
			paddingY: '0.4rem',
			paddingX: '0.7rem',
			minHeight: '1.8rem'
		},
		md: {
			fontSize: '1.1rem',
			paddingY: '0.55rem',
			paddingX: '0.85rem',
			minHeight: '2.25rem'
		},
		lg: {
			fontSize: '1.3rem',
			paddingY: '0.7rem',
			paddingX: '1rem',
			minHeight: '2.75rem'
		}
	} as const;

	const currentSize = $derived(sizeStyles[size]);

	const style = $derived(`
		--button-font-size: ${currentSize.fontSize};
		--button-padding-y: ${currentSize.paddingY};
		--button-padding-x: ${currentSize.paddingX};
		--button-min-height: ${currentSize.minHeight};
	`);
</script>

{#if href}
	<a
		class={[variant, className].filter(Boolean).join(' ')}
		style={style}
		href={resolve(href)}
		onclick={onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		class={[variant, className].filter(Boolean).join(' ')}
		style={style}
		type={type}
		onclick={onclick}
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

		padding: var(--button-padding-y) var(--button-padding-x);
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

	a:active,
	button:active {
		transform: translateY(0);
	}

	a:disabled,
	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	@media (max-width: 700px) {
		a,
		button {
			font-size: calc(var(--button-font-size) * 0.9);
			padding:
				calc(var(--button-padding-y) * 0.9)
				calc(var(--button-padding-x) * 0.9);
			min-height: max(2.5rem, var(--button-min-height));
		}
	}

	.primary {
		background-color: var(--green);
		color: white;
		border-color: var(--green);
	}

	.primary:hover {
		border-color: white;
	}

	.danger {
		background-color: var(--red);
		color: white;
		border-color: var(--red);
	}

	.danger:hover {
		border-color: white;
	}
</style>