import {z} from "zod";

export const todoSchema = z.object({
    id: z.uuid(),
    text: z.string().min(1),
    completed: z.boolean(),
    createdAt: z.date(),
    udpatedAt: z.date(),
})
export const selectTodoSchema = z.array(todoSchema)
export const insertTodoSchema = todoSchema.omit({ createdAt: true, udpatedAt:true, id: true, completed: true})
export const updateTodoSchema =  todoSchema.omit({ createdAt: true, udpatedAt:true, id: true})

export type Todo = z.infer<typeof todoSchema>
export type SelectTodo = z.infer<typeof selectTodoSchema>
export type InsertTodo = z.infer<typeof insertTodoSchema>
export type UpdateTodo = z.infer<typeof updateTodoSchema>