<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { afterNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/forms/Button.svelte';

	let menuOpen = $state(false);
	let dropdownElement: HTMLDivElement | null = $state(null);

	const links = [
		{ href: '/scouting', label: 'Scouting' },
		{ href: '/members', label: 'Members' },
		{ href: '/data', label: 'Data' },
		{ href: '/settings', label: 'Settings' }
	] as const;

	type Route = (typeof links)[number]['href'];

	let currentPath = $state<Route>('/scouting');

	function closeMenu() {
		menuOpen = false;
	}

	function navigate(route: Route) {
		currentPath = route;
		menuOpen = false;
		void goto(resolve(route));
	}

	afterNavigate(() => {
		menuOpen = false;
	});

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!dropdownElement) return;
			if (!dropdownElement.contains(event.target as Node)) {
				menuOpen = false;
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<nav class="navbar">
	<div class="navbar-left">
		<div class="brand-group">
			<Button href="/" onclick={closeMenu} size="lg">HexScouter BioCore</Button>
		</div>
	</div>

	<div class="route-selector">
		<div class="route-dropdown" bind:this={dropdownElement}>
			<Button onclick={() => (menuOpen = !menuOpen)} size="lg">
				{links.find((x) => x.href === currentPath)?.label ?? 'Menu'} ▾
			</Button>

			{#if menuOpen}
				<div class="route-menu" in:slide={{ duration: 150 }} out:slide={{ duration: 100 }}>
					{#each links as link (link.href)}
						{#if link.href !== currentPath}
							<Button onclick={() => navigate(link.href)} size="lg">
								{link.label}
							</Button>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
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

	/* Center page selector */
.route-selector {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	margin-left: auto;
}

.route-dropdown {
	position: relative;
	display: flex;
		right: 0.5rem;

	align-items: center;
}

.route-menu {
	position: absolute;

	top: calc(100% + 0.5rem);
	right: -.25rem;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 0.5rem;
	padding-right: 1rem;

	background-color: var(--background-2);
	border: 1px solid var(--background-4);
	border-radius: var(--default-border-radius);

	z-index: 100;
}

.route-menu :global(button),
.route-menu :global(a) {
	width: 100%;
	white-space: nowrap;
	justify-content: center;
}

	/* Mobile adjustments */
	@media (max-width: 700px) {
		.navbar {
			gap: 0.5rem;
		}

		.brand-group {
			gap: 0.35rem;
		}

		:global(.back-button) {
			padding-inline: 0.6rem;
			min-width: 2.4rem;
		}

		.route-selector {
			flex: 0 0 auto;
		}

		.route-menu {
			right: 0;
		}
	}
</style>
