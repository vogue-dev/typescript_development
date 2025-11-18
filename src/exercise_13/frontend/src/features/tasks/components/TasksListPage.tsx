import { type Task } from "../../../../../backend/src/models/Task.model";
import {useNavigate} from "react-router-dom";

interface Props {
    tasks: Task[];
    onOpenTask: () => void;
}

export const TasksListPage = ({ tasks, onOpenTask}) => {
    const navigate = useNavigate();



    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div role="alert">{error}</div>;
    if (!tasks?.length) return <div>No tasks</div>;

    return (
        <>
            <div onClick={() => navigate('/tasks/create')}>Create new task</div>
            <div style={{ display: "flex" }}>
                {tasks.map((t) => (
                    <div key={t.id} onClick={() => onOpenTask(t.id)} style={{ width: '150px', border: '1px solid gray' }}>
                        <h3>{t.title}</h3>
                        <p>{t.description}</p>
                        <span>{t.status}</span>
                        <span>{t.priority}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
