import {API_URLS} from '../../../Config/apiUrls'
import axiosInstance from "../../../Config/axios";

export const createBomFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`${API_URLS.create_bom_api}`, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
