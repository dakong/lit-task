import createReducer from '../_utils/create-reducer';
import { NAVIGATE_EDIT_PANEL, NAVIGATE_MAIN_PANEL } from './action-types';
const DEFAULT_APP_STATE = {
  panel: 'main_panel',
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

const openMainPanel = (appState) => {
  return {
    ...appState,
    panel: 'main_panel',
    currentEditable: {},
  };
};

export default createReducer(DEFAULT_APP_STATE, {
  [NAVIGATE_EDIT_PANEL]: openEditPanel,
  [NAVIGATE_MAIN_PANEL]: openMainPanel,
});
