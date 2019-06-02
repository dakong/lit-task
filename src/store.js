import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import todos from './_components/todos';
import appReducers from './_components/main-panel/reducers';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state => state,

  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk),
  ),
);

store.addReducers({
  todos: todos.reducers,
  app: appReducers,
});
