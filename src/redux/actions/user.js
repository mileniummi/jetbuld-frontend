import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../constants/user";
import { clearLoginError, setLoginError } from "./app";
import { UserService } from "../../services/userService";

const userService = new UserService();

export const login = (login, password) => async (dispatch) => {
  try {
    const result = await userService.login(login, password);
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
    const result = await userService.register(userCredentials);
    dispatch({
      type: USER_REGISTER,
      payload: { ...result.data.user, token: result.data.token },
    });
  } catch (e) {
    dispatch(setLoginError(e.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
