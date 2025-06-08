import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const sessionTable = pgTable("session", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	sessionToken: text("session_token").notNull().unique(),
	expires: timestamp("expires").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
