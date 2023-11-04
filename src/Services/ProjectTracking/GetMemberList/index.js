import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";

export const GetMemberList = (redBody) => {
  console.log(redBody,"Projectid")
    try {
      const response = axiosInstance.get(API_URLS.add_members_for_tracking, {
        params:redBody
      });
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };