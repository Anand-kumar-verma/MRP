import axios from "axios"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"
import { toast } from "react-toastify"

export const getVendorById =  async({
    setloding,
    id,
    setData
}
)=>{
    setloding(true)
    try{
        const url = `${baseUrl}${API_URLS.delete_vendor_by_id}?id=${id}`
        const response  = await axios.get(
            `${url}`,
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    "Content-Type":"application/json"
                }
            }
            
        )
        console.log(response)
        if(response?.data?.message){
            setData(response?.data?.vendor)
        }
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}