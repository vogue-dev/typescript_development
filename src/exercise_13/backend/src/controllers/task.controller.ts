import type { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import { taskService } from "../services/task.service";

const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(["todo", "in_progress", "done"]),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.string().optional(),
    assigneeId: z.number().int().positive().optional()
});

const updateTaskSchema = createTaskSchema.partial();
const filterTasksSchema = z.object({
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    createdAt: z.string().optional()
});

export class TaskController {
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = filterTasksSchema.parse(req.query);
            const tasks = await taskService.getAll(filters);
            res.json(tasks);
        } catch (err) {
            next(err);
        }
    }

    async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }

            const task = await taskService.getById(id);
            if (!task) {
                res.status(404).json({ error: "Task not found" });
                return;
            }

            res.json(task);
        } catch (err) {
            next(err);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createTaskSchema.parse(req.body);
            const created = await taskService.create(data);
            res.status(201).json(created);
        } catch (err) {
            next(err);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }

            const data = updateTaskSchema.parse(req.body);
            const updated = await taskService.update(id, data);
            if (!updated) {
                res.status(404).json({ error: "Task not found" });
                return;
            }

            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }

            const deleted = await taskService.delete(id);
            if (!deleted) {
                res.status(404).json({ error: "Task not found" });
                return;
            }

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ZodError) {
        res.status(400).json({
            error: "Validation error",
            issues: err.issues
        });
        return;
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
