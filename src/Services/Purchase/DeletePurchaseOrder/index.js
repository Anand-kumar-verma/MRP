import {toast} from 'react-toastify'
import { API_URLS } from '../../../Config/apiUrls';
import { baseUrl } from '../../../URls';
import axios from 'axios';

export async function deleteFunctionCalled(
    {
   checkedBox,
   setloding,
   setDummy,
   setCheckedBox
    }
){

    console.log(checkedBox)

    if(window.confirm("Are You Confirm ?") === true){
      setloding(true)
      // console.log(`${baseUrl}${API_URLS.delete_vendor_by_id}?ids=${checkedBox}`)
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_purchase_order}?ids=${checkedBox}`,
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
