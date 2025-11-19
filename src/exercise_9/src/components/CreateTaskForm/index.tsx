import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createTask } from '../../api.ts';
import { createTaskSchema, type CreateTaskFormValues } from './schema.ts';

interface Props {
    onTaskCreated: () => Promise<void> | void;
}

export default function CreateTaskForm({ onTaskCreated }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<CreateTaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            deadline: '',
        },
    });

    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const onSubmit = async (data: CreateTaskFormValues) => {
        setServerMessage(null);

        await createTask({
            title: data.title.trim(),
            description: data.description.trim(),
            status: data.status,
            priority: data.priority,
            deadline: data.deadline || undefined,
        });

        await onTaskCreated();

        reset();
        setServerMessage('Task successfully created!');
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '12px' }}>
            <h3>Створити задачу</h3>

            <input
                placeholder="Name"
                {...register('title')}
                style={inputStyle(errors.title?.message)}
            />
            {errors.title && (
                <small style={{ color: '#dc3545' }}>{errors.title.message}</small>
            )}

            <textarea
                placeholder="Description"
                {...register('description')}
                style={inputStyle(errors.description?.message)}
            />
            {errors.description && (
                <small style={{ color: '#dc3545' }}>
                    {errors.description.message}
                </small>
            )}

            <select {...register('status')} style={inputStyle()}>
                <option value="todo">todo</option>
                <option value="in_progress">in_progress</option>
                <option value="done">done</option>
            </select>

            <select {...register('priority')} style={inputStyle()}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>

            <input
                type="date"
                {...register('deadline')}
                style={inputStyle(errors.deadline?.message)}
            />
            {errors.deadline && (
                <small style={{ color: '#dc3545' }}>
                    {errors.deadline.message}
                </small>
            )}

            {serverMessage && (
                <div style={{ color: 'green', marginTop: '4px' }}>{serverMessage}</div>
            )}

            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    opacity: !isValid ? 0.7 : 1,
                }}
            >
                Add
            </button>
        </form>
    );
}
