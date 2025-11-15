import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import {
    taskPriorities,
    taskStatuses,
    type TaskCreateInput,
    type TaskUpdateInput,
    type TaskFilters,
} from '../types/task.types.js';
import { TaskService } from '../services/task.service.js';

export const taskCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),

    status: z.enum(["todo", "in_progress", "done"], {
        error: "Invalid status"
    }),
    priority: z.enum(["low", "medium", "high"], {
        error: "Invalid priority"
    }),

    deadline: z.string().optional(),
});

const taskUpdateSchema = taskCreateSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: 'At least one field must be provided to update' },
);

const taskQuerySchema = z.object({
    status: z.enum(taskStatuses).optional(),
    priority: z.enum(taskPriorities).optional(),
    createdAt: z.string().optional(),
});

export class TaskController {
    constructor(private readonly service: TaskService) {}

    // GET - tasks
    getTasks = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const query = taskQuerySchema.parse(req.query);
            const filters: TaskFilters = query;
            const tasks = this.service.getAll(filters);
            res.json(tasks);
        } catch (error: unknown) {
            next(error);
        }
    };

    // GET - tasks/:id
    getTaskById = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: 'Invalid task id' });
                return;
            }

            const task = this.service.getById(id);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }

            res.json(task);
        } catch (error: unknown) {
            next(error);
        }
    };

    // POST
    createTask = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const data = taskCreateSchema.parse(req.body) as TaskCreateInput;
            const created = this.service.create(data);
            res.status(201).json(created);
        } catch (error: unknown) {
            next(error);
        }
    };

    // PUT
    updateTask = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: 'Invalid task id' });
                return;
            }

            const data = taskUpdateSchema.parse(req.body) as TaskUpdateInput;
            const updated = this.service.update(id, data);

            if (!updated) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }

            res.json(updated);
        } catch (error: unknown) {
            next(error);
        }
    };

    // DELETE
    deleteTask = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: 'Invalid task id' });
                return;
            }

            const deleted = this.service.delete(id);
            if (!deleted) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }

            res.status(204).send();
        } catch (error: unknown) {
            next(error);
        }
    };
}

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    if (err instanceof ZodError) {
        res.status(400).json({
            error: 'Validation error',
            issues: err.issues,
        });
        return;
    }

    res.status(500).json({ error: 'Internal server error' });
}
