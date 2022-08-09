import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'section/loadAll';
const ADD_ONE = 'section/addOne';
const ADD_TWO = 'section/addTwo';
const DELETE_ONE = 'section/deleteOne';

// action creators
const loadAll = sections => ({
  type: LOAD_ALL,
  sections
});

const addOne = section => ({
  type: ADD_ONE,
  section
});

const addTwo = sections => ({
  type: ADD_TWO,
  sections
})

const deleteOne = sectionId => ({
  type: DELETE_ONE,
  sectionId
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

export const editSection = (section) => async dispatch => {
  const { sectionId, title, orderIds, boardId } = section;

  const response = await csrfFetch(`/api/sections/${sectionId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      orderIds,
      boardId
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
    dispatch(deleteOne(output.sectionId));
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
    console.log(output.sections);
    dispatch(addTwo(output.sections));
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