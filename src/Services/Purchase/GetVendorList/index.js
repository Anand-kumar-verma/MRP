import {API_URLS} from '../../../Config/apiUrls'
import { baseUrl } from '../../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'


export const  getVendorListFn = async({
    setloding,
    setVendorList,
    
})=>{
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.create_get_vendor_api}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setVendorList(response?.data?.data)
        //   console.log(response)
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
        setloding(false)
    }

