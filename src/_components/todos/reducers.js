import { ADD_TODO, EDIT_TODO, DELETE_TODO, FETCH_TODO_ITEMS } from './actionTypes';

const INITIAL_STATE = {
  todos: [],
};

const todos = (state = INITIAL_STATE, action) => {
  const {todos} = state;
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: todos.concat([action.todo])
      }
    case FETCH_TODO_ITEMS:
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
      return {
        ...state,
        todos: todos.filter(todo => todo.uuid !== action.uuid),
      }
    default:
      return state;
  }
}

export default todos;