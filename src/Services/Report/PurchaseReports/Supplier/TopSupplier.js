import axios from "axios"
import { baseUrl } from "../../../../URls"
import { API_URLS } from "../../../../Config/apiUrls"
import { toast } from "react-toastify"

export const top_supplierFn =  async({
    setloding,
    setData,
}
)=>{
    setloding(true)
    try{
        let url = `${baseUrl}${API_URLS.top_supplier}`
        const response  = await axios.get(
           url,
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    "Content-Type":"application/json"
                }
            }
            
        )
        // console.log(response)
        
           setData(response?.data?.data)
           
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}