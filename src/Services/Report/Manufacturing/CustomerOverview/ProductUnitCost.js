import axios from "axios"
import { baseUrl } from "../../../../URls"
import { API_URLS } from "../../../../Config/apiUrls"
import { toast } from "react-toastify"

export const productUnitCostFn =  async({
    setloding,
    setData,
}
)=>{
    setloding(true)
    try{
        let url = `${baseUrl}${API_URLS.product_unit_cost}`
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
        
           setData(response?.data?.product_unit_costs_by_month)
           
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}