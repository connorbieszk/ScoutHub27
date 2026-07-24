import { env } from "$env/dynamic/private";
import { db } from "$lib/db";
import { sessions } from "$lib/db/schema";
import { UploadedMatch } from "@scouthub27/shared";
import { eq, gt, and } from "drizzle-orm";

async function createSubmission(match: UploadedMatch) : Promise<boolean> {
    
}

async function getSubmission() : Promise<UploadedMatch> {
    
}

async function listSubmissions() : Promise<UploadedMatch[]> {
    return (await db.query.forms.findMany()) as UploadedMatch[];
}

async function updateSubmission(newData : UploadedMatch, id: string) : Promise<boolean> {

}

async function deleteSubmission(id: string) : Promise<boolean> {

}

async function getTeamSubmissions(team : number) {

}

async function getEventSubmissions(event : string) {

}