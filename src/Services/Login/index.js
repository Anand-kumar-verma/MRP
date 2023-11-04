import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const loginFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`${API_URLS.login}`, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
