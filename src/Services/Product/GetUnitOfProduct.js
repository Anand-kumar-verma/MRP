import {API_URLS} from '../../Config/apiUrls'
import axiosInstance from '../../Config/axios';
import { baseUrl } from '../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'

export const  getUnitOfProductFn = async({
    setUnitOfProduct,
    setSubData
    
})=>{
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.get_unit_of_product}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setUnitOfProduct(response?.data?.units)
          setSubData(response?.data)
          
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
    }

