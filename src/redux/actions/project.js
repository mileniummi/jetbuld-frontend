import { hideLoader, showLoader } from "./app";
import { FETCH_PROJECTS } from "../constants/project";
import ProjectService from "../../services/projectService";
import { compareTime } from "../constants/app";

const projectService = new ProjectService();

export const fetchProjects = (companyId, user, page) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await projectService.fetchProjects(user, page, companyId);
    const projects = response.data[1].sort(compareTime);
    dispatch({ type: FETCH_PROJECTS, payload: { totalCount: response.data[0], projects } });
    dispatch(hideLoader());
  } catch (e) {
    console.log(e);
  }
};

export const addProject = (companyId, user, projectCredentials) => async () => {
  try {
    await projectService.addProject(user, projectCredentials, companyId);
  } catch (e) {
    console.log(e);
  }
};
