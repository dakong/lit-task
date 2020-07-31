import * as immutable from "../../utils/immutable";
import createReducer from "../../utils/create-reducer";
import { COLUMN_UUID } from "../../indexed-db/constants";

import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_ITEMS,
} from "./todos.action-types";

const addTodo = (todosState, action) =>
  immutable.insertItemInList(todosState, todosState.length, action.todo);

const deleteTodo = (todosState, action) =>
  immutable.removeItemInList(todosState, (todo) => todo.uuid !== action.uuid);

const editTodo = (todosState, action) => {
  const { uuid, column, value } = action.todo;

  return immutable.updateItemInList(todosState, COLUMN_UUID, uuid, (item) => ({
    ...item,
    [column]: value,
  }));
};

const addAllTodoItems = (todosState, action) => todosState.concat(action.todos);

export default createReducer([], {
  [CREATE_TODO]: addTodo,
  [DELETE_TODO]: deleteTodo,
  [EDIT_TODO]: editTodo,
  [FETCH_TODO_ITEMS]: addAllTodoItems,
});
