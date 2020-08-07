import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  INITIALIZE_LIST_AND_TASK,
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
  INSERT_TODO_EFFECT,
  FETCH_TASKS_AND_TASKLISTS_EFFECT,
} from "./todos.action-types";

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

export const initializeListAndTask = (tasklist, tasks, selectedTasklist) => {
  return {
    type: INITIALIZE_LIST_AND_TASK,
    tasklist,
    tasks,
    selectedTasklist,
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

export const fetchTasksAndTasklistsEffect = () => {
  return {
    type: FETCH_TASKS_AND_TASKLISTS_EFFECT,
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
