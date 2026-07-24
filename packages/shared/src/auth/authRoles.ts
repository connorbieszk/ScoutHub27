export const AuthRoles = [
	"admin",
	"strat_team",
	"hexhound"
] as const;

export type AuthRole = typeof AuthRoles[number];