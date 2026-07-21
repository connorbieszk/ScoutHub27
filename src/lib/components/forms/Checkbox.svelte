<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		state = $bindable(false),
		type = 'button',
		size = 'md'
	}: {
		children: Snippet;
		state: boolean;
		type?: 'button' | 'submit' | 'reset';
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const sizeStyles = {
		sm: {
			fontSize: '0.95rem',
			gap: '0.55rem',
			width: '2.4rem',
			height: '1.35rem',
			padding: '0.15rem'
		},
		md: {
			fontSize: '1.1rem',
			gap: '0.75rem',
			width: '3rem',
			height: '1.75rem',
			padding: '0.2rem'
		},
		lg: {
			fontSize: '1.25rem',
			gap: '1rem',
			width: '3.6rem',
			height: '2.1rem',
			padding: '0.25rem'
		}
	} as const;

	const currentSize = $derived(sizeStyles[size]);

	function toggleState() {
		state = !state;
	}
</script>

<div
	class="checkboxContainer"
	class:active={state}
	style={`--checkbox-font-size: ${currentSize.fontSize}; --checkbox-gap: ${currentSize.gap}; --checkbox-width: ${currentSize.width}; --checkbox-height: ${currentSize.height}; --checkbox-padding: ${currentSize.padding};`}
>
	{@render children()}

	<button {type} onclick={toggleState} aria-pressed={state} aria-label="Toggle checkbox"> </button>
</div>

<style>
	.checkboxContainer {
		display: inline-flex;
		align-items: center;

		gap: var(--checkbox-gap);

		font-family: var(--font-family);
		font-size: var(--checkbox-font-size);

		padding: 0.75rem 0.9rem;
		margin: var(--default-margin);

		color: var(--foreground-2);
		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
	}

	button {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		width: var(--checkbox-width);
		height: var(--checkbox-height);

		padding: var(--checkbox-padding);

		background-color: var(--background-3);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);

		cursor: pointer;
		touch-action: manipulation;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease,
			border-color 0.2s ease;
	}

	button:hover {
		transform: translateY(-2px);
		border-color: var(--foreground-2);
	}

	button:active {
		transform: scale(0.95);
	}

	@media (max-width: 700px) {
		.checkboxContainer {
			gap: calc(var(--checkbox-gap) + 0.15rem);
			padding: 0.85rem 1rem;
		}

		button {
			width: calc(var(--checkbox-width) + 0.45rem);
			height: calc(var(--checkbox-height) + 0.3rem);
			padding: calc(var(--checkbox-padding) + 0.05rem);
		}
	}

	.active button {
		background-color: var(--green);
		border-color: var(--green);
	}

	button:focus-visible {
		outline: 2px solid var(--green);
		outline-offset: 2px;
	}
</style>
