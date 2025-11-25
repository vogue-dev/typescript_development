import { ADD_TASK, REMOVE_TASK, SET_TASKS } from '../actions/types';

const initialState = {
    tasks: [],
};

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((_, index) => index !== action.payload),
            };

        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };

        default:
            return state;
    }
}
