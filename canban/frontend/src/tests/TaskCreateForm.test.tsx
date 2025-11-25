import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCreateForm } from "../features/tasks/components/TaskCreateForm";

describe("TaskCreateForm basic rendering", () => {
    test("renders all form fields", () => {
        render(<TaskCreateForm onSubmit={() => {}} />);

        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Assignee ID")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    test("allows typing into fields", () => {
        render(<TaskCreateForm onSubmit={() => {}} />);

        fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Hello" } });
        expect(screen.getByPlaceholderText("Title")).toHaveValue("Hello");

        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Test" } });
        expect(screen.getByPlaceholderText("Description")).toHaveValue("Test");
    });
});