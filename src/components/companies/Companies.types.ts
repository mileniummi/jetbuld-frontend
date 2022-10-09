import { ICompany } from "@/models/Company";
import { ChangeEvent } from "react";

export interface ICompaniesListProps {
  page: number;
  isLoading: boolean;
  count: number;
  companies: ICompany[];
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}
