<script lang="ts">
	import { resolve } from '$app/paths';

	let menuOpen = $state(false);
</script>

<div class="navbar">
	<div class="navbar-title">
		<h3>
			<a href={resolve('/')}>HexScouter BioCore</a>
		</h3>
	</div>

	<button
		class="menu-button"
		aria-label="Toggle navigation menu"
		onclick={() => (menuOpen = !menuOpen)}
	>
		☰
	</button>

	<div class="navbar-links" class:open={menuOpen}>
		<a href={resolve('/scouting')}>Scouting</a>
		<a href={resolve('/members')}>Members</a>
		<a href={resolve('/data')}>Data</a>
		<a href={resolve('/settings')}>Settings</a>
	</div>
</div>

<style>
	.navbar {
		position: relative;

		display: flex;
		justify-content: space-between;
		align-items: center;

		background-color: var(--background-2);
		border-radius: var(--default-border-radius);

		width: 100%;
		min-height: var(--default-height);

		padding: 0.25rem;
		box-sizing: border-box;
	}

	.navbar-title h3 {
		margin: 0;
	}

	a {
		font-family: var(--font-family);
		font-size: 1.5rem;

		text-align: center;
		padding: 0.5rem;

		text-decoration: none;
		color: var(--foreground-2);

		background-color: var(--background-3);
		border-radius: var(--default-border-radius);

		transition: background-color 0.2s;
	}

	a:hover {
		background-color: var(--background-4);
	}

	.navbar-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.menu-button {
		display: none;

		background: var(--background-3);
		color: var(--foreground-1);

		border: none;
		border-radius: var(--default-border-radius);

		font-size: 2rem;
		padding: 0.25rem 0.75rem;

		cursor: pointer;
	}

	.menu-button:hover {
		background-color: var(--background-4);
	}

	/* Mobile */
	@media (max-width: 700px) {
		.navbar {
			height: auto;
		}

		.menu-button {
			display: block;
		}

		.navbar-links {
			position: absolute;

			top: calc(100% + 0.5rem);
			left: 0;
			right: 0;

			display: none;
			flex-direction: column;

			background-color: var(--background-2);

			border-radius: var(--default-border-radius);
			padding: 0.5rem;

			z-index: 100;
		}

		.navbar-links.open {
			display: flex;
		}

		.navbar-links a {
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>