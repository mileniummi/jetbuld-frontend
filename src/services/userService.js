import axios from "axios";

export class UserService {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
  }

  async login(login, password) {
    return await axios.post(`${this.apiPath}/auth/login`, { login, password });
  }

  async register(userCredentials) {
    return await axios.post(`${this.apiPath}/auth/register`, userCredentials);
  }
}
