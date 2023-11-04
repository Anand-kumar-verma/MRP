import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from '../../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'


export const  getBomProductList = async({
    setloding,
    setBomProductList,
    
})=>{
    
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.get_bom_product}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setBomProductList(response?.data?.data)
        //   console.log(response,"bomlist")
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
    setloding(false)
    }

