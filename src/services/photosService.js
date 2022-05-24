import axios from "axios";
import AppService from "./appService";
import { PHOTO_LIMIT } from "../redux/constants/photos";

export default class PhotosService {
  constructor() {
    this.apiPath = process.env.REACT_APP_API_PATH;
    this.appService = new AppService();
  }

  async fetchPhotos(user, page, pointId) {
    const offset = this.appService.getOffset(page);
    return await axios.get(`${this.apiPath}/point/${pointId}/photos?page=${offset}&limit=${PHOTO_LIMIT}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  async addPhotos(user, photoData, photo) {
    const formData = new FormData();
    for (const prop of Object.keys(photoData)) {
      formData.append(prop, photoData[prop]);
    }
    formData.set("file", photo);
    await axios.post(`${this.apiPath}/point/uploadfake`, formData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}
