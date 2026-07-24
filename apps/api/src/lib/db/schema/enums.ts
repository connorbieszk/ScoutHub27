import { pgEnum } from "drizzle-orm/pg-core";

export const formStatus = pgEnum(
    "form_status",
    [
        "uploaded",
        "failed"
    ]
);

export const formType = pgEnum(
    "form_type",
    [
        "match",
        "pre",
        "practice",
        "pit"
    ]
);

export const memberTypes = pgEnum(
    "member_types",
    [
        "admin",
        "strat_team",
        "hexhound"
    ]
);
