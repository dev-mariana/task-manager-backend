CREATE TYPE "task_status" AS ENUM('Pending', 'In Progress', 'Completed');
--> statement-breakpoint
CREATE TABLE "task" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1000),
	"status" "task_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
