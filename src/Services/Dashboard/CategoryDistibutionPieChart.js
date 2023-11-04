import {API_URLS} from '../../Config/apiUrls'
import { baseUrl } from '../../URls';
import axios from 'axios';
import {toast} from 'react-toastify'


export const    category_distribution_pie_chart_Fn = async({
    setloding,
    setData,
})=>{
    setloding(true)
        try {
          const response = await axios.get(
            `${baseUrl}${API_URLS.category_distribution_pie_chart}`,
            {
              headers: {
                Authorization: localStorage.getItem("erp_token"),
                "Content-Type": "application/json",
              },
            }
          );
          setData(response?.data?.data)
        //   console.log(response)
        } catch (e) {
          console.log(e)
          toast.warn("Something went wrong");
        }
        setloding(false)
    }

