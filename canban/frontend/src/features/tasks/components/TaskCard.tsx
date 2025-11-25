import React from 'react'

import { TaskAttributes } from "../../../../../backend/src/models/Task.model";
import {deleteTask} from "../../../api";

interface Props {
    task: TaskAttributes | null;
    onDragStart: (taskId: number) => void;
    loadTasks: () => void;
}

export const TaskCard: React.FC<Props> = ({ task, onDragStart, loadTasks }) => {
    if (!task) return null;

    const deleteWithConfirm = async (
        id: string | number,
        message: string,
        onSuccess?: () => void
    ): Promise<void> => {
        const confirmed = window.confirm(message);
        if (!confirmed) return;
        await deleteTask(id);
        if (onSuccess) onSuccess();
    }

    const handleDragStart = (e: React.DragEvent) => {
        onDragStart(task.id);
        e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    };

    return (
        <div
            className="task-card"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="title">{task.title}</div>
            <div className="remove" onClick={() => deleteWithConfirm(task.id, "Delete this task?", loadTasks)}>[X]</div>
            <div className="description">{task.description}</div>
            {task.deadline && <div className="deadline">Deadline: {task.deadline.toISOString()}</div>}
            <div className="status">{task.status}</div>
            <div className="priority">{task.priority}</div>
        </div>
    );
};
