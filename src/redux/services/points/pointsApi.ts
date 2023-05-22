import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Pageable, PageableParams } from "@/models/App";
import { IPoint } from "@/models/Point";
import { CreateProjectRequest } from "@/redux/services/projects/projectApi";


export interface GetPointsParams extends PageableParams {
  projectId: number;
}

export interface AddPointRequest {
  name: string;
  description: string;
  projectId: string;
}

export const pointsApi = (builder: EndpointBuilder<any, any, any>) => ({
  getPoints: builder.query<Pageable<IPoint>, GetPointsParams>({
    query: ({ projectId, ...rest }) => ({
      url: `/project/${projectId}/points/`,
      params: { ...rest }
    }),
    providesTags: ["Points"]
  }),
  addPoint: builder.mutation<IPoint, AddPointRequest>({
    query: point => ({
      url: `/subproject/`,
      method: 'POST',
      body: point
    }),
    invalidatesTags: ["Points"]
  }),
  getPoint: builder.query<IPoint, number>({
    query: id => ({
      url: `/subproject/${id}/`,
    }),
  })
});