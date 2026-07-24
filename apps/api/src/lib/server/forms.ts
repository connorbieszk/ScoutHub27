import { db } from "$lib/db";
import { forms } from "$lib/db/schema";
import { UploadedMatch } from "@scouthub27/shared";
import { eq } from "drizzle-orm";


async function createSubmission(match: UploadedMatch): Promise<boolean> {
	try {
		await db.insert(forms).values({
			id: match.id,
			devId: match.devId,
			status: match.status,
			type: match.type,
			createdAt: match.createdAt,
			competition: match.competition,
			matchNumber: match.matchNumber,
			teamNumber: match.teamNumber,
			scouter: match.scouter,
			data: match.data
		});

		return true;
	} catch {
		return false;
	}
}


async function getSubmission(id: string): Promise<UploadedMatch | null> {
	const submission = await db.query.forms.findFirst({
		where: eq(forms.id, id)
	});

	return submission ? (submission as UploadedMatch) : null;
}


async function listSubmissions(): Promise<UploadedMatch[]> {
	const submissions = await db.query.forms.findMany();

	return submissions as UploadedMatch[];
}


async function updateSubmission(
	newData: Partial<UploadedMatch>,
	id: string
): Promise<boolean> {
	try {
		const result = await db
			.update(forms)
			.set(newData)
			.where(eq(forms.id, id))
			.returning({ id: forms.id });

		return result.length > 0;
	} catch {
		return false;
	}
}


async function deleteSubmission(id: string): Promise<boolean> {
	try {
		const result = await db
			.delete(forms)
			.where(eq(forms.id, id))
			.returning({ id: forms.id });

		return result.length > 0;
	} catch {
		return false;
	}
}


async function getTeamSubmissions(team: number): Promise<UploadedMatch[]> {
	const submissions = await db.query.forms.findMany({
		where: eq(forms.teamNumber, team)
	});

	return submissions as UploadedMatch[];
}


async function getEventSubmissions(event: string): Promise<UploadedMatch[]> {
	const submissions = await db.query.forms.findMany({
		where: eq(forms.competition, event)
	});

	return submissions as UploadedMatch[];
}


export {
	createSubmission,
	getSubmission,
	listSubmissions,
	updateSubmission,
	deleteSubmission,
	getTeamSubmissions,
	getEventSubmissions
};