<script lang="ts">
	let {
		value = $bindable(0),
		size = 'md',
		label = ''
	}: {
		value?: number;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
	} = $props();

	const sizeStyles = {
		sm: {
			fontSize: '0.95rem',
			padding: '0.45rem 0.7rem',
			height: '5.5rem'
		},
		md: {
			fontSize: '1rem',
			padding: '0.6rem 0.8rem',
			height: '7rem'
		},
		lg: {
			fontSize: '1.1rem',
			padding: '0.75rem 0.95rem',
			height: '9rem'
		}
	} as const;

	const currentSize = $derived(sizeStyles[size]);
</script>

<label class="field">
	{#if label}
		<span class="label">{label}</span>
	{/if}
		<input
			value={value}
			placeholder="0"
			type="number"
			oninput={(event) => {
				const nextValue = event.currentTarget.value;
				value = Number(nextValue);
			}}
			style={`--textinput-font-size: ${currentSize.fontSize}; --textinput-padding: ${currentSize.padding}; --textinput-height: ${currentSize.height};`}
		/>
</label>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin: var(--default-margin);
	}

	.label {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--foreground-2);
	}

	input
	 {
		width: 100%;
		min-width: 12rem;
		box-sizing: border-box;

		min-height: 4.5rem;
		height: auto;
		max-height: var(--textinput-height);
		padding: var(--textinput-padding);
		font-size: var(--textinput-font-size);
		font-family: var(--font-family);
		font-weight: 500;
		line-height: 1.35;

		color: var(--foreground-2);
		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);

		outline: none;

		appearance: none;
	}

	input:focus {
		border-color: var(--orange);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--orange) 20%, transparent);
	}

	@media (max-width: 700px) {
		input {
			min-height: 4rem;
			padding: 0.8rem 0.95rem;
			font-size: 1rem;
		}
	}
</style>
