import type { MiddlewareHandler } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { getUserBySession } from "@/lib/auth";

export const authMiddleware: MiddlewareHandler = bearerAuth({
	verifyToken: async (token, c) => {
		try {
			const user = await getUserBySession(token);
			if (!user) return false;

			c.set("user", user);
			return true;
		} catch (err) {
			console.error("Error in bearerAuth verifyToken:", err);
			return false;
		}
	},
});
