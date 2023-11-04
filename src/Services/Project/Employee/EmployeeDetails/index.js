import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

export const employeeDetailsFn = (redBody) => {
  try {
    const response = axiosInstance.get(API_URLS.empoyeeDetails, {
      params: redBody,
    });
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
