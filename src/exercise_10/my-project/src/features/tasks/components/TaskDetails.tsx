import { type Task, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

interface Props {
    task: Task;
}

export default function TaskDetails({ task }: Props) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirm('Delete this task?')) {
            await deleteTask(task.id);
            navigate('/tasks');
        }
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
            {task.deadline && <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>}
            <button onClick={() => navigate('/tasks')}>⬅ Back</button>
            <button onClick={handleDelete} style={{ marginLeft: '8px' }}>🗑 Delete</button>
        </div>
    );
}
