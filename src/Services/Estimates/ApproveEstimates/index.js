import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const approveEstimatesFn = (redBody) => {
  try {
    const response = axiosInstance.post(API_URLS.approveEstimates, redBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
