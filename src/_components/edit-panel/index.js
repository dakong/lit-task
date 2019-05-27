import * as actionCreators from './action-creators';

const loadEditPanel = function () {
  import('./edit-panel');
};

const componentLoader = {
  editPanel: loadEditPanel,
};

export default {
  actionCreators,
  componentLoader,
};
