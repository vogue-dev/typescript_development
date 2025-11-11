import {
    Task,
    Subtask,
    Bug,
    Story,
    Epic,
    TaskDTO,
} from './task.types';
import tasksData from '../../../exercise_3/tasks.json';

export class TaskService {
    private tasks: Task[];

    constructor(rawTasks: unknown[]) {
        this.tasks = this.parseTasks(rawTasks);
    }

    private parseTasks(source: unknown[]): Task[] {
        if (!Array.isArray(source)) return [];
        return source
            .map((item: any) => {
                if (!item || typeof item !== 'object') return null;
                return new Task({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                    priority: item.priority,
                    createdAt: item.createdAt || new Date().toISOString(),
                    deadline: item.deadline,
                    type: item.type,
                });
            })
            .filter((t): t is Task => t !== null);
    }

    getAll(): Task[] {
        return this.tasks;
    }

    get(id: number): Task | undefined {
        return this.tasks.find(t => t.id === id);
    }

    create(data: TaskDTO): Task {
        const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        const createdAt = new Date().toISOString();
        let newTask: Task;

        switch (data.type) {
            case 'subtask':
                newTask = new Subtask({ ...(data as any), id: newId, createdAt });
                break;
            case 'bug':
                newTask = new Bug({ ...(data as any), id: newId, createdAt });
                break;
            case 'story':
                newTask = new Story({ ...(data as any), id: newId, createdAt });
                break;
            case 'epic':
                newTask = new Epic({ ...(data as any), id: newId, createdAt });
                break;
            default:
                newTask = new Task({ ...(data as any), id: newId, createdAt });
        }

        this.tasks.push(newTask);
        return newTask;
    }

    update(id: number, updates: Partial<TaskDTO>): Task | null {
        const existing = this.get(id);
        if (!existing) return null;
        Object.assign(existing, updates);
        return existing;
    }

    remove(id: number): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    isCompletedBeforeDeadline(id: number): boolean {
        const task = this.get(id);
        if (!task || !task.deadline || task.status !== 'done') return false;
        return new Date() <= new Date(task.deadline);
    }
}

export const taskService = new TaskService(tasksData);
