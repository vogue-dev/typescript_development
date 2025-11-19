import { Task } from './Task.model';
import { BaseTaskParams } from '../task.types';

export class Epic extends Task {
    childrenIds?: number[];

    constructor(params: BaseTaskParams & { childrenIds?: number[] }) {
        super(params);
        this.childrenIds = params.childrenIds;
    }

    getTaskInfo(): string {
        return `[EPIC] ${this.title} — children: ${this.childrenIds?.length ?? 0}`;
    }
}
