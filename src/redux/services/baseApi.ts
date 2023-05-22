import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';
import {ICompany} from '@/models/Company';
import {EPointState} from '@/models/Point';
import {IPhoto} from '@/models/Photo';
import {projectApi} from '@/redux/services/projects/projectApi';
import { authApi, LoginRequest, RegisterRequest, UserResponse } from "@/redux/services/auth/auth";
import {pointsApi} from '@/redux/services/points/pointsApi';
import { mediaUploadApi } from "@/redux/services/media/mediaUploadApi";
import { companiesApi } from "@/redux/services/companies/companiesApi";

export interface PaginationParams {
  offset: number;
  limit: number;
}

export interface ChangePointStateRequest {
  pointId: number;
  newState: EPointState;
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
export interface GetPhotosParams extends PaginationParams {
  pointId: number;
}

export interface GetUsersParams {
  companyId: number;
}

export interface GetUserInfoRequest {
  userLogin: string;
}

export interface GetUserInfoResponse {
  id: number;
  company: ICompany | null;
}

export const baseApi = createApi({
    reducerPath: 'companies',
    tagTypes: ['userInfo', 'Companies', 'Projects', 'Points', 'Photos', 'CompanyUsers'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_PATH,
        prepareHeaders: (headers, {getState}) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const {token} = (getState() as RootState).auth;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        // Companies
        getCompanies: builder.query<[count: number, current: ICompany[]], PaginationParams>({
            query: ({offset, limit}) => ({url: '/company/', params: {page: offset, limit}}),
            providesTags: ['Companies'],
        }),

        inviteUserToCompany: builder.mutation<unknown, { companyId: number; userEmail: string }>({
            query: credentials => ({
                url: `company/${credentials.companyId}/user/${credentials.userEmail}`,
                method: 'POST',
            }),
            invalidatesTags: ['Companies', 'CompanyUsers'],
        }),
        deletePoint: builder.mutation<undefined, number>({
            query: id => ({
                url: `/point/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Points'],
        }),
        changePointState: builder.mutation<unknown, ChangePointStateRequest>({
            query: credentials => ({
                url: `/point/${credentials.pointId}`,
                body: {
                    stage: credentials.newState,
                },
                method: 'PATCH',
            }),
            invalidatesTags: ['Projects', 'Points', 'Photos'],
        }),

        // Photos
        getPhotos: builder.query<[count: number, current: IPhoto[]], GetPhotosParams>({
            query: ({offset, limit, pointId}) => ({
                url: `/point/${pointId}/photos`,
                params: {page: offset, limit},
            }),
            providesTags: ['Photos'],
        }),

        deletePhoto: builder.mutation<undefined, number>({
            query: id => ({
                url: `/photo/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Photos', 'Points'],
        }),
        ...authApi(builder),
        ...companiesApi(builder),
        ...projectApi(builder),
        ...pointsApi(builder),
        ...mediaUploadApi(builder),
    }),
});

export const {
    useGetCompaniesQuery,
    useLoginMutation,
    useRegisterMutation,
    useAddCompanyMutation,
    useGetProjectsQuery,
    useAddProjectMutation,
    useAddPointMutation,
    useGetPhotosQuery,
    useGetCompanyUsersQuery,
    useChangePointStateMutation,
    useDeleteProjectMutation,
    useDeletePointMutation,
    useDeletePhotoMutation,
    useInviteUserToCompanyMutation,
    useGetUserInfoQuery,
    useGetProjectQuery,
    useGetPointsQuery,
    useGetPointQuery,
    useAddPointPhotoMutation,
    useUpdateCompanyMutation,
} = baseApi;
