import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";
import { createSession, hashPassword, verifyPassword } from "@/lib/auth";
import { signAccessToken, verifyRefreshToken } from "@/lib/jwt";

export const auth = new Hono();

auth.post("/register", async (c) => {
	const { username, password, fullName, email } = await c.req.json();
	const hash = await hashPassword(password);

	const [exsisting] = await db
		.select()
		.from(userTable)
		.where(eq(userTable.username, username));
	if (exsisting) return c.json({ error: "Username already exists" }, 400);

	const [user] = await db
		.insert(userTable)
		.values({
			username,
			passwordHash: hash,
			fullName,
			email,
		})
		.returning();

	return c.json({
		message: "User registered successfully",
		user: {
			id: user.id,
			username: user.username,
			fullName: user.fullName,
			email: user.email,
		},
	});
});

auth.post("/login", async (c) => {
	const { username, password } = await c.req.json();

	const [user] = await db
		.select()
		.from(userTable)
		.where(eq(userTable.username, username));
	if (!user) return c.json({ error: "Invalid username or password" }, 400);

	const isValid = await verifyPassword(password, user.passwordHash);
	if (!isValid) return c.json({ error: "Invalid username or password" }, 400);

	const { accessToken, refreshToken } = await createSession(user.id);
	return c.json({
		message: "Login successful",
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			username: user.username,
			fullName: user.fullName,
			email: user.email,
		},
	});
});

auth.post("/refrehs-token", async (c) => {
	const { refreshToken } = await c.req.json();

	if (!refreshToken) {
		return c.json({ error: "Missing refresh token" }, 401);
	}

	try {
		const payload = await verifyRefreshToken(refreshToken);
		const userId = parseInt(payload.sub as string, 10);
		const [session] = await db
			.select()
			.from(sessionTable)
			.where(eq(sessionTable.sessionToken, refreshToken));

		if (!session || new Date(session.expires) < new Date()) {
			return c.json({ error: "Invalid session" }, 401);
		}

		const accessToken = await signAccessToken(userId, session.id);
		return c.json({ accessToken });
	} catch {
		return c.json(
			{
				error: "Invalid refresh token",
			},
			401,
		);
	}
});
