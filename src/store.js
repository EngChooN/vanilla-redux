import { legacy_createStore } from "redux";

const ADD = "add";
const DEL = "del";

export const addTodo = (text) => {
    return { type: ADD, text: text };
};

export const delTodo = (id) => {
    return { type: DEL, id: id };
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
        case DEL:
            return state.filter((el) => el.id !== parseInt(action.id));
        default:
            return state;
    }
};

const store = legacy_createStore(reducer);

export default store;
