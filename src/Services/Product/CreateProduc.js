import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../Config/apiUrls'
import { baseUrl } from "../../URls"


export const createProductFn = async({formData,setloding,navigate,link,reset,setCurrentProductList})=>{
setloding(true)

for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
    try{
        const response =await axios.post(
            `${baseUrl}${API_URLS.create_get_product_api}`,
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
            toast.success("Product Created Successfully")
            setCurrentProductList((prevDataArray) => [...prevDataArray, formData?.name]);
        }
    }catch(e){
        console.log(e)
        toast.warn(e.message)
    }

    setloding(false)
}