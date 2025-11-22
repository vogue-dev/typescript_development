import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducer/tasks';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
