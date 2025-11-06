export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    deadline?: string;
}

const API_URL = 'http://localhost:5000/tasks';

export async function getTasks(): Promise<Task[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to load tasks`);
    return res.json();
}

export async function getTask(id: number): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Task ${id} not found`);
    return res.json();
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const all = await getTasks();
    const lastId = all.length ? Math.max(...all.map(t => t.id)) : 0;
    const newTask: Task = { ...task, id: lastId + 1, createdAt: new Date().toISOString() };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
}

export async function deleteTask(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
}
