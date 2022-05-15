import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../constants/user";
const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, user: action.payload };
    }
    case USER_REGISTER: {
      return { ...state, user: action.payload };
    }
    case USER_LOGOUT: {
      return { ...state, user: null };
    }
  }
  return state;
};
