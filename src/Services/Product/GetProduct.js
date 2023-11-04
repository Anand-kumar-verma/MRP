import {API_URLS} from '../../Config/apiUrls'
import axiosInstance from '../../Config/axios';
import { baseUrl } from '../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'


export const  getProductFn = async({
    setProduct,
    
})=>{
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.create_get_product_api}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setProduct(response?.data?.products)
          console.log(response)
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
    }

