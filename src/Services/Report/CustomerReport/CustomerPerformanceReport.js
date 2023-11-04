import axios from "axios"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"
import { toast } from "react-toastify"

export const customer_performance_reportFn =  async({
    setloding,
    setData,
}
)=>{
    setloding(true)
    try{
        let url = `${baseUrl}${API_URLS.customer_performance_report}`
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
        
           setData(response?.data?.top_customers)
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}