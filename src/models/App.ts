interface IDateTimeFormatOptions {
  dateStyle: "full" | "medium" | "long" | "short" | undefined;
  timeStyle: "full" | "medium" | "long" | "short" | undefined;
}
interface IDateTimeFormatOptionsShort {
  weekday: "long" | "short" | "narrow" | undefined;
  year: "numeric" | undefined;
  month: "long" | undefined;
  day: "numeric" | undefined;
}

export const LONG_DATE_FORMAT: IDateTimeFormatOptions = { dateStyle: "full", timeStyle: "medium" };
export const DATE_FORMAT: IDateTimeFormatOptionsShort = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export enum EAppEntities {
  COMPANY = "Company",
  PROJECT = "Project",
  SUBPROJECT = "Subproject",
  PHOTO = "Photo",
}

export interface Pageable<Entity> {
  size: number;
  number: number;
  empty: boolean;
  content: Entity[];
  totalElements: number;
  totalPages: number;
}

export interface PageableParams {
  size: number;
  page: number;
}
