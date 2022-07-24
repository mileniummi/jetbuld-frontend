import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jetbuild-app.herokuapp.com" }),
  endpoints: (build) => ({
    getUser: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: "/auth/register",
        body,
      }),
    }),
  }),
});

export const { useGetUserMutation } = authApi;
