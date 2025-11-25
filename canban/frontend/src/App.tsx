import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {createTask, fetchTasks} from "./api";

import { TaskCreateForm } from "./features/tasks/components/TaskCreateForm";
import { Header } from "./features/tasks/components/Header";
import { Canvas } from "./features/tasks/components/Canvas";
import { TaskDetails } from "./features/tasks/components/TaskDetails";

import './styles.css';

export default function App() {
    const [tasks, setTasks] = useState([]);

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
            <Route path="/tasks/create" element={<TaskCreateForm onSubmit={handleCreate} />}/>
            <Route path="/tasks/:id" element={<TaskDetails />}/>
        </Routes>

    </>

}
