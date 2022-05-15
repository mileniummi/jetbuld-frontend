import axios from "axios";
import { ITEM_LIMIT } from "../constants/app";
import { FETCH_COMPANIES } from "../constants/company";
import { hideLoader, showLoader } from "./app";

export const fetchCompanies = (user, page) => async (dispatch) => {
  const offset = page === 1 ? 0 : page * ITEM_LIMIT - ITEM_LIMIT;
  try {
    dispatch(showLoader());
    const response = await axios.get(
      `https://jetbuild-app.herokuapp.com/user/companieslist?page=${offset}&limit=${ITEM_LIMIT}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    dispatch({ type: FETCH_COMPANIES, payload: { totalCount: response.data[0], companies: response.data[1] } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addCompany = (user, companyCredentials) => async () => {
  try {
    await axios.post("https://jetbuild-app.herokuapp.com/companies", companyCredentials, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  } catch (e) {
    console.log(e);
  }
};
