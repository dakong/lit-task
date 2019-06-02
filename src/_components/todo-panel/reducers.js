import createReducer from '../../_utils/create-reducer';
import { LOAD_TODOS_STARTED, LOAD_TODOS_COMPLETE } from './action-types';

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

export default createReducer(DEFAULT_APP_STATE, {
  [LOAD_TODOS_STARTED]: startedLoadingTodos,
  [LOAD_TODOS_COMPLETE]: completedLoadingTodos,
});
