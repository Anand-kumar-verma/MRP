import axios from "axios"
import { toast } from "react-toastify"
import { baseUrl } from "../../../URls"
import { API_URLS } from "../../../Config/apiUrls"


export const changeStatusOfOrder = async({
    id,
    status,
    setloding,
    setdummy
    })=>{
setloding(true)

    try{
        const formData = new FormData()
        formData.append('status',status)
        formData.append("id",id)
        const response =await axios.post(
            `${baseUrl}${API_URLS.mo_order_status_changed}`,
            formData,
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    'Content-Type': 'application/json'
                }
            }
        )

        setdummy(response)
        if(response?.data?.msg){
            // navigate(`${link}`)
            // reset()
            toast.success("Status Updated Successfully")
            // setCurrentProductList((prevDataArray) => [...prevDataArray, formData?.name]);
        }
        console.log(response)
    }catch(e){
        console.log(e)
        toast.warn(e.message)
    }

    setloding(false)
}