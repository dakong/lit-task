import { combineReducers, compose, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";

import todosReducer from "./todos/todos.reducers";
import todosEffects from "./todos/todos.effects";
import navigationReducer from "./navigation/navigation.reducers";
import requestingReducer from "./requesting/requesting.reducers";

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleWare();

export const store = createStore(
  (state) => state,

  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk, sagaMiddleWare)
  )
);

sagaMiddleWare.run(todosEffects);

store.addReducers({
  navigation: navigationReducer,
  todos: todosReducer,
  requesting: requestingReducer,
});