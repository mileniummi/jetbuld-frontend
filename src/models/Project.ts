export interface IProject {
  id: number;
  name: string;
  timeCreated: string;
  description: string;
  companyId: number;
  stage: EProjectStage;
}

export enum EProjectStage {
  CREATED = "CREATED",
  IN_PROGRESS = "INPROGRESS",
  ON_CHECK = "ONCHECK",
  FINISHED = "FINISHED",
}

export const getNextStateOptions = (state: EProjectStage) => {
  switch (state) {
    case EProjectStage.CREATED:
      return [{ state: EProjectStage.IN_PROGRESS, action: "start working on" }];
    case EProjectStage.IN_PROGRESS:
      return [{ state: EProjectStage.ON_CHECK, action: "submit for check" }];
    case EProjectStage.ON_CHECK:
      return [
        { state: EProjectStage.FINISHED, action: "finish project" },
        {
          state: EProjectStage.IN_PROGRESS,
          action: "return to the work",
        },
      ];
    default: {
      return [];
    }
  }
};
