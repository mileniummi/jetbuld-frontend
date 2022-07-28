import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";
import { RootState } from "../store";

type AuthState = {
  user: IUser | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setUserCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = user;
      state.token = token;
    },
    removeUserCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserCredentials, removeUserCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
