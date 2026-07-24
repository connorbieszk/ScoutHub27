import { db } from "$lib/db";
import { sql } from "drizzle-orm";

export interface HealthStatus {
	status: "ok" | "degraded";
	timestamp: string;
	checks: {
		database: "ok" | "failed";
	};
}


export async function getHealth(): Promise<HealthStatus> {
	const checks = {
		database: "failed" as "ok" | "failed"
	};

	try {
		await db.execute(sql`SELECT 1`);
		checks.database = "ok";
	} catch {
		checks.database = "failed";
	}

	const healthy = Object.values(checks)
		.every((check) => check === "ok");

	return {
		status: healthy ? "ok" : "degraded",
		timestamp: new Date().toISOString(),
		checks
	};
}