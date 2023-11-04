import {API_URLS} from '../../Config/apiUrls'
import axiosInstance from "../../Config/axios";

export const createUnitsFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`${API_URLS.get_unit_of_product}`, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
