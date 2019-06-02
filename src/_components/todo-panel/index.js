import * as actionCreators from './action-creators';

const loadTodoPanel = function () {
  console.log('loading');
  import('./todo-panel');
};

const componentLoader = {
  todoPanel: loadTodoPanel,
};

export default {
  actionCreators,
  componentLoader,
};
