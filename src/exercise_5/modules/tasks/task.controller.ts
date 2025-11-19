import { TaskService } from './task.service';
import { AnyTaskDTO } from './task.types';

export class TaskController {
    constructor(private readonly service: TaskService) {}

    showAll(): void {
        this.service.getAll().forEach(task => console.log(task.getTaskInfo()));
    }

    getById(id: number): void {
        const task = this.service.get(id);
        console.log(task ? task.getTaskInfo() : `Task #${id} not found`);
    }

    create(data: AnyTaskDTO): void {
        const created = this.service.create(data);
        console.log('Created:', created.getTaskInfo());
    }

    update(id: number, updates: Partial<AnyTaskDTO>): void {
        const updated = this.service.update(id, updates);
        console.log(updated ? updated.getTaskInfo() : `Task #${id} not found`);
    }

    remove(id: number): void {
        this.service.remove(id);
        console.log(`Removed task #${id}`);
    }
}
