import { Routes, Route } from 'react-router-dom';

import { TaskCreateForm } from './features/tasks/components/TaskCreateForm';
import { Header } from './features/tasks/components/Header';
import { Canvas } from './features/tasks/components/Canvas';
import { TaskDetails } from './features/tasks/components/TaskDetails';

import './styles.css';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<div> HELLO PAGE </div>} />
                <Route path="/tasks" element={<Canvas />} />
                <Route path="/tasks/create" element={<TaskCreateForm />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
            </Routes>
        </>
    );
}
