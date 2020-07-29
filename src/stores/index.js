import {
    combineReducers,
    compose,
    createStore,
    applyMiddleware,
  } from 'redux';
  
  import thunk from 'redux-thunk';
  import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
  
  import todosReducer from './todos/todos.reducers';
  import navigationReducer from './navigation/navigation.reducers';
  import requestingReducer from './requesting/requesting.reducers';
  
  const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export const store = createStore(
    state => state,
  
    devCompose(
      lazyReducerEnhancer(combineReducers),
      applyMiddleware(thunk),
    ),
  );
  
  store.addReducers({
    navigation: navigationReducer,
    todos: todosReducer,
    requesting: requestingReducer,
  });
  
  /**
   *  todoPanel: todoPanelReducers,
    todos: todoReducer,
    app: appReducers,
   */