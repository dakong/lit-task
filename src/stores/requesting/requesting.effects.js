import { takeEvery, put, call } from "redux-saga/effects";

import { GAPI_INITIALIZE } from "./requesting.action-types";
import googleTaskService from "../../services/google-tasks";
import { gapiLoadStart, gapiLoadComplete } from "./requesting.action-creators";
import { fetchAllTodoItems } from "../todos/todos.action-creators";
import logger from "../../utils/logger";

function* gapiInitialize() {
  try {
    yield put(gapiLoadStart());
    yield call(googleTaskService.initializeGapi);
    yield put(gapiLoadComplete());
    yield put(fetchAllTodoItems());
  } catch (e) {
    logger.Error(e);
  }
}

export default function* requestingEffects() {
  yield takeEvery(GAPI_INITIALIZE, gapiInitialize);
}
