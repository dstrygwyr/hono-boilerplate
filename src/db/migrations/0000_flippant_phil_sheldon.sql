CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"session_token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "session_session_token_unique" UNIQUE("session_token")
);

CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);

ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;