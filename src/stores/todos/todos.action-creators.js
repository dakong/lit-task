import {
  ADD_TODO,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_ITEMS,
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
  INSERT_TODO_EFFECT,
} from "./todos.action-types";

export const addTodo = () => {
  return {
    type: ADD_TODO,
  };
};

export const createTodo = (tasklistID, task) => {
  return {
    tasklistID,
    task,
    type: CREATE_TODO,
  };
};

export const updateTodo = (tasklistID, taskID, payload) => {
  return {
    tasklistID,
    taskID,
    payload,
    type: EDIT_TODO,
  };
};

export const deleteTodo = (tasklistID, taskID) => {
  return {
    tasklistID,
    taskID,
    type: DELETE_TODO,
  };
};

export const updateTodoEffect = (taskID, tasklistID, payload) => {
  return {
    taskID,
    tasklistID,
    payload,
    type: EDIT_TODO_EFFECT,
  };
};

export const deleteTodoEffect = (tasklistID, taskID) => {
  return {
    tasklistID,
    taskID,
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

export const insertTodoEffect = (tasklistID, payload, parent, previous) => {
  return {
    tasklistID,
    payload,
    parent,
    previous,
    type: INSERT_TODO_EFFECT,
  };
};

export const initializeListAndTask = (tasklist, tasks, selectedTasklist) => {
  return {
    type: "INITIALIZE_LIST_AND_TASK",
    tasklist,
    tasks,
    selectedTasklist,
  };
};
