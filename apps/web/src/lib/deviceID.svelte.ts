import { browser } from "$app/environment";

class DeviceID {
	id = $state("");

	constructor() {
		if (browser) {
			let stored = localStorage.getItem("deviceID");

			if (!stored) {
				stored = crypto.randomUUID();
				localStorage.setItem("deviceID", stored);

                console.log("Device ID: "+ stored)
			}

			this.id = stored;
		}
	}
}

export const deviceID = new DeviceID();