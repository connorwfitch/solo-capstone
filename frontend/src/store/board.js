import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'board/loadAll';
const ADD_ONE = 'board/addOne';
const SECTION_ADD_ONE = 'section/createOne';
const DELETE_ONE = 'board/deleteOne';

// action creators
const loadAll = boards => ({
  type: LOAD_ALL,
  boards
});

const addOne = board => ({
  type: ADD_ONE,
  board
});

const deleteOne = boardId => ({
  type: DELETE_ONE,
  boardId
});

// thunks
export const getBoards = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/boards`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.boards));
  }
  return response;
}

export const createBoard = (board) => async dispatch => {
  const { title, color, userId } = board;
  const response = await csrfFetch('/api/boards', {
    method: 'POST',
    body: JSON.stringify({
      title,
      color,
      userId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.board));
    return 'Success';
  }
  return response;
}

export const editBoard = (board) => async dispatch => {
  const { boardId, title, color } = board;
  const response = await csrfFetch(`/api/boards/${boardId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      color,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.board));
    return 'Success';
  }
  return response;
}

export const deleteBoard = (boardId) => async dispatch => {
  const response = await csrfFetch(`/api/boards/${boardId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.boardId));
  }
  return response;
}



// initial state
const initialState = {};

// reducer
const boardsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL:
      newState = {};
      action.boards.forEach(board => {
        newState[board.id] = board;
      });
      return newState;
    case ADD_ONE:
      newState = { ...state };
      newState[action.board.id] = action.board;
      return newState;
    case SECTION_ADD_ONE:
      newState = { ...state };
      newState[action.board.id] = action.board;
      return newState;
    case DELETE_ONE:
      newState = { ...state };
      delete newState[action.boardId];
      return newState;
    default:
      return state;
  }
}

export default boardsReducer;