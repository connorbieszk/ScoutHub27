import type { AuthRole } from "./authRoles";

export const Permissions = {
    admin: [
        "scouting.users.see",
        "scouting.submit",
        "scouting.edit",
        "scouting.export",
        "scouting.delete",
        "users.flag",
        "users.manage",
        "users.hours.scan",
        "users.hours.edit",
        "users.hours.export",
        "money.manage",
        "data.publiclists.edit",
        "data.publiclists.create",
        "data.privatelists.see"
    ],

    strat_team: [
        "scouting.submit",
        "scouting.export",
        "scouting.edit",
        "users.attendance.scan",
        "users.flag",
        "data.publiclists.edit"
    ],

    hexhound: [
        "scouting.submit",
    ]
} as const satisfies Record<AuthRole, readonly string[]>;


export type Permission =
    typeof Permissions[AuthRole][number];


export function can(
    role: AuthRole,
    permission: Permission
): boolean {
    return (
        Permissions[role] as readonly Permission[]
    ).includes(permission);
}