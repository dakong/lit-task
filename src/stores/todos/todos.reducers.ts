import * as immutable from "../../utils/immutable";
import createReducer from "../../utils/create-reducer";
import { GoogleTask } from "../../interfaces/google-task";
import { GoogleTaskList } from "../../interfaces/google-tasklist";

import {
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_ITEMS,
} from "./todos.action-types";
import googleTaskService from "../../services/google-tasks";

interface TodoReduxState {
  tasklist: GoogleTaskList[];
  tasks: GoogleTask[];
  selectedTasklist: string;
}

const addTodo = (todosState, action) => {
  const { task, tasklistID } = action;
  const { tasks } = todosState;
  const updatedTasks = immutable.insertItemInList(tasks[tasklistID], 0, task);

  return {
    ...todosState,
    tasks: {
      ...googleTaskService,
      [tasklistID]: updatedTasks,
    },
  };
};

const deleteTodo = (todosState, action) => {
  const { tasklistID, taskID } = action;
  const { tasks } = todosState;
  const updatedTasks = immutable.removeItemInList(
    tasks[tasklistID],
    (task) => task.id !== taskID
  );

  return {
    ...todosState,
    tasks: {
      ...tasks,
      [tasklistID]: updatedTasks,
    },
  };
};

const editTodo = (todosState, action) => {
  const { tasklistID, taskID, payload } = action;
  const { tasks } = todosState;

  const updatedTasks = immutable.updateItemInList(
    tasks[tasklistID],
    (item) => item.id === taskID,
    (item) => ({ ...item, ...payload })
  );

  return {
    ...todosState,
    tasks: {
      ...tasks,
      [tasklistID]: updatedTasks,
    },
  };
};

const addAllTodoItems = (_todosState: TodoReduxState, action) => {};

const initializeListAndTask = (_todosState: TodoReduxState, action) => {
  const { tasklist, tasks, selectedTasklist } = action;
  return {
    tasklist,
    tasks,
    selectedTasklist,
  };
};

export default createReducer(
  { tasklist: "", selectedTasklist: "", tasks: {} },
  {
    [CREATE_TODO]: addTodo,
    [DELETE_TODO]: deleteTodo,
    [EDIT_TODO]: editTodo,
    [FETCH_TODO_ITEMS]: addAllTodoItems,
    ["INITIALIZE_LIST_AND_TASK"]: initializeListAndTask,
  }
);
