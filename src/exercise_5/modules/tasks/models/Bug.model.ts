import { Task } from './Task.model';
import { BaseTaskParams } from '../task.types';

export class Bug extends Task {
    severity: 'minor' | 'major' | 'critical';

    constructor(params: BaseTaskParams & { severity: 'minor' | 'major' | 'critical' }) {
        super(params);
        this.severity = params.severity;
    }

    getTaskInfo(): string {
        return `[BUG] ${this.title} [${this.severity}]`;
    }
}
