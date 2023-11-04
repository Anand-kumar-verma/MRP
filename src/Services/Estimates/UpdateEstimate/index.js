import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const updateEstimateFn = (reqBody) => {
  try {
    const response = axiosInstance.put(API_URLS.estimatesList, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
