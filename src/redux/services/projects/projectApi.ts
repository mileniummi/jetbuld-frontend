import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {IProject} from '@/models/Project';
import {Pageable, PageableParams} from '@/models/App';

export interface GetProjectsParams extends PageableParams {
  companyId: number;
}

export interface CreateProjectRequest {
  companyId: number;
  name: string;
  description: string;
  city: string;
  address: string;
  country: string;
}

export const projectApi = (builder: EndpointBuilder<any, any, any>) => ({
    addProject: builder.mutation<unknown, CreateProjectRequest>({
        query: credentials => ({
            url: '/project/',
            method: 'POST',
            body: credentials,
        }),
        invalidatesTags: ['Projects'],
    }),
    getProject: builder.query<IProject, number>({
        query: id => ({
            url: `/project/${id}/`,
        }),
    }),
    deleteProject: builder.mutation<undefined, number>({
        query: id => ({
            url: `/project/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Projects'],
    }),
    getProjects: builder.query<Pageable<IProject>, GetProjectsParams>({
        query: ({companyId, ...rest}) => ({
            url: `/company/${companyId}/projects/`,
            params: {...rest},
        }),
        providesTags: ['Projects'],
    }),
});
