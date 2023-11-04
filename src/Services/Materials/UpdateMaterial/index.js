import axios from "axios"
import { toast } from "react-toastify"
import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from "../../../URls"


export const updateMaterialFn = async({
    formData,
    setloding,
    navigate,
    link,
    id
})=>{
setloding(true)

for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
    try{
        const response =await axios.put(
            `${baseUrl}${API_URLS.update_material_by_id}?id=${id}`,
            formData,{
                headers:{
                    Authorization:localStorage.getItem('erp_token'),
                    'Content-Type': 'application/json'
                }
            }
        )

        if(response?.data?.message){
            navigate(`${link}`)
            toast.success("material Updated Successfully ")
        }
    }catch(e){
        console.log(e)
        toast.warn(e.message)
    }

    setloding(false)
}