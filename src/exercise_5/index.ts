import { TaskController } from './modules/tasks/task.controller';

const controller = new TaskController();

controller.create({
    title: 'New Story Example',
    description: 'Implement story points system',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    storyPoints: 8,
});

controller.showAll();
