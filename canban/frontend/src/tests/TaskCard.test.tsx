import { render, screen } from "@testing-library/react";
import { TaskCard } from "../features/tasks/components/TaskCard";
import { TaskAttributes } from "../../../backend/src/models/Task.model";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

const task: TaskAttributes = {
    id: 1,
    title: "Hello",
    description: "World",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    deadline: null,
    assigneeId: null
};

describe("TaskCard basic test", () => {
    test("renders task data", () => {
        render(
            <MemoryRouter>
                <TaskCard task={task} onDragStart={() => {}} loadTasks={() => {}} />
            </MemoryRouter>);

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("World")).toBeInTheDocument();
        expect(screen.getByText("todo")).toBeInTheDocument();
        expect(screen.getByText("low")).toBeInTheDocument();
    });
});
