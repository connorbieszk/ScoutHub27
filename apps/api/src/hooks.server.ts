import type { Handle } from "@sveltejs/kit";
import { getSession } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get("session");

	event.locals.session = null;

	if (sessionId) {
		event.locals.session = await getSession(sessionId);
	}

	return resolve(event);
};