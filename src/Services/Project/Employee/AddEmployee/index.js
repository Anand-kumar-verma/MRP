import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

export const addEmployee = (redBody) => {
    console.log(redBody)
    try {
      const response = axiosInstance.post(API_URLS.employee, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };