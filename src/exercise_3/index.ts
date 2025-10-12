import tasks from "./tasks.json";
import { Task, Status, Priority } from "./dto/Task"
import { ALLOWED_PRIORITIES, ALLOWED_STATUSES, DEFAULT_PRIORITY, DEFAULT_STATUS, newTaskExample } from "./constants";




class Tasks {
    private tasks: Task[] = [];

    constructor(tasks: Task[]) {
            this.tasks = this.normalizeTasks(tasks);
    }

    private normalizeTasks = (raw: Task[]) => {
        return raw.map(task => {
            const statusCandidate = task.status;
            const priorityCandidate = task.priority;

            const status: Status =
                statusCandidate && ALLOWED_STATUSES.includes(statusCandidate)
                    ? statusCandidate
                    : DEFAULT_STATUS;

            const priority: Priority =
                priorityCandidate && ALLOWED_PRIORITIES.includes(priorityCandidate)
                    ? priorityCandidate
                    : DEFAULT_PRIORITY;

            return {
                ...task,
                status,
                priority,
            };
        });
    }

    public get = (id: number) => {
        return this.tasks.find(task => task.id === id)?.description;
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

    public updateDescription = (id: Task['id'], newDescription: Task['description']): Task[] => {
        this.tasks = this.tasks.map(task =>
            task.id === id
                ? { ...task, description: newDescription }
                : task
        );
        return this.tasks;
    };

    public filter = (params: {
        status?: Status;
        priority?: Priority;
        createdAt?: Task['createdAt'];
        deadline?: Task['deadline'];
    }): Task[] => {
        return this.tasks.filter(task => {
            if (params.status && task.status !== params.status) return false;
            if (params.priority && task.priority !== params.priority) return false;

            if (params.createdAt || params.deadline) {
                const createdAt = task.createdAt ? new Date(task.createdAt) : null;

                if (createdAt) {
                    if (params.createdAt && createdAt < params.createdAt) return false;
                    if (params.deadline && createdAt > params.deadline) return false;
                }
            }

            return true;
        });
    }

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

const myTasks = new Tasks(tasks as Task[]);

console.log("tasks: ", myTasks)
console.log("tasks: ", myTasks.get(4))
console.log("tasks: ", myTasks.create(newTaskExample))
console.log("tasks: ", myTasks.updateDescription(3, 'Підготувати перші три слайди до зустрічі з інвесторами'))
console.log("tasks: ", myTasks.remove(5))
console.log("tasks: ", myTasks.filter({ status: "todo",  priority: "high",  createdAt: new Date("2025-10-01"),  deadline: new Date("2025-10-15") }))
console.log("tasks: ", myTasks.isCompletedBeforeDeadline(9))