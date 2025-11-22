import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { fetchTasks, fetchTaskById, createTask } from "./api";

import { TasksListPage } from "./features/tasks/components/TasksListPage";
import { TaskCreatePage } from "./features/tasks/components/TaskCreatePage";
import { TaskDetailsPage } from "./features/tasks/components/TaskDetailsPage";
import { MainPage } from "./features/tasks/components/MainPage";
import { Header } from "./features/tasks/components/Header";
import { Canvas } from "./features/tasks/components/Canvas";

import './styles.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    }

    const handleOpenTask = async (id: number) => {
        const task = await fetchTaskById(id);
        setSelectedTask(task);
        navigate(`/tasks/${id}`);
    }

    const handleCreate = async (values) => {
        const created = await createTask(values);
        setTasks((prev) => [...prev, created]);
        navigate("/tasks");
    }

    const [items, setItems] = useState([{ id: '1', content: 'Item 1' }, { id: '2', content: 'Item 2' }]);

    const handleItemDrop = (itemId) => {
        console.log(`Item ${itemId} dropped!`);
        // Implement logic to update state based on dropped item
    };

    function DraggableItem({ item, onDrop }) {
        const handleDragStart = (e) => {
            e.dataTransfer.setData('text/plain', item.id); // Store item ID
        };

        return (
            <div draggable="true" onDragStart={handleDragStart} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
                {item.content}
            </div>
        );
    }

    function DropZone({ onDrop }) {
        const handleDragOver = (e) => {
            e.preventDefault(); // Allow dropping
        };

        const handleDrop = (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            onDrop(itemId);
        };

        return (
            <div onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: '2px dashed gray', padding: '20px', minHeight: '100px' }}>
                Drop items here
            </div>
        );
    }

    function DropZone2({ onDrop }) {
        const handleDragOver = (e) => {
            e.preventDefault(); // Allow dropping
        };

        const handleDrop = (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            onDrop(itemId);
        };

        return (
            <div onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: '2px dashed gray', padding: '20px', minHeight: '100px' }}>
                Drop items here
            </div>
        );
    }




        // return (
        //     <div>
        //         {items.map((item) => (
        //             // @ts-ignore
        //             <DraggableItem key={item.id} item={item} />
        //         ))}
        //         <DropZone onDrop={handleItemDrop} />
        //         <DropZone2 onDrop={handleItemDrop} />
        //     </div>
        // );


    return <>
            <Header />
            <Routes>
                <Route path="/" element={<div> HELLO PAGE </div>}/>
                <Route path="/tasks" element={<Canvas/>}/>
                <Route path="/tasks/create" element={<TaskCreatePage onSubmit={handleCreate} />}/>
                <Route path="/tasks/:id" element={<TaskDetailsPage task={selectedTask}/>}/>
            </Routes>

        </>

}
