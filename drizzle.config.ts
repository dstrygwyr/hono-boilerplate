import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema",
	dialect: "postgresql",
	breakpoints: false,
	dbCredentials: {
		host: process.env.POSTGRES_HOST!,
		user: process.env.POSTGRES_USER!,
		port: Number(process.env.POSTGRES_PORT!),
		password: process.env.POSTGRES_PASSWORD!,
		database: process.env.POSTGRES_DB!,
		ssl: false,
	},
	verbose: true,
	strict: true,
});
