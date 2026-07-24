import { pgTable, uuid, integer, text, jsonb } from "drizzle-orm/pg-core";
import { UploadedMatch } from "@scouthub27/shared";
import { formStatus, formType } from "./enums";

export const forms = pgTable("forms", {
    id: uuid("id").primaryKey(),
    devId: uuid("dev_id").notNull(),
    status: formStatus("status").default("uploaded").notNull(),
    type: formType("type").notNull(),
    createdAt: integer("created_at").notNull(),
    competition: text("competition").notNull(),
    matchNumber: integer("team_number").notNull(),
    teamNumber: integer("team_number").notNull(),
    scouter: text("scouter").notNull(),
    data: jsonb("data").notNull().$type<UploadedMatch>()
});