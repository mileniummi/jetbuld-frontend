import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/models/User";
import { RootState } from "../store";
import { UserRole } from "@/models/Company";

type AuthState = {
  user: IUser | null;
  token: string | null;
  role: UserRole | null;
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
      state.role = null;
    },
    setUserPrivileges: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
});

export const { setUserCredentials, removeUserCredentials, setUserPrivileges } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserRole = (state: RootState) => state.auth.role;
