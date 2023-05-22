import { IUser } from "@/models/User";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { GetUserInfoRequest, GetUserInfoResponse } from "@/redux/services/baseApi";

export interface UserResponse {
  userInfo: IUser;
  accessToken: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  login: string;
}

export const authApi = (builder: EndpointBuilder<any, any, any>) => ({
  login: builder.mutation<UserResponse, LoginRequest>({
    query: credentials => ({
      url: "auth/login/",
      method: "POST",
      body: credentials
    }),
    invalidatesTags: ["Companies", "Projects", "Points", "Photos", "userInfo"]
  }),

  register: builder.mutation<RegisterResponse, RegisterRequest>({
    query: credentials => ({
      url: "auth/register/",
      method: "POST",
      body: credentials
    })
  }),
  getUserInfo: builder.query<GetUserInfoResponse, GetUserInfoRequest>({
    query: ({ userLogin }) => ({ url: `user/${userLogin}` }),
    providesTags: ["userInfo"]
  }),
  addUserToCompany: builder.mutation<unknown, { companyId: number; userEmail: string }>({
    query: credentials => ({
      url: `/user/${credentials.userEmail}/company/${credentials.companyId}/`,
      method: "POST",
    }),
    invalidatesTags: ["Companies", "CompanyUsers"]
  })
});
