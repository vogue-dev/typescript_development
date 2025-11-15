import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';
import { taskService } from '../services/task.service.js';

const router = Router();
const controller = new TaskController(taskService);

router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router;
