import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const empLoginFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`${API_URLS.loginEmployee}`, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
