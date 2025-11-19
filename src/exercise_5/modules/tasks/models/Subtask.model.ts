import { Task } from './Task.model';
import { BaseTaskParams } from '../task.types';

export class Subtask extends Task {
    parentId: number;

    constructor(params: BaseTaskParams & { parentId: number }) {
        super(params);
        this.parentId = params.parentId;
    }

    getTaskInfo(): string {
        return `[SUBTASK] ${this.title} (parent: ${this.parentId})`;
    }
}
