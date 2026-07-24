import { onMount } from "svelte";

export let DEVICE_KEY = 'deviceId';

onMount(() => {
    let id = localStorage.getItem(DEVICE_KEY);

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(DEVICE_KEY, id);
        }

        DEVICE_KEY = id;
})