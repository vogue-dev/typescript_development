import { render, screen } from "@testing-library/react";
import { TasksListPage } from "../features/tasks/components/TasksListPage";
import { MemoryRouter } from "react-router-dom";
import { TaskAttributes } from "../../../backend/src/models/Task.model";

const mockTasks: TaskAttributes[] = [
    {
        id: 1,
        title: "Task A",
        description: "Desc A",
        status: "todo",
        priority: "low",
        createdAt: new Date(),
        deadline: null,
        assigneeId: null
    }
];

describe("TasksListPage basic tests", () => {
    test("renders empty state", () => {
        render(
            <MemoryRouter>
                <TasksListPage tasks={[]} onOpenTask={() => {}} loadTasks={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
    });

    test("renders list of tasks", () => {
        render(
            <MemoryRouter>
                <TasksListPage tasks={mockTasks} onOpenTask={() => {}} loadTasks={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText("Task A")).toBeInTheDocument();
        expect(screen.getByText("Desc A")).toBeInTheDocument();
    });
});
