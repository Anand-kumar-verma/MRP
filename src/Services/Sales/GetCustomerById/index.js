import axios from "axios"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"
import { toast } from "react-toastify"

export const getCustomerById =  async({
    setloding,
    id,
    setData
}
)=>{
    // console.log(id)
    setloding(true)
    try{
        const url = `${baseUrl}${API_URLS.delete_customer_by_id}?id=${id}`
        const response  = await axios.get(
            `${url}`,
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    "Content-Type":"application/json"
                }
            }
            
        )
        // console.log(response)
        if(response?.data?.message){
            setData(response?.data?.customers)
        }
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}