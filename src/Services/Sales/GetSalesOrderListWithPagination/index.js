import axios from "axios";
import { API_URLS } from "../../../Config/apiUrls";
import { baseUrl } from "../../../URls";
import {toast} from 'react-toastify'

export async function getSalesOrderList({
    setloding,
    setproduct,
    setSubData,
    page,
    pageCount,
    searchValue
}){
    setloding(true)
          try {
            let url = `${baseUrl}${API_URLS.create_sales_order_details}?page=${page}&count=${pageCount}`
            if(searchValue !== '')
              url = url + `&search=${searchValue}`
            const response = await axios.get(
              // `${baseUrl}${API_URLS.get_or_create_purchase_order}?page=${page}&count=${pageCount}`,
              url,
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
