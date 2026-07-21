<script>
	import { onMount } from 'svelte';

	let isOnline = $state(true); // Or use writable(true) in older Svelte versions

	onMount(() => {
		// Set initial state
		isOnline = navigator.onLine;

		// Listen for network changes
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
	<br />
	© 2026 Cedarburg Robotics. All Rights Reserved. <br />{isOnline
		? 'You are Online!'
		: 'You are Offline :('}<br /><br />
</div>
