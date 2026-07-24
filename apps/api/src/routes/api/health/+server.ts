import { json } from "@sveltejs/kit";
import { getHealth } from "$lib/server/health";

export async function GET() {
	const health = await getHealth();

	return json(health, {
		status: health.status === "ok" ? 200 : 503
	});
}