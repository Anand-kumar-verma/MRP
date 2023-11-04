import axios from "axios";
import { API_URLS } from "../../Config/apiUrls";
import axiosInstance from "../../Config/axios";

export const countryStateCityFn = (reqBody) => {
  //b1.bhaaraterp.com
  try {
    const response = axios.get(
      "https://b1.bhaaraterp.com/country-state-city-list-api-without-of-bhaaraterp/",
      {
        params: reqBody,
      }
    );
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
