<script lang="ts">
	import { onMount } from 'svelte';

	import Button from '$lib/components/forms/Button.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import Dropdown from '$lib/components/forms/Dropdown.svelte';
	import NumberInput from '$lib/components/forms/NumberInput.svelte';
	import Slider from '$lib/components/forms/Slider.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';

	import { usersList } from '$lib/config';
	import { getScoutingForm, clearScoutingForm } from '$lib/stores/scouting/index.svelte';

	const pages = ['Scouter', 'Auto', 'Tele', 'Final', 'Upload'] as const;

	let page = $state(0);

	let menuOpen = $state(false);

	let menuElement: HTMLDivElement | null = $state(null);

	let form = getScoutingForm();

	function goToPage(index: number) {
		if (index < 0 || index >= pages.length) {
			return;
		}

		page = index;
		menuOpen = false;
	}

	function nextPage() {
		goToPage(page + 1);
	}

	function previousPage() {
		goToPage(page - 1);
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function submitForm() {
		clearScoutingForm();
	}

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!menuElement) return;

			if (!menuElement.contains(event.target as Node)) {
				menuOpen = false;
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<svelte:head>
	<title>Match Scouting!</title>
</svelte:head>

<div class="content">
	<div class="pages">
		{#if page === 0}
			<h3>Scouter Information</h3>

			<p>
				Information about the Scouter (thats you!) and the match.
				<span style="font-style: italic; font-weight: 600;"
					>Please make sure all the information here is correct, as it is vital to the team, and
					incorrect data wastes your time.</span
				>
			</p>

			<Dropdown
				label="Scouter Name"
				bind:value={form.match.scouterName}
				placeholder="Scouter Name"
				options={usersList}
			/>

			<br />

			<TextInput
				bind:value={form.match.matchNumber}
				type="input"
				placeholder="Match Number"
				size="sm"
				label="Match Number"
			/>

			<br />

			<TextInput
				bind:value={form.match.teamNumber}
				type="input"
				placeholder="Team Number"
				size="sm"
				label="Team Number"
			/>

			<br />

			<Checkbox bind:state={form.match.teamAlliance} inactiveColor="--red" activeColor="--blue">
				Toggle to select Alliance
			</Checkbox>
		{:else if page === 1}
			<h3>Auto</h3>

			<p>Data you collect during Autonomous period</p>
			<Dropdown
				label="Starting Position"
				bind:value={form.auto.startingPos}
				placeholder="Select an option"
				options={[
					{ label: 'Trench : Depot', value: 'td' },
					{ label: 'Bump : Depot', value: 'bd' },
					{ label: 'Center', value: 'c' },
					{ label: 'Bump : Outpost', value: 'bo' },
					{ label: 'Trench : Outpost', value: 'to' },
					{
						label: 'Other ? Describe in Comment!',
						value: 'o'
					}
				]}
			/>

			<br />

			<NumberInput bind:state={form.auto.fuelFromNZ}>Fuel Collected from NZ</NumberInput>

			<br />

			<Checkbox bind:state={form.auto.climbedInAuto}>Climbed in Auto</Checkbox>

			<br />
			<br />

			<Checkbox bind:state={form.auto.usedOutpost}>Used Outpost</Checkbox>

			<br />
			<br />

			<Checkbox bind:state={form.auto.usedDepot}>Used Depot</Checkbox>

			<br />
			<br />

			<Slider
				bind:value={form.auto.autoSOS}
				min={0}
				max={5}
				step={1}
				size="md"
				label="Auto Strength-of-Shooter"
			/>
		{:else if page === 2}
			<!-- Tele section -->

			<h3>Teleoperated</h3>

			<p>Data you collect during Teleoperated Period</p>
		{:else if page === 3}
			<!-- Final section -->

			<h3>Final Information</h3>

			<p>Your comments on the match</p>
		{:else if page === 4}
			<!-- Upload section -->

			<h3>Upload Match</h3>

			<p>Submit scouting data here.</p>

			<Button onclick={submitForm}>Submit!</Button>
		{/if}
	</div>
</div>

<div class="nav">
	<div class="nav-side">
		<Button onclick={previousPage} size="lg">Back</Button>
	</div>

	<div class="current-page" bind:this={menuElement}>
		<Button onclick={toggleMenu} size="lg">
			{pages[page]} ▾
		</Button>

		{#if menuOpen}
			<div class="menu">
				{#each pages as name, index (name)}
					{#if index !== page}
						<Button onclick={() => goToPage(index)} size="lg">
							{name}
						</Button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<div class="nav-side">
		<Button onclick={nextPage} size="lg">Next</Button>
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
		overflow-y: scroll;
		padding: 0.25rem;
	}

	/*
		Keep scrollbar space reserved so the layout
		doesn't shift when scrolling becomes necessary.
	*/
	.pages {
		scrollbar-gutter: stable;
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

		display: flex;
		align-items: center;
	}

	.current-page {
		position: relative;

		flex: 1;

		display: flex;
		justify-content: center;
		align-items: center;
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


	.nav :global(button) {
		min-width: 5rem;
	}

	@media (max-width: 700px) {
		.nav {
			gap: 0.25rem;

			padding: 0.35rem;
		}

		.nav :global(button) {
			min-height: 2.25rem;

			padding: 0.55rem 0.75rem;

			font-size: 0.9rem;

			min-width: 4rem;
		}

		.menu {
			gap: 0.35rem;

			padding: 0.35rem;
		}
	}

	@media (max-width: 400px) {
		.nav {
			gap: 0.15rem;
		}

		.nav :global(button) {
			min-width: 3.5rem;

			padding-left: 0.5rem;

			padding-right: 0.5rem;

			font-size: 0.85rem;
		}
	}
</style>
