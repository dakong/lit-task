import { NAVIGATE_EDIT_PANEL, NAVIGATE_MAIN_PANEL } from './action-types';

export const openEditPanel = ({ uuid, value, comment }) => {
  return {
    uuid,
    value,
    comment,
    type: NAVIGATE_EDIT_PANEL,
  };
};

export const openMainPanel = () => {
  return {
    type: NAVIGATE_MAIN_PANEL,
  };
};
