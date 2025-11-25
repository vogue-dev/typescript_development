const API = "http://localhost:3000";

export async function fetchTasks() {
    const res = await fetch(`${API}/tasks`);
    if (!res.ok) throw new Error("Failed to load tasks.ts");
    return res.json();
}

export async function createTask(data) {
    const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
}

export async function fetchTaskById(id: number) {
    const res = await fetch(`${API}/tasks/${id}`);

    if (res.status === 404) {
        throw new Error("Task not found");
    }
    if (!res.ok) {
        throw new Error("Failed to load task");
    }

    return res.json();
}

export async function updateTaskStatus(id: string, status: string) {
    const res = await fetch(`${API}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update task");

    return res.json();
}

export async function deleteTask(id: string | number): Promise<void> {
    const res = await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete task");
}
