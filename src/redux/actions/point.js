import PointService from "../../services/pointService";
import { hideLoader, showLoader } from "./app";
import { FETCH_POINTS } from "../constants/point";
import PhotosService from "../../services/photosService";
import { compareTime } from "../constants/app";

const pointService = new PointService();
const photosService = new PhotosService();

export const fetchPoints = (user, page, projectId) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const result = await pointService.fetchPoints(user, page, projectId);
    let points = result.data[1];
    points = await Promise.all(
      points.map(async (point) => {
        const response = await photosService.fetchPhotos(user, 1, point.id);
        return { ...point, photos: response.data[1] };
      })
    );

    points = points.sort(compareTime);
    dispatch({ type: FETCH_POINTS, payload: { count: result.data[0], points } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addPoint = (user, pointCredentials) => async () => {
  try {
    await pointService.addPoint(user, pointCredentials);
  } catch (e) {
    console.log(e);
  }
};
