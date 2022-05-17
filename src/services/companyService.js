import axios from "axios";
import AppService from "./appService";
import { ITEM_LIMIT } from "../redux/constants/app";

export default class CompanyService {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
    this.appService = new AppService();
  }

  async fetchCompanies(user, page) {
    const offset = this.appService.getOffset(page);
    return await axios.get(`${this.apiPath}/user/companieslist?page=${offset}&limit=${ITEM_LIMIT}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  async addCompany(user, companyCredentials) {
    return await axios.post("https://jetbuild-app.herokuapp.com/companies", companyCredentials, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}
