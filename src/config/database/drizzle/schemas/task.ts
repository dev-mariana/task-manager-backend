import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("task_status", [
  "Pending",
  "In Progress",
  "Completed",
]);

export const task = pgTable("task", {
  id: varchar({ length: 16 }).primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  status: taskStatus().notNull(),
  created_at: timestamp({ mode: "string" }).defaultNow().notNull(),
  updated_at: timestamp({ mode: "string" }),
});
