import { combineReducers, compose, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { all } from "redux-saga/effects";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";

import todosReducer from "./todos/todos.reducers.ts";
import todosEffects from "./todos/todos.effects";
import navigationReducer from "./navigation/navigation.reducers";
import requestingReducer from "./requesting/requesting.reducers";
import requestingEffects from "./requesting/requesting.effects";

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleWare();

function* rootSaga() {
  yield all([todosEffects(), requestingEffects()]);
}

export const store = createStore(
  (state) => state,

  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk, sagaMiddleWare)
  )
);

sagaMiddleWare.run(rootSaga);

store.addReducers({
  navigation: navigationReducer,
  todos: todosReducer,
  requesting: requestingReducer,
});
