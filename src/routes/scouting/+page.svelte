<script>
	import Button from '$lib/components/forms/Button.svelte';
</script>

<div class="content">
	<div class="title">
		<h1>Scouting</h1>
		<h2>Select the type of Scouting</h2>
	</div>

	<div class="actions">
		<Button href="/scouting/match">Match</Button>
		<Button href="/scouting/precomp">Pre Competition</Button>
		<Button href="/scouting/pit">Pit Scouting</Button>
        <Button href="/scouting/practice">Practice Scouting</Button>	
		<Button href="/scouting/offline">Your Offline Data</Button>
	</div>
</div>

<svelte:head>
	<title>Scouting</title>
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
			align-items:center;
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
