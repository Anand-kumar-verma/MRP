

import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from "../../../URls"


export const updateCustomerByIdFn = async({
    formData,
    setloding,
    navigate,
    link,
    reset,
    id
    
})=>{
setloding(true)

// for (let pair of formData.entries()) {
//     console.log(pair[0], pair[1]);
//   }
// console.log(id)
    try{
        const response =await axios.put(
            `${baseUrl}${API_URLS.update_customer_by_id}?id=${id}`,
            formData,{
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    'Content-Type': 'application/json'
                }
            }
        )

        if(response?.data?.message){
            navigate(`${link}`)
            reset()
            toast.success("Updated Successfully") 
        }
    }catch(e){
        console.log(e)
        toast.warn(e.message)
    }

    setloding(false)
}