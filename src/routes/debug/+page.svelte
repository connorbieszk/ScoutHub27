<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import { Themes, setTheme } from '$lib/themes';

    var checkbox1State: boolean = $state(false);
    var numberinputState: number = $state(0);

</script>

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

    <Checkbox state={checkbox1State}>
        Test
    </Checkbox>

    <br>

    <NumberInput state={numberinputState}>
        <span>Test</span>
    </NumberInput>
</div>
