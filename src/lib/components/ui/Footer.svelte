<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/forms/Button.svelte';
	import { getHistory, popHistory } from '$lib/stores/history';

	const links = [
		{ href: '/scouting', label: 'Scouting' },
		{ href: '/members', label: 'Members' },
		{ href: '/data', label: 'Data' },
		{ href: '/settings', label: 'Settings' }
	] as const;

	let isOnline = $state(true);

	afterNavigate(({ to }) => {
		if (to?.url.pathname) {
			const match = links.find((link) => link.href === to.url.pathname);
			if (match) {
				void match;
			}
		}
	});

	function goBack() {
		const history = getHistory();
		const previousRoute = history.at(-2);

		popHistory();

		if (!previousRoute) {
			void goto(resolve('/'));
			return;
		}

		void goto(resolve(previousRoute));
	}

	onMount(() => {
		isOnline = navigator.onLine;

		const goOnline = () => (isOnline = true);
		const goOffline = () => (isOnline = false);

		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
		};
	});
</script>

<div class="footer">
	<div class="footer-content">
		<div class="back-button">
			<Button onclick={goBack} size="md">⏎</Button>
		</div>

		<div class="footer-text">
			© 2026 Cedarburg Robotics.
			<br /> All Rights Reserved.
			<br />
			{isOnline ? 'You are Online!' : 'You are Offline :('}
		</div>
	</div>
</div>

<style>
	.footer {
		width: 100%;
	}

	.footer-content {
		position: relative;
		display: flex;
		width: 100%;
		height: 4rem;
		align-items: center;
		justify-content: center;
	}

	.back-button {
		position: absolute;
		left: 0;
	}

	.footer-text {
		text-align: center;
	}
</style>
