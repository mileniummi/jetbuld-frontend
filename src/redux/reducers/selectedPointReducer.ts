import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IPoint } from "../../types/Point";

type selectedPointState = {
  point: IPoint | null;
};

const slice = createSlice({
  name: "selectedPoint",
  initialState: { point: null } as selectedPointState,
  reducers: {
    setSelectedPoint: (state, { payload: { point } }: PayloadAction<{ point: IPoint }>) => {
      state.point = point;
    },
    removeSelectedPoint: (state) => {
      state.point = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("persist:root");
    });
  },
});

export default slice.reducer;

export const { setSelectedPoint, removeSelectedPoint } = slice.actions;

export const selectSelectedPoint = (state: RootState) => state.selectedPoint.point;
