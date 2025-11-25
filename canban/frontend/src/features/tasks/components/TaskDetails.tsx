import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchTaskById} from "../../../api";
import { TaskCard } from "./TaskCard";
import { TaskAttributes } from "../../../../../backend/src/models/Task.model";

export const TaskDetails = () => {
    const { id } = useParams();

    const [task, setTask] = useState<TaskAttributes>(null);

    useEffect(() => {
        fetchTaskById(Number(id)).then(res => setTask(res));
    }, [id]);


    return (<div className='task-details-wrapper'>
        <TaskCard task={task} withButton={false}/>
    </div>)
}