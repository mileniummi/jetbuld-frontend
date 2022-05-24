import PointService from "../../services/pointService";
import { hideLoader, showLoader } from "./app";
import { FETCH_POINTS } from "../constants/point";

const pointService = new PointService();

export const fetchPoints = (user, page, projectId) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const result = await pointService.fetchPoints(user, page, projectId);
    dispatch({ type: FETCH_POINTS, payload: { count: result.data[0], points: result.data[1] } });
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
