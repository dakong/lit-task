import createReducer from "../../utils/create-reducer";
import {
  LOAD_TODOS_STARTED,
  LOAD_TODOS_COMPLETE,
  GAPI_LOAD_STARTED,
  GAPI_LOAD_COMPLETED,
} from "./requesting.action-types";

const DEFAULT_APP_STATE = {
  isLoadingTodos: false,
};

const startedLoadingTodos = () => {
  return {
    isLoadingTodos: true,
  };
};

const completedLoadingTodos = () => {
  return {
    isLoadingTodos: false,
  };
};

const gapiLoadStarted = () => {
  return {
    loadingGapi: true,
  };
};

const gapiLoadCompleted = () => {
  return {
    loadingGapi: false,
  };
};

export default createReducer(DEFAULT_APP_STATE, {
  [LOAD_TODOS_STARTED]: startedLoadingTodos,
  [LOAD_TODOS_COMPLETE]: completedLoadingTodos,
  [GAPI_LOAD_STARTED]: gapiLoadStarted,
  [GAPI_LOAD_COMPLETED]: gapiLoadCompleted,
});
