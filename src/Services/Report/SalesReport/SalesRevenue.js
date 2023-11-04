import axios from "axios"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"
import { toast } from "react-toastify"

export const salesRevenueReport =  async({
    setloding,
    setData,
    filterBy,
    startDate,
    endDate,
}
)=>{
    setloding(true)
    try{
        let url = `${baseUrl}${API_URLS.sales_revenue}`
        
        if(filterBy !== 'custom'){
            let value = 'last_30_days'
        
        if(filterBy === 'Last 7 days' ){
                value = 'last_7_days'
        }else if(filterBy === 'This Month'){
            value = 'this_month'
        }else if(filterBy === 'Last Month'){
            value = 'previous_month'
        }
        url = url + `?date_range=${value}`
        }

        if(startDate !== null && endDate !== null){
            url = url + `?date_range=${filterBy}&start_date=${startDate}&end_date=${endDate}`
        }

        console.log(url,"filter URL of API")
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
        
           setData(response?.data)
       
    }catch(e){
        console.log(e)
        toast.warn("Somethin went wrong")
    }
    setloding(false)
}