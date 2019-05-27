import { ADD_TODO, EDIT_TODO, DELETE_TODO, FETCH_TODO_ITEMS } from './action-types';

export const addTodo = (todo) => {
  return {
    todo,
    type: ADD_TODO,
  };
};

export const updateTodo = (todo) => {
  return {
    todo,
    type: EDIT_TODO,
  };
};

export const deleteTodo = (uuid) => {
  return {
    uuid,
    type: DELETE_TODO,
  };
};

export const fetchTodoItems = (todos) => {
  return {
    todos,
    type: FETCH_TODO_ITEMS,
  };
};
