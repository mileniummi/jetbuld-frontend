import axios from "axios";
import { ITEM_LIMIT } from "../constants/app";
import { hideLoader, showLoader } from "./app";
import { FETCH_PROJECTS } from "../constants/project";

export const fetchProjects = (companyId, user, page) => async (dispatch) => {
  const offset = page === 1 ? 0 : page * ITEM_LIMIT - ITEM_LIMIT;
  try {
    dispatch(showLoader());
    const response = await axios.get(
      `https://jetbuild-app.herokuapp.com/companies/${companyId}/projects?page=${offset}&limit=${ITEM_LIMIT}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    dispatch({ type: FETCH_PROJECTS, payload: { totalCount: response.data[0], projects: response.data[1] } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addProject = (companyId, user, projectCredentials) => async () => {
  try {
    await axios.post(`https://jetbuild-app.herokuapp.com/project/${companyId}`, projectCredentials, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  } catch (e) {
    console.log(e);
  }
};
