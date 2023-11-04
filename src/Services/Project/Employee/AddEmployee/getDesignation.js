import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

export const getDesignation = ({role_id}) => {
  console.log(role_id)
    try {
      const response = axiosInstance.get(API_URLS.designation,{
        params:Number(role_id)
      });
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };