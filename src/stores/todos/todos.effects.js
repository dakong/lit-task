import { takeEvery, put, call } from "redux-saga/effects";

import {
  DELETE_TODO_EFFECT,
  EDIT_TODO_EFFECT,
  INSERT_TODO_EFFECT,
  FETCH_TASKS_AND_TASKLISTS_EFFECT,
} from "./todos.action-types";

import {
  createTodo,
  deleteTodo,
  updateTodo,
  initializeListAndTask,
} from "./todos.action-creators";

import googleTaskService from "../../services/google-tasks";
import logger from "../../utils/logger";

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
    logger.Error("error while adding todo: ", e);
  }
}

function* deleteTodoEffect({ tasklistID, taskID }) {
  try {
    yield put(deleteTodo(tasklistID, taskID));
    yield call(googleTaskService.deleteTask, tasklistID, taskID);
  } catch (e) {
    logger.Error("error while deleting too: ", e);
  }
}

function* editTodoEffect({ tasklistID, taskID, payload }) {
  try {
    yield put(updateTodo(tasklistID, taskID, payload));
    yield call(googleTaskService.updateTask, tasklistID, taskID, payload);
  } catch (e) {
    logger.Error("error while updating todo: ", e);
  }
}

function* fetchAllTasksEffect(payload) {
  try {
    const lists = yield call(googleTaskService.getAllLists);
    const listIDs = lists.result.items.map((item) => item.id);
    const allTasks = yield call(googleTaskService.getAllTasks, listIDs);

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
    logger.Error("error while fetching all todos: ", e);
  }
}

export default function* todosEffects() {
  yield takeEvery(INSERT_TODO_EFFECT, insertTodoEffect);
  yield takeEvery(DELETE_TODO_EFFECT, deleteTodoEffect);
  yield takeEvery(EDIT_TODO_EFFECT, editTodoEffect);
  yield takeEvery(FETCH_TASKS_AND_TASKLISTS_EFFECT, fetchAllTasksEffect);
}
