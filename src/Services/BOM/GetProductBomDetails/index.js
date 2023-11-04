

import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from '../../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'

export const  getBomProductDetailsList = async({
    setloding,
    setBomProductDetailsList,
})=>{
    
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.get_product_bom_details}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setBomProductDetailsList(response?.data?.data)
        //   console.log(response,"bomlist")
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
    setloding(false)
    }

