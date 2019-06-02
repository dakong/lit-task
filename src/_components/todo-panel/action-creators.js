import todos from '../todos';
import TodoDB from '../../indexed-db/todo-db';
import { LOAD_TODOS_STARTED, LOAD_TODOS_COMPLETE } from './action-types';

const { fetchTodoItems } = todos.actionCreators;

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

const sleep = (timeout) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

async function initDB() {
  await TodoDB.initializeDB();
  const todos = await TodoDB.getAll();
  todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  return todos;
};

export const initializeItems = function () {
  return async (dispatch) => {
    try {
      dispatch(loadTodos());
      const todos = await initDB();
      dispatch(fetchTodoItems(todos));
      dispatch(loadTodosComplete());
    } catch (e) {
      console.log(e);
    }
  };
};
