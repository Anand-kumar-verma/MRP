import {API_URLS} from '../../../Config/apiUrls'
import axiosInstance from "../../../Config/axios";

export const salesOrderDetailsFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`${API_URLS.create_sales_order_details}`, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
