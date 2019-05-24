import TodoDB from '../indexedDB/todoDB';

export const ADD_TODO = 'TODO_ITEM/ADD';
export const ADD_TODOS = 'TODO_ITEM/ADD_MULTIPLE';
export const EDIT_TODO = 'TODO_ITEM/EDIT';
export const DELETE_TODO = 'TODO_ITEM/DELETE';
export const TOGGLE_CHECK_TODO = 'TODO_ITEM/TOGGLE_CHECK';

const INITIAL_STATE = {
  todos: [],
};

async function initDB() {
  await TodoDB.initializeDB();
  const todos = await TodoDB.getAll();
  todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  return todos;
}

export const addTodos = (todos) => {
  return {
    type: ADD_TODOS,
    todos,
  };
};

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

export const initializeItems = () => {
  return async (dispatch) => {
    try {
      const todos = await initDB();
      dispatch(addTodos(todos));
    } catch(e) {
      console.log(e);
      console.log('an error occured');
    }
  }
}

export const updateTodo = (todo) => {
  return {
    type: EDIT_TODO,
    todo,
  };
};

export const deleteTodo = (uuid) => {
  return {
    type: DELETE_TODO,
    uuid,
  }
}


const todos = (state = INITIAL_STATE, action) => {
  const {todos} = state;
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: todos.concat([action.todo])
      }
    case ADD_TODOS:
      return {
        ...state,
        todos: todos.concat(action.todos)
      };
    case EDIT_TODO:
      const {uuid, column, value} = action.todo;
      const updatedTodo = state.todos.map(item => (
        item.uuid === uuid ? {...item, [column]: value} : item
      ));
      return {
        ...state,
        todos: updatedTodo,
      };
    case DELETE_TODO:
      console.log(todos);
      console.log(action.uuid);
      return {
        ...state,
        todos: todos.filter(todo => todo.uuid !== action.uuid),
      }
    default:
      return state;
  }
}

export default todos;