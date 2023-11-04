import {toast} from 'react-toastify'
import { API_URLS } from '../../../Config/apiUrls';
import { baseUrl } from '../../../URls';
import axios from 'axios';

export async function getPurchaseOrderList({
          setloding,
          setproduct,
          setSubData,
          page,
          pageCount
}){
    setloding(true)
          try {
            const response = await axios.get(
              `${baseUrl}${API_URLS.get_or_create_purchase_order}?page=${page}&count=${pageCount}`,
            //   `${baseUrl}${API_URLS.get_or_create_purchase_order}`,
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