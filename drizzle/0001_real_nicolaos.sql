CREATE TABLE "t3-app-with-di_task" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "title" ON "t3-app-with-di_task" USING btree ("title");