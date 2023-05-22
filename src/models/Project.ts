import { IPoint } from "@/models/Point";

export interface IProject {
  id: number;
  name: string;
  created: string;
  description: string;
  companyId: number;
  address: string;
  city: string;
  country: string;
  pointList: IPoint[];
}

export enum EProjectStage {
  CREATED = "CREATED",
  IN_PROGRESS = "INPROGRESS",
  ON_CHECK = "ONCHECK",
  FINISHED = "FINISHED",
}
