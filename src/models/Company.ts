import { IUser } from "@/models/User";

export interface ICompany {
  id: number;
  name: string;
  timeCreated: string;
  address: string;
  city: string;
  country: string;
  description: string;
  users?: ICompanyUser[];
}

export interface ICompanyUser {
  userId: number;
  companyId: number;
  role: UserRole;
  user: IUser;
}

export type UserRole = "OWNER" | "EMPLOYEE";
