

import {API_URLS} from '../../../../../Config/apiUrls'
import { baseUrl } from '../../../../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'

export const  getSingleManufacturingOrderDetails = async({
    setloding,
    setData,
    id,
    setingredientsArray,
    setoperationsArray
})=>{
    console.log(id)
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.get_manufacturing_order_details}?id=${id}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setData(response?.data)
          setingredientsArray(response?.data?.ingredients)
          setoperationsArray(response?.data?.operations)
        //   console.log(response,"bomlist")
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
    setloding(false)
    }

