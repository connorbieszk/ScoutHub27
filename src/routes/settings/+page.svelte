<script>
	import { resolve } from '$app/paths';
</script>

<div class="content">
	<div class="settings">
		<h2>Settings</h2>
		<h3>Theme</h3>
		<div class="buttons">
			<a href={resolve('/debug')}>Debug</a>
			<a href={resolve('/admin')}>Admin</a>
		</div>
	</div>
</div>

<style>
	div.content {
		background-color: var(--background-2);
		border-radius: var(--default-border-radius);
		width: 100%;
		min-height: var(--default-height);
		padding: 0.25rem;
		box-sizing: border-box;
		margin-top: 0.5rem;
	}

	div.settings {
		background-color: var(--background-3);
		border-radius: var(--default-border-radius);
		width: 100%;
		min-height: var(--default-height);
		padding: 0.25rem;
		box-sizing: border-box;
	}

	h2 {
		font-family: var(--font-family);
	}

	h3 {
		font-family: var(--font-family);
	}

	a {
		font-family: var(--font-family);
		font-size: 1.5rem;

		text-align: center;
		padding: 0.5rem;

		text-decoration: none;
		color: var(--foreground-2);

		background-color: var(--background-4);
		border-radius: var(--default-border-radius);

		transition: background-color 0.2s;
	}

    .buttons {
		justify-content: space-between;
		align-items: center;
		background-color: var(--background-3);
		border-radius: var(--default-border-radius);
		width: 100%;
        height: 2rem;
		padding: 0.25rem;
		box-sizing: border-box;
	}

	a:hover {
		background-color: var(--background-2);
	}
</style>
