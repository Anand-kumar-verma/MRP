import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from "../../../URls"


export const createCustomerFn = async({
  formData,
  setloding,
  navigate,
  link,
  clearForm,
})=>{
setloding(true)

console.log(formData)

    try{
        const response =await axios.post(
            `${baseUrl}${API_URLS.create_get_customer_api}`,
            formData,{
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    'Content-Type': 'application/json'
                }
            }
        )

        if(response?.data?.message){
            navigate(`${link}`)
            clearForm()
            toast.success("Customer Created Successfully")
        }
    }catch(e){
        if(e?.response?.data?.message){
            toast.warn(e?.response?.data?.message)
        }else{
            toast.warn(e.message)
        }
        console.log(e) 
    }

    setloding(false)
}
