// types/task.types.ts
export const taskStatuses = ['todo', 'in_progress', 'done'] as const;
export const taskPriorities = ['low', 'medium', 'high'] as const;

export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = (typeof taskPriorities)[number];

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    deadline?: string;
}

export interface TaskCreateInput {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string;
}

export interface TaskUpdateInput {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    deadline?: string;
}

export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    createdAt?: string;
}
