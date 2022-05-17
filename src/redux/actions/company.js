import { FETCH_COMPANIES } from "../constants/company";
import { hideLoader, showLoader } from "./app";
import CompanyService from "../../services/companyService";

const companiesService = new CompanyService();

export const fetchCompanies = (user, page) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await companiesService.fetchCompanies(user, page);
    dispatch({ type: FETCH_COMPANIES, payload: { totalCount: response.data[0], companies: response.data[1] } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addCompany = (user, companyCredentials) => async () => {
  try {
    await companiesService.addCompany(user, companyCredentials);
  } catch (e) {
    console.log(e);
  }
};
