import React from 'react';

import { TaskAttributes } from '../../../../../backend/src/models/Task.model';
import { deleteTask } from '../../../api';
import { useNavigate } from 'react-router-dom';

interface Props {
    task: TaskAttributes | null;
    onDragStart?: (taskId: number) => void;
    loadTasks?: () => void;
    withButton?: boolean;
}

export const TaskCard: React.FC<Props> = ({
    task,
    onDragStart,
    loadTasks,
    withButton,
}) => {
    if (!task) return null;

    const navigate = useNavigate();

    const deleteWithConfirm = async (
        id: string | number,
        message: string,
        onSuccess?: () => void,
    ): Promise<void> => {
        const confirmed = window.confirm(message);
        if (!confirmed) return;
        await deleteTask(id);
        if (onSuccess) onSuccess();
    };

    const handleDragStart = (e: React.DragEvent) => {
        onDragStart(task.id);
        e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    };

    return (
        <div className="task-card" draggable onDragStart={handleDragStart}>
            <div className="title">{task.title}</div>
            {withButton && (
                <button
                    className="details"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                >
                    Open details
                </button>
            )}
            <div
                className="remove"
                onClick={() =>
                    deleteWithConfirm(task.id, 'Delete this task?', loadTasks)
                }
            >
                [X]
            </div>
            <div className="description">{task.description}</div>
            {task.deadline && typeof task.deadline === 'string' ? (
                <div className="deadline">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                </div>
            ) : null}
            <div className="status">{task.status}</div>
            <div className="priority">{task.priority}</div>
        </div>
    );
};
