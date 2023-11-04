import axios from "axios";
import { baseUrl } from "../../../URls";
import { API_URLS } from "../../../Config/apiUrls";
import {toast} from 'react-toastify'

export async function searchDataApi({
    setloding,
    page,
    pageCount,
    searchValue,
    setproduct,
    setSubData
}){
    setloding(true)
    try {
      const response = await axios.get(
        `${baseUrl}${API_URLS.get_or_create_purchase_order}?page=${page}&count=${pageCount}&search=${searchValue}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setproduct(response?.data?.data)
      setSubData(response?.data)
      
    console.log(response)
    } catch (e) {
      console.log(e)
      toast.warn("Something went wrong");
    }
    setloding(false)
}
