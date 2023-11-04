import axios from "axios"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"
import { toast } from "react-toastify"

export const salesProgressReport =  async({
    setloding,
    setData,
    setLabel
}
)=>{
    setloding(true)
    try{
        let url = `${baseUrl}${API_URLS.sales_progress}`
        const response  = await axios.get(
           url,
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    "Content-Type":"application/json"
                }
            }
            
        )
        console.log(response)
        
           setData(response?.data?.data)
           setLabel(response?.data?.label)
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}