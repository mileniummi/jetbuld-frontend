import { FETCH_PROJECTS } from "../constants/project";

const initialState = { count: null, current: [] };

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      return { ...state, count: action.payload.totalCount, current: action.payload.projects };
    }
  }
  return state;
};
