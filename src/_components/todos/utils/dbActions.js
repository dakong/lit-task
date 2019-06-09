import uuidv4 from 'uuid/v4';

import TodoDB from '../../../indexed-db/todo-db';
import { COLUMN_DONE, COLUMN_VALUE } from '../../../indexed-db/constants';
import { store } from '../../../store';

import { deleteTodo, updateTodo, addTodo } from '../action-creators';

export function addNewTodo() {
  const uuid = uuidv4();
  TodoDB.add(uuid)
    .then(todo => store.dispatch(addTodo(todo)))
    .catch(e => console.log('error while checking: ', e));
}

export function updateCheckedValue(uuid, value) {
  const payload = {
    uuid,
    value,
    column: COLUMN_DONE,
  };

  TodoDB.update(payload).then((data) => store.dispatch(updateTodo(data)))
    .catch((e) => console.log('error while checking: ', e));
}

export function updateTodoItemValue(uuid, value) {
  const payload = {
    uuid,
    value,
    column: COLUMN_VALUE,
  };

  TodoDB.update(payload).then((data) => store.dispatch(updateTodo(data)))
    .catch((e) => console.log('error while updating todo: ', e));
}

export function deleteTodoItem(id) {
  TodoDB.delete(id)
    .then((data) => store.dispatch(deleteTodo(id)))
    .catch((e) => console.log('error while deleting too: ', e));
}
