import axios from "axios";
import { baseUrl } from "../../URls";
import {toast} from 'react-toastify'
import { API_URLS } from "../../Config/apiUrls";

export async function getMaterialsInventoryList ({
    setloding,
    page,
    pageCount,
    setproduct,
    setSubData,
    searchValue
}){
    setloding(true)
          try {
            let url =  `${baseUrl}${API_URLS.get_materials_inventory}?page=${page}&count=${pageCount}`
            
            if(searchValue !== '')
                url = url + `&search=${searchValue}` 
            
            const response = await axios.get(
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
