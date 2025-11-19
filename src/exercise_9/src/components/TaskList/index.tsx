import { type Task } from '../../api.ts';

interface Props {
    tasks: Task[];
    onSelect: (id: string) => void;
}

export default function TaskList({ tasks, onSelect }: Props) {
    if (tasks?.length === 0) {
        return <div>Task list is empty</div>;
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks?.map((task) => (
                <li
                    key={task.id}
                    onClick={() => onSelect(task.id)}
                    style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        padding: '8px',
                    }}
                >
                    <b>{task.title}</b>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {task.status} | {task.priority}
                    </div>
                </li>
            ))}
        </ul>
    );
}
