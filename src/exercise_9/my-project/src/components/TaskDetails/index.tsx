import { deleteTask, type Task } from '../../api';

interface Props {
    task: Task | null;
    onDeleted: () => void;
}

export default function TaskDetails({ task, onDeleted }: Props) {
    if (!task) {
        return <div style={{ flex: 1, padding: '10px' }}>Оберіть завдання</div>;
    }

    const handleDelete = async () => {
        if (confirm(`Remove task "${task.title}"?`)) {
            await deleteTask(task.id);
            onDeleted();
        }
    };

    return (
        <div style={{ flex: 1, padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
                <b>Status:</b> {task.status}
            </p>
            <p>
                <b>Priority:</b> {task.priority}
            </p>
            <p>
                <b>Created:</b>{' '}
                {new Date(task.createdAt).toLocaleString('uk-UA', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                })}
            </p>

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
