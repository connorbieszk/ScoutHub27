<script lang="ts">
	import { slide } from 'svelte/transition';
	import { afterNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/forms/Button.svelte';
	import { getHistory, setHistory } from '$lib/stores/history';

	let menuOpen = $state(false);
	let showBackButton = $state(false);

	const links = [
		{ href: '/scouting', label: 'Scouting' },
		{ href: '/members', label: 'Members' },
		{ href: '/data', label: 'Data' },
		{ href: '/settings', label: 'Settings' }
	] as const;

	const closeMenu = () => (menuOpen = false);

	function goBack() {
		const history = getHistory();
		const previousRoute = history.at(-2);

		if (!previousRoute) {
			void goto(resolve('/'));
			return;
		}

		setHistory(history.slice(0, -1));
		void goto(resolve(previousRoute));
	}

	afterNavigate(({ from }) => {
		menuOpen = false;
		const history = getHistory();
		showBackButton = from !== null && history.length > 1;
	});
</script>

<nav class="navbar">
	<div class="navbar-left">
		<div class="brand-group">
			<Button href="/" onclick={closeMenu} size="md">HexScouter BioCore</Button>

			{#if showBackButton}
				<Button onclick={goBack} size="md" class="back-button">⏎</Button>
			{/if}
		</div>
	</div>

	<button
		class="menu-button"
		aria-label="Toggle navigation menu"
		aria-expanded={menuOpen}
		aria-controls="mobile-nav"
		onclick={() => (menuOpen = !menuOpen)}
	>
		☰
	</button>

	<div class="navbar-links desktop">
		{#each links as link (link.href)}
			<Button href={link.href} size="md">
				{link.label}
			</Button>
		{/each}
	</div>

	{#if menuOpen}
		<div
			id="mobile-nav"
			class="navbar-links mobile"
			in:slide={{ duration: 200 }}
			out:slide={{ duration: 150 }}
		>
			{#each links as link (link.href)}
				<Button href={link.href} size="md">
					{link.label}
				</Button>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.navbar {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		min-height: var(--default-height);

		padding: 0.25rem;
		box-sizing: border-box;

		background-color: var(--background-2);
		border-radius: var(--default-border-radius);
	}

	.navbar-left {
		display: flex;
		align-items: center;
		min-width: 0;
		flex: 1;
	}

	.brand-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
		flex-wrap: wrap;
	}

	.brand-group :global(a),
	.brand-group :global(button) {
		white-space: nowrap;
	}

	:global(.back-button) {
		padding-inline: 0.75rem;
		min-width: 2.75rem;
		flex-shrink: 0;
	}

	.navbar-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.mobile {
		display: none;
	}

	.menu-button {
		display: none;

		font-size: 2rem;
		padding: 0.25rem 0.75rem;

		color: var(--foreground-1);
		background-color: var(--background-3);

		border: none;
		border-radius: var(--default-border-radius);

		cursor: pointer;

		transition:
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	.menu-button:hover {
		background-color: var(--background-4);
		transform: scale(1.05);
	}

	@media (max-width: 700px) {
		.navbar {
			gap: 0.5rem;
		}

		.navbar-left {
			flex: 1 1 auto;
		}

		.brand-group {
			gap: 0.35rem;
		}

		.desktop {
			display: none;
		}

		.menu-button {
			display: block;
		}

		:global(.back-button) {
			padding-inline: 0.6rem;
			min-width: 2.4rem;
		}

		.mobile {
			position: absolute;

			top: calc(100% + 0.5rem);
			left: 0;

			width: 100%;
			box-sizing: border-box;

			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0.5rem;

			padding: 0.5rem;

			background-color: var(--background-3);
			border-radius: var(--default-border-radius);

			z-index: 100;
		}

		/* These assume Button renders an <a> or <button> as its root element.
		   If it doesn't, I'd recommend adding a `fullWidth` prop to Button instead. */
		.mobile :global(a),
		.mobile :global(button) {
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
