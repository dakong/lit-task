import * as actionCreators from './action-creators';

const loadMainPanel = function () {
  import('./main-panel');
};

const componentLoader = {
  mainPanel: loadMainPanel,
};

export default {
  actionCreators,
  componentLoader,
};
