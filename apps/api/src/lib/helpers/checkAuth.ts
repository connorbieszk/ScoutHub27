import { error } from "@sveltejs/kit";
import type { Session } from "$lib/services/auth";
import type { Permission } from "@scouthub27/shared";
import { can } from "@scouthub27/shared";

export function checkAuth(
	session: Session | null,
	permission: Permission
): Session {

	if (!session) {
		throw error(401, "Not logged in");
	}

	if (!can(session.role, permission)) {
		throw error(403, "Forbidden");
	}

	return session;
}