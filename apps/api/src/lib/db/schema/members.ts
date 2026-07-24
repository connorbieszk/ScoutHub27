import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
    id: uuid("id").primaryKey(),
    passHash: text("pash_hash").notNull(),
    name: text("name").notNull(),
    niceName: text("nice_name").notNull(),
    matchesScouted: integer("matches_scouted").notNull().default(0),
    matchesCorrect: integer("matches_correct").notNull().default(0),
    scouter: text("scouter").notNull(),
    hoursLogged: integer("hours_logged").notNull().default(0),
    fakeMoney: integer("fake_money").notNull().default(250)
});