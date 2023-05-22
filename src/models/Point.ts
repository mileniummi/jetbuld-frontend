import { UserRole } from "@/models/Company";
import { IPhoto } from "@/models/Photo";

export interface IPoint {
  id: number;
  name: string;
  description: string;
  created: string;
  mediaFileLists: IPhoto[];
}

export enum EPointState {
  CREATED = "CREATED",
  IN_PROGRESS = "INPROGRESS",
  ON_CHECK = "ONCHECK",
  FINISHED = "FINISHED",
}
export class PrivilegeUtils {
  static checkCanChangeStatus(role: UserRole, state?: EPointState) {
    if (role === "OWNER") {
      return true;
    } else {
      switch (state) {
        case EPointState.CREATED:
        case EPointState.IN_PROGRESS:
          return true;
        default:
          return false;
      }
    }
  }
  static checkCanModifyEntities(role: UserRole) {
    return role === "OWNER";
  }
}

export const getPointNextStateOptions = (state?: EPointState) => {
  switch (state) {
    case EPointState.CREATED:
      return [{ state: EPointState.IN_PROGRESS, action: "start working on" }];
    case EPointState.IN_PROGRESS:
      return [{ state: EPointState.ON_CHECK, action: "submit for check" }];
    case EPointState.ON_CHECK:
      return [
        { state: EPointState.FINISHED, action: "finish project" },
        {
          state: EPointState.IN_PROGRESS,
          action: "return to the work",
        },
      ];
    default: {
      return [];
    }
  }
};
