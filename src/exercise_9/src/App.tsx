import { useEffect, useState } from 'react';
import { getTasks, getTaskById, type Task } from './api.ts';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CreateTaskForm from './components/CreateTaskForm';

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
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                style={{
                    flex: 1,
                    borderRight: '1px solid #ddd',
                    padding: '10px',
                    overflowY: 'auto',
                }}
            >
                <CreateTaskForm onTaskCreated={setTasks} />
                <TaskList tasks={tasks} onSelect={handleSelect} />
            </div>
            <TaskDetails task={selectedTask} onDeleted={loadTasks} />
        </div>
    );
}
