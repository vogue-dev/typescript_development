import { render, screen } from "@testing-library/react";
import { TasksListPage } from "../features/tasks/components/TasksListPage";

const baseProps = {
    isLoading: false,
    error: null
};

test("відображає список завдань", () => {
    render(
        <TasksListPage
            {...baseProps}
            tasks={[
                {
                    id: 1,
                    title: "Task A",
                    description: "Desc A",
                    status: "todo",
                    priority: "low",
                    createdAt: ""
                },
                {
                    id: 2,
                    title: "Task B",
                    description: "Desc B",
                    status: "done",
                    priority: "high",
                    createdAt: ""
                }
            ]}
        />
    );

    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
    expect(screen.getByText("Desc A")).toBeInTheDocument();
    expect(screen.getByText("Desc B")).toBeInTheDocument();
});

test("відображає empty state", () => {
    render(<TasksListPage {...baseProps} tasks={[]} />);

    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
});

test("відображає повідомлення про помилку", () => {
    render(<TasksListPage {...baseProps} tasks={[]} error="Failed to load" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load");
});
