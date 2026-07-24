import { json } from "@sveltejs/kit";
import { recordLogout } from "$lib/server/members";


export async function POST({  params  }) {
	try {

		if (!params.id) {
			return json(
				{ success: false, error: "Missing member id" },
				{ status: 400 }
			);
		}

		const success = await recordLogout(params.id);

		if (!success) {
			return json(
				{ success: false, error: "Unable to record logout" },
				{ status: 400 }
			);
		}

		return json({
			success: true
		});

	} catch {
		return json(
			{ success: false, error: "Invalid request" },
			{ status: 500 }
		);
	}
}