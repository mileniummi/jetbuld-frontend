import axios from "axios";

export class Api {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
  }

  async login(login, password) {
    return await axios.post(`${this.apiPath}/auth/login`, { login, password });
  }
}
