import { useState } from 'react';
import { createTask } from '../api';
import { useNavigate } from 'react-router-dom';

import { type Task } from '../api';

export default function CreateTaskForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Omit<Task, 'id' | 'createdAt'>>({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        deadline: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.description) {
            setError('All fields required');
            return;
        }
        await createTask(form);
        navigate('/tasks');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create Task</h3>

            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />

            <select name="status" value={form.status} onChange={handleChange}>
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
            </select>

            <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />

            <button type="submit">Create</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
