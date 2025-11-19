import {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    type Task,
    type NewTask
} from './api';

const listContainer = document.getElementById('task-list') as HTMLDivElement;
const form = document.getElementById('create-form') as HTMLFormElement;
const detailPanel = document.getElementById('detail-panel') as HTMLDivElement;

 const renderTasks = async (): Promise<void> => {
    const tasks = await getTasks();
    listContainer.innerHTML = '';

    tasks.forEach((t) => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.dataset.id = t.id;
        div.innerHTML = `
            <strong>${t.title}</strong>
            <span>${t.priority}</span>
            <span>${t.status}</span>
        `;
        listContainer.appendChild(div);
    });
}

const renderTaskDetail = (task: Task): void => {
    detailPanel.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Status: ${task.status}</p>
        <p>Priority: ${task.priority}</p>
        <p>Created: ${new Date(task.createdAt).toLocaleString()}</p>
        <p>Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</p>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;
}

listContainer.addEventListener('click', async (ev) => {
    const target = ev.target as HTMLElement;
    const div = target.closest('.task-item') as HTMLElement | null;

    if (div && div.dataset.id) {
        const task = await getTask(div.dataset.id);
        renderTaskDetail(task);
    }
});

detailPanel.addEventListener('click', async (ev) => {
    const target = ev.target as HTMLElement;

    if (target.matches('.delete-btn')) {
        const id = target.dataset.id!;
        await deleteTask(id);
        detailPanel.innerHTML = '';
        await renderTasks();
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const newTask: NewTask = {
        title: String(data.get('title')),
        description: String(data.get('description')),
        status: String(data.get('status')),
        priority: String(data.get('priority')),
        deadline: data.get('deadline') ? String(data.get('deadline')) : undefined
    };

    await createTask(newTask);
    form.reset();
    await renderTasks();
});

renderTasks();
