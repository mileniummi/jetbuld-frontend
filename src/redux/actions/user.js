import axios from "axios";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../constants/user";
import { api } from "../store";
import { clearLoginError, setLoginError } from "./app";

export const login = (login, password) => async (dispatch) => {
  try {
    const result = await api.login(login, password);
    dispatch({
      type: USER_LOGIN,
      payload: { ...result.data.user, token: result.data.token },
    });
    dispatch(clearLoginError());
  } catch (e) {
    dispatch(setLoginError(e.response.data.message));
  }
};

export const register = (userCredentials) => async (dispatch) => {
  try {
    const result = await axios.post("https://jetbuild-app.herokuapp.com/auth/register", userCredentials);
    dispatch({
      type: USER_REGISTER,
      payload: { ...result.data.user, token: result.data.token },
    });
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
