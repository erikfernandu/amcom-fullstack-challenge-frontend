import { SET_TITULO } from './actions';
import { TOGGLE_SIDEBAR } from './actions';

const initialState = {
  title: '',
  isSidebarOpen: true,
};

export const titleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITULO:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};