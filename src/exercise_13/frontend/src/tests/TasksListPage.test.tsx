import { render, screen } from "@testing-library/react";
import { TasksListPage } from "../features/tasks/components/TasksListPage";
import { TaskCreateForm } from "../features/tasks/components/TaskCreateForm";


const baseProps = {
    isLoading: false,
    error: null
};

test("show task list", () => {
    render(
        <MemoryRouter>
            <TaskCreateForm
                {...baseProps}
                tasks={[
                    { id: 1, title: "Task A", description: "Desc A", status: "todo", priority: "low", createdAt: "" },
                    { id: 2, title: "Task B", description: "Desc B", status: "done", priority: "high", createdAt: "" }
                ]}
            />
        </MemoryRouter>
    );

    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
});

test("відображає empty state", () => {
    render(<TaskCreateForm {...baseProps} tasks={[]} />);

    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
});

test("відображає повідомлення про помилку", () => {
    render(<TaskCreateForm {...baseProps} tasks={[]} error="Failed to load" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load");
});
