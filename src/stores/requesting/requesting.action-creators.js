import {
  LOAD_TODOS_STARTED,
  LOAD_TODOS_COMPLETE,
  GAPI_LOAD_STARTED,
  GAPI_LOAD_COMPLETED,
  GAPI_INITIALIZE,
} from "./requesting.action-types";
import { fetchTodoItems } from "../todos/todos.action-creators";

const loadTodos = () => {
  return {
    type: LOAD_TODOS_STARTED,
  };
};

const loadTodosComplete = () => {
  return {
    type: LOAD_TODOS_COMPLETE,
  };
};

export const gapiLoadStart = () => {
  return {
    type: GAPI_LOAD_STARTED,
  };
};

export const gapiLoadComplete = () => {
  return {
    type: GAPI_LOAD_COMPLETED,
  };
};

export const gapiInitialize = () => {
  return {
    type: GAPI_INITIALIZE,
  };
};
