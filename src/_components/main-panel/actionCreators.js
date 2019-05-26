import { actionCreators } from '../todos';
import TodoDB from '../../indexedDB/todoDB';

const { fetchTodoItems } = actionCreators;

async function initDB() {
  await TodoDB.initializeDB();
  const todos = await TodoDB.getAll();
  todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  return todos;
}

export const initializeItems = () => {
  return async (dispatch) => {
    try {
      const todos = await initDB();
      dispatch(fetchTodoItems(todos));
    } catch(e) {
      console.log(e);
    }
  }
}