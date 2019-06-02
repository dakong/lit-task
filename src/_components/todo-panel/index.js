import * as actionCreators from './action-creators';

const loadTodoPanel = function () {
  import('./todo-panel');
};

const componentLoader = {
  todoPanel: loadTodoPanel,
};

export default {
  actionCreators,
  componentLoader,
};
