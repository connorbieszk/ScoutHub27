<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import Dropdown from '$lib/components/forms/Dropdown.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import Slider from '$lib/components/forms/Slider.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { Themes, setTheme } from '$lib/themes';

	let checkbox1State: boolean = $state(false);
	let numberinputState: number = $state(0);
	let textValue: string = $state('');
	let sliderValue: number = $state(0);
	let dropdownValue: string = $state('');

	const dropdownOptions = [
		{ label: 'Alpha', value: 'alpha' },
		{ label: 'Beta', value: 'beta' },
		{ label: 'Gamma', value: 'gamma' }
	];
</script>

<svelte:head>
	<title>Debug Page 01001000 01101001</title>
</svelte:head>

<div class="content">
	<Button
		onclick={() => {
			setTheme(Themes.DARK);
		}}
	>
		Dark Theme
	</Button>
    <br>
	<Button
		onclick={() => {
			setTheme(Themes.HEX_DARK);
		}}
	>
		Dark Theme (Hexy)
	</Button>
    <br>
	<Button
		onclick={() => {
			setTheme(Themes.LIGHT);
		}}
	>
		Light Theme
	</Button>
    <br>
	<Button
		onclick={() => {
			setTheme(Themes.HEX_LIGHT);
		}}
	>
		Light Theme (Hexy)
	</Button>
    <br>

	<Checkbox bind:state={checkbox1State}>
		Touch friendly toggle
	</Checkbox>

	<br>

	<NumberInput state={numberinputState}>
		<span>Test</span>
	</NumberInput>

	<br>

	<TextInput label="Text input" placeholder="Type something" bind:value={textValue} size="md" />

	<br>

	<Slider bind:value={sliderValue} min={0} max={5} step={1} size="md" label="Test Slider" />

	<br>

	<Dropdown
		label="Dropdown"
		placeholder="Choose one"
		options={dropdownOptions}
		bind:value={dropdownValue}
		size="md"
	/>

	<p class="summary">
		Current values: text = "{textValue ? textValue.replace(/\n/g, '\\n') : 'empty'}", slider = {sliderValue}, dropdown = {dropdownValue || 'none'}
	</p>

	<div class="previewBox">
		<strong>Rendered preview</strong>
		<pre>{textValue || 'No text yet'}</pre>
	</div>
</div>
