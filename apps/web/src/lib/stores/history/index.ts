import type { RouteId } from "$app/types";
import { browser } from "$app/environment";
import localforage from "localforage";

let internalHistory: RouteId[] = [];

export async function pullStoredHistory() {
	if (!browser) return;

	const stored = await localforage.getItem<string>("internalHistory");

	if (stored === null) {
		localforage.setItem("internalHistory", JSON.stringify(internalHistory));
		return;
	}

	try {
		internalHistory = JSON.parse(stored) as RouteId[];
	} catch {
		internalHistory = [];
		localforage.setItem("internalHistory", JSON.stringify(internalHistory));
	}
}

export function getHistory(): RouteId[] {
	return internalHistory;
}

export function setHistory(items: RouteId[]) {
	if (!browser) return;

	internalHistory = items;

	localforage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);
}

export function popHistory(): RouteId | undefined {
	if (!browser) return undefined;

	const lastItem = internalHistory.at(-1);

	if (lastItem === undefined) return undefined;

	internalHistory = internalHistory.slice(0, -1);

	localforage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);

	return lastItem;
}

export function addHistory(item: RouteId) {
	if (!browser) return;

	if (internalHistory.at(-1) === item) return;

	internalHistory.push(item);

	localforage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);
}

export function clearHistory() {
	if (!browser) return;

	internalHistory = [];
	localforage.removeItem("internalHistory");
}