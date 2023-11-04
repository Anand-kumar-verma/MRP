import axios from "axios";
import { baseUrl } from "../../../URls";
import {toast} from 'react-toastify'
import { API_URLS } from "../../../Config/apiUrls";

export async function getMaterialDetaisFn({
    setloding, 
    material_id,
    setmaterialData,
    setvarients
}){
    setloding(true)
          try {
            
            let url =  `${baseUrl}${API_URLS.get_material_details_by_id}?id=${material_id}`

            const response = await axios.get(
                url,
              {
                headers: {
                  Authorization: localStorage.getItem("erp_token"),
                  "Content-Type": "application/json",
                },
              }
            );
            setmaterialData(response?.data) 
            setvarients(response?.data?.variants)
            // setSubData(response?.data)
            
          console.log(response)
          } catch (e) {
            console.log(e)
            toast.warn("Something went wrong");
          }
          setloding(false)
      }
