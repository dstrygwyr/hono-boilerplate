import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dbSchema from "./schema";

export const client = new Pool({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	port: process.env.POSTGRES_PORT as unknown as number,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	ssl: false,
});

export const db = drizzle({ client, schema: dbSchema });
export type dbType = typeof db;
