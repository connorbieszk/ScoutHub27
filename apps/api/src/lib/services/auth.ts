import argon2 from "argon2";
import { env } from "$env/dynamic/private";
import { db } from "$lib/db";
import { sessions } from "$lib/db/schema";
import { eq, gt } from "drizzle-orm";
import { addDays } from "date-fns";
import crypto from "crypto";
import { AuthRoles, type AuthRole} from "@scouthub27/shared";

export interface Session {
	id: string;
	devId: string;
	createdAt: Date;
	role: AuthRole;
	expiresAt: Date;
}

function requireEnv(name: keyof typeof env): string {
	const value = env[name];

	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}

	return value;
}

const passwords: Partial<Record<AuthRole, string>> = {
	admin: requireEnv("ADMIN_PASS_HASH"),
	strat_team: requireEnv("STRAT_PASS_HASH"),
	hexhound: undefined
};


export async function authenticateUser(
	role: AuthRole,
	password: string,
	devId: string
): Promise<{ session: Session; token: string } | null> {

	if (!AuthRoles.includes(role)) {
		return null;
	}

	if (role === "hexhound") {
		const token = await createSession(role, devId);

		const session = await getSession(token);

		if (!session) {
			return null;
		}

		return {
			session,
			token
		};
	}


	const hash = passwords[role];

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

	const token = await createSession(role, devId);

	const session = await getSession(token);

	if (!session) {
		return null;
	}

	return {
		session,
		token
	};
}

async function createSession(
	role: AuthRole,
	devId: string
): Promise<string> {

	const token = crypto.randomBytes(32).toString("hex");

	const tokenHash = await argon2.hash(token);

	await db.insert(sessions).values({
		id: tokenHash,
		devId,
		role,
		expiresAt: addDays(
			new Date(),
			2
		)
	});

	return token;
}

export async function getSession(
	token: string
): Promise<Session | null> {

	const possibleSessions = await db.query.sessions.findMany({
		where: gt(
			sessions.expiresAt,
			new Date()
		)
	});

	for (const session of possibleSessions) {

		const valid = await argon2.verify(
			session.id,
			token
		);

		if (valid) {

			await db.update(sessions)
				.set({
					expiresAt: addDays(
						new Date(),
						2
					)
				})
				.where(
					eq(
						sessions.id,
						session.id
					)
				);


			return {
				id: session.id,
				devId: session.devId,
				createdAt: session.createdAt,
				role: session.role as AuthRole,
				expiresAt: session.expiresAt
			};
		}
	}

	return null;
}

export async function deleteSession(
	token: string
) {
	const possibleSessions = await db.query.sessions.findMany();

	for (const session of possibleSessions) {

		if (
			await argon2.verify(
				session.id,
				token
			)
		) {
			await db.delete(sessions)
				.where(
					eq(
						sessions.id,
						session.id
					)
				);

			return;
		}
	}
}