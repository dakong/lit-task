import * as immutable from '../../_utils/immutable';
import { ADD_TODO, EDIT_TODO, DELETE_TODO, FETCH_TODO_ITEMS } from './actionTypes';
import { COLUMN_UUID } from '../../indexedDB/constants';

const createReducer = (initialState, handlers) => (state = initialState, action) => (
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
);

const addTodo = (todosState, action) => (
  immutable.insertItemInList(
    todosState,
    todosState.length,
    action.todo
  )
);

const deleteTodo = (todosState, action) => (
  immutable.removeItemInList(
    todosState,
    (todo) => todo.uuid !== action.uuid
  )
);

const editTodo = (todosState, action) => {
  const {uuid, column, value} = action.todo;

  return immutable.updateItemInList(
    todosState,
    COLUMN_UUID,
    uuid,
    (item) => ({ ...item, [column]: value })
  );
};

const addAllTodoItems = (todosState, action) => (
  todosState.concat(action.todos)
);

export default createReducer([], {
  [ADD_TODO]: addTodo,
  [DELETE_TODO]: deleteTodo,
  [EDIT_TODO]: editTodo,
  [FETCH_TODO_ITEMS]: addAllTodoItems,
});