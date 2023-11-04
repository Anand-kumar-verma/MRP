import { API_URLS } from "../../Config/apiUrls"
import axiosInstance from "../../Config/axios"


export const  getPermission_along_with_user_id  = ({setPermissions})=>{
    const reqBody = {
        emp_id: localStorage?.getItem("erp_employee_id")
    }
    axiosInstance?.post(`${API_URLS?.list_of_employee}`, reqBody).then((res) => {
      setPermissions(res?.data?.data ? res?.data?.data[0]?.permission : [])
      console.log(res)
    }).catch((e) => console.log(e))

}

