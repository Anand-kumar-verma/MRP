import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const salesPersonListFn = () => {
  const store_id = localStorage.getItem("crm_store_id");
  const user_id = localStorage.getItem("crm_user_id");
  try {
    if (!store_id || !user_id) {
      throw Error("No store_id and user_id");
    }
    const response = axiosInstance.get(`${API_URLS.salesPersonList}`, {
      params: { store_id },
    });
    return response;
  } catch ({ error }) {
    throw new Error(error?.message);
  }
};
