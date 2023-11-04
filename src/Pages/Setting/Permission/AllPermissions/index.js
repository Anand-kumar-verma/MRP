import { Checkbox } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Config/axios";
import { API_URLS } from "../../../../Config/apiUrls";
import { Add, Edit, Update } from "@mui/icons-material";


export default function AllPermissions() {
    const state = useLocation()
    const navigate = useNavigate()
    const [permission_list, setPermission_list] = React.useState([])



    React.useEffect(() => {
        const reqBody = {
            emp_id: state?.state?.emp_id
        }
        state?.state?.emp_id &&
            axiosInstance?.post(`${API_URLS?.list_of_employee}`, reqBody).then((res) => {
                setPermission_list(res?.data?.data ? res?.data?.data[0]?.permission : [])
            }).catch((e) => console.log(e))
    }, [state?.state?.emp_id])

    return (
        <div className="bg-white p-4">
            <div className="text-blue-500 font-bold text-2xl w-full flex justify-between">
               <div>
               Role:
                <span>{state.state?.role}</span><span className="ml-3">({state?.state?.email})
                </span>
               </div>
               <div><Edit
               className="cursor-pointer"
               onClick={()=>navigate('/setting/permission/update-permission',{
                state:{
                    emp_id:state?.state?.emp_id,
                    role:state.state?.role,
                    email:state?.state?.email
                }
               })}
               /></div>
            </div>
            <p className="mt-10 font-bold text-gray-900">Permissions:</p>
            <div className="grid grid-cols-2   ">
                {
                    permission_list?.map((i) => {
                        return <div className="flex items-center"

                        ><Checkbox
                            checked = {i?.active_status ? true : false}
                            /><p className="capitalize">{i?.name?.replaceAll("_", " ")}</p></div>
                    })
                }
            </div>
        </div>
    )


}