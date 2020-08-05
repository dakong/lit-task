import {
  ADD_TODO,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_ITEMS,
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
} from "./todos.action-types";

export const addTodo = () => {
  return {
    type: ADD_TODO,
  };
};

export const createTodo = (todo) => {
  return {
    todo,
    type: CREATE_TODO,
  };
};

export const updateTodo = (todo) => {
  return {
    todo,
    type: EDIT_TODO,
  };
};

export const updateTodoEffect = (payload) => {
  return {
    payload,
    type: EDIT_TODO_EFFECT,
  };
};

export const deleteTodo = (uuid) => {
  return {
    uuid,
    type: DELETE_TODO,
  };
};

export const deleteTodoEffect = (uuid) => {
  return {
    uuid,
    type: DELETE_TODO_EFFECT,
  };
};

export const fetchTodoItems = (todos) => {
  return {
    todos,
    type: FETCH_TODO_ITEMS,
  };
};

export const fetchAllTodoItems = () => {
  return {
    type: "FETCH_ALL_TASKS",
  };
};

export const initializeListAndTask = (taskList, tasks) => {
  return {
    type: "INITIALIZE_LIST_AND_TASK",
    taskList,
    tasks,
  };
};
