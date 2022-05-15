import { CLEAR_LOGIN_ERROR, HIDE_LOADER, SET_LOGIN_ERROR, SHOW_LOADER } from "../constants/app";

const initialState = {
  loading: false,
  loginError: null,
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
  }
  return state;
};
