export interface IProject {
  id: number;
  name: string;
  timeCreated: string;
  description: string;
  companyId: number;
}

export enum EProjectStage {
  CREATED = "CREATED",
  IN_PROGRESS = "INPROGRESS",
  ON_CHECK = "ONCHECK",
  FINISHED = "FINISHED",
}
