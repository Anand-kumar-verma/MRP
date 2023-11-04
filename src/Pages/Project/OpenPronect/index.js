import { Button, Checkbox, Radio, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import AddMember from "./AddMember";
import CustomTable from "../../../Shared/CustomTable";
import { useQuery } from "react-query";
import { GetMemberList } from "../../../Services/ProjectTracking/GetMemberList";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoIosAddCircle } from "react-icons/io";
import TaskList from "../Task/TaskList";
import { getPermission_along_with_user_id } from "../../../Services/PermissionList";
import { toast } from "react-toastify";
import { permission_message } from "../../../Mock";
import { isPermission } from "../../../Services/PermissionList/BooleanFunctoinForPermissin";

const OpenProject = () => {
  const state = useLocation();
  const navidate = useNavigate();
  const [openCustomDialogBox, setOpenCustomDialogBox] = useState(false);
  const [checkedBox, setCheckedBox] = React.useState([]);
  const [Permission,setPermissions] =  React.useState([])
  const role_user = localStorage.getItem("role_user");
  const initialValue = {
    description: "",
    status: "",
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  const { data } = useQuery(
    ["getmemberlist"],
    () => GetMemberList({ project_id: state?.state?.project_id }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  console.log(data?.data?.data?.employees, "re");

  // type_of_project
const tableData = data?.data?.data?.employees
React.useEffect(()=>{
  getPermission_along_with_user_id({setPermissions})
},[])

  return (
    <div className=" bg-white p-5">
      <div className="grid grid-cols-2 gap-2">
        <p className="col-span-2 row-span-2 text-white font-bold bg-green-300 py-2 px-4 mb-2">
          <span className="text-blue-500"> Project Name </span>:{" "}
          <span className="text-blue-500">{state?.state?.project_name}</span>
        </p>

        <p className="text-yellow-500 text-2xl ">
          <Radio checked className="!text-yellow-600" />
          <span>{data?.data?.data?.status}</span>
        </p>

        <p className="col-span-2 row-span-2  font-bold  ">
          <span>Description:</span>
        </p>
        <ReactQuill
          className="col-span-2 row-span-2"
          id="description"
          name="description"
          value={data?.data?.data?.description}
          // onChange={formik.handleChange}
          modules={{ toolbar: true }}
        />
      </div>
      <div className="mt-12">
        <p className="col-span-2 row-span-2  mt-[5%] ">
          <span>Project Admin:</span>
          <span className="font-bold pl-2">
            {localStorage.getItem("erp_username")}
          </span>
        </p>
        <p className="mt-5">Members List:</p>

        <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-2 py-2 text-black outline-none border-2   border-purple-400 rounded-lg "
              // onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>

          <div className="flex gap-1">
            <Button
              // onClick={deleteHandler}
              className={`${
                checkedBox.length <= 0 ? "opacity-10" : "opacity-100"
              } !text-red-700 `}
              disabled={checkedBox.length > 0 ? false : true}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <p
              onClick={() => {
                if (role_user === "Project Based" || isPermission(Permission,"add_employee")) {
                setOpenCustomDialogBox(true)
                }else{
                  toast.warn(permission_message)
                }
              }}
              className=" bg-green-500 rounded-full px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
            >
              <span>Add Member</span>
              <span className="text-[2rem]">
                <IoIosAddCircle />
              </span>
            </p>
          </div>
        </div>

        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span
            // onClick={() => globalCheckBox()}
            >
              <Checkbox
              // checked={
              //   checkedBox.length !== 0 &&
              //   checkedBox.length === workOrder.length
              //     ? true
              //     : false
              // }
              />
            </span>,
            <span>Email</span>,
            <span>Name</span>,
            <span>Mobile</span>,
            <span>Cost/Hrs</span>,
            <span>Role</span>,
            <span>Designation</span>,
          ]}
          tablerow={tableData?.map((i) => {
            return [
              <span
              // onClick={() => singleCheckBox(Number(i?.id))}
              >
                <Checkbox
                // checked={checkedBox.includes(Number(i?.id)) ? true : false}
                />
              </span>,
              <span className="cursor-pointer text-blue-800" onClick={()=>navidate(`/employee-details/${i?.emp_id}`)}>{i?.email}</span>,
              <span >{i?.name}</span>,
              <span>{i?.mobile}</span>,
              <span>{i?.current_cost_per_hours}</span>,
              <span>{i?.role?.name}</span>,
              <span>{i?.designation?.designation}</span>,
            ];
          })}
        />

        <div className="mt-10">
          <TaskList 
          project_id={state?.state?.project_id} 
          project_name = {state?.state?.project_name}
          />
        </div>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <AddMember
              project_id={state?.state?.project_id}
              setOpenCustomDialogBox={setOpenCustomDialogBox}
            />
          }
          title={"EMPLOYEE"}
        />
      )}
    </div>
  );
};

export default OpenProject;
