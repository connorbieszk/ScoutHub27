import { json } from "@sveltejs/kit";
import { listMembers } from "$lib/server/members";

export async function GET() {
	try {
		const members = await listMembers();

		return json({
			success: true,
			members
		});

	} catch {
		return json(
			{
				success: false,
				error: "Internal server error"
			},
			{
				status: 500
			}
		);
	}
}