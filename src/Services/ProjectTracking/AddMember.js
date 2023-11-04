import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const addMembersFun = (redBody) => {
    console.log(redBody, "this is final Data");
    try {
      const response = axiosInstance.post(API_URLS.add_members_for_tracking, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };