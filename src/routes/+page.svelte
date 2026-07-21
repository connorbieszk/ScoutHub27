<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { setTheme, Themes } from '$lib/themes';
	import { version } from '$app/environment';

	let onboarded = $state<boolean | null>(null);

	onMount(() => {
		const stored = localStorage.getItem('Onboarded');

		if (stored === null) {
			localStorage.setItem('Onboarded', 'false');
			onboarded = false;
		} else {
			onboarded = stored === 'true';
		}
	});

	function finishOnboarding() {
		localStorage.setItem('Onboarded', 'true');
		onboarded = true;
	}
</script>

{#if onboarded === null}
	<div class="content">
		<div class="title">
			<h1>HexScout BIOCORE</h1>
			<h2>
				The site is still loading. Please wait a moment.
			</h2>
		</div>
	</div>
{:else if onboarded}
	<div class="content">
		<div class="title">
			<h1>HexScout BIOCORE</h1>
			<h2>
				Welcome to the 2027 scouting app.<br />
				Choose where you would like to go.
				<br> You are using version {version}
			</h2>
		</div>

		<div class="actions">
			<Button href="/scouting">Scouting</Button>
			<Button href="/members">Member Management</Button>
			<Button href="/data">Data Viewer</Button>
		</div>
	</div>
{:else}
	<div class="content">
		<div class="title">
			<h1>HexScout BIOCORE</h1>
			<h2>
				Welcome Scouter! <br /> 
				Please select an option to setup your scouting experience!
			</h2>
		</div>

		<div class="actions">
			<Button onclick={() => setTheme(Themes.DARK)}>
				Dark Theme
			</Button>

			<Button onclick={() => setTheme(Themes.HEX_DARK)}>
				Dark Theme (Hexy)
			</Button>

			<Button onclick={() => setTheme(Themes.LIGHT)}>
				Light Theme
			</Button>

			<Button onclick={() => setTheme(Themes.HEX_LIGHT)}>
				Light Theme (Hexy)
			</Button>

			<br />

			<Button onclick={finishOnboarding}>
				Continue
			</Button>
		</div>
	</div>
{/if}

<svelte:head>
	<title>Homepage</title>
</svelte:head>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;
	}


	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 2.9rem);
		line-height: 1.1;
		color: var(--foreground-1);
	}

	h2 {
		margin: 0;
		max-width: 34rem;
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.5;
		color: var(--foreground-2);
		text-align: center;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
		width: 100%;
		max-width: 42rem;
	}

	.actions :global(a),
	.actions :global(button) {
		min-width: 12rem;
	}

	@media (max-width: 700px) {
		.content {
			padding: 1.5rem 0;
		}

		.actions {
			display: flex;
			flex-direction: column;
			align-items: center;
			align-content: center;
			gap: 0.5rem;

			padding: 0.5rem;

			width: 100%;
			box-sizing: border-box;
		}

		.actions :global(a),
		.actions :global(button) {
			width: 75%;
			min-width: 0;
		}
	}
</style>
