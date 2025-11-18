// TaskCreateForm.tsx (или где у тебя форма)

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),

    status: z.enum(["todo", "in_progress", "done"], {
        error: "Status is required",
    }),

    priority: z.enum(["low", "medium", "high"], {
        error: "Priority is required",
    }),

    deadline: z.string().optional(),

    // 👇 вот тут главное — вход string, выход number | undefined
    assigneeId: z.preprocess(
        (value) => {
            if (value === "" || value === undefined || value === null) return undefined;
            if (typeof value === "string") return Number(value);
            if (typeof value === "number") return value;
            return undefined;
        },
        z.number().int().positive().optional()
    ),
});

export type TaskFormValues = z.infer<typeof createTaskSchema>;


interface Props {
    onSubmit: (values: TaskFormValues) => Promise<void> | void;
}

export function TaskCreatePage({
                                   onSubmit,
                               }: {
    onSubmit: (values: TaskFormValues) => Promise<void> | void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            deadline: "",
        },
    });

    const submitHandler = (values: TaskFormValues) => {
        // здесь assigneeId уже number | undefined
        return onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <input placeholder="Title" {...register("title")} />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div>
                <textarea placeholder="Description" {...register("description")} />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div>
                <select {...register("status")}>
                    <option value="todo">todo</option>
                    <option value="in_progress">in_progress</option>
                    <option value="done">done</option>
                </select>
                {errors.status && <span>{errors.status.message}</span>}
            </div>

            <div>
                <select {...register("priority")}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
                {errors.priority && <span>{errors.priority.message}</span>}
            </div>

            <div>
                <input type="date" {...register("deadline")} />
                {errors.deadline && <span>{errors.deadline.message}</span>}
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Assignee ID"
                    {...register("assigneeId")}
                />
                {errors.assigneeId && <span>{errors.assigneeId.message}</span>}
            </div>

            <button type="submit" disabled={!isValid || isSubmitting}>
                Submit
            </button>
        </form>
    );
}
