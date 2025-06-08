import * as argon2 from "argon2";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";
import { signAccessToken, signRefreshToken, verifyAccessToken } from "./jwt";

export async function hashPassword(password: string): Promise<string> {
	return await argon2.hash(password);
}

export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	try {
		return await argon2.verify(hash, password);
	} catch (error) {
		console.error("Password verification failed:", error);
		return false;
	}
}

export async function createSession(userId: number) {
	const refreshToken = await signRefreshToken(userId);
	const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

	const [session] = await db
		.insert(sessionTable)
		.values({
			userId,
			sessionToken: refreshToken,
			expires,
		})
		.returning();

	const accessToken = await signAccessToken(userId, session.id);

	return { accessToken, refreshToken };
}

export async function getUserBySession(token: string) {
	const payload = await verifyAccessToken(token);

	if (!payload || !payload.sub || !payload.sid) return null;
	const sessionId = Number(payload.sid);
	const userId = Number(payload.sub);

	const [session] = await db
		.select()
		.from(sessionTable)
		.where(
			and(
				eq(sessionTable.id, sessionId),
				eq(sessionTable.userId, userId),
				gt(sessionTable.expires, new Date()),
			),
		);

	if (!session) return null;

	const [user] = await db
		.select()
		.from(userTable)
		.where(eq(userTable.id, userId));

	return user || null;
}
