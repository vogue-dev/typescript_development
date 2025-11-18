import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskCreateForm } from "./TaskCreateForm";

test("кнопка Submit disabled якщо форма порожня", () => {
    render(<TaskCreateForm onSubmit={async () => {}} />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(submitBtn).toBeDisabled();
});

test("кнопка Submit enabled при валідній формі", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TaskCreateForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
        target: { value: "Task title" }
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
        target: { value: "Some description" }
    });

    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await waitFor(() => {
        expect(submitBtn).toBeEnabled();
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});

test("показуються помилки валідації", async () => {
    render(<TaskCreateForm onSubmit={async () => {}} />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitBtn);

    await screen.findByText(/Title is required/i);
    await screen.findByText(/Description is required/i);
});
