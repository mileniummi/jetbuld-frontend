import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React from "react";

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
  POINT = "Point",
  PHOTO = "Photo",
}
