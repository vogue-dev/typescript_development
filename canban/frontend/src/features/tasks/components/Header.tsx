import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className='header'>
            <Link to={"/"}>Main Page</Link>
            <Link to={"/tasks"}>all tasks</Link>
            <Link to={`/tasks/${2}`}>task info</Link>
            <Link to={"/tasks/create"}>Create New Task</Link>
        </div>
    );
}
