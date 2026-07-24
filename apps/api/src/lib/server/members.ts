import { db } from "$lib/db";
import { members } from "$lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export type Member = typeof members.$inferSelect;

export async function createMember(member: Member): Promise<boolean> {
	try {
		await db.insert(members).values({
			id: member.id,
			name: member.name,
			role: member.role,
			niceName: member.niceName,
			matchesScouted: member.matchesScouted,
			matchesCorrect: member.matchesCorrect,
			scouted: member.scouted,
			lastTimestampLoggedIn: member.lastTimestampLoggedIn,
			minsLogged: member.minsLogged,
			fakeMoney: member.fakeMoney
		});

		return true;
	} catch {
		return false;
	}
}


export async function getMember(id: string): Promise<Member | null> {
	const member = await db.query.members.findFirst({
		where: eq(members.id, id)
	});

	return member as Member ?? null;
}


export async function listMembers(): Promise<Member[]> {
	return await db.query.members.findMany({
		orderBy: desc(members.matchesScouted)
	}) as Member[];
}


export async function updateMember(
	id: string,
	data: Partial<Member>
): Promise<boolean> {
	try {
		const result = await db
			.update(members)
			.set(data)
			.where(eq(members.id, id))
			.returning({
				id: members.id
			});

		return result.length > 0;
	} catch {
		return false;
	}
}


export async function deleteMember(id: string): Promise<boolean> {
	try {
		const result = await db
			.delete(members)
			.where(eq(members.id, id))
			.returning({
				id: members.id
			});

		return result.length > 0;
	} catch {
		return false;
	}
}


export async function recordLogin(id: string): Promise<boolean> {
	try {
		await db
			.update(members)
			.set({
				lastTimestampLoggedIn: new Date()
			})
			.where(eq(members.id, id));

		return true;
	} catch {
		return false;
	}
}

export async function recordLogout(id: string): Promise<boolean> {
	try {
		const member = await db.query.members.findFirst({
			where: eq(members.id, id)
		});

		if (!member || !member.lastTimestampLoggedIn) {
			return false;
		}

		const loginTime = member.lastTimestampLoggedIn;
		const logoutTime = new Date();

		const elapsedMs = logoutTime.getTime() - loginTime.getTime();
		const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));

		if (elapsedMinutes < 0 || elapsedMinutes > 1440) {
			await db
				.update(members)
				.set({
					lastTimestampLoggedIn: null
				})
				.where(eq(members.id, id));

			return false;
		}

		await db
			.update(members)
			.set({
				minsLogged: sql`${members.minsLogged} + ${elapsedMinutes}`,
				lastTimestampLoggedIn: null
			})
			.where(eq(members.id, id));

		return true;
	} catch {
		return false;
	}
}

export async function incrementScouted(id: string): Promise<boolean> {
	try {
		await db
			.update(members)
			.set({
				matchesScouted: sql`${members.matchesScouted} + 1`
			})
			.where(eq(members.id, id));

		return true;
	} catch {
		return false;
	}
}