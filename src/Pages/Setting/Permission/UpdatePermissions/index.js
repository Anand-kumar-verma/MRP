import { Checkbox } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Config/axios";
import { API_URLS } from "../../../../Config/apiUrls";
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";


export default function UpdatePermissions() {
    const state = useLocation()
    const navigate = useNavigate()
    console.log(state?.state?.emp_id)
    const [permission_list, setPermission_list] = React.useState([])
    const [checkbox, setCheckBox] = React.useState([])




    React.useEffect(() => {
        const reqBody = {
            emp_id: state?.state?.emp_id
        }
        state?.state?.emp_id &&
            axiosInstance?.post(`${API_URLS?.list_of_employee}`, reqBody).then((res) => {
                setPermission_list(res?.data?.data ? res?.data?.data[0]?.permission : [])
            }).catch((e) => console.log(e))
    }, [state?.state?.emp_id])

    React.useEffect(()=>{
        setCheckBox(permission_list?.filter((i)=>i?.active_status === true)?.map((item)=>{return item?.id}))
    },[permission_list])

    function globalChecked() {
        if (checkbox?.length === permission_list?.length) setCheckBox([])
        else
            setCheckBox(permission_list?.map((i) => { return i?.id }))
    }

    function singleChecked(id) {
        if (checkbox?.includes(id)) {
            setCheckBox(checkbox?.filter((i) => i !== id))
        } else {
            setCheckBox([...checkbox, id])
        }
    }

    function updateFunctionCalled() {
        if (checkbox.length === 0) toast.warn("Plese add permission")
        else {
            const reqBody = {
                emp_id: state?.state?.emp_id,
                permission_id: checkbox
            }
            axiosInstance?.put(API_URLS?.list_of_employee, reqBody)?.then((res) => {
                if (res?.data?.response_code === 200) {
                    toast.success(res?.data?.message)
                    navigate('/setting/permission')
                }
            }).catch((e) => console.log(e))
        }
    }
    // toast.success(res?.message)

    console.log(permission_list, checkbox)

    return (
        <div className="bg-white p-4">
            <div className=" w-full flex justify-between">
                <div className="text-blue-500 font-bold text-2xl">
                    Role:
                    <span>{state.state?.role}</span><span className="ml-3">({state?.state?.email})
                    </span>
                </div>
                <div className="bg-blue-500 text-white px-5 py-2 rounded-full text-md cursor-pointer"
                    onClick={() => updateFunctionCalled()}
                >UPDATE</div>
            </div>        <p className="mt-10 font-bold text-gray-900">Permissions:</p>
            <div className="grid grid-cols-2   ">
                <div className="flex items-center">
                    <Checkbox
                        onClick={globalChecked}
                        checked={checkbox?.length === permission_list?.length ? true : false}
                    />
                    <span className="font-bold">All</span>
                </div>
                {
                    permission_list?.map((i) => {
                        return <div className="flex items-center"

                        ><Checkbox
                                onClick={() => singleChecked(i?.id)}
                                checked={checkbox?.includes(i?.id) ? true : false}
                            /><p className="capitalize">{i?.name?.replaceAll("_", " ")}</p></div>
                    })
                }
            </div>
        </div>
    )


}