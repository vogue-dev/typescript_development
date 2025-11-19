import { useState } from 'react';
import { deleteTask, type Task } from '../../api.ts';

interface Props {
    task: Task | null;
    onDeleted: () => Promise<void> | void;
}

export default function TaskDetails({ task, onDeleted }: Props) {
    const [message, setMessage] = useState<string | null>(null);

    if (!task) {
        return <div style={{ flex: 1, padding: '10px' }}>Оберіть завдання</div>;
    }

    const handleDelete = async () => {
        setMessage(null);
        try {
            await deleteTask(task.id);
            await onDeleted();
        } catch {
            setMessage('Error deleting task');
        }
    };

    return (
        <div style={{ flex: 1, padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p><b>Status:</b> {task.status}</p>
            <p><b>Priority:</b> {task.priority}</p>

            {message && <p style={{ color: 'red' }}>{message}</p>}

            <button
                onClick={handleDelete}
                style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Remove
            </button>
        </div>
    );
}
