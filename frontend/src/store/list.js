import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'list/loadAll';
const ADD_ONE = 'list/addOne';
const DELETE_ONE = 'list/deleteOne';

// action creators
const loadAll = lists => ({
  type: LOAD_ALL,
  lists
});

const addOne = list => ({
  type: ADD_ONE,
  list
});

const deleteOne = listId => ({
  type: DELETE_ONE,
  listId
});

// thunks
export const getLists = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/lists`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.lists));
  }
}

export const createList = (list) => async dispatch => {
  const { title, color, userId } = list;
  const response = await csrfFetch('/api/lists', {
    method: 'POST',
    body: JSON.stringify({
      title,
      color,
      userId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.list));
  }
}

export const editList = (listId, list) => async dispatch => {
  const { title, color } = list;
  const response = await csrfFetch(`/api/lists/${listId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      color,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.list));
  }
}

export const deleteList = (listId) => async dispatch => {
  const response = await csrfFetch(`/api/lists/${listId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.listId));
  }
}



// initial state
const initialState = {};

// reducer
const listsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL:
      newState = {};
      action.lists.forEach(list => {
        newState[list.id] = list;
      });
      return newState;
    case ADD_ONE:
      newState = { ...state };
      newState[action.list.id] = action.list;
      return newState;
    case DELETE_ONE:
      newState = { ...state };
      delete newState[action.listId];
      return newState;
    default:
      return state;
  }
}

export default listsReducer;