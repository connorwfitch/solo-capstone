import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'section/loadAll';
const ADD_ONE = 'section/addOne';
const CREATE_ONE = 'section/createOne';
const ADD_TWO = 'section/addTwo';
const DELETE_ONE = 'section/deleteOne';

// action creators
const loadAll = sections => ({
  type: LOAD_ALL,
  sections
});

const createOne = (section, board) => ({
  type: CREATE_ONE,
  section,
  board
});

const addOne = section => ({
  type: ADD_ONE,
  section
});

const addTwo = sections => ({
  type: ADD_TWO,
  sections
});

const deleteOne = (sectionId, board) => ({
  type: DELETE_ONE,
  sectionId,
  board
});

// thunks
export const getSectionsByBoard = (boardId) => async dispatch => {
  const response = await csrfFetch(`/api/boards/${boardId}/sections`);

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.sections));
  }

  return response;
}

export const createSection = (section) => async dispatch => {
  const { title, boardId } = section;

  const response = await csrfFetch('/api/sections', {
    method: 'POST',
    body: JSON.stringify({
      title,
      boardId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(createOne(output.section, output.board));
    return 'Success';
  }
  return response;
}

export const editSection = (section) => async dispatch => {
  const { sectionId, title, orderIds } = section;

  const response = await csrfFetch(`/api/sections/${sectionId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      orderIds,
    })
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.section));
    return 'Success';
  }
  return response;
}

export const deleteSection = (sectionId) => async dispatch => {
  const response = await csrfFetch(`/api/sections/${sectionId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.sectionId, output.board));
  }
  return response;
}

export const createItem = (item) => async dispatch => {
  const { title, details, sectionId } = item;
  const response = await csrfFetch('/api/items', {
    method: 'POST',
    body: JSON.stringify({
      title,
      details,
      sectionId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.section));
    return 'Success';
  }
  return response;
}

export const editItem = (item) => async dispatch => {
  const { title, details, itemId } = item;
  const response = await csrfFetch(`/api/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      details,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.section));
    return 'Success';
  }
  return response;
}

export const editItemsSection = (data) => async dispatch => {
  const { itemId, startOrderIds, endOrderIds, sectionId } = data;

  const response = await csrfFetch(`/api/items/${itemId}/move`, {
    method: 'PATCH',
    body: JSON.stringify({
      startOrderIds,
      endOrderIds,
      sectionId
    })
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addTwo(output.sections));
  }

  return response;
}

export const deleteItem = (itemId) => async dispatch => {
  const response = await csrfFetch(`/api/items/${itemId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.section));
  }
  return response;
}

// initial state
const initialState = {};

// reducer
const sectionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL:
      newState = {};
      action.sections.forEach(section => {
        // put items in their own sub-dict
        section.items = {};
        section.Items.forEach(item => {
          section.items[`item-${item.id}`] = item;
        })
        delete section.Items;
        newState[`section-${section.id}`] = section
      });
      return newState;
    case ADD_ONE:
      newState = { ...state };
      // put items in their own sub-dict
      action.section.items = {};
      if (action.section.Items) {
        action.section.Items.forEach(item => {
          action.section.items[`item-${item.id}`] = item;
        })
        delete action.section.Items;
      }
      newState[`section-${action.section.id}`] = action.section;
      return newState;
    case CREATE_ONE:
      newState = { ...state };
      // put items in their own sub-dict
      action.section.items = {};
      newState[`section-${action.section.id}`] = action.section;
      return newState;
    case ADD_TWO:
      newState = { ...state };
      action.sections.forEach(section => {
        // put items in their own sub-dict
        section.items = {};
        section.Items.forEach(item => {
          section.items[`item-${item.id}`] = item;
        })
        delete section.Items;
        newState[`section-${section.id}`] = section
      });
      return newState;
    case DELETE_ONE:
      newState = { ...state };
      delete newState[`section-${action.sectionId}`];
      return newState;
    default:
      return state;
  }
}

export default sectionsReducer;