export const SET_TITULO = 'SET_TITULO';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const setHeaderTitle = (title) => ({
  type: SET_TITULO,
  payload: title,
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});