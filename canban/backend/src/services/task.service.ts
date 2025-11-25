import { Task, TaskAttributes, TaskStatus, TaskPriority } from "../models/Task.model";
import { Op, WhereOptions } from "sequelize";

export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    createdAt?: string; // YYYY-MM-DD
}

export interface TaskCreateInput {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string;
}

export type TaskUpdateInput = Partial<TaskCreateInput>;

export class TaskService {
    async getAll(filters: TaskFilters = {}): Promise<Task[]> {
        const where: WhereOptions<TaskAttributes> = {};

        if (filters.status) where.status = filters.status;
        if (filters.priority) where.priority = filters.priority;
        if (filters.createdAt) {
            const day = filters.createdAt;
            where.createdAt = {
                [Op.gte]: new Date(day + "T00:00:00.000Z"),
                [Op.lt]: new Date(day + "T23:59:59.999Z"),
            };
        }

        return Task.findAll({ where, include: ["assignee"] });
    }

    async getById(id: number): Promise<Task | null> {
        return Task.findByPk(id, { include: ["assignee"] });
    }

    async create(input: TaskCreateInput): Promise<Task> {
        const payload: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt"> = {
            title: input.title,
            description: input.description,
            status: input.status,
            priority: input.priority,
            deadline: input.deadline ? new Date(input.deadline) : null,
        };

        return Task.create(payload);
    }

    async update(id: number, updates: TaskUpdateInput): Promise<Task | null> {
        const task = await Task.findByPk(id);
        if (!task) return null;

        if (updates.title !== undefined) task.title = updates.title;
        if (updates.description !== undefined) task.description = updates.description;
        if (updates.status !== undefined) task.status = updates.status;
        if (updates.priority !== undefined) task.priority = updates.priority;
        if (updates.deadline !== undefined)
            task.deadline = updates.deadline ? new Date(updates.deadline) : null;

        await task.save();
        return task;
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await Task.destroy({ where: { id } });
        return deleted > 0;
    }
}

export const taskService = new TaskService();
