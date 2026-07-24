import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: "./src/lib/db/schema/*.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DB_URL!
	}
});