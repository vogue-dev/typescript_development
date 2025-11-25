import { ADD_TASK, REMOVE_TASK, SET_TASKS } from "./types";
import {TaskAttributes} from "../../../../backend/src/models/Task.model";

export const addTask = (task: TaskAttributes) => ({
    type: ADD_TASK,
    payload: task,
});

export const removeTask = (index: number) => ({
    type: REMOVE_TASK,
    payload: index,
});

export const setTasks = (tasks: TaskAttributes[]) => ({
    type: SET_TASKS,
    payload: tasks,
});
