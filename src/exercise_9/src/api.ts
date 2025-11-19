const API_URL = 'http://localhost:5000/tasks';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    deadline?: string;
}

export type NewTaskInput = {
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline?: string;
};

export async function createTask(task: NewTaskInput): Promise<Task> {
    const body = { ...task, createdAt: new Date() };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
}

export async function getTasks(): Promise<Task[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
}

export async function getTaskById(id: string): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Task not found');
    return res.json();
}

export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete task');
    }
}
