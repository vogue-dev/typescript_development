import { Outlet } from 'react-router-dom';

import './assets/styles.css'

export default function App() {
    return (
        <div className='app'>
            <div>Go to /tasks path to create new task</div>
            <Outlet />
        </div>
    );
}
