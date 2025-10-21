import tasks from "./tasks.json";
import { Task, Status, Priority } from "./dto/Task"
import { ALLOWED_PRIORITIES, ALLOWED_STATUSES, DEFAULT_PRIORITY, DEFAULT_STATUS, newTaskExample } from "./constants";

class Tasks {
    private tasks: Task[] = [];

    constructor(rawTasks: unknown[]) {
        this.tasks = this.toValidTaskOrSkip(rawTasks);
    }

    private isValidDescription(value: unknown): value is Status {
        return typeof value === 'string';
    }

    private isValidStatus(value: unknown): value is Status {
        return typeof value === 'string' && ALLOWED_STATUSES.includes(value as Status);
    }

    private isValidPriority(value: unknown): value is Priority {
        return typeof value === 'string' && ALLOWED_PRIORITIES.includes(value as Priority);
    }

    private toValidTaskOrSkip = (tasks: unknown[]): Task[] => {
        if (!Array.isArray(tasks)) return [];

        return tasks
            .map((task): Task | null => {
                if (typeof task !== 'object' || task === null) return null;

                if (!('id' in task) || typeof task.id !== 'number') return null;
                if (!('title' in task) || typeof task.title !== 'string') return null;

                const description =
                    'description' in task && this.isValidDescription(task.description)
                        ? task.description
                        : '';

                const status: Status =
                    'status' in task && this.isValidStatus(task.status)
                        ? task.status
                        : DEFAULT_STATUS;

                const priority: Priority =
                    'priority' in task && this.isValidPriority(task.priority)
                        ? task.priority
                        : DEFAULT_PRIORITY;

                const createdAt =
                    'createdAt' in task && typeof task.createdAt === 'string'
                        ? task.createdAt
                        : new Date().toISOString();

                const deadline =
                    'deadline' in task && typeof task.deadline === 'string'
                        ? task.deadline
                        : undefined;

                return { id: task.id, title: task.title, description, status, priority, createdAt, deadline };
            })
            .filter((task): task is Task => task !== null);
    };


    public get = (id: number) => {
        return this.tasks.find(task => task.id === id);
    }

    public create = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newId = this.tasks.length + 1
        const newCreatedAt = new Date().toISOString();

        const newTask = { id: newId, createdAt: newCreatedAt, ...task }

        return this.tasks = [...this.tasks, newTask];
    }

    public remove = (id: number) => {
        const filteredTasks = this.tasks.filter(task => task.id !== id);

        return this.tasks = filteredTasks;
    }

    public update = (
        id: Task['id'],
        updates: Partial<Omit<Task, 'id' | 'createdAt'>>
    ): Task[] => {
        this.tasks = this.tasks.map(task =>
            task.id === id
                ? { ...task, ...updates }
                : task
        );
        return this.tasks;
    };

    public filter = (params: {
        status?: Status;
        priority?: Priority;
        createdFrom?: Date;
        createdTo?: Date;
        deadlineFrom?: Date;
        deadlineTo?: Date;
    }): Task[] => {
        return this.tasks.filter(task => {
            if (params.status && task.status !== params.status) return false;
            if (params.priority && task.priority !== params.priority) return false;

            const createdAt = task.createdAt ? new Date(task.createdAt) : null;
            if (createdAt) {
                if (params.createdFrom && createdAt < params.createdFrom) return false;
                if (params.createdTo && createdAt > params.createdTo) return false;
            }

            const deadline = task.deadline ? new Date(task.deadline) : null;
            if (deadline) {
                if (params.deadlineFrom && deadline < params.deadlineFrom) return false;
                if (params.deadlineTo && deadline > params.deadlineTo) return false;
            }

            return true;
        });
    };


    public isCompletedBeforeDeadline = (id: Task['id']): boolean => {
        const task = this.tasks.find(t => t.id === id);

        if (!task || task.status !== 'done' || !task.deadline) {
            return false;
        }

        const deadline = new Date(task.deadline);
        const now = new Date();

        return now <= deadline;
    }

}

const myTasks = new Tasks(tasks as unknown[]);

console.log("myTasks: ", myTasks)
console.log("get: ", myTasks.get(4))
console.log("create: ", myTasks.create(newTaskExample))
console.log("update: ", myTasks.update(4, { title: 'new title', description: "Оновлений опис", status: "in_progress", priority: "high", deadline: '2030-12-12T12:00:00Z' }))
console.log("remove: ", myTasks.remove(5))
console.log("filter: ", myTasks.filter(
    {
        status: "todo",
        priority: "high",
        createdFrom: new Date("2023-10-01"),
        createdTo: new Date("2026-10-01"),
        deadlineFrom: new Date("2023-10-15"),
        deadlineTo: new Date("2026-10-15")
    }
))
console.log("isCompletedBeforeDeadline: ", myTasks.isCompletedBeforeDeadline(9))