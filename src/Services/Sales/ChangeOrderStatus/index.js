import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from "../../../URls"


export const changeSalesOrderStatus = async({
    order_id,
    status,
    setloding,
    setdummy
    })=>{
setloding(true)

    try{
        const response =await axios.post(
            `${baseUrl}${API_URLS.change_status_sales_order}?id=${order_id}&order_status=${status}`,
            {},
            {
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    'Content-Type': 'application/json'
                }
            }
        )

        setdummy(response)
        toast.success("Status Updated Successfully")
        if(response?.data?.msg){
            // navigate(`${link}`)
            // reset()
            toast.success("Status Updated Successfully")
            // setCurrentProductList((prevDataArray) => [...prevDataArray, formData?.name]);
        }
        console.log(response)
    }catch(e){
        if(e?.response?.data?.msg)
            toast.warn(e?.response?.data?.msg)
        else
            toast.warn(e.message)
        console.log(e)
    }

    setloding(false)
}