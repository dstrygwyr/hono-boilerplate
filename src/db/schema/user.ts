import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: serial("id").primaryKey(),
	username: text("username").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	fullName: text("full_name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
