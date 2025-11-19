import { BaseTaskParams, AnyTaskDTO } from '../task.types';

export class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    deadline?: string;
    type: string;

    constructor(params: BaseTaskParams) {
        this.validate(params, true);
        Object.assign(this, params);
    }

    protected validate(params: Partial<BaseTaskParams>, requireId: boolean): void {
        if (requireId) {
            if (!Number.isFinite(params.id) || params.id! <= 0) {
                throw new Error('Invalid ID');
            }
        }

        if ('title' in params && (!params.title || params.title.trim() === '')) {
            throw new Error('Title cannot be empty');
        }

        if ('description' in params && (!params.description || params.description.trim() === '')) {
            throw new Error('Description cannot be empty');
        }
    }

    update(updates: Partial<AnyTaskDTO>): void {
        this.validate(updates as Partial<BaseTaskParams>, false);
        Object.assign(this, updates);
    }

    getTaskInfo(): string {
        return `[TASK] ${this.title} (${this.status})`;
    }
}
