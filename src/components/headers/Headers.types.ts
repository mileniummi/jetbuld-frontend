import { EAppEntities } from "@/models/App";
import { EPointState } from "@/models/Point";

export interface IStateHeaderProps {
  id: number;
  entity: EAppEntities;
  name: string;
  state?: EPointState;
  description: string;
}
