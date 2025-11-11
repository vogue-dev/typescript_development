import { TaskService, taskService } from './task.service';
import { TaskDTO } from './task.types';

export class TaskController {
    private service: TaskService;

    constructor(service: TaskService = taskService) {
        this.service = service;
    }

    showAll(): void {
        console.log('All tasks:');
        this.service.getAll().forEach(t => console.log(t.getTaskInfo()));
    }

    getById(id: number): void {
        const task = this.service.get(id);
        console.log(task ? task.getTaskInfo() : `Task #${id} not found`);
    }

    create(data: TaskDTO): void {
        const created = this.service.create(data);
        console.log('Created:', created.getTaskInfo());
    }

    update(id: number, updates: Partial<TaskDTO>): void {
        const updated = this.service.update(id, updates);
        console.log(updated ? `Updated: ${updated.getTaskInfo()}` : `Task #${id} not found`);
    }

    remove(id: number): void {
        this.service.remove(id);
        console.log(`Removed task #${id}`);
    }

    checkDeadline(id: number): void {
        const result = this.service.isCompletedBeforeDeadline(id);
        console.log(`Task #${id} completed before deadline: ${result}`);
    }
}
