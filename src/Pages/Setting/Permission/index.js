import * as React from "react";
import { Checkbox, Button } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../Shared/CustomTable";
import Pagination from "../../../Shared/Pagination";
import axiosInstance from "../../../Config/axios";
import { API_URLS } from "../../../Config/apiUrls";
import { Add, Visibility } from "@mui/icons-material";

export default function Permission() {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [subData, setSubData] = React.useState({});
    const [searchValue, setSearchValue] = React.useState("");
    const [checkedBox, setCheckedBox] = React.useState([]);
    const [emp_list, setEmp_list] = React.useState([])





    React.useEffect(() => {
        axiosInstance?.get(`${API_URLS?.list_of_employee}?limit=${pageCount}&page=${page}&search=${searchValue}`).then((res) => {
            setEmp_list(res?.data?.data)
            setSubData(res?.data)

        }).catch((e) => console.log(e))
    }, [page,searchValue,pageCount])


    const tableBody = emp_list?.map((i) => {
        return {
            emp_id: i?.emp_id,
            name: i?.name,
            email: i?.email,
            designation: i?.designation,
            role: i?.role,
        };
    });





    return (
        <>
            <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
                <div className="flex gap-4">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
                    // onChange={(e) => setSearchValue(e.target.value)}
                    ></input>

                </div>

                <div className="flex gap-1">
                    <Button
                        // onClick={deleteHandler}
                        className={`${checkedBox.length <= 0 ? "opacity-10" : "opacity-100"
                            } !text-red-700 `}
                        disabled={checkedBox.length > 0 ? false : true}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                    <p
                        onClick={() => navigate("/worker/create-worker")}
                        className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
                    >
                        <span>Add Rows</span>
                        <span className="text-[2rem]">
                            <IoIosAddCircle />
                        </span>
                    </p>
                </div>
            </div>

            <div className="h-full flex flex-col justify-between">
                <CustomTable
                    className={""}
                    isLoding={false}
                    tablehead={[
                        <span
                        // onClick={() => globalCheckBox()}
                        >
                            <Checkbox
                                // checked={
                                //     checkedBox.length !== 0 &&
                                //         checkedBox.length === workOrder.length
                                //         ? true
                                //         : false
                                // }
                            />
                        </span>,

                        <span>Name</span>,
                        <span>Email</span>,
                        <span>Role</span>,
                        <span>Designation</span>,
                        <span>Permission</span>

                    ]}
                    tablerow={tableBody?.map((i) => {
                        return [
                            <span
                            //   onClick={() => singleCheckBox(Number(i?.emp_id))}
                            >
                                <Checkbox
                                    checked={
                                        checkedBox.includes(Number(i?.emp_id)) ? true : false
                                    }
                                />
                            </span>,
                            //   <span
                            //     className="text-blue-700 cursor-pointer"
                            //     onClick={() => navigate("/day-book")}
                            //   >
                            //     {i?.emp_id}
                            //   </span>,
                            <span>{i?.name}</span>,
                            <span>{i?.email}</span>,
                            <span>{i?.role}</span>,
                            <span

                            >
                                {i?.designation}
                            </span>,
                            <span className="flex pl-5">
                                <Visibility
                                onClick={()=>navigate('/setting/permission/permission_list',{
                                    state:{
                                        emp_id:i?.emp_id,
                                        role:i?.role,
                                        email:i?.email
                                    }
                                })}
                                className="!text-blue-500"
                                />
                                
                            </span>
                        ];
                    })}
                />
                <Pagination
                    className="className"
                    subData={subData || {}}
                    page={page}
                    setPage={setPage}
                    setPageCount={setPageCount}
                />
            </div>
        </>
    );
}
