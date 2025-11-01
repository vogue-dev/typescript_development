import { TaskController } from './modules/tasks/task.controller';

const controller = new TaskController();

controller.showAll();
controller.getById(3);
controller.create();
controller.update(4);
controller.remove(5);
controller.filter();
controller.checkDeadline(9);
