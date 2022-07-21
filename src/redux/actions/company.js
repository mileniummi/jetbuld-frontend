import { FETCH_COMPANIES } from "../constants/company";
import { hideLoader, showLoader } from "./app";
import CompanyService from "../../services/companyService";
import { compareTime } from "../constants/app";

const companiesService = new CompanyService();

export const fetchCompanies = (user, page) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await companiesService.fetchCompanies(user, page);
    const companies = response.data[1].sort(compareTime);

    dispatch({ type: FETCH_COMPANIES, payload: { totalCount: response.data[0], companies } });
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
