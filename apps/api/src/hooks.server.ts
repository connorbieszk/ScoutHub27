import type { Handle } from "@sveltejs/kit";
import { getSession } from "$lib/server/auth";


export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = null;

	const sessionId = event.cookies.get("session");

	if (sessionId) {
		const session = await getSession(sessionId);

		if (session) {
			event.locals.session = session;
		} else {
			event.cookies.delete("session", {
				path: "/"
			});
		}
	}

	return resolve(event);
};