import { instance } from "./config/instance";
import type { InsertTodo, Todo, UpdateTodo } from "./model/todo";

export const api = {
  todos: {
    getAll: async () => {
      const { data } = await instance.get<Array<Todo>>("/posts");
      return data;
    },
    create: async (body: InsertTodo) => {
      const { data } = await instance.post<Todo>("/posts", body);
      return data;
    },
    patch: async (id: string, body: UpdateTodo) => {
      const { data } = await instance.patch<Todo>("/posts/" + id, body);
      return data;
    },
    delete: async (id: string) => {
      const { data } = await instance.delete("/posts/" + id);
      return data;
    },
  },
};
