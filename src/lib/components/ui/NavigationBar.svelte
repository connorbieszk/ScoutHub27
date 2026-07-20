<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/forms/Button.svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '/scouting', label: 'Scouting' },
		{ href: '/members', label: 'Members' },
		{ href: '/data', label: 'Data' },
		{ href: '/settings', label: 'Settings' }
	] as const;

	function closeMenu() {
		menuOpen = false;
	}
</script>

<nav class="navbar">
	<Button href="/" onclick={closeMenu} size='md'>HexScouter BioCore</Button>

	<button
		class="menu-button"
		aria-label="Toggle navigation menu"
		onclick={() => (menuOpen = !menuOpen)}
	>
		☰
	</button>

	<div class="navbar-links desktop">
		{#each links as link (link.href)}
			<Button href={link.href} size='md'>
				{link.label}
			</Button>
		{/each}
	</div>

	{#if menuOpen}
		<div class="navbar-links mobile" in:slide={{ duration: 200 }} out:slide={{ duration: 150 }}>
			{#each links as link (link.href)}
				<Button href={link.href} onclick={closeMenu} size='md'>
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
			.desktop {
				display: none;
			}

			.menu-button {
				display: block;
			}

			.mobile {
				position: absolute;

				top: calc(100% + 0.5rem);
				left: 0;
				right: 0;

				display: flex;
				flex-direction: column;
				align-items: stretch;
				gap: 0.5rem;

				padding: 0.5rem;

				background-color: var(--background-3);
				border-radius: var(--default-border-radius);

				z-index: 100;
			}

			.mobile :global(a),
			.mobile :global(button) {
				width: 100%;
				box-sizing: border-box;
			}

			.navbar > :global(a),
			.navbar > :global(button) {
				max-width: 75%;
			}
		}
	</style>
