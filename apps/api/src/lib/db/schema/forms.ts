import { pgTable, integer, text, jsonb } from "drizzle-orm/pg-core";
import { formStatus, formType } from "./enums";

export const forms = pgTable("forms", {
    id: text("id").primaryKey(),
    devId: text("dev_id").notNull(),
    status: formStatus("status").default("uploaded").notNull(),
    type: formType("type").notNull(),
    createdAt: integer("created_at").notNull(),
    competition: text("competition").notNull(),
    matchNumber: integer("match_number").notNull(),
    teamNumber: integer("team_number").notNull(),
    scouter: text("scouter").notNull(),
    data: jsonb("data").notNull()
});