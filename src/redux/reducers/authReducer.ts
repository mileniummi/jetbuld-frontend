import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/models/User";
import { RootState } from "../store";
import { ICompany, UserRole } from "@/models/Company";
import { UserResponse } from "@/redux/services/auth/auth";

type AuthState = {
  id?: number;
  company: null | ICompany;
  user: IUser | null;
  token: string | null;
  role: UserRole | null;
};

export interface UserInfo {
  id: number;
  company: ICompany | null;
}

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, company: null } as AuthState,
  reducers: {
    setUserCredentials: (state, { payload: { userInfo, accessToken } }: PayloadAction<UserResponse>) => {
      state.user = userInfo;
      state.token = accessToken;
    },
    removeUserCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
    setUserPrivileges: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setExtendedUserCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.id = action.payload.id;
      state.company = action.payload.company;
    }
  }
});

export const {
  setUserCredentials,
  removeUserCredentials,
  setUserPrivileges,
  setExtendedUserCredentials
} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserRole = (state: RootState) => state.auth.role;
export const selectCurrentUserCompany = (state: RootState) => state.auth.company;
export const selectCurrentUserId = (state: RootState) => state.auth.id;
