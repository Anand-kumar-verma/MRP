import {API_URLS} from '../../Config/apiUrls'
import { baseUrl } from '../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'


export const  donut_chart_resources_Fn = async({
    setloding,
    setData,
})=>{
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.donut_chart_resources}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setData(response?.data)
        //   console.log(response)
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
        setloding(false)
    }

