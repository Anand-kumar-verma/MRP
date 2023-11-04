import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const TaskListFunction = (redBody) => {
    try {
      const response = axiosInstance.get(API_URLS.create_task, {
        params:redBody
      });
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };