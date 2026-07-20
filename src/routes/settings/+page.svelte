<script>
	import Button from '$lib/components/forms/Button.svelte';
	import { Themes, setTheme } from '$lib/themes';
</script>

<div class="content">
	<div class="title">
		<h1>Settings</h1>
	</div>
	<div class="title">
		<h2>Theme</h2>
	</div>
	<Button
		onclick={() => {
			setTheme(Themes.DARK);
		}}
	>
		Dark Theme
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.HEX_DARK);
		}}
	>
		Dark Theme (Hexy)
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.LIGHT);
		}}
	>
		Light Theme
	</Button>
	<br />
	<Button
		onclick={() => {
			setTheme(Themes.HEX_LIGHT);
		}}
	>
		Light Theme (Hexy)
	</Button>
	<br />
	<div class="title">
		<h2>Menus</h2>
	</div>
	<Button href="/admin">Admin Menu</Button>
	<Button href="/debug">Debug Menu</Button>
</div>

<style>
	div.title {
		padding: var(--default-padding);
	}

</style>
