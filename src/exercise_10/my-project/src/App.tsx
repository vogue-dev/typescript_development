import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <div style={{ padding: '20px' }}>
            <div>Go to /tasks path to create new task</div>
            <Outlet />
        </div>
    );
}
