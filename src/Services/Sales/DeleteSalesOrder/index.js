import axios from "axios";
import { API_URLS } from "../../../Config/apiUrls";
import { baseUrl } from "../../../URls";
import {toast} from 'react-toastify'


export async function deleteFunctionCalled({
    setloding,
    checkedBox,
    setDummy,
    setCheckedBox

}){

    console.log(checkedBox)

    if(window.confirm("Are You Confirm ?") === true){
      setloding(true)
      // console.log(`${baseUrl}${API_URLS.delete_vendor_by_id}?ids=${checkedBox}`)
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_sales_order}?ids=${checkedBox}`,
          {
            headers: {
              Authorization: localStorage.getItem("erp_token"),
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response)
        if(response?.data?.msg){
          setDummy(response)
          setCheckedBox([])
          toast.success("Orders Deleted Successfully")
        }
      } catch (e) {
        console.log(e)
        toast.warn("Something went wrong");
      }
      setloding(false)
    }
   }