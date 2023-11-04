import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const ProjectListFn = (redBody) => {
    try {
      const response = axiosInstance.get(API_URLS.project_list, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };

  export const ProjectDetailsFn = (redBody) => {
    try {
      const response = axiosInstance.get(API_URLS.project_list, {
        params: redBody,
      });
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };