import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const signupFn = (reqBody) => {
  try {
    console.log(reqBody)
    const response = axiosInstance.post(`${API_URLS.signup}`, reqBody);
    console.log(response)
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
