CREATE TYPE "public"."form_status" AS ENUM('uploaded', 'failed');--> statement-breakpoint
CREATE TYPE "public"."form_type" AS ENUM('match', 'pre', 'practice', 'pit');--> statement-breakpoint
CREATE TYPE "public"."member_types" AS ENUM('admin', 'strat_team', 'hexhound');--> statement-breakpoint
CREATE TABLE "forms" (
	"id" text PRIMARY KEY NOT NULL,
	"dev_id" text NOT NULL,
	"status" "form_status" DEFAULT 'uploaded' NOT NULL,
	"type" "form_type" NOT NULL,
	"created_at" integer NOT NULL,
	"competition" text NOT NULL,
	"match_number" integer NOT NULL,
	"team_number" integer NOT NULL,
	"scouter" text NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "member_types" NOT NULL,
	"nice_name" text NOT NULL,
	"matches_scouted" integer DEFAULT 0 NOT NULL,
	"matches_correct" integer DEFAULT 0 NOT NULL,
	"scouter" integer DEFAULT 0 NOT NULL,
	"last_timestamp_login" timestamp,
	"mins_logged" integer DEFAULT 0 NOT NULL,
	"fake_money" integer DEFAULT 250 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"device_id" uuid NOT NULL,
	"role" "member_types" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
