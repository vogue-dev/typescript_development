import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../../api';

import './taskCreateForm.css';

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['todo', 'in_progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.string().optional(),
    assigneeId: z
        .string()
        .optional()
        .transform((val) =>
            val === '' || val === undefined ? undefined : Number(val),
        )
        .pipe(z.number().int().positive().optional()),
});

export type TaskFormValues = z.infer<typeof createTaskSchema>;

export const TaskCreateForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<TaskFormValues>({
        // @ts-expect-error ---
        resolver: zodResolver(createTaskSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            deadline: '',
            assigneeId: undefined,
        },
    });

    const navigate = useNavigate();

    const submitHandler: SubmitHandler<TaskFormValues> = async (values) => {
        await createTask(values);
        navigate('/tasks');
    };

    return (
        // @ts-expect-error ---
        <form className="task-form" onSubmit={handleSubmit(submitHandler)}>
            {/* TITLE */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    placeholder="Title"
                    {...register('title')}
                    className="form-input"
                />
                {errors.title && (
                    <span className="error">{errors.title.message}</span>
                )}
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Description"
                    {...register('description')}
                    className="form-input textarea"
                />
                {errors.description && (
                    <span className="error">{errors.description.message}</span>
                )}
            </div>

            {/* STATUS */}
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    {...register('status')}
                    className="form-input"
                >
                    <option value="todo">todo</option>
                    <option value="in_progress">in_progress</option>
                    <option value="done">done</option>
                </select>
                {errors.status && (
                    <span className="error">{errors.status.message}</span>
                )}
            </div>

            {/* PRIORITY */}
            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    {...register('priority')}
                    className="form-input"
                >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
                {errors.priority && (
                    <span className="error">{errors.priority.message}</span>
                )}
            </div>

            {/* DEADLINE */}
            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                    id="deadline"
                    type="date"
                    {...register('deadline')}
                    className="form-input"
                />
                {errors.deadline && (
                    <span className="error">{errors.deadline.message}</span>
                )}
            </div>

            {/* ASSIGNEE ID */}
            <div className="form-group">
                <label htmlFor="assigneeId">Assignee ID</label>
                <input
                    id="assigneeId"
                    type="number"
                    placeholder="Assignee ID"
                    {...register('assigneeId')}
                    className="form-input"
                />
                {errors.assigneeId && (
                    <span className="error">{errors.assigneeId.message}</span>
                )}
            </div>

            <button
                type="submit"
                className="submit-btn"
                disabled={!isValid || isSubmitting}
            >
                Submit
            </button>
        </form>
    );
};
