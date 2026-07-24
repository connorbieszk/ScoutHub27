import { browser } from "$app/environment";
import localforage from "localforage";
import { type MatchData, createMatchData, currentCompetiton, UploadedMatch } from "@scouthub27/shared";
import { deviceID } from "$lib/deviceID.svelte";

const STORAGE_KEY = "matchScoutingFormDraft";
const PENDING_KEY = "PendingUploads";

const form = $state(createMatchData());

function cloneForm(data: MatchData) {
	return structuredClone($state.snapshot(data));
}

async function readPending() {
	return (
		await localforage.getItem<UploadedMatch[]>(PENDING_KEY)
	) ?? [];
}

async function writePending(matches: UploadedMatch[]) {
	await localforage.setItem(PENDING_KEY, matches);
}

async function saveForm() {
	if (!browser) return;

	await localforage.setItem(
		STORAGE_KEY,
		cloneForm(form)
	);
}

export async function loadForm() {
	if (!browser) return;

	const saved =
		await localforage.getItem<Partial<MatchData>>(STORAGE_KEY);

	if (!saved) return;

	Object.assign(form, createMatchData(saved));
}

export function setupScoutingForm() {
    $effect(() => {
        saveForm();
    });
}

export function getScoutingForm() {
	return form;
}

export async function saveDraftAsFinal() {
	if (!browser) return null;

	const saved = await readPending();

	const entry: UploadedMatch = {
		id: crypto.randomUUID(),
		devId: deviceID.id,
		status: "pending",
		type: "match",
		createdAt: Date.now(),
		competition: currentCompetiton,
		teamNumber: form.match.teamNumber,
		matchNumber: form.match.matchNumber,
		scouter: form.match.scouterName,
		data: cloneForm(form)
	};

	await writePending([
		...saved,
		(entry)
	]);

	return entry.id;
}


export async function getPendingUploads() {
	if (!browser) return [];

	return readPending();
}


export async function getSavedMatch(id: string) {
	if (!browser) return null;

	const saved = await readPending();

	const match = saved.find(
		match => match.id === id
	);

	if (!match) return null;

	return {
		...match,
		data: createMatchData(match.data)
	};
}


export async function updateSavedMatch(
	id: string,
	data: MatchData
) {
	if (!browser) return false;

	const saved = await readPending();

	const index = saved.findIndex(
		match => match.id === id
	);

	if (index === -1) {
		return false;
	}

	saved[index] = {
		...saved[index],
		matchNumber: data.match.matchNumber,
		data: cloneForm(data)
	};

	await writePending(saved);

	return true;
}


export async function deleteSavedMatch(id: string) {
	if (!browser) return false;

	const saved = await readPending();

	const updated = saved.filter(
		match => match.id !== id
	);

	if (updated.length === saved.length) {
		return false;
	}

	await writePending(updated);

	return true;
}

export function setScoutingForm(data: MatchData) {
	Object.assign(form, createMatchData(data));
}


export function clearScoutingForm() {
	Object.assign(form, createMatchData());

	if (browser) {
		localforage.removeItem(STORAGE_KEY);
	}
}