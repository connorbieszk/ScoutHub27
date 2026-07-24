import { json } from "@sveltejs/kit";
import { deleteMember } from "$lib/server/members";
import { checkAuth } from "$lib/helpers/checkAuth.js";


export async function POST({ locals, params }) {
    try {

        if (!params.id) {
            return json(
                { success: false, error: "Missing member id" },
                { status: 400 }
            );
        }

        if (!(await checkAuth(locals.session, "users.manage"))) {
            return json(
                { success: false, error: "Missing permissions" },
                { status: 403 }
            );
        }

        const success = await deleteMember(params.id);

        if (!success) {
            return json(
                { success: false, error: "Unable to delete user" },
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