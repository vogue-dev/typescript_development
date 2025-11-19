import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, 'Field "Name" is required'),
    description: z.string().trim().min(1, 'Field "Description" is required'),
    status: z.enum(['todo', 'in_progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z
        .string()
        .optional()
        .refine((value) => {
            if (!value) return true;
            const today = new Date();
            const selected = new Date(value);
            today.setHours(0, 0, 0, 0);
            selected.setHours(0, 0, 0, 0);
            return selected >= today;
        }, 'Deadline cannot be in the past'),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
