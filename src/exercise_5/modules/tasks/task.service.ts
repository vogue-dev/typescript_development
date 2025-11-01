import { Task, Status, Priority, TaskDTO } from './task.types';
import tasks from '../../../exercise_3/tasks.json';
import {
    ALLOWED_PRIORITIES,
    ALLOWED_STATUSES,
    DEFAULT_PRIORITY,
    DEFAULT_STATUS,
    newTaskExample,
} from '../../../exercise_3/constants';

export class TaskService {
    private tasks: Task[] = [];

    constructor(rawTasks: unknown[]) {
        this.tasks = this.parseTasks(rawTasks);
    }

    private isValidStatus(value: unknown): value is Status {
        return typeof value === 'string' && ALLOWED_STATUSES.includes(value as Status);
    }

    private isValidPriority(value: unknown): value is Priority {
        return typeof value === 'string' && ALLOWED_PRIORITIES.includes(value as Priority);
    }

    private parseTasks(source: unknown[]): Task[] {
        if (!Array.isArray(source)) return [];

        return source
            .map((item): Task | null => {
                if (typeof item !== 'object' || item === null) return null;
                if (typeof (item as any).id !== 'number') return null;
                if (typeof (item as any).title !== 'string') return null;

                const description =
                    typeof (item as any).description === 'string' ? (item as any).description : '';

                const status: Status = this.isValidStatus((item as any).status)
                    ? (item as any).status
                    : DEFAULT_STATUS;

                const priority: Priority = this.isValidPriority((item as any).priority)
                    ? (item as any).priority
                    : DEFAULT_PRIORITY;

                const createdAt =
                    typeof (item as any).createdAt === 'string'
                        ? (item as any).createdAt
                        : new Date().toISOString();

                const deadline =
                    typeof (item as any).deadline === 'string' ? (item as any).deadline : undefined;

                return new Task({
                    id: (item as any).id,
                    title: (item as any).title,
                    description,
                    status,
                    priority,
                    createdAt,
                    deadline,
                });
            })
            .filter((t): t is Task => t !== null);
    }

    get(id: number): Task | undefined {
        return this.tasks.find(t => t.id === id);
    }

    create(task: TaskDTO): Task {
        const newTask = new Task({
            ...task,
            id: this.tasks.length + 1,
            createdAt: new Date().toISOString(),
        });
        this.tasks.push(newTask);
        return newTask;
    }

    update(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
        const existing = this.get(id);
        if (!existing) return null;

        const updated = new Task({ ...existing, ...updates });
        this.tasks = this.tasks.map(t => (t.id === id ? updated : t));
        return updated;
    }

    remove(id: number): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    filter(params: {
        status?: Status;
        priority?: Priority;
        createdFrom?: Date;
        createdTo?: Date;
        deadlineFrom?: Date;
        deadlineTo?: Date;
    }): Task[] {
        return this.tasks.filter(t => {
            if (params.status && t.status !== params.status) return false;
            if (params.priority && t.priority !== params.priority) return false;

            const created = new Date(t.createdAt);
            const deadline = t.deadline ? new Date(t.deadline) : null;

            if (params.createdFrom && created < params.createdFrom) return false;
            if (params.createdTo && created > params.createdTo) return false;

            if (deadline) {
                if (params.deadlineFrom && deadline < params.deadlineFrom) return false;
                if (params.deadlineTo && deadline > params.deadlineTo) return false;
            }

            return true;
        });
    }

    isCompletedBeforeDeadline(id: number): boolean {
        const task = this.get(id);
        if (!task || task.status !== 'done' || !task.deadline) return false;

        const deadline = new Date(task.deadline);
        return new Date() <= deadline;
    }
}

export const taskService = new TaskService(tasks as unknown[]);
