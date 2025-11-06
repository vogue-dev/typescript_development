import { getTasks, getTask, createTask, deleteTask, type Task } from './api';

const listContainer = document.getElementById('task-list')!;
const form = document.getElementById('create-form') as HTMLFormElement;
const detailPanel = document.getElementById('detail-panel')!;

async function renderTasks() {
    const tasks = await getTasks();
    listContainer.innerHTML = '';

    tasks.forEach((t) => {
        const div = document.createElement('div');
        div.textContent = `${t.title}`;
        div.dataset.id = t.id.toString();

        div.addEventListener('click', async () => {
            const task = await getTask(t.id);
            renderTaskDetail(task);
        });

        listContainer.appendChild(div);
    });
}

function renderTaskDetail(task: Task) {
    detailPanel.innerHTML = `
    <h3>Task ${task.id}: ${task.title}</h3>
    <p>${task.description}</p>
    <p>Status: ${task.status}</p>
    <p>Priority: ${task.priority}</p>
    <p>Created: ${new Date(task.createdAt).toLocaleString()}</p>
    <p>Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</p>
    <button id="delete-${task.id}">Delete</button>
  `;

    const deleteBtn = document.getElementById(`delete-${task.id}`)!;
    deleteBtn.addEventListener('click', async () => {
        await deleteTask(task.id);
        detailPanel.innerHTML = '';
        await renderTasks();
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const newTask = {
        title: data.get('title') as string,
        description: data.get('description') as string,
        status: data.get('status') as string,
        priority: data.get('priority') as string,
    };
    await createTask(newTask);
    form.reset();
    await renderTasks();
});

renderTasks();
