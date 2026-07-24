import { relations } from "drizzle-orm";
import { members } from "./members";
import { forms } from "./forms";

export const memberRelations = relations(
    members,
    ({ many }) => ({
        forms: many(forms)
    })
);