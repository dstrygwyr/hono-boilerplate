import { Hono } from "hono";
import { authMiddleware } from "@/middleware/auth";

export const profile = new Hono();

profile.use("*", authMiddleware);

profile.get("/", (c) => {
	return c.text("protected route by auth");
});
