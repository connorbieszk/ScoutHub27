<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	let {
		children,
		state = $bindable(0),
		size = 'md'
	}: {
		children: Snippet;
		state: number;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const sizeStyles = {
		sm: {
			fontSize: '0.95rem',
			gap: '0.5rem',
			groupGap: '0.3rem',
			displayMinWidth: '2.75rem',
			displayHeight: '2.4rem',
			displayFontSize: '1.2rem'
		},
		md: {
			fontSize: '1.1rem',
			gap: '0.75rem',
			groupGap: '0.4rem',
			displayMinWidth: '3.25rem',
			displayHeight: '2.85rem',
			displayFontSize: '1.5rem'
		},
		lg: {
			fontSize: '1.25rem',
			gap: '1rem',
			groupGap: '0.5rem',
			displayMinWidth: '3.75rem',
			displayHeight: '3.2rem',
			displayFontSize: '1.75rem'
		}
	} as const;

	const currentSize = $derived(sizeStyles[size]);

	function addNumber(integer: number) {
		state += integer;
	}

	function subNumber(integer: number) {
		state = Math.max(0, state - integer);
	}

	const addOne = () => addNumber(1);
	const addFive = () => addNumber(5);
	const addTen = () => addNumber(10);

	const subOne = () => subNumber(1);
	const subFive = () => subNumber(5);
	const subTen = () => subNumber(10);
</script>

<div
	class="numberInputContainer"
	style={`--number-font-size: ${currentSize.fontSize}; --number-gap: ${currentSize.gap}; --number-group-gap: ${currentSize.groupGap}; --number-display-min-width: ${currentSize.displayMinWidth}; --number-display-height: ${currentSize.displayHeight}; --number-display-font-size: ${currentSize.displayFontSize};`}
>
	<div class="controls">
		{@render children()}
		<div class="group">
			<Button onclick={subTen} {size}>-10</Button>
			<Button onclick={subFive} {size}>-5</Button>
			<Button onclick={subOne} {size}>-1</Button>
		</div>

		<span>{state}</span>

		<div class="group">
			<Button onclick={addOne} {size}>+1</Button>
			<Button onclick={addFive} {size}>+5</Button>
			<Button onclick={addTen} {size}>+10</Button>
		</div>
	</div>
</div>

<style>
	.numberInputContainer {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: var(--number-gap);

		font-family: var(--font-family);
		font-size: var(--number-font-size);

		padding: 0.8rem 0.9rem;
		margin: var(--default-margin);

		width: fit-content;
		max-width: 100%;
		box-sizing: border-box;

		color: var(--foreground-2);
		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--number-gap);
	}

	.group {
		display: flex;
		width: fit-content;
		gap: var(--number-group-gap);
	}

	.group :global(button) {
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;

		min-width: var(--number-display-min-width);
		height: var(--number-display-height);

		padding: 0 0.75rem;

		background-color: var(--background-3);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);

		font-size: var(--number-display-font-size);
		font-weight: bold;
	}

	@media (max-width: 700px) {
		.numberInputContainer {
			width: 100%;
			max-width: calc(100% - (2 * var(--default-margin)));
			margin: var(--default-margin);
			padding: 0.9rem 1rem;
		}

		.controls {
			width: 100%;
			flex-direction: column;
			gap: 0.65rem;
		}
		span {
			width: 100%;
			max-width: calc(100% - (8 * var(--default-margin)));
			margin: var(--default-margin);
			padding: var(--default-padding);
		}
		.group {
			width: 100%;
			display: flex;
			justify-content: center;
			gap: var(--number-group-gap);
		}

		.group :global(button) {
			flex: 1;
			min-height: 3rem;
			padding: 0.85rem 0.95rem;
		}
	}
</style>
