import { FETCH_PHOTOS } from "../constants/photos";

const initialState = { count: null, current: [] };

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return { ...state, count: action.payload.count, current: action.payload.current };
    default:
      break;
  }
  return state;
};
