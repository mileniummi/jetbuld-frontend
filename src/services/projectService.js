import axios from "axios";
import AppService from "./appService";
import { ITEM_LIMIT } from "../redux/constants/app";

export default class ProjectService {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
    this.appService = new AppService();
  }

  async fetchProjects(user, page, companyId) {
    const offset = this.appService.getOffset(page);
    return await axios.get(`${this.apiPath}/companies/${companyId}/projects?page=${offset}&limit=${ITEM_LIMIT}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  async addProject(user, projectCredentials, companyId) {
    await axios.post(`${this.apiPath}/project/${companyId}`, projectCredentials, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}
