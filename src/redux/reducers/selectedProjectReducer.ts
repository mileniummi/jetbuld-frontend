import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IProject } from "@/types/Project";

type selectedProjectState = {
  project: IProject | null;
};

const slice = createSlice({
  name: "selectedCompany",
  initialState: { project: null } as selectedProjectState,
  reducers: {
    setSelectedProject: (state, { payload: { project } }: PayloadAction<{ project: IProject }>) => {
      state.project = project;
    },
    removeSelectedCompany: (state) => {
      state.project = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      Object.keys(state).forEach((key) => {
        storage.removeItem(`persist:${key}`);
      });
      state.project = null;
    });
  },
});

export default slice.reducer;

export const { setSelectedProject, removeSelectedCompany } = slice.actions;

export const selectSelectedProject = (state: RootState) => state.selectedProject.project;
