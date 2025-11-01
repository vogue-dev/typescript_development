import { taskService } from './task.service';
import { newTaskExample } from '../../../exercise_3/constants';

export class TaskController {
    private service = taskService;

    showAll(): void {
        console.log('All tasks:');
        this.service['tasks']?.forEach(t => console.log(t.getTaskInfo()));
    }

    getById(id: number): void {
        const task = this.service.get(id);
        console.log(task ? task.getTaskInfo() : `Task #${id} not found`);
    }

    create(): void {
        const created = this.service.create(newTaskExample);
        console.log('Created:', created.getTaskInfo());
    }

    update(id: number): void {
        const updated = this.service.update(id, {
            title: 'Updated title',
            description: 'Updated description',
            status: 'in_progress',
            priority: 'high',
            deadline: '2030-01-01T12:00:00Z',
        });
        if (updated) {
            console.log('Updated:', updated.getTaskInfo());
        } else {
            console.log(`Task #${id} not found`);
        }
    }

    remove(id: number): void {
        this.service.remove(id);
        console.log(`Removed task #${id}`);
    }

    filter(): void {
        const filtered = this.service.filter({
            status: 'todo',
            priority: 'high',
            createdFrom: new Date('2023-01-01'),
            createdTo: new Date('2026-01-01'),
        });
        console.log('Filtered:');
        filtered.forEach(t => console.log(t.getTaskInfo()));
    }

    checkDeadline(id: number): void {
        const result = this.service.isCompletedBeforeDeadline(id);
        console.log(`Task #${id} completed before deadline: ${result}`);
    }
}
