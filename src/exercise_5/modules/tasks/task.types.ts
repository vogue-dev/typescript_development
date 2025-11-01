export type Status = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface TaskDTO {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    deadline?: string;
}

interface BaseTaskParams extends TaskDTO {
    id: number;
    createdAt: string;
}

export class Task {
    id!: number;
    title!: string;
    description!: string;
    status!: Status;
    priority!: Priority;
    createdAt!: string;
    deadline?: string;

    constructor(params: BaseTaskParams) {
        this.validate(params);
        Object.assign(this, params);
    }

    private validate({ id, title, description }: BaseTaskParams): void {
        if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid task ID');
        if (!title?.trim()) throw new Error('Task title cannot be empty');
        if (!description?.trim()) throw new Error('Task description cannot be empty');
    }

    getTaskInfo(): string {
        const deadlineInfo = this.deadline
            ? ` | deadline: ${new Date(this.deadline).toLocaleDateString()}`
            : '';
        return `[${this.status.toUpperCase()}] ${this.title} (${this.priority})${deadlineInfo}`;
    }
}
