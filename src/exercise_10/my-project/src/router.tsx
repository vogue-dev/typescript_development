import { createBrowserRouter } from 'react-router-dom';
import TasksListPage from './features/tasks/pages/TasksListPage';
import TaskDetailsPage from './features/tasks/pages/TaskDetailsPage';
import TaskCreatePage from './features/tasks/pages/TaskCreatePage';
import App from './App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'tasks', element: <TasksListPage /> },
            { path: 'tasks/create', element: <TaskCreatePage /> },
            { path: 'tasks/:id', element: <TaskDetailsPage /> },
        ],
    },
]);
