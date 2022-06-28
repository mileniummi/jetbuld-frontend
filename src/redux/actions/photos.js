import PhotosService from "../../services/photosService";
import { hideLoader, setLoginError, showLoader } from "./app";
import { FETCH_PHOTOS } from "../constants/photos";

const photosService = new PhotosService();

export const fetchPhotos = (user, page, pointId) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await photosService.fetchPhotos(user, page, pointId);
    console.log(response.data);
    dispatch({ type: FETCH_PHOTOS, payload: { count: response.data[0], current: response.data[1] } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addPhoto = (user, photoData, photo) => async (dispatch) => {
  try {
    await photosService.addPhotos(user, photoData, photo);
  } catch (e) {
    dispatch(setLoginError(e.response.data.message));
  }
};
