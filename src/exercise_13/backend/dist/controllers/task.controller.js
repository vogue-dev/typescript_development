"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const task_service_1 = require("../services/task.service");
const createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    status: zod_1.z.enum(["todo", "in_progress", "done"]),
    priority: zod_1.z.enum(["low", "medium", "high"]),
    deadline: zod_1.z.string().optional(),
    assigneeId: zod_1.z.number().int().positive().optional()
});
const updateTaskSchema = createTaskSchema.partial();
const filterTasksSchema = zod_1.z.object({
    status: zod_1.z.enum(["todo", "in_progress", "done"]).optional(),
    priority: zod_1.z.enum(["low", "medium", "high"]).optional(),
    createdAt: zod_1.z.string().optional()
});
class TaskController {
    async getTasks(req, res, next) {
        try {
            const filters = filterTasksSchema.parse(req.query);
            const tasks = await task_service_1.taskService.getAll(filters);
            res.json(tasks);
        }
        catch (err) {
            next(err);
        }
    }
    async getTaskById(req, res, next) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }
            const task = await task_service_1.taskService.getById(id);
            if (!task) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
            res.json(task);
        }
        catch (err) {
            next(err);
        }
    }
    async createTask(req, res, next) {
        try {
            const data = createTaskSchema.parse(req.body);
            const created = await task_service_1.taskService.create(data);
            res.status(201).json(created);
        }
        catch (err) {
            next(err);
        }
    }
    async updateTask(req, res, next) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }
            const data = updateTaskSchema.parse(req.body);
            const updated = await task_service_1.taskService.update(id, data);
            if (!updated) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id) || id <= 0) {
                res.status(400).json({ error: "Invalid task id" });
                return;
            }
            const deleted = await task_service_1.taskService.delete(id);
            if (!deleted) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.TaskController = TaskController;
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: "Validation error",
            issues: err.issues
        });
        return;
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
