export type Status = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'subtask' | 'bug' | 'story' | 'epic';

export interface BaseTaskDTO {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    deadline?: string;
}

export interface TaskDTO extends BaseTaskDTO {
    type: 'task';
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

export type AnyTaskDTO =
    | TaskDTO
    | SubtaskDTO
    | BugDTO
    | StoryDTO
    | EpicDTO;

export interface BaseTaskParams extends BaseTaskDTO {
    id: number;
    createdAt: string;
    type: TaskType;
}
