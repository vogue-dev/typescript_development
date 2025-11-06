import { useState } from 'react';
import { createTask, type Task } from '../../api';

interface Props {
    onTaskCreated: React.Dispatch<React.SetStateAction<Task[]>>; // ✅ теперь принимает setTasks напрямую
}

export default function CreateTaskForm({ onTaskCreated }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [priority, setPriority] = useState('medium');
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title.trim()) newErrors.title = 'Field "Name" is required';
        if (!description.trim()) newErrors.description = 'Field "Description" is required';

        if (deadline) {
            const today = new Date();
            const selected = new Date(deadline);
            if (selected < today)
                newErrors.deadline = 'Date of deadline cant be in past';
        }
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            return;
        }
        setErrors({});

        try {
            const newTask: Task = {
                id: Date.now().toString(), // ✅ строковый ID
                title: title.trim(),
                description: description.trim(),
                status,
                priority,
                createdAt: new Date().toISOString(),
                deadline,
            };

            const res = await createTask(newTask);

            onTaskCreated((prev) => [...prev, res]);

            setTitle('');
            setDescription('');
            setDeadline('');
            alert('Task successfully created!');
        } catch {
            alert('Error. Something went wrong!');
        }
    };

    const inputStyle = (error?: string) => ({
        display: 'block',
        width: '100%',
        marginBottom: error ? '4px' : '8px',
        padding: '6px',
        borderRadius: '4px',
        border: error ? '1px solid #dc3545' : '1px solid #ccc',
    });

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '12px' }}>
            <h3>Створити задачу</h3>

            <input
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle(errors.title)}
            />
            {errors.title && (
                <small style={{ color: '#dc3545' }}>{errors.title}</small>
            )}

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle(errors.description)}
            />
            {errors.description && (
                <small style={{ color: '#dc3545' }}>{errors.description}</small>
            )}

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={inputStyle()}
            >
                <option value="todo">todo</option>
                <option value="in_progress">in_progress</option>
                <option value="done">done</option>
            </select>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={inputStyle()}
            >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>

            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={inputStyle(errors.deadline)}
            />
            {errors.deadline && (
                <small style={{ color: '#dc3545' }}>{errors.deadline}</small>
            )}

            <button
                type="submit"
                style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                }}
            >
                Add
            </button>
        </form>
    );
}
