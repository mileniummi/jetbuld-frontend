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
      console.log(query);
      const formData = new FormData();
      // for (const prop of Object.keys(body)) {
      //   // @ts-ignore
      //   formData.append(prop, body[prop]);
      // }
      formData.set("file", photo);
      return {
        url: "/media-file/",
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        params: { ...query },
        body: formData,
      };
    },
    invalidatesTags: ["Photos", "Points"]
  })
});