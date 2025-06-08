import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

// public routes
import { auth } from "./routes/auth";

// private routes
import { profile } from "./routes/protected/profile";

const app = new Hono().basePath("/api");
app.use("*", cors());
app.use("*", csrf());
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", secureHeaders());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// public routes
app.route("/auth", auth);

// private routes
app.route("/profile", profile);

export default {
	port: 3000,
	fetch: app.fetch,
};
