
import axios from "axios";
import {toast} from 'react-toastify'
import { API_URLS } from "../../Config/apiUrls";
import { baseUrl } from "../../URls";

export async function deleteRources({
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
          `${baseUrl}${API_URLS.delete_product_by_id}?ids=${checkedBox}`,
          {
            headers: {
              Authorization: localStorage.getItem("erp_token"),
              "Content-Type": "application/json",
            },
          }
        );

        if(response?.data?.message){
          setDummy(response)
          setCheckedBox([])
          toast.success("Product Deleted Successfully")
        }
      } catch (e) {
        console.log(e)
        toast.warn("Something went wrong");
      }
      setloding(false)
    }
   }