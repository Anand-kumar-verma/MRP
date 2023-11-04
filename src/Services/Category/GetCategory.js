import axios from "axios";
import { baseUrl } from "../../URls";
import { API_URLS } from "../../Config/apiUrls";
import {toast} from 'react-toastify'

export async function getCategory({
            setloding,
            setCategory,
            setSubData,
            page,
            pageCount
}){
    setloding(true)
          try {
            const response = await axios.get(
              `${baseUrl}${API_URLS.create_get_category}?page=${page}&count=${pageCount}`,
              {
                headers: {
                  Authorization: localStorage.getItem("erp_token"),
                  "Content-Type": "application/json",
                },
              }
            );
            setCategory(response?.data?.categories)
            setSubData(response?.data)
            console.log(response)
            
          } catch (e) {
            console.log(e)
            toast.warn("Something went wrong");
          }
          setloding(false)
      }