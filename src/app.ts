import cors from "@fastify/cors";
import { init } from "@paralleldrive/cuid2";
import fastify from "fastify";
import { db } from "./config/database/drizzle";
import { task } from "./config/database/drizzle/schemas/task";

export const app = fastify();

app.register(cors, {
  origin: true,
});

app.post("/tasks", async (request, reply) => {
  const body = request.body as any;
  const { title, description, status } = body;
  const created_id = init({ length: 16 });

  const newTask = await db
    .insert(task)
    .values({
      id: created_id(),
      title,
      description,
      status: status || "Pending",
    })
    .returning();

  reply.code(201).send(newTask[0]);
});

app.get("/tasks", async (request, reply) => {
  const tasks = await db.select().from(task);
  reply.send(tasks);
});
