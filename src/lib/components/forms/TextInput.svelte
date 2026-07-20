<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = '',
		size = 'md',
		label = '',
		rows = 4,
		type = 'textarea'
	}: {
		value?: string;
		placeholder?: string;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		rows?: number;
		type?: 'input' | 'textarea';
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

	const currentSize = sizeStyles[size];

	function normalizeForOutput(rawValue: string) {
		return rawValue.replace(/\r\n?/g, '\n');
	}
</script>

<label class="field">
	{#if label}
		<span class="label">{label}</span>
	{/if}
	{#if type === 'input'}
		<input
			value={normalizeForOutput(value)}
			{placeholder}
			oninput={(event) => {
				const nextValue = event.currentTarget.value;
				value = normalizeForOutput(nextValue);
			}}
			style={`--textinput-font-size: ${currentSize.fontSize}; --textinput-padding: ${currentSize.padding}; --textinput-height: ${currentSize.height};`}
		/>
	{:else}
		<textarea
			value={normalizeForOutput(value)}
			{placeholder}
			{rows}
			oninput={(event) => {
				const nextValue = event.currentTarget.value;
				value = normalizeForOutput(nextValue);
			}}
			style={`--textinput-font-size: ${currentSize.fontSize}; --textinput-padding: ${currentSize.padding}; --textinput-height: ${currentSize.height};`}
		></textarea>
	{/if}
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

	input,
	textarea {
		width: 100%;
		min-width: 12rem;
		box-sizing: border-box;
		min-height: var(--textinput-height);
		padding: var(--textinput-padding);
		font-size: var(--textinput-font-size);
		font-family: var(--font-family);
		font-weight: 500;
		line-height: 1.45;
		color: var(--foreground-2);
		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
		outline: none;
	}

	textarea {
		resize: vertical;
		white-space: pre-wrap;
	}

	input:focus,
	textarea:focus {
		border-color: var(--green);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--green) 20%, transparent);
	}

	@media (max-width: 700px) {
		input,
		textarea {
			min-height: 7rem;
			padding: 0.8rem 0.95rem;
			font-size: 1rem;
		}
	}
</style>
