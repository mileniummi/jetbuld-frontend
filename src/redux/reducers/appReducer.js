import {
  CLEAR_LOGIN_ERROR,
  HIDE_LOADER,
  HIDE_SIDEBAR,
  SET_CURRENT_COMPANY,
  SET_CURRENT_PROJECT,
  SET_LOGIN_ERROR,
  SHOW_LOADER,
  SHOW_SIDEBAR,
} from "../constants/app";

const initialState = {
  loading: false,
  loginError: null,
  hideSidebar: true,
  currentCompany: null,
  currentProject: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER: {
      return { ...state, loading: true };
    }
    case HIDE_LOADER: {
      return { ...state, loading: false };
    }
    case SET_LOGIN_ERROR: {
      return { ...state, loginError: action.payload };
    }
    case CLEAR_LOGIN_ERROR: {
      return { ...state, loginError: null };
    }
    case SET_CURRENT_COMPANY: {
      return { ...state, currentCompany: action.payload };
    }
    case SET_CURRENT_PROJECT: {
      return { ...state, currentProject: action.payload };
    }
    case HIDE_SIDEBAR: {
      return { ...state, hideSidebar: true };
    }
    case SHOW_SIDEBAR: {
      return { ...state, hideSidebar: false };
    }
  }
  return state;
};
