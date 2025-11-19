import {
    AnyTaskDTO,
    BaseTaskParams,
    Status,
    Priority,
    TaskType
} from './task.types';

import { Task } from './models/Task.model';
import { Subtask } from './models/Subtask.model';
import { Bug } from './models/Bug.model';
import { Story } from './models/Story.model';
import { Epic } from './models/Epic.model';

import tasks from '../../../exercise_3/tasks.json';

// чистий type guard без any
function isRawTask(
    obj: unknown
): obj is {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    deadline?: string;
    createdAt?: string;
    type?: TaskType;
} {
    if (typeof obj !== 'object' || obj === null) return false;

    const o = obj as Record<string, unknown>;

    return (
        'id' in o &&
        typeof o.id === 'number' &&
        'title' in o &&
        typeof o.title === 'string' &&
        'description' in o &&
        typeof o.description === 'string' &&
        'status' in o &&
        typeof o.status === 'string' &&
        'priority' in o &&
        typeof o.priority === 'string'
    );
}

export class TaskService {
    private tasks: Task[];

    constructor(source: unknown[]) {
        this.tasks = this.parseTasks(source);
    }

    private parseTasks(source: unknown[]): Task[] {
        if (!Array.isArray(source)) return [];

        return source
            .map(item => {
                if (!isRawTask(item)) return null;

                return new Task({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                    priority: item.priority,
                    deadline: item.deadline,
                    createdAt: item.createdAt ?? new Date().toISOString(),
                    type: 'task'
                });
            })
            .filter((t): t is Task => t !== null);
    }

    private getNewId(): number {
        return this.tasks.length
            ? Math.max(...this.tasks.map(t => t.id)) + 1
            : 1;
    }

    create(data: AnyTaskDTO): Task {
        const id = this.getNewId();
        const createdAt = new Date().toISOString();

        switch (data.type) {
            case 'subtask':
                return this.push(new Subtask({ ...data, id, createdAt }));
            case 'bug':
                return this.push(new Bug({ ...data, id, createdAt }));
            case 'story':
                return this.push(new Story({ ...data, id, createdAt }));
            case 'epic':
                return this.push(new Epic({ ...data, id, createdAt }));
            default:
                return this.push(new Task({ ...data, id, createdAt }));
        }
    }

    private push<T extends Task>(task: T): T {
        this.tasks.push(task);
        return task;
    }

    update(id: number, updates: Partial<AnyTaskDTO>): Task | null {
        const task = this.get(id);
        if (!task) return null;

        task.update(updates);
        return task;
    }

    remove(id: number): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    getAll(): Task[] {
        return this.tasks;
    }

    get(id: number): Task | undefined {
        return this.tasks.find(t => t.id === id);
    }
}

export const taskService = new TaskService(tasks);
