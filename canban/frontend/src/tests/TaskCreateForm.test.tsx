import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TaskCreateForm } from '../features/tasks/components/TaskCreateForm';
import * as api from '../api';

vi.spyOn(api, 'createTask').mockResolvedValue({});

describe('TaskCreateForm', () => {
    it('renders form fields correctly', () => {
        render(
            <MemoryRouter>
                <TaskCreateForm />
            </MemoryRouter>,
        );

        expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    });

    it('validates and submits form', async () => {
        render(
            <MemoryRouter>
                <TaskCreateForm />
            </MemoryRouter>,
        );

        fireEvent.change(screen.getByPlaceholderText('Title'), {
            target: { value: 'My task' },
        });

        fireEvent.change(screen.getByPlaceholderText('Description'), {
            target: { value: 'Some text' },
        });

        fireEvent.change(screen.getByRole('combobox', { name: /status/i }), {
            target: { value: 'todo' },
        });

        fireEvent.change(screen.getByRole('combobox', { name: /priority/i }), {
            target: { value: 'high' },
        });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
});
