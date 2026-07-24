import {
    pgTable,
    uuid,
    timestamp
} from "drizzle-orm/pg-core";

import { memberTypes } from "./enums";

export const sessions = pgTable("sessions", {
	id: uuid("id").primaryKey(),

	role: memberTypes("role")
		.notNull(),

	createdAt: timestamp("created_at")
		.defaultNow()
		.notNull(),

	expiresAt: timestamp("expires_at")
		.notNull()
});