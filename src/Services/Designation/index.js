import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const GetDesignationList = (redBody) => {
    try {
      const response = axiosInstance.get(API_URLS.get_designation_list, {
        params:redBody
      });
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };


export const addDesignation = (reqbody)=>{
  // console.log(reqbody)
  try {
    const response = axiosInstance.post(API_URLS.get_designation_list,reqbody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
}