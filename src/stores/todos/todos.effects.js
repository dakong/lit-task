import { takeEvery, put, call } from "redux-saga/effects";
import uuidv4 from "uuid/v4";
import {
  ADD_TODO,
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
} from "./todos.action-types";
import { createTodo, deleteTodo, updateTodo } from "./todos.action-creators";
import TodoDB from "../../indexed-db/todo-db";

const sleep = (ms, msg) =>
  new Promise((resolve) => setTimeout(() => resolve(msg), ms));

function* createTodoEffect() {
  try {
    const uuid = uuidv4();
    const todo = yield call(TodoDB.add.bind(TodoDB), uuid);
    yield put(createTodo(todo));
  } catch (e) {
    console.log("error while adding todo: ", e);
  }
}

function* deleteTodoEffect({ uuid }) {
  try {
    yield put(deleteTodo(uuid));
    yield call(TodoDB.delete.bind(TodoDB), uuid);
  } catch (e) {
    console.log("error while deleting too: ", e);
  }
}

function* editTodoEffect({ payload }) {
  try {
    const updatedTodo = yield call(TodoDB.update.bind(TodoDB), payload);
    yield put(updateTodo(updatedTodo));
  } catch (e) {
    console.log("error while updating todo: ", e);
  }
}

export default function* todosEffects() {
  yield takeEvery(ADD_TODO, createTodoEffect);
  yield takeEvery(DELETE_TODO_EFFECT, deleteTodoEffect);
  yield takeEvery(EDIT_TODO_EFFECT, editTodoEffect);
}
