import axios from "axios";
import { baseUrl } from "../../URls";
import {toast} from 'react-toastify'
import { API_URLS } from "../../Config/apiUrls";

export async function getSingleProductOrderDetailsFn({
    setloding, 
    id,
    setData,
    setmaterials,
    setoperations,
    setvariants
}){
    setloding(true)
          try {
            
            let url =  `${baseUrl}${API_URLS.get_product_details_by_id}?id=${id}`

            const response = await axios.get(
                url,
              {
                headers: {
                  Authorization: localStorage.getItem("erp_token"),
                  "Content-Type": "application/json",
                },
              }
            );
            setData(response?.data?.product)
            setmaterials(response?.data?.product?.materials)
            setoperations(response?.data?.product?.operations)
            setvariants(response?.data?.product?.variants)
            // setSubData(response?.data)
            
        //   console.log(response)
          } catch (e) {
            console.log(e)
            toast.warn("Something went wrong");
          }
          setloding(false)
      }
