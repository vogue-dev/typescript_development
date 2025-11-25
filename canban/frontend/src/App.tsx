import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {createTask, fetchTasks} from "./api";

import { TaskCreateForm } from "./features/tasks/components/TaskCreateForm";
import { TaskCard} from "./features/tasks/components/TaskCard";
import { Header } from "./features/tasks/components/Header";
import { Canvas } from "./features/tasks/components/Canvas";

import './styles.css';
import {TaskAttributes} from "../../backend/src/models/Task.model";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState<TaskAttributes | null>(null);


    const navigate = useNavigate();


    const handleCreate = async (values) => {
        const created = await createTask(values);
        setTasks((prev) => [...prev, created]);
        navigate("/tasks");
    }

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    const onDragStart = () => {
        console.log('start dragging')
    }

    return <>
        <Header />
        <Routes>
            <Route path="/" element={<div> HELLO PAGE </div>}/>
            <Route path="/tasks" element={<Canvas/>}/>
            <Route path="/tasks/create" element={<TaskCreateForm onSubmit={handleCreate} />}/>
            <Route path="/tasks/:id" element={<TaskCard task={selectedTask} onDragStart={onDragStart} loadTasks={loadTasks}/>}/>
        </Routes>

    </>

}
