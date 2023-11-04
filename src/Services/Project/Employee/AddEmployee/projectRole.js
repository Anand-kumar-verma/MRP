import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

export const projectRole = () => {
    try {
      const response = axiosInstance.get(API_URLS.project_role);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };