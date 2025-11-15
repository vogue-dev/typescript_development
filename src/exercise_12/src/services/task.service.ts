import {
    Task,
    TaskCreateInput,
    TaskFilters,
    TaskUpdateInput,
} from '../types/task.types.js';

export class TaskService {
    private tasks: Task[] = [];
    private nextId = 1;

    getAll(filters: TaskFilters = {}): Task[] {
        return this.tasks.filter((task) => {
            if (filters.status && task.status !== filters.status) return false;
            if (filters.priority && task.priority !== filters.priority) return false;

            if (filters.createdAt) {
                const taskDate = task.createdAt.slice(0, 10); // YYYY-MM-DD
                if (taskDate !== filters.createdAt) return false;
            }

            return true;
        });
    }

    getById(id: number): Task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    create(input: TaskCreateInput): Task {
        const task: Task = {
            id: this.nextId++,
            title: input.title,
            description: input.description,
            status: input.status,
            priority: input.priority,
            createdAt: new Date().toISOString(),
            deadline: input.deadline,
        };

        this.tasks.push(task);
        return task;
    }

    update(id: number, updates: TaskUpdateInput): Task | null {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const existing = this.tasks[index];
        const updated: Task = { ...existing, ...updates };

        this.tasks[index] = updated;
        return updated;
    }

    delete(id: number): boolean {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }
}

export const taskService = new TaskService();
