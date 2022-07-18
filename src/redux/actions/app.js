import {
  CLEAR_LOGIN_ERROR,
  HIDE_LOADER,
  SET_CURRENT_COMPANY,
  SET_CURRENT_PROJECT,
  SET_LOGIN_ERROR,
  SHOW_LOADER,
} from "../constants/app";

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

export const setCurrentCompany = (company) => {
  return {
    type: SET_CURRENT_COMPANY,
    payload: company,
  };
};

export const setCurrentProject = (project) => {
  return {
    type: SET_CURRENT_PROJECT,
    payload: project,
  };
};
