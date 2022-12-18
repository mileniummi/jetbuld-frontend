import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ICompany } from "@/models/Company";
import { LoginRequest, RegisterRequest, UserResponse } from "./auth";
import { EProjectStage, IProject } from "@/models/Project";
import { EPointState, IPoint } from "@/models/Point";
import { IPhoto } from "@/models/Photo";

export interface PaginationParams {
  offset: number;
  limit: number;
}

export interface CreateCompanyRequest {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
}

export interface CreateProjectRequest {
  companyId: number;
  body: {
    name: string;
    description: string;
  };
}

export interface ChangePointStateRequest {
  pointId: number;
  newState: EPointState;
}

export interface CreatePointRequest {
  name: string;
  description: string;
  projectId: number;
}

export interface AddPhotoRequest {
  photo: Blob;
  body: {
    name: string;
    description: string;
    pointId: number;
    S3Url: string;
    userId: number;
  };
}

export interface GetProjectsParams extends PaginationParams {
  companyId: number;
}

export interface GetPointsParams extends PaginationParams {
  projectId: number;
}

export interface GetPhotosParams extends PaginationParams {
  pointId: number;
}

export interface GetUsersParams {
  companyId: number;
}

export const baseApi = createApi({
  reducerPath: "companies",
  tagTypes: ["Companies", "Projects", "Points", "Photos", "CompanyUsers"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // auth
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Companies"],
    }),

    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    //Companies
    getCompanies: builder.query<[count: number, current: ICompany[]], PaginationParams>({
      query: ({ offset, limit }) => ({ url: "/user/companieslist", params: { page: offset, limit } }),
      providesTags: ["Companies"],
    }),
    addCompany: builder.mutation<unknown, CreateCompanyRequest>({
      query: (credentials) => ({
        url: "companies",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Companies"],
    }),
    inviteUserToCompany: builder.mutation<unknown, { companyId: number; userEmail: string }>({
      query: (credentials) => ({
        url: `companies/${credentials.companyId}/user/${credentials.userEmail}`,
        method: "POST",
      }),
      invalidatesTags: ["Companies", "CompanyUsers"],
    }),

    //Projects
    getProjects: builder.query<[count: number, current: IProject[]], GetProjectsParams>({
      query: ({ offset, limit, companyId }) => ({
        url: `companies/${companyId}/projects`,
        params: { page: offset, limit },
      }),
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation<unknown, CreateProjectRequest>({
      query: (credentials) => ({
        url: `/project/${credentials.companyId}`,
        method: "POST",
        body: credentials.body,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    //Points
    getPoints: builder.query<[count: number, current: IPoint[]], GetPointsParams>({
      query: ({ offset, limit, projectId }) => ({
        url: `project/${projectId}/points`,
        params: { page: offset, limit },
      }),
      providesTags: ["Points"],
    }),
    addPoint: builder.mutation<unknown, CreatePointRequest>({
      query: (credentials) => ({
        url: `point/create`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Points"],
    }),
    deletePoint: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `/point/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Points"],
    }),
    changePointState: builder.mutation<unknown, ChangePointStateRequest>({
      query: (credentials) => ({
        url: `/point/${credentials.pointId}`,
        body: {
          stage: credentials.newState,
        },
        method: "PATCH",
      }),
      invalidatesTags: ["Projects", "Points", "Photos"],
    }),

    //Photos
    getPhotos: builder.query<[count: number, current: IPhoto[]], GetPhotosParams>({
      query: ({ offset, limit, pointId }) => ({
        url: `/point/${pointId}/photos`,
        params: { page: offset, limit },
      }),
      providesTags: ["Photos"],
    }),
    addPhoto: builder.mutation<unknown, AddPhotoRequest>({
      query: ({ body, photo }) => {
        const formData = new FormData();
        for (const prop of Object.keys(body)) {
          // @ts-ignore
          formData.append(prop, body[prop]);
        }
        formData.set("file", photo);
        return { url: `point/uploadfake`, method: "POST", body: formData };
      },
      invalidatesTags: ["Photos", "Points"],
    }),

    deletePhoto: builder.mutation<undefined, number>({
      query: (id) => ({
        url: `/photo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Photos", "Points"],
    }),

    //CompanyUsers
    getCompanyUsers: builder.query<ICompany, GetUsersParams>({
      query: ({ companyId }) => ({ url: `companies/${companyId}/users` }),
      providesTags: ["CompanyUsers"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddCompanyMutation,
  useGetProjectsQuery,
  useAddProjectMutation,
  useGetPointsQuery,
  useAddPointMutation,
  useGetPhotosQuery,
  useAddPhotoMutation,
  useGetCompanyUsersQuery,
  useChangePointStateMutation,
  useDeleteProjectMutation,
  useDeletePointMutation,
  useDeletePhotoMutation,
  useInviteUserToCompanyMutation,
} = baseApi;
