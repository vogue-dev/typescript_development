import { useEffect, useState } from 'react';
import { getTasks, type Task } from '../api';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

export default function TasksListPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getTasks().then(setTasks).catch(() => setError('Failed to load tasks'));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Tasks</h1>
            <Link to="/tasks/create">+ New Task</Link>
            <TaskList tasks={tasks} />
        </div>
    );
}
