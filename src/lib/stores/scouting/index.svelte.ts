import { browser } from "$app/environment";
import localforage from "localforage";

const STORAGE_KEY = 'match-scouting-form-v1';

export const defaultForm = {
	match: {
		scouterName: '',
		matchNumber: '',
		teamNumber: '',
		teamAlliance: false
	},

	auto: {
		startingPos: '',
		fuelFromNZ: 0,
		climbedInAuto: false,
		usedOutpost: false,
		usedDepot: false,
		autoSOS: 0
	},

	tele: {},

	final: {}
};


const form = $state(
	structuredClone(defaultForm)
);


async function loadForm() {
	if (!browser) return;

	const saved = await localforage.getItem<string>(STORAGE_KEY);

	if (!saved) return;

	try {
		const data = JSON.parse(saved);

		Object.assign(form.match, data.match ?? {});
		Object.assign(form.auto, data.auto ?? {});
		Object.assign(form.tele, data.tele ?? {});
		Object.assign(form.final, data.final ?? {});
	} catch {
		localforage.removeItem(STORAGE_KEY);
	}
}


function saveForm() {
	if (!browser) return;

	localforage.setItem(
		STORAGE_KEY,
		JSON.stringify(form)
	);
}


$effect.root(() => {
	$effect(() => {
		saveForm();
	});
});


loadForm();


export function getScoutingForm() {
	return form;
}


export function clearScoutingForm() {
	Object.assign(
		form.match,
		defaultForm.match
	);

	Object.assign(
		form.auto,
		defaultForm.auto
	);

	Object.assign(
		form.tele,
		defaultForm.tele
	);

	Object.assign(
		form.final,
		defaultForm.final
	);

	if (browser) {
		localforage.removeItem(STORAGE_KEY);
	}
}