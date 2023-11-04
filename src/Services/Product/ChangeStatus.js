import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../Config/apiUrls'
import { baseUrl } from "../../URls"


export const changeStatus = async({
    order_id,
    status,
    setloding,
    setdummy
    })=>{
setloding(true)

    try{
        const response =await axios.post(
            `${baseUrl}${API_URLS.change_status_purchase_order}?id=${order_id}&order_status=${status}`,
            {},
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
    }catch(e){
        console.log(e)
        toast.warn(e.message)
    }

    setloding(false)
}