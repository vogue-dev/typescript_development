import { useEffect, useState } from "react";

import { fetchTasks } from "../../../api";
import {TaskDetailsPage} from "./TaskDetailsPage";



export const Canvas = () => {
    const [tasks, setTasks] = useState([]);

    const loadTasks = () => {
        return fetchTasks();
    }

    useEffect(() => {
        loadTasks().then((res) => setTasks(res));
    }, [])

    const todoTasks = tasks.filter(({status}) => status === 'todo');
    const inProgressTasks = tasks.filter(({status}) => status === 'in_progress');
    const doneTasks = tasks.filter(({status}) => status === 'done');

    return (
        <div className='canvas'>
            <div className='todo'>
                {todoTasks.map((task) => <TaskDetailsPage key={task.id} task={task}></TaskDetailsPage>)}
            </div>
            <div className='in_progress'>
                {inProgressTasks.map((task) => <TaskDetailsPage key={task.id} task={task}></TaskDetailsPage>)}
            </div>
            <div className='done'>
                {doneTasks.map((task) => <TaskDetailsPage key={task.id} task={task}></TaskDetailsPage>)}
            </div>
        </div>
    )
}