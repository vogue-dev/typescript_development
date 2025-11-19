import { Task } from './Task.model';
import { BaseTaskParams } from '../task.types';

export class Story extends Task {
    storyPoints: number;

    constructor(params: BaseTaskParams & { storyPoints: number }) {
        super(params);
        this.storyPoints = params.storyPoints;
    }

    getTaskInfo(): string {
        return `[STORY] ${this.title} — ${this.storyPoints} SP`;
    }
}
