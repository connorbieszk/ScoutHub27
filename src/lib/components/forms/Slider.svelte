<script lang="ts">
	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		size = 'md'
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const sizeStyles = {
		sm: {
			height: '0.3rem'
		},
		md: {
			height: '0.4rem'
		},
		lg: {
			height: '0.55rem'
		}
	} as const;

	const currentSize = sizeStyles[size];
	const percent = $derived(Math.min(100, Math.max(0, ((value - min) / Math.max(1, max - min)) * 100)));
</script>

<label class="sliderWrap">
	<input
		bind:value
		type="range"
		{min}
		{max}
		{step}
		style={`--slider-height: ${currentSize.height}; --slider-fill: ${percent}%;`}
	/>
	<span class="value">{value}</span>
</label>

<style>
	.sliderWrap {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: var(--default-margin);
	}

	input[type='range'] {
		flex: 1;
		appearance: none;
		width: 100%;
		min-width: 8rem;
		height: var(--slider-height);
		background: linear-gradient(90deg, var(--orange) 0%, var(--orange) var(--slider-fill), var(--background-3) var(--slider-fill), var(--background-3) 100%);
		background-size: 100% 100%;
		border: 1px solid var(--background-4);
		border-radius: 999px;
		outline: none;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background: var(--foreground-2);
		border: 2px solid var(--background-2);
		box-shadow: 0 0 0 2px var(--orange);
	}

	input[type='range']::-moz-range-thumb {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background: var(--foreground-2);
		border: 2px solid var(--background-2);
		box-shadow: 0 0 0 2px var(--orange);
	}

	.value {
		min-width: 2.2rem;
		text-align: center;
		font-weight: 700;
		color: var(--foreground-2);
	}

	@media (max-width: 700px) {
		.sliderWrap {
			gap: 0.9rem;
		}

		input[type='range'] {
			height: 0.55rem;
		}

		.value {
			min-width: 2.6rem;
		}
	}
</style>
