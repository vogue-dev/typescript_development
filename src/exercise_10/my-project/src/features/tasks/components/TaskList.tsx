import { type Task } from '../api';
import { Link } from 'react-router-dom';

interface Props {
    tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
    if (!tasks.length) return <p>🕳️ No tasks yet</p>;

    return (
        <ul>
            {tasks.map((t) => (
                <li key={t.id} className='task_wrapper'>
                    <Link to={`/tasks/${t.id}`}>
                        {t.title} ({t.priority}) — {t.status}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
