import React from 'react'

import { type Task } from "../../../../../backend/src/models/Task.model";

interface Props {
    tasks: Task[];
    key: string;
}

export const TaskDetailsPage: React.FC<Props> = ({ task }) => {
    if (!task) return null;

    return (
        <div style={{width: '150px', border: '1px solid blue'}}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>{task.status}</span>
            <span>{task.priority}</span>
        </div>
    );
}
