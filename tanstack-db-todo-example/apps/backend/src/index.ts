import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { env } from "./lib/config/env";
import { PrismaClient } from "../generated/prisma";
import { insertTodoSchema, updateTodoSchema } from "./lib/model/todo";

const prisma = new PrismaClient();

const app = new Elysia();
app.use(cors()).group("/api", (api) => {
  api.get("/posts", async () => {
    return await prisma.todos.findMany({});
  });

  api.post(
    "/posts",
    async ({ body }) => {
      return await prisma.todos.create({
        data: body,
      });
    },
    {
      body: insertTodoSchema,
    }
  );

  api.patch(
    "/posts/:id",
    async ({ body, params }) => {
      const id = params.id;
      return await prisma.todos.update({
        where: { id },
        data: body,
      });
    },
    {
      body: updateTodoSchema,
    }
  );

  api.delete("/posts/:id", async ({ params }) => {
    const id = params.id;
    return await prisma.todos.delete({
      where: { id },
    });
  });

  return api;
});

app.listen(env["PORT"], () =>
  console.log(`Running -->  http://localhost:${env["PORT"]}`)
);
