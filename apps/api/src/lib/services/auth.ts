import argon2 from "argon2";
import { env } from "$env/dynamic/private";
import { db } from "$lib/db";
import { sessions } from "$lib/db/schema";
import { eq, gt, and } from "drizzle-orm";
import { addDays } from "date-fns";


export const authRoles = [
	"admin",
	"strat_team",
    "hexhound"
] as const;

export type AuthRole = typeof authRoles[number];


export interface Session {
	id: string;
	createdAt: Date;
	role: AuthRole;
	expiresAt: Date;
}


const passwords = {
	admin: env.ADMIN_PASS_HASH!,
	strat_team: env.STRAT_PASS_HASH!,
    hexhound: ""
};


export async function authenticateUser(
	role: AuthRole,
	password: string
): Promise<Session | null> {

	const hash = passwords[role];

    if (role == "hexhound") {
        return null;
    }

	if (!hash) {
		return null;
	}

	const valid = await argon2.verify(
		hash,
		password
	);

	if (!valid) {
		return null;
	}

	const sessionId = await createSession(role);

	return await getSession(sessionId);
}


export async function createSession(
	role: AuthRole
): Promise<string> {

	const id = crypto.randomUUID();

	await db.insert(sessions).values({
		id,
		role,
		expiresAt: addDays(
			new Date(),
			2
		)
	});

	return id;
}


export async function getSession(
	id: string
): Promise<Session | null> {

	const session = await db.query.sessions.findFirst({
		where: and(
			eq(sessions.id, id),
			gt(
				sessions.expiresAt,
				new Date()
			)
		)
	});

	if (!session) {
		return null;
	}

	return session;
}


export async function deleteSession(
	id: string
) {
	await db.delete(sessions)
		.where(eq(sessions.id, id));
}