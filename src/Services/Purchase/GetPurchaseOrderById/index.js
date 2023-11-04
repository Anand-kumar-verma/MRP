import axios from "axios";
import { API_URLS } from "../../../Config/apiUrls";
import { baseUrl } from "../../../URls";
import {toast} from 'react-toastify'

export async function getPurchaseOrderDetailsFn({
    setloding,
    setproduct,
    id
}){
    setloding(true)
          try {
            let url = `${baseUrl}${API_URLS.get_purchase_order_by_id}?id=${id}`
            
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
            // console.log(response)
            setproduct(response?.data?.data[0])
            
        //   console.log(response?.data?.data[0]?.items_details)
          } catch (e) {
            console.log(e)
            toast.warn("Something went wrong");
          }
          setloding(false)
      }
