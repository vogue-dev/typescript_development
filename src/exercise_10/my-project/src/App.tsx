import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <div style={{ padding: '20px' }}>
            <Outlet />
        </div>
    );
}
