import { takeEvery, put, call } from "redux-saga/effects";
import uuidv4 from "uuid/v4";
import {
  ADD_TODO,
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
  INSERT_TODO_EFFECT,
} from "./todos.action-types";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  initializeListAndTask,
} from "./todos.action-creators";
import googleTaskService from "../../services/google-tasks";
// for testing purposes
const sleep = (ms, msg) =>
  new Promise((resolve) => setTimeout(() => resolve(msg), ms));

const normalizeList = (list) => (Array.isArray(list) ? list : []);

function* insertTodoEffect({ tasklistID, payload, parent, previous }) {
  try {
    const response = yield call(
      googleTaskService.insertTask,
      tasklistID,
      payload,
      parent,
      previous
    );

    yield put(createTodo(tasklistID, response.result));
  } catch (e) {
    console.log("error while adding todo: ", e);
  }
}

function* deleteTodoEffect({ tasklistID, taskID }) {
  try {
    yield put(deleteTodo(tasklistID, taskID));
    yield call(googleTaskService.deleteTask, tasklistID, taskID);
  } catch (e) {
    console.log("error while deleting too: ", e);
  }
}

function* editTodoEffect({ tasklistID, taskID, payload }) {
  try {
    yield put(updateTodo(tasklistID, taskID, payload));
    yield call(googleTaskService.updateTask, tasklistID, taskID, payload);
  } catch (e) {
    console.log("error while updating todo: ", e);
  }
}

function* fetchAllTasksEffect(payload) {
  try {
    const lists = yield call(googleTaskService.getAllLists);
    console.log(lists);
    const listIDs = lists.result.items.map((item) => item.id);
    const allTasks = yield call(googleTaskService.getAllTasks, listIDs);
    console.log(allTasks);

    const tasklist = Object.keys(allTasks.result);
    let tasks = {};

    Object.entries(allTasks.result).forEach(([key, value]) => {
      tasks[key] = normalizeList(value.result.items);
    });

    // @TODO: Store this value in indexedb or local storage.
    // Default to first item in tasklist for now.
    const selectedTasklist = tasklist[0];

    yield put(initializeListAndTask(tasklist, tasks, selectedTasklist));
  } catch (e) {
    console.log("error while fetching all todos: ", e);
  }
}

export default function* todosEffects() {
  yield takeEvery(INSERT_TODO_EFFECT, insertTodoEffect);
  yield takeEvery(DELETE_TODO_EFFECT, deleteTodoEffect);
  yield takeEvery(EDIT_TODO_EFFECT, editTodoEffect);
  yield takeEvery("FETCH_ALL_TASKS", fetchAllTasksEffect);
}
