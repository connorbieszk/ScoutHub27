<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	let {
		children,
		state = $bindable(0)
	}: {
		children: Snippet;
		state: number;
	} = $props();

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

<div class="numberInputContainer">
	<div class="controls">
		{@render children()}
		<div class="group">
			<Button onclick={subTen} layer={4}>-10</Button>
			<Button onclick={subFive} layer={4}>-5</Button>
			<Button onclick={subOne} layer={4}>-1</Button>
		</div>

		<span>{state}</span>

		<div class="group">
			<Button onclick={addOne} layer={4}>+1</Button>
			<Button onclick={addFive} layer={4}>+5</Button>
			<Button onclick={addTen} layer={4}>+10</Button>
		</div>
	</div>
</div>

<style>
	.numberInputContainer {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 0.75rem;

		font-family: var(--font-family);
		font-size: 1.5rem;

		padding: var(--default-padding);
		margin: var(--default-margin);

		width: fit-content;
		max-width: 100%;
		box-sizing: border-box;

		color: var(--foreground-2);
		background-color: var(--background-3);

		border-radius: var(--default-border-radius);
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.group {
		display: flex;
		width: fit-content;
		gap: 0.4rem;
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;

		min-width: 3.5rem;
		height: 3rem;

		padding: 0 0.75rem;

		background-color: var(--background-2);
		border-radius: var(--default-border-radius);

		font-size: 2rem;
		font-weight: bold;
	}

	@media (max-width: 700px) {
		.numberInputContainer {
			width: 100%;
			max-width: calc(100% - (2 * var(--default-margin)));
			margin: var(--default-margin);
			padding: var(--default-padding);
		}

		.controls {
			width: 100%;
			flex-direction: column;
			gap: 0.5rem;
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
			gap: 0.4rem;
		}

		.group :global(button) {
			flex: 1;
		}
	}
</style>
