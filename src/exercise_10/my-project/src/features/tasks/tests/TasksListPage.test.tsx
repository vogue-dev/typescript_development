import { render, screen, waitFor } from '@testing-library/react';
import TasksListPage from '../pages/TasksListPage';

import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import * as api from '../api';

jest.mock('../api');

const mockGetTasks = api.getTasks as jest.MockedFunction<typeof api.getTasks>;

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('TasksListPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('empty state, if list empty', async () => {
        mockGetTasks.mockResolvedValueOnce([]);

        renderWithRouter(<TasksListPage />);

        expect(await screen.findByText(/no tasks/i)).toBeInTheDocument();
    });

    test('show API error', async () => {
        mockGetTasks.mockRejectedValueOnce(new Error('Network error'));

        renderWithRouter(<TasksListPage />);

        expect(await screen.findByText(/failed to load tasks/i)).toBeInTheDocument();
    });

    test('відображає список завдань', async () => {
        mockGetTasks.mockResolvedValueOnce([
            {
                id: '1',
                title: 'Task A',
                description: 'desc A',
                status: 'todo',
                priority: 'low',
                createdAt: '2024-01-01T00:00:00Z',
            },
            {
                id: '2',
                title: 'Task B',
                description: 'desc B',
                status: 'done',
                priority: 'high',
                createdAt: '2024-01-02T00:00:00Z',
            },
        ]);

        renderWithRouter(<TasksListPage />);

        await waitFor(() => {
            expect(screen.getByText(/Task A/i)).toBeInTheDocument();
            expect(screen.getByText(/Task B/i)).toBeInTheDocument();
        });
    });
});
