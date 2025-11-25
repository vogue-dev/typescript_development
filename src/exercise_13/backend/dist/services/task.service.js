"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.TaskService = void 0;
const Task_model_1 = require("../models/Task.model");
const sequelize_1 = require("sequelize");
class TaskService {
    async getAll(filters = {}) {
        const where = {};
        if (filters.status)
            where.status = filters.status;
        if (filters.priority)
            where.priority = filters.priority;
        if (filters.createdAt) {
            const day = filters.createdAt;
            where.createdAt = {
                [sequelize_1.Op.gte]: new Date(day + "T00:00:00.000Z"),
                [sequelize_1.Op.lt]: new Date(day + "T23:59:59.999Z")
            };
        }
        return Task_model_1.Task.findAll({ where, include: ["assignee"] });
    }
    async getById(id) {
        return Task_model_1.Task.findByPk(id, { include: ["assignee"] });
    }
    async create(input) {
        const payload = {
            title: input.title,
            description: input.description,
            status: input.status,
            priority: input.priority
        };
        if (input.deadline) {
            payload.deadline = new Date(input.deadline);
        }
        return Task_model_1.Task.create(payload);
    }
    async update(id, updates) {
        const task = await Task_model_1.Task.findByPk(id);
        if (!task)
            return null;
        if (updates.title !== undefined)
            task.title = updates.title;
        if (updates.description !== undefined)
            task.description = updates.description;
        if (updates.status !== undefined)
            task.status = updates.status;
        if (updates.priority !== undefined)
            task.priority = updates.priority;
        if (updates.deadline !== undefined) {
            task.deadline = updates.deadline ? new Date(updates.deadline) : null;
        }
        await task.save();
        return task;
    }
    async delete(id) {
        const deleted = await Task_model_1.Task.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.TaskService = TaskService;
exports.taskService = new TaskService();
