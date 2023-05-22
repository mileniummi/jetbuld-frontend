import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IUser } from "@/models/User";

export interface CreateCompanyRequest {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  userId: number;
}

export interface UpdateCompanyRequest extends Omit<CreateCompanyRequest, "userId"> {
  id: number;
}

export const companiesApi = (builder: EndpointBuilder<any, any, any>) => ({
  addCompany: builder.mutation<unknown, CreateCompanyRequest>({
    query: credentials => ({
      url: "/company/",
      method: "POST",
      body: credentials
    }),
    invalidatesTags: ["userInfo"]
  }),
  getCompanyUsers: builder.query<IUser[], number>({
    query: (companyId) => ({
      url: `/company/${companyId}/users/`,
      method: "GET",
      providesTags: ['CompanyUsers'],
    }),
  }),
  updateCompany: builder.mutation<unknown, UpdateCompanyRequest>({
    query: credentials => ({
      url: `/company/${credentials.id}/`,
      method: "PATCH",
      body: credentials
    }),
    invalidatesTags: ["userInfo"]
  })
});