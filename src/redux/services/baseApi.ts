import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ICompany } from "@/models/Company";
import { EPointState } from "@/models/Point";
import { projectApi } from "@/redux/services/projects/projectApi";
import { authApi } from "@/redux/services/auth/auth";
import { pointsApi } from "@/redux/services/points/pointsApi";
import { mediaUploadApi } from "@/redux/services/media/mediaUploadApi";
import { companiesApi } from "@/redux/services/companies/companiesApi";

export interface ChangePointStateRequest {
  pointId: number;
  newState: EPointState;
}

export interface GetUserInfoRequest {
  userLogin: string;
}

export interface GetUserInfoResponse {
  id: number;
  company: ICompany | null;
}

export const baseApi = createApi({
  reducerPath: "basApi",
  tagTypes: ["userInfo", "Companies", "Projects", "Points", "Photos", "CompanyUsers", "PointPhotos"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: builder => ({
    deletePoint: builder.mutation<undefined, number>({
      query: id => ({
        url: `/point/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Points"]
    }),
    changePointState: builder.mutation<unknown, ChangePointStateRequest>({
      query: credentials => ({
        url: `/point/${credentials.pointId}`,
        body: {
          stage: credentials.newState
        },
        method: "PATCH"
      }),
      invalidatesTags: ["Projects", "Points", "Photos"]
    }),
    ...authApi(builder),
    ...companiesApi(builder),
    ...projectApi(builder),
    ...pointsApi(builder),
    ...mediaUploadApi(builder)
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddCompanyMutation,
  useGetProjectsQuery,
  useAddProjectMutation,
  useAddPointMutation,
  useGetCompanyUsersQuery,
  useChangePointStateMutation,
  useDeleteProjectMutation,
  useDeletePointMutation,
  useGetUserInfoQuery,
  useGetProjectQuery,
  useGetPointsQuery,
  useGetPointQuery,
  useAddPointPhotoMutation,
  useUpdateCompanyMutation,
  useGetPointPhotosQuery,
  useAddUserToCompanyMutation
} = baseApi;
