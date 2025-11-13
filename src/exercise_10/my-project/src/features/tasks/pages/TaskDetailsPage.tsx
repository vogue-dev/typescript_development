import { useEffect, useState } from 'react';
import { getTask, type Task } from '../api';
import { useParams } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';

export default function TaskDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) getTask(id).then(setTask).catch(() => setTask(null));
    }, [id]);

    if (!task) return <p>Task not found</p>;

    return <TaskDetails task={task} />;
}
