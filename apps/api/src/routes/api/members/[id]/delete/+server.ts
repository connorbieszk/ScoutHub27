import { json } from "@sveltejs/kit";
import { deleteMember } from "$lib/server/members";
import { checkAuth } from "$lib/helpers/checkAuth.js";


export async function DELETE({ locals, params }) {
	try {
		if (!params.id) {
			return json(
				{
					success: false,
					error: "Missing member id"
				},
				{
					status: 400
				}
			);
		}

		if (!(await checkAuth(locals.session, "users.manage"))) {
			return json(
				{
					success: false,
					error: "Missing permissions"
				},
				{
					status: 403
				}
			);
		}

		if (locals.session?.memberId === params.id) {
			return json(
				{
					success: false,
					error: "Cannot delete yourself"
				},
				{
					status: 400
				}
			);
		}

		const success = await deleteMember(params.id);

		if (!success) {
			return json(
				{
					success: false,
					error: "Unable to delete user"
				},
				{
					status: 404
				}
			);
		}

		return json({
			success: true
		});

	} catch (error) {
		console.error(error);

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