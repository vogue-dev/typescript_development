import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
    tasks: string[];
}

const initialState: TaskState = {
    tasks: [],
};

const tasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            state.tasks.push(action.payload);
        },
        removeTask(state, action: PayloadAction<number>) {
            state.tasks.splice(action.payload, 1);
        },
        setTasks(state, action: PayloadAction<string[]>) {
            state.tasks = action.payload;
        }
    },
});

export const { addTask, removeTask, setTasks } = tasks.actions;
export default tasks.reducer;
