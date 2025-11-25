import React, { useEffect, useState } from "react";
import { fetchTasks, updateTaskStatus } from "../../../api";
import { TaskCard } from "./TaskCard";

export const Canvas = () => {
    const [tasks, setTasks] = useState([]);
    const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
    const [activeZone, setActiveZone] = useState<"todo" | "in_progress" | "done" | null>(null);

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDrop = async (status: "todo" | "in_progress" | "done") => {
        if (!draggingTaskId) return;

        await updateTaskStatus(draggingTaskId, status);
        await loadTasks();

        setActiveZone(null);
        setDraggingTaskId(null);
    };

    const zoneClass = (zone: string) => `${zone} drop-zone${activeZone ? ' active' : ''}`;

    const todoTasks = tasks.filter((t) => t.status === "todo");
    const progressTasks = tasks.filter((t) => t.status === "in_progress");
    const doneTasks = tasks.filter((t) => t.status === "done");


    return (
        <div className="canvas">
            <div
                className={zoneClass("todo")}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setActiveZone("todo")}
                onDragLeave={(e) => {
                    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                    setActiveZone(null);
                }}
                onDrop={() => handleDrop("todo")}
            >
                {todoTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={() => setDraggingTaskId(task.id)}
                        loadTasks={loadTasks}
                    />
                ))}
            </div>

            <div
                className={zoneClass("in_progress")}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setActiveZone("in_progress")}
                onDragLeave={(e) => {
                    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                    setActiveZone(null);
                }}
                onDrop={() => handleDrop("in_progress")}
            >
                {progressTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={() => setDraggingTaskId(task.id)}
                        loadTasks={loadTasks}
                    />
                ))}
            </div>

            <div
                className={zoneClass("done")}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setActiveZone("done")}
                onDragLeave={(e) => {
                    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                    setActiveZone(null);
                }}
                onDrop={() => handleDrop("done")}
            >
                {doneTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={() => setDraggingTaskId(task.id)}
                        loadTasks={loadTasks}
                    />
                ))}
            </div>
        </div>
    );
};
