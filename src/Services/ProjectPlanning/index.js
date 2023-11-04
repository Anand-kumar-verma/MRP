import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const addProjectPlanning = (redBody) => {
  console.log(redBody, "this is final Data");
  try {
    const response = axiosInstance.post(API_URLS.project_planning, redBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};

export const ProjectPlanningListFn = (redBody) => {
  try {
    const response = axiosInstance.get(API_URLS.project_planning, redBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
export const ProjectPlanningDetailsFn = (redBody) => {
  try {
    const response = axiosInstance.get(API_URLS.projectPlanningDetails, {
      params: redBody,
    });
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
export const UpdateProjectPlanningDetailsFn = (redBody) => {
  try {
    const response = axiosInstance.put(
      API_URLS.UpdateProjectPlanningDetails,
      redBody
    );
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};

export const projectPlanningApprovalFn = (redBody) => {
  try {
    const response = axiosInstance.post(
      API_URLS.projectPlanningApproval,
      redBody
    );
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
