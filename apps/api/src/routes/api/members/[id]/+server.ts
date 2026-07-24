import { json } from "@sveltejs/kit";
import { getMember } from "$lib/server/members";

export async function GET({ params }) {
	const member = await getMember(params.id);

	if (!member) {
		return json(
			{
				error: "Member not found"
			},
			{
				status: 404
			}
		);
	}

	return json(member);
}