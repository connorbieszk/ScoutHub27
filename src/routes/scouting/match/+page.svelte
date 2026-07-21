<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import Dropdown from '$lib/components/forms/Dropdown.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';

	let page = $state(0);
	let menuOpen = $state(false);

	// Match Information
	let scouterName = $state('');
	let matchNumber = $state('');
	let teamNumber = $state('');
	let teamAlliance = $state(false); // false = Red, true = Blue

	const pages = ['Scouter', 'Auto', 'Tele', 'Final', 'Upload'];

	function goToPage(index: number) {
		if (index < 0 || index >= pages.length) {
			return;
		}

		page = index;
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<svelte:head>
	<title>Match Scouting!</title>
</svelte:head>

<div class="content">
	<div class="pages">
		{#if page === 0}
			<Dropdown
				label="Scouter Name"
				value={scouterName}
				placeholder="Scouter Name"
				options={[
					{ label: 'Tim Cheese', value: 'timcheese' },
					{ label: 'Jane Doe', value: 'janedoe' },
					{ label: 'John Doe', value: 'johndoe' } // When the database is up , host a users database, with Pretty Names and database names (Label and Value)
				]}
			/>
			<br />
			<TextInput
				value={matchNumber}
				type="input"
				placeholder="Match Number"
				size="sm"
				label="Match Number"
			/>
			<br />
			<TextInput
				value={teamNumber}
				type="input"
				placeholder="Team Number"
				size="sm"
				label="Team Number"
			/>
			<br />
			<h3>
				Please make sure the Team Number and Match Number are correct, incorrect data wastes your
				time and negatively impacts the team
			</h3>
			<br />
			<Checkbox bind:state={teamAlliance} inactiveColor="--red" activeColor="--blue"
				>Toggle to select Alliance</Checkbox
			>
		{:else if page === 1}
			<!-- Auto -->
		{:else if page === 2}
			<!-- Tele -->
		{:else if page === 3}
			<!-- Comments -->
		{:else if page === 4}
			<!-- Upload -->
		{/if}
	</div>
</div>

<div class="nav">
	<div class="nav-side">
		<Button onclick={() => goToPage(page - 1)} size="sm">Back</Button>
	</div>

	<div class="current-page">
		<Button onclick={toggleMenu} size="sm">
			{pages[page]} ▾
		</Button>

		{#if menuOpen}
			<div class="menu">
				{#each pages as name, index (index)}
					{#if index !== page}
						<Button onclick={() => goToPage(index)} size="sm">
							{name}
						</Button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<div class="nav-side">
		<Button onclick={() => goToPage(page + 1)} size="sm">Next</Button>
	</div>
</div>

<style>
	.content {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.pages {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem;
		flex-shrink: 0;
	}

	.nav-side {
		flex: 0 0 auto;
	}

	.current-page {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.menu {
		position: absolute;
		bottom: calc(100% + 0.5rem);

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		padding: 0.5rem;

		background-color: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);

		z-index: 100;
	}

	.menu :global(button) {
		white-space: nowrap;
	}
</style>
