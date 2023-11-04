import axios from "axios";
import { API_URLS } from "../../Config/apiUrls";
import { baseUrl } from "../../URls";
import {toast} from 'react-toastify'
export async function deleteCategories({
    setloding,
    checkedBox,
    setDummy,
    setCheckedBox
}){

    if(window.confirm("Are You Confirm ?") === true){
      setloding(true)
    //   console.log(`${baseUrl}${API_URLS.delete_categories}?ids=${checkedBox}`)
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_categories}?ids=${checkedBox}`,
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
          toast.success("Category Deleted Successfully")
        }
      } catch (e) {
        console.log(e)
        toast.warn("Something went wrong");
      }
      setloding(false)
    }
   }