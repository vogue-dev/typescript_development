import { useEffect, useState } from 'react';
import { getTasks, getTaskById, type Task } from './api.ts';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CreateTaskForm from './components/CreateTaskForm';

import './styles.css'

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
        setSelectedTask(null);
    };

    const handleSelect = async (id: string) => {
        try {
            const data = await getTaskById(id);
            setSelectedTask(data);
        } catch {
            alert('Task is not find');
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className="app-container">
            <div className="app">
                <CreateTaskForm onTaskCreated={setTasks} />
                <TaskList tasks={tasks} onSelect={handleSelect} />
            </div>
            <TaskDetails task={selectedTask} onDeleted={loadTasks} />
        </div>
    );
}
