import createReducer from '../../utils/create-reducer';
import { NAVIGATE_EDIT_PANEL, NAVIGATE_TODO_PANEL } from './navigation.action-types';
const DEFAULT_APP_STATE = {
  panel: 'todo_panel',
  currentEditable: {},
};

const openEditPanel = (appState, action) => {
  const { uuid, value, comment } = action;

  return {
    ...appState,
    panel: 'edit_panel',
    currentEditable: {
      comment,
      uuid,
      value,
    },
  };
};

const openTodoPanel = (appState) => {
  return {
    ...appState,
    panel: 'todo_panel',
    currentEditable: {},
  };
};

export default createReducer(DEFAULT_APP_STATE, {
  [NAVIGATE_EDIT_PANEL]: openEditPanel,
  [NAVIGATE_TODO_PANEL]: openTodoPanel,
});
