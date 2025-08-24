import { t } from "elysia";

export const todoSchema = t.Object({
  id: t.String(),
  text: t.String({
    minLength: 1,
  }),
  completed: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const insertTodoSchema = t.Omit(todoSchema, [
  "id",
  "completed",
  "createdAt",
  "updatedAt",
]);

export const updateTodoSchema = t.Partial(
  t.Omit(todoSchema, ["id", "createdAt", "updatedAt"])
);

export type Todo = (typeof todoSchema)["static"];
export type InsertTodo = (typeof insertTodoSchema)["static"];
