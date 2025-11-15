import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(['todo', 'in_progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const filterTasksSchema = z.object({
    status: z.enum(['todo', 'in_progress', 'done']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    createdAt: z.string().optional(),
});
