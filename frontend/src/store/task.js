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
}

export const getCompletedTasks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/tasks/completed`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }
}

export const getTodayTasks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/tasks/today`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }
}

export const getTasksByList = (listId) => async dispatch => {
  const response = await csrfFetch(`/api/lists/${listId}/tasks`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }
}

export const getTasksByTag = (tagId) => async dispatch => {
  const response = await csrfFetch(`/api/tags/${tagId}/tasks`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.tasks));
  }
}

// TODO: add the "here" boolean
export const createTask = (task) => async dispatch => {
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
    dispatch(addOne(output.task));
  }
}

// TODO: add the "here" boolean
export const editTask = (taskId, task) => async dispatch => {
  const { title, details, dueAt, listId } = task;
  const response = await csrfFetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      details,
      dueAt,
      listId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.task));
  }
}

export const deleteTask = (taskId) => async dispatch => {
  const response = await csrfFetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.taskId));
  }
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