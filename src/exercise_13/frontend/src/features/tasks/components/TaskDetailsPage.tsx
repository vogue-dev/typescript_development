import { type Task } from "../../../../../backend/src/models/Task.model";

interface Props {
    // tasks: Task[];
    // isLoading: boolean;
    // error: string | null;
}

export const TaskDetailsPage = ({ task, onBack }) => {

    return (
        <>
            <div onClick={onBack}>Back to MainPage</div>
            <div key={task.id} style={{width: '150px', border: '1px solid blue'}}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>{task.status}</span>
                <span>{task.priority}</span>
            </div>
        </>
    );
}
