import { FETCH_POINTS } from "../constants/point";

const initialState = { count: null, current: [] };

export const pointReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POINTS:
      return { ...state, count: action.payload.count, current: action.payload.points };
    default:
      break;
  }
  return state;
};
