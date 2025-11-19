export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    deadline?: string;
}

export type NewTask = Omit<Task, 'id' | 'createdAt'>;
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;

const API_URL = 'http://localhost:5000/tasks';

export async function getTasks(): Promise<Task[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json() as Promise<Task[]>;
}

export async function getTask(id: string): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Task ${id} not found`);
    return res.json() as Promise<Task>;
}

export async function createTask(task: NewTask): Promise<Task> {
    const body = { ...task, createdAt: new Date() };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Failed to create task');
    return res.json() as Promise<Task>;
}

export async function updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });

    if (!res.ok) throw new Error(`Failed to update task ${id}`);
    return res.json() as Promise<Task>;
}

export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
}
