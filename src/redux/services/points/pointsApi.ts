import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Pageable, PageableParams } from "@/models/App";
import { IPoint } from "@/models/Point";
import { IPhoto } from "@/models/Photo";


export interface GetPointsParams extends PageableParams {
  projectId: number;
}

export interface AddPointRequest {
  name: string;
  description: string;
  projectId: string;
}

export interface GetPointParams extends PageableParams {
  pointId: number;
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
  }),
  getPointPhotos : builder.query<Pageable<IPhoto>, GetPointParams>({
    query: ({pointId, ...rest}) => ({
      url: `/subproject/${pointId}/files/`,
      params: { ...rest },
      providesTags: (result: { pointId: any; }[]) =>
        result
          ? [...result.map(({ pointId }) => ({ type: 'PointPhoto' as const, pointId })), 'PointPhoto']
          : ['PointPhoto'],
    }),
  })
});