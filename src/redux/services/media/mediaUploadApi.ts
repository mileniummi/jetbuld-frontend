import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Pageable } from "@/models/App";
import { IPoint } from "@/models/Point";

export interface AddPointPhotoRequest {
  photo: Blob;
  query: {
    name: string;
    description: string;
    pointId: number;
  };
}

export const mediaUploadApi = (builder: EndpointBuilder<any, any, any>) => ({
  addPointPhoto: builder.mutation<IPoint, AddPointPhotoRequest>({
    query: ({ query, photo }) => {
      const formData = new FormData();
      formData.set("file", photo);
      return {
        url: "/media-file/",
        method: "POST",
        params: { ...query },
        body: formData,
      };
    },
    invalidatesTags:(result, error, arg) => ["Points", { type: 'PointPhoto', id: arg.query.pointId }],
  })
});