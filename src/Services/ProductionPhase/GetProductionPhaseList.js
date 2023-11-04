import axios from "axios";
import { baseUrl } from "../../URls";
import {toast} from 'react-toastify'
import { API_URLS } from "../../Config/apiUrls";

export async function getProducntionPhaseList ({
    setloding,
    page,
    pageCount,
    setproduntionPhaseList,
    setSubData,
    searchValue
}){
    setloding(true)
          try {
            let url =  `${baseUrl}${API_URLS.ProductionPhase}?page=${page}&count=${pageCount}`
            
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
            setproduntionPhaseList(response?.data?.production_phases)
            setSubData(response?.data)
            
        //   console.log(response)
          } catch (e) {
            console.log(e)
            toast.warn("Something went wrong");
          }
          setloding(false)
      }
