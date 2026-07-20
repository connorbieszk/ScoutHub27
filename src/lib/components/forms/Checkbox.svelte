<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		state = $bindable(false),
		type = 'button'
	}: {
		children: Snippet;
		state: boolean;
		type?: 'button' | 'submit' | 'reset';
	} = $props();

	function toggleState() {
		state = !state;
	}
</script>

<div class="checkboxContainer" class:active={state}>
	{@render children()}

	<button
		type={type}
		onclick={toggleState}
		aria-pressed={state}
		aria-label="Toggle checkbox"
	>
	</button>
</div>

<style>
	.checkboxContainer {
		display: inline-flex;
		align-items: center;

		gap: 0.75rem;

		font-family: var(--font-family);
		font-size: 1.25rem;

		padding: var(--default-padding);
		margin: var(--default-margin);

		color: var(--foreground-2);
		background-color: var(--background-3);

		border-radius: var(--default-border-radius);
	}

	button {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		width: 3rem;
		height: 1.75rem;

		padding: 0.2rem;

		background-color: var(--background-4);

		border: none;
		border-radius: var(--default-border-radius);

		cursor: pointer;
		touch-action: manipulation;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	button:hover {
		transform: translateY(-2px);
	}

	button:active {
		transform: scale(0.95);
	}

	.active button {
		background-color: var(--green);
	}

	button:focus-visible {
		outline: 3px solid var(--foreground-2);
		outline-offset: 3px;
	}
</style>