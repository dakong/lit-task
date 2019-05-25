import * as immutable from '../../_utils/immutable';
import { ADD_TODO, EDIT_TODO, DELETE_TODO, FETCH_TODO_ITEMS } from './actionTypes';

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type))
    return handlers[action.type](state, action);
  return state;
}

const addTodo = (todosState, action) => todosState.concat([action.todo]);

const deleteTodo = (todosState, action) => immutable.removeItemInList(todosState, (todo) => todo.uuid !== action.uuid);

const editTodo = (todosState, action) => {
  const {uuid, column, value} = action.todo;
  return immutable.updateItemInList(todosState, 'uuid', uuid, (item) => ({ ...item, [column]: value }));
};

const addAllTodoItems = (todosState, action) => todosState.concat(action.todos);

export default createReducer([], {
  [ADD_TODO]: addTodo,
  [DELETE_TODO]: deleteTodo,
  [EDIT_TODO]: editTodo,
  [FETCH_TODO_ITEMS]: addAllTodoItems,
});