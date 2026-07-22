import { browser } from "$app/environment";
import localforage from "localforage";

const STORAGE_KEY = 'matchScoutingFormDraft';

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

	tele: {
		shotsMade : 0,
		fuelPushed : 0,
		fuelPassed : 0,

		playedDefense : false,
		defenseQuality : 0,
		trenchBump: false,
		allianceZone : false,
		neutralZone : false,

		commitedFouls : false,
		defendability: 0,
		shooterRange : 0
	},

	final: {
		lostComms : false,
		brokeDown : false,
		climbed : false,
		driverSkill : 0,
		throughputSpeed : 0,
		intakeRating : 0,
		driverComments : "",
		robotComments : "",
		otherComments : ""
	}
};


const form = $state(
	structuredClone(defaultForm)
);

export async function deleteSavedMatch(id: string) {
	if (!browser) return false;

	const saved =
		await localforage.getItem<SavedMatch[]>('PendingUploads') ?? [];

	const filtered = saved.filter(match => match.id !== id);

	// Nothing was deleted
	if (filtered.length === saved.length) {
		return false;
	}

	await localforage.setItem('PendingUploads', filtered);

	return true;
}

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

export interface SavedMatch {
	id: string;
	status: 'pending' | 'uploaded' | 'failed';
	createdAt: number;
	matchNumber: string;
	data: typeof defaultForm;
}

export async function saveDraftAsFinal(matchNumber: string) {
	if (!browser) return;

	const saved =
		await localforage.getItem<SavedMatch[]>('PendingUploads') ?? [];

	const entry: SavedMatch = {
		id: crypto.randomUUID(),
		status: 'pending',
		createdAt: Date.now(),
		matchNumber,
		data: $state.snapshot(form)
	};

	saved.push(entry);

	await localforage.setItem('PendingUploads', saved);

	return entry.id;
}

export async function getPendingUploads() {
	if (!browser) return [];

	return (
		await localforage.getItem<SavedMatch[]>('PendingUploads')
	) ?? [];
}

export async function updateSavedMatch(
	id: string,
	updatedData: typeof defaultForm
) {
	if (!browser) return;

	const saved =
		await localforage.getItem<SavedMatch[]>('PendingUploads') ?? [];

	const index = saved.findIndex(match => match.id === id);

	if (index === -1) return;

	saved[index].data = structuredClone(updatedData);

	await localforage.setItem('PendingUploads', saved);
}

export async function getSavedMatch(id: string) {
	if (!browser) return null;

	const saved =
		await localforage.getItem<SavedMatch[]>('PendingUploads') ?? [];

	return saved.find(match => match.id === id) ?? null;
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