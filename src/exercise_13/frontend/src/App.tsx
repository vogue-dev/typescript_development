import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { createTask } from "./api";

import { TaskCreatePage } from "./features/tasks/components/TaskCreatePage";
import { TaskCard} from "./features/tasks/components/TaskCard";
import { Header } from "./features/tasks/components/Header";
import { Canvas } from "./features/tasks/components/Canvas";

import './styles.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();


    const handleCreate = async (values) => {
        const created = await createTask(values);
        setTasks((prev) => [...prev, created]);
        navigate("/tasks");
    }

    return <>
            <Header />
            <Routes>
                <Route path="/" element={<div> HELLO PAGE </div>}/>
                <Route path="/tasks" element={<Canvas/>}/>
                <Route path="/tasks/create" element={<TaskCreatePage onSubmit={handleCreate} />}/>
                <Route path="/tasks/:id" element={<TaskCard task={selectedTask}/>}/>
            </Routes>

        </>

}
