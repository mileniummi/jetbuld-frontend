import { FETCH_COMPANIES } from "../constants/company";

const initialState = { count: null, current: [] };

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES: {
      return { ...state, count: action.payload.totalCount, current: action.payload.companies };
    }
  }
  return state;
};
