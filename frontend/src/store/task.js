import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'task/loadAll';
const ADD_ONE = 'task/addOne';
const DELETE_ONE = 'task/deleteOne';

// action creators
const loadAll = tasks => ({
  type: LOAD_ALL,
  tasks
});

const addOne = task => ({
  type: ADD_ONE,
  task
});

const deleteOne = taskId => ({
  type: DELETE_ONE,
  taskId
});

// thunks
export const getAllTasks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/tasks`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }

  return response;
}

export const getCompletedTasks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/tasks/completed`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }

  return response;
}

export const getTodayTasks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/tasks/today`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }

  return response;
}

export const getTasksByList = (listId) => async dispatch => {
  const response = await csrfFetch(`/api/lists/${listId}/tasks`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }

  return response;
}

export const createTask = (task, here) => async dispatch => {
  const { title, details, dueAt, listId, userId } = task;
  const response = await csrfFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title,
      details,
      dueAt,
      listId,
      userId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    if (here) {
      dispatch(addOne(output.task));
    }
    return 'Success';
  }
  return response;
}

export const editTask = (task, here) => async dispatch => {
  const { taskId, title, details, dueAt, completed, listId } = task;
  const response = await csrfFetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      details,
      dueAt,
      completed,
      listId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    if (here) {
      dispatch(addOne(output.task));
    } else {
      dispatch(deleteOne(output.task.id));
    }
    return 'Success';
  }

  return response;
}

export const deleteTask = (taskId) => async dispatch => {
  const response = await csrfFetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.taskId));
  }

  return response;
}



// initial state
const initialState = {};

// reducer
const tasksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL:
      newState = {};
      action.tasks.forEach(task => {
        newState[task.id] = task;
      });
      return newState;
    case ADD_ONE:
      newState = { ...state };
      newState[action.task.id] = action.task;
      return newState;
    case DELETE_ONE:
      newState = { ...state };
      delete newState[action.taskId];
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;