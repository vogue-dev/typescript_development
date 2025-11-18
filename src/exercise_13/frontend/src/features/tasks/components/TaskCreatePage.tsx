import { useOutletContext, useNavigate } from "react-router-dom";

export function TaskCreatePage() {
    const { handleCreateTask } = useOutletContext();
    const navigate = useNavigate();

    async function onSubmit(values) {
        await handleCreateTask(values);
        navigate("/tasks");
    }

    return (
        <CreateFormComponent onSubmit={onSubmit} />
    )
}
