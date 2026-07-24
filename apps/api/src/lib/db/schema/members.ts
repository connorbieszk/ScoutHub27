import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { memberTypes } from "./enums";

export const members = pgTable("members", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    role: memberTypes("role").notNull(),
    niceName: text("nice_name").notNull(),
    matchesScouted: integer("matches_scouted").notNull().default(0),
    matchesCorrect: integer("matches_correct").notNull().default(0),
    scouted: integer("scouter").notNull().default(0),
    lastTimestampLoggedIn: timestamp("last_timestamp_login"),
    minsLogged: integer("mins_logged").notNull().default(0),
    fakeMoney: integer("fake_money").notNull().default(250)
});