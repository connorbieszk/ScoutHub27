import type { RouteId } from "$app/types";
import { browser } from "$app/environment";

let internalHistory: RouteId[] = [];

export function pullStoredHistory() {
	if (!browser) return;

	const stored = localStorage.getItem("internalHistory");

	if (!stored) {
		localStorage.setItem("internalHistory", JSON.stringify(internalHistory));
		return;
	}

	try {
		internalHistory = JSON.parse(stored) as RouteId[];
	} catch {
		internalHistory = [];
		localStorage.setItem("internalHistory", JSON.stringify(internalHistory));
	}
}

export function getHistory(): RouteId[] {
	return internalHistory;
}

export function setHistory(items: RouteId[]) {
	if (!browser) return;

	internalHistory = items;

	localStorage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);
}

export function popHistory(): RouteId | undefined {
	if (!browser) return undefined;

	const lastItem = internalHistory.at(-1);

	if (lastItem === undefined) return undefined;

	internalHistory = internalHistory.slice(0, -1);

	localStorage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);

	return lastItem;
}

export function addHistory(item: RouteId) {
	if (!browser) return;

	if (internalHistory.at(-1) === item) return;

	internalHistory.push(item);

	localStorage.setItem(
		"internalHistory",
		JSON.stringify(internalHistory)
	);
}

export function clearHistory() {
	if (!browser) return;

	internalHistory = [];
	localStorage.removeItem("internalHistory");
}