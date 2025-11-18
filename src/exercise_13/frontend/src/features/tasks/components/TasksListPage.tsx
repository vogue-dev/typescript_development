import { type Task } from "../../../../../backend/src/models/Task.model";

interface Props {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

export const TasksList = ({ tasks }) => {




    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div role="alert">{error}</div>;
    if (!tasks?.length) return <div>No tasks</div>;

    return (
        <ul>
            <div>This is TasksList</div>
            {tasks.map((t) => (
                <li key={t.id}>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <span>{t.status}</span>
                    <span>{t.priority}</span>
                </li>
            ))}
        </ul>
    );
}
