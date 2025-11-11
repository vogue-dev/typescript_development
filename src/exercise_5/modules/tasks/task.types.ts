export type Status = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'subtask' | 'bug' | 'story' | 'epic';

export interface BaseTaskDTO {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    deadline?: string;
    type?: TaskType;
}

export interface SubtaskDTO extends BaseTaskDTO {
    type: 'subtask';
    parentId: number;
}

export interface BugDTO extends BaseTaskDTO {
    type: 'bug';
    severity: 'minor' | 'major' | 'critical';
}

export interface StoryDTO extends BaseTaskDTO {
    type: 'story';
    storyPoints: number;
}

export interface EpicDTO extends BaseTaskDTO {
    type: 'epic';
    childrenIds?: number[];
}

export type TaskDTO = BaseTaskDTO | SubtaskDTO | BugDTO | StoryDTO | EpicDTO;

export interface BaseTaskParams extends BaseTaskDTO {
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
    type?: TaskType;

    constructor(params: BaseTaskParams) {
        this.validate(params);
        Object.assign(this, params);
    }

    protected validate({ id, title, description }: BaseTaskParams) {
        if (!Number.isFinite(id) || id <= 0) throw new Error('Invalid task ID');
        if (!title?.trim()) throw new Error('Task title cannot be empty');
        if (!description?.trim()) throw new Error('Task description cannot be empty');
    }

    getTaskInfo(): string {
        return `[${this.status.toUpperCase()}] ${this.title} (${this.priority})`;
    }
}

export class Subtask extends Task {
    parentId: number;
    constructor(params: BaseTaskParams & { parentId: number }) {
        super(params);
        this.parentId = params.parentId;
    }
}

export class Bug extends Task {
    severity: 'minor' | 'major' | 'critical';
    constructor(params: BaseTaskParams & { severity: 'minor' | 'major' | 'critical' }) {
        super(params);
        this.severity = params.severity;
    }
}

export class Story extends Task {
    storyPoints: number;
    constructor(params: BaseTaskParams & { storyPoints: number }) {
        super(params);
        this.storyPoints = params.storyPoints;
    }
}

export class Epic extends Task {
    childrenIds?: number[];
    constructor(params: BaseTaskParams & { childrenIds?: number[] }) {
        super(params);
        this.childrenIds = params.childrenIds;
    }
}
