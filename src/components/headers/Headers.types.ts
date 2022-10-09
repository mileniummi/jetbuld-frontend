import { EProjectStage } from "@/models/Project";
import { EAppEntities } from "@/models/App";

export interface IStateHeaderProps {
  id: number;
  entity: EAppEntities;
  name: string;
  state: EProjectStage;
  description: string;
}
