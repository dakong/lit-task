import { NAVIGATE_EDIT_PANEL, NAVIGATE_TODO_PANEL } from './navigation.action-types';

export const openEditPanel = ({ uuid, value, comment }) => {
  return {
    uuid,
    value,
    comment,
    type: NAVIGATE_EDIT_PANEL,
  };
};

export const openTodoPanel = () => {
  return {
    type: NAVIGATE_TODO_PANEL,
  };
};
