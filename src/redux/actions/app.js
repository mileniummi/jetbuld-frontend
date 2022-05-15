import { CLEAR_LOGIN_ERROR, HIDE_LOADER, SET_LOGIN_ERROR, SHOW_LOADER } from "../constants/app";

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};
export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const setLoginError = (message) => {
  return {
    type: SET_LOGIN_ERROR,
    payload: message,
  };
};

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
  };
};
