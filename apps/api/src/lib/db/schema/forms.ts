import { pgTable, uuid, integer, timestamp, text, jsonb } from "drizzle-orm/pg-core";
import { MatchData } from "@scouthub27/shared";
import { formStatus, formType } from "./enums";



export const forms = pgTable("forms", {
    id: uuid("id").primaryKey(),
    type: formType("type").notNull(),
    teamNumber: integer("team_number").notNull(),
    status: formStatus("status").default("uploaded").notNull(),
    scouter: text("scouter").notNull(),
    createdAt: timestamp("created_at")
        .defaultNow().notNull(),
    data: jsonb("data").notNull().$type<MatchData>()
});