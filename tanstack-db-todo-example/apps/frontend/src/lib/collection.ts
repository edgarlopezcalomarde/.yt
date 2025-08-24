/* eslint-disable @typescript-eslint/no-unused-vars */
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { QueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {  todoSchema } from "./model/todo";

const queryClient = new QueryClient();

export const queryTodoCollection = createCollection(
  queryCollectionOptions({
    id: "todos",
    queryKey: ["todos"],
    // refetchInterval: 3000,
    queryFn: api.todos.getAll,
    getKey: (item) => item.id,
    schema: todoSchema,
    queryClient,
    onInsert: async ({ transaction }) => {

      const {
        id: _id,
        createdAt: _crea,
        udpatedAt: _upd,
        ...modified
      } = transaction.mutations[0].modified;

      return await api.todos.create(modified);
    },
    onUpdate: async ({ transaction }) => {
      const {
        id,
        createdAt: _crea,
        udpatedAt: _upd,
        ...modified
      } = transaction.mutations[0].modified;

      return await api.todos.patch(id, modified);
    },
    onDelete: async ({ transaction }) => {
      const { id } = transaction.mutations[0].modified;

      return await api.todos.delete(id);
    },
  })
);
