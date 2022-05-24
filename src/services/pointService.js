import axios from "axios";
import AppService from "./appService";
import { ITEM_LIMIT } from "../redux/constants/app";

export default class PointService {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
    this.appService = new AppService();
  }

  async fetchPoints(user, page, projectId) {
    const offset = this.appService.getOffset(page);
    return await axios.get(`${this.apiPath}/project/${projectId}/points?page=${offset}&limit=${ITEM_LIMIT}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  async addPoint(user, pointCredentials) {
    await axios.post(`${this.apiPath}/point/create`, pointCredentials, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}
