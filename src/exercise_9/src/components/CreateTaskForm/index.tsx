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

        setServerMessage('Task successfully created!');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '12px' }}>
            <h3>Створити задачу</h3>

            <input
                placeholder="Name"
                {...register('title')}
                className={`input ${errors.title?.message?'' : 'error'}`}
            />
            {errors.title && (
                <small style={{ color: '#dc3545' }}>{errors.title.message}</small>
            )}

            <textarea
                placeholder="Description"
                {...register('description')}
                className={`input ${errors.description?.message?'' : 'error'}`}
            />
            {errors.description && (
                <small style={{ color: '#dc3545' }}>
                    {errors.description.message}
                </small>
            )}

            <select {...register('status')} className='input'>
                <option value="todo">todo</option>
                <option value="in_progress">in_progress</option>
                <option value="done">done</option>
            </select>

            <select {...register('priority')} className='input'>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>

            <input
                type="date"
                {...register('deadline')}
                className={`input ${errors.deadline?.message?'' : 'error'}`}
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
