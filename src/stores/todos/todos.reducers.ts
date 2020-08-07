import * as immutable from "../../utils/immutable";
import createReducer from "../../utils/create-reducer";
import { GoogleTask } from "../../interfaces/google-task";
import { GoogleTaskList } from "../../interfaces/google-tasklist";

import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  INITIALIZE_LIST_AND_TASK,
} from "./todos.action-types";

interface TodoReduxState {
  tasklist: GoogleTaskList[];
  tasks: { [tasklistID: string]: GoogleTask[] };
  selectedTasklist: string;
}

function updateTasksStore(taskState: TodoReduxState, tasklistID, updatedTasks) {
  const { tasks } = taskState;
  return {
    ...taskState,
    tasks: {
      ...tasks,
      [tasklistID]: updatedTasks,
    },
  };
}

export default createReducer(
  { tasklist: "", selectedTasklist: "", tasks: {} },
  {
    [CREATE_TODO]: (todosState: TodoReduxState, action) => {
      const { task, tasklistID } = action;
      const { tasks } = todosState;
      const updatedTasks = immutable.insertItemInList(
        tasks[tasklistID],
        task,
        0
      );

      return updateTasksStore(todosState, tasklistID, updatedTasks);
    },
    [DELETE_TODO]: (todosState: TodoReduxState, action) => {
      const { tasklistID, taskID } = action;
      const { tasks } = todosState;
      const updatedTasks = immutable.removeItemInList(
        tasks[tasklistID],
        (task) => task.id !== taskID
      );

      return updateTasksStore(todosState, tasklistID, updatedTasks);
    },
    [EDIT_TODO]: (todosState: TodoReduxState, action) => {
      const { tasklistID, taskID, payload } = action;
      const { tasks } = todosState;

      const updatedTasks = immutable.updateItemInList(
        tasks[tasklistID],
        (item) => item.id === taskID,
        (item) => ({ ...item, ...payload })
      );

      return updateTasksStore(todosState, tasklistID, updatedTasks);
    },
    [INITIALIZE_LIST_AND_TASK]: (_todosState: TodoReduxState, action) => {
      const { tasklist, tasks, selectedTasklist } = action;
      return {
        tasklist,
        tasks,
        selectedTasklist,
      };
    },
  }
);
