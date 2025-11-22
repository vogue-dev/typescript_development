import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Link to={"/"}>Main Page</Link>
            <Link to={"/tasks"}>all tasks</Link>
            <Link to={`/tasks/${2}`}>task info</Link>
            <Link to={"/tasks/create"}>Create New Task</Link>
        </div>
    );
}
