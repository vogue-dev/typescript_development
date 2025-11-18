import { Link } from "react-router-dom";

export const Header = () => {





    return (
        <div>
            <Link to={"/"}>Main Page</Link>
            <Link to={"/tasks"}>all tasks</Link>
            <Link to={`/tasks/${2}`}>task info</Link>
        </div>
    );
}
