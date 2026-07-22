<script lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { getPendingUploads, deleteSavedMatch } from '$lib/stores/match/index.svelte';
	import type { SavedMatch } from '$lib/stores/match/index.svelte';
	import { slide } from 'svelte/transition';

	let uploadedData = $state<SavedMatch[] | null>(null);
	getPendingUploads().then((data: SavedMatch[]) => {
		uploadedData = $state.snapshot(data);
	});

	let confirmDeleteId = $state<string | null>(null);
	let confirmTimeout: ReturnType<typeof setTimeout> | null = null;

	function cancelDelete() {
		if (confirmTimeout) clearTimeout(confirmTimeout);
		confirmDeleteId = null;
	}

	async function deleteMatch(id: string) {
		await deleteSavedMatch(id);

		uploadedData = await getPendingUploads();

		clearDeleteConfirmation();
	}

	function clearDeleteConfirmation() {
		if (confirmTimeout) {
			clearTimeout(confirmTimeout);
			confirmTimeout = null;
		}

		confirmDeleteId = null;
	}

	function toggleDeleteConfirmation(id: string) {
		if (confirmDeleteId === id) {
			clearDeleteConfirmation();
			return;
		}

		clearDeleteConfirmation();

		confirmDeleteId = id;

		confirmTimeout = setTimeout(() => {
			clearDeleteConfirmation();
		}, 5000);
	}
</script>

<svelte:head>
	<title>Offline Data</title>
</svelte:head>

<div class="content">
	{#each uploadedData as data, index (index)}
		<div
			class="data"
			style="background-color: color-mix(in srgb, var({!data.data.match.teamAlliance
				? '--red'
				: '--blue'}) 10%, var(--background-2) 90%)"
		>
			<div class="large-text">
				<h2>Match Number: {data.matchNumber == '' ? 'Missing!' : data.matchNumber}</h2>
				<h3>Team: {data.data.match.teamNumber == '' ? 'Missing!' : data.data.match.teamNumber}</h3>
			</div>
			<div class="bottom-container">
				<div class="small-text">
					ID: {data.id} <br />
					Created At: {new Date(data.createdAt).toLocaleString()}
				</div>
				<div class="buttons">
					<Button size="md" variant="danger" onclick={() => toggleDeleteConfirmation(data.id)}>
						Delete
					</Button>
					<Button size="md">Edit</Button>
					<Button size="md" variant="primary">Upload</Button>
				</div>
			</div>
			{#if confirmDeleteId === data.id}
				<div class="delete-confirmation" transition:slide>
					<div class="warning">
						⚠ <strong>Delete this match?</strong><br />
						This action cannot be undone.
					</div>

					<div class="confirm-buttons">
						<Button size="md" onclick={cancelDelete}>Cancel</Button>

						<Button size="md" variant="danger" onclick={() => deleteMatch(data.id)}>
							Delete Forever
						</Button>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.data {
		padding: var(--default-margin);
		padding-top: calc(var(--default-margin) * 2);
		padding-bottom: calc(var(--default-margin) * 2);
		margin: var(--default-margin);
		margin-top: calc(var(--default-margin) * 2);
		margin-bottom: calc(var(--default-margin) * 8);
		background: var(--background-2);
		border: 1px solid var(--background-4);
		border-radius: var(--default-border-radius);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.large-text h2 {
		margin: 0;
		word-break: break-word;
	}

	.bottom-container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
	}

	.small-text {
		font-size: 0.9rem;
		color: var(--text-2);
		word-break: break-word;
	}

	.buttons {
		margin-left: auto;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.delete-confirmation {
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--background-4);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.warning {
		color: var(--danger);
		font-size: 0.95rem;
		line-height: 1.4;
	}

	.confirm-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	@media (max-width: 600px) {
		.data {
			padding: 0.9rem;
			margin: 0.75rem;
		}

		.bottom-container {
			gap: 0.75rem;
		}

		.buttons {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}

		.buttons :global(button),
		.buttons :global(a) {
			width: 100%;
		}
		.confirm-buttons {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			width: 100%;
		}

		.confirm-buttons :global(button),
		.confirm-buttons :global(a) {
			width: 100%;
		}
	}

	@media (max-width: 900px) {
		.bottom-container {
			flex-direction: column;
			align-items: stretch;
		}

		.buttons {
			margin-left: 0;
			justify-content: flex-end;
		}
	}
</style>
