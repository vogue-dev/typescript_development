import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { fetchTasks, fetchTaskById, createTask } from "./api";

import { TasksListPage } from "./features/tasks/components/TasksListPage";
import { TaskCreatePage } from "./features/tasks/components/TaskCreatePage";
import { TaskDetailsPage } from "./features/tasks/components/TaskDetailsPage";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        const data = await fetchTasks();
        setTasks(data);
    }

    async function handleOpenTask(id: number) {
        const task = await fetchTaskById(id);
        setSelectedTask(task);
        navigate(`/tasks/${id}`);
    }

    async function handleCreate(values) {
        const created = await createTask(values);
        setTasks((prev) => [...prev, created]);
        navigate("/tasks");
    }

    return (
        <Routes>
            <Route
                path="/tasks"
                element={
                    <TasksListPage
                        tasks={tasks}
                        onOpenTask={handleOpenTask}
                    />
                }
            />

            <Route
                path="/tasks/create"
                element={<TaskCreatePage onSubmit={handleCreate} />}
            />

            <Route
                path="/tasks/:id"
                element={
                    <TaskDetailsPage
                        task={selectedTask}
                        onBack={() => navigate("/tasks")}
                    />
                }
            />
        </Routes>
    );
}
