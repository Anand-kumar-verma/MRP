import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const createTask = (redBody) => {

    for (var pair of redBody.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
    try {
      const response = axiosInstance.post(API_URLS.create_task, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };

  export const updateTask = (redBody) => {

    for (var pair of redBody.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
    try {
      const response = axiosInstance.put(API_URLS.create_task, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };


  export const update_task_by_employeeFun = (redBody) => {
    try {
      const response = axiosInstance.post(API_URLS.task_update_by_employee, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };

  export const update_task_imagesFun = (redBody) => {

    for (var pair of redBody.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
    try {
      const response = axiosInstance.post(API_URLS.task_update_by_employee, redBody);
      return response;
    } catch ({ error }) {
      throw new Error(error.message);
    }
  };