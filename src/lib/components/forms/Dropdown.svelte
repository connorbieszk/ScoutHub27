<script lang="ts">
	let {
		value = $bindable(''),
		options = [],
		placeholder = '',
		size = 'md',
		label = ''
	}: {
		value?: string;
		options?: Array<{ label: string; value: string }>;
		placeholder?: string;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
	} = $props();

	const sizeStyles = {
		sm: {
			fontSize: '0.95rem',
			padding: '0.45rem 0.7rem',
			height: '2rem'
		},
		md: {
			fontSize: '1rem',
			padding: '0.6rem 0.8rem',
			height: '2.4rem'
		},
		lg: {
			fontSize: '1.1rem',
			padding: '0.75rem 0.95rem',
			height: '2.9rem'
		}
	} as const;

	const currentSize = sizeStyles[size];
</script>

<label class="field">
	{#if label}
		<span class="label">{label}</span>
	{/if}
	<select
		bind:value
		style={`--dropdown-font-size: ${currentSize.fontSize}; --dropdown-padding: ${currentSize.padding}; --dropdown-height: ${currentSize.height};`}
	>
		{#if placeholder}
			<option value="" disabled>{placeholder}</option>
		{/if}
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
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

	select {
		width: 100%;
		min-width: 10rem;
		box-sizing: border-box;
		height: var(--dropdown-height);
		padding: var(--dropdown-padding);
		font-size: var(--dropdown-font-size);
		font-family: var(--font-family);
		font-weight: 500;
		color: var(--foreground-2);
		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
		outline: none;
		cursor: pointer;
		appearance: none;
	}

	select:focus {
		border-color: var(--green);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--green) 20%, transparent);
	}

	@media (max-width: 700px) {
		select {
			height: 2.95rem;
			padding: 0.8rem 0.95rem;
			font-size: 1rem;
		}
	}
</style>
