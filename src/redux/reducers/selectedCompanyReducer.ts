import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompany } from "@/models/Company";
import { RootState } from "../store";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

type selectedCompanyState = {
  company: ICompany | null;
};

const slice = createSlice({
  name: "selectedCompany",
  initialState: { company: null } as selectedCompanyState,
  reducers: {
    setSelectedCompany: (state, { payload: { company } }: PayloadAction<{ company: ICompany }>) => {
      state.company = company;
    },
    removeSelectedCompany: (state) => {
      state.company = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      Object.keys(state).forEach((key) => {
        storage.removeItem(`persist:${key}`);
      });
      state.company = null;
    });
  }
});

export default slice.reducer;

export const { setSelectedCompany, removeSelectedCompany } = slice.actions;

export const selectSelectedCompany = (state: RootState) => state.selectedCompany.company;
