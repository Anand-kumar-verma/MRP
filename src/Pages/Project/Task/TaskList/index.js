import * as React from "react";
import { Checkbox, Button, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "../../../../Shared/Pagination";
import CustomTable from "../../../../Shared/CustomTable";
import { TaskListFunction } from "../../../../Services/Task/TaskList";

import CustomDialogBox from "../../../../Shared/CustomDialogBox";
import axiosInstance from "../../../../Config/axios";
import { API_URLS } from "../../../../Config/apiUrls";
import Loding from "../../../../Loding";
import { toast } from "react-toastify";
import { permission_message } from "../../../../Mock";
import { getPermission_along_with_user_id } from "../../../../Services/PermissionList";
import { isPermission } from "../../../../Services/PermissionList/BooleanFunctoinForPermissin";

export default function TaskList({
  project_id,
  project_name,
  type_of_project,
}) {
  const role = localStorage.getItem("role");

  const navidate = useNavigate();
  const navigate = useNavigate();
  const [workOrder, setworkOrder] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);
  const [activityData, setactivityData] = React.useState([]);
  const [loding, setloding] = React.useState(false);
  const [Permission, setPermissions] = React.useState([])
  const role_user = localStorage.getItem("role_user");

  const { data: taskList } = useQuery(
    ["taskList", searchValue,pageCount,page],
    () => TaskListFunction({ search: searchValue,limit:pageCount,page:page}),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  console.log(taskList?.data);

  function globalCheckBox() {
    if (checkedBox.length === workOrder.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(
        workOrder.map((singleItem, index) => {
          return Number(singleItem.id);
        })
      );
    }
  }

  function singleCheckBox(id) {
    if (checkedBox.includes(id)) {
      const filteredData = checkedBox.filter((item) => item !== id);
      setCheckedBox(filteredData);
    } else {
      setCheckedBox([...checkedBox, id]);
    }
  }

  function deleteHandler() {
    // deleteFunctionCalled({
    //   setloding,
    //   checkedBox,
    //   setDummy,
    //   setCheckedBox,
    // });
  }

  function getActivity(reqBody) {
    setloding(true);
    axiosInstance
      .post(API_URLS?.acitivity, reqBody)
      .then((res) => setactivityData(res?.data?.data))
      .catch((e) => console.log(e));
    setloding(false);
  }

  const tableData = taskList?.data?.data;


  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])

console.log(Permission)
  if (loding) return <Loding />;
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
        <input
          type="search"
          placeholder="Search..."
          className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
          {/* <p
                onClick={() => {
                  if (role_user === "Project Based" || isPermission(Permission, "add_task")) {
                    navidate("/task", {
                      state: {
                        id: project_id,
                        type_of_project: type_of_project || "--",
                        project_name: project_name
                      }
                    })
                  }else{
                    toast.warn(permission_message)
                  }
                }
                }
                className=" bg-green-500 rounded-full px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
              >
                <span>Assign Task</span>
              </p> */}

        {(role_user === "Project Based" || role === "Manager") && (
          <div className="flex gap-1">
            <Button
              onClick={deleteHandler}
              className={`${checkedBox.length <= 0 ? "opacity-10" : "opacity-100"
                } !text-red-700 `}
              disabled={checkedBox.length > 0 ? false : true}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          

            {project_id && (
              <p
                onClick={() => {
                  if (role_user === "Project Based" || isPermission(Permission, "add_task")) {
                    navidate("/task", {
                      state: {
                        id: project_id,
                        type_of_project: type_of_project || "--",
                        project_name: project_name
                      }
                    })
                  }else{
                    toast.warn(permission_message)
                  }
                }
                }
                className=" bg-green-500 rounded-full px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
              >
                <span>Assign Task</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="h-[100%] flex flex-col justify-between ">
        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span onClick={() => globalCheckBox()}>
              <Checkbox
                checked={
                  checkedBox.length !== 0 &&
                    checkedBox.length === workOrder.length
                    ? true
                    : false
                }
              />
            </span>,
            <span>Task ID</span>,
            <span>Name</span>,
            <span>Assign To</span>,
            <span>Assign By</span>,
            <span>Project</span>,
            <span>Estimated_time/h</span>,
            <span>Spent Time/h</span>,
            <span>Remaining Time/h</span>,
            <span>Start Date</span>,
            <span>End Date</span>,
            <span>Status</span>,
            <span>Actions</span>,
          ]}
          // project_id ? taskList?.data?.data?filter((i)=>i?.project?.id === Number(project_id))
          tablerow={
            (role_user === "Project Based" || isPermission(Permission,"view_task"))?
           ( (project_id 
            ? tableData?.filter((i) => i?.project?.id === Number(project_id))
            : tableData
          )?.map((i) => {
            return [
              <span onClick={() => singleCheckBox(Number(i?.id))}>
                <Checkbox
                  checked={checkedBox.includes(Number(i?.id)) ? true : false}
                />
              </span>,
              <span
                className="text-blue-500 cursor-pointer "
                onClick={() => {
                  if (role_user === "Project Based" || isPermission(Permission, "view_activity")) {
                    getActivity({
                      object_id: i?.id,
                      object_name: taskList?.data?.object_name,
                    });
                    setOpenCustomDialogBox(true);
                  } else {
                    toast.warn(permission_message);
                  }
                }}
              >
                {i?.id}
              </span>,
              <span className="">{i?.task_name}</span>,
              <span
                className="cursor-pointer text-blue-700"
                onClick={() =>
                  role === "Company_Admin" &&
                  navidate(`/employee-details/${i?.assignee?.emp_id}`)
                }
              >
                {i?.assignee?.email}
              </span>,
              <span
                className="cursor-pointer text-blue-700"
                onClick={() =>
                  role === "Company_Admin" &&
                  navidate(`/employee-details/${i?.accountable?.emp_id}`)
                }
              >
                {i?.accountable?.email}
              </span>,
              <span>{i?.project?.project_name}</span>,
              <span>{i?.estimated_time}</span>,
              <span>{i?.spent_time}</span>,
              <span>{i?.remaining_hours}</span>,
              <span>
                {i?.start_date
                  ? moment(i?.start_date).format("DD/MM/YYYY")
                  : "---"}
              </span>,
              <span>
                {i?.end_date ? moment(i?.end_date).format("DD/MM/YYYY") : "---"}
              </span>,
              <span>{i?.status?.replaceAll("_"," ")}</span>,
              <span>
                {
                  <CreateIcon
                    onClick={() =>
                      navigate("/task", {
                        state: {
                          id: i?.project?.id,
                          project_name: i?.project?.project_name,
                          type_of_project: i?.project?.type_of_project,
                          task_id: i?.id,
                          task_status:i?.status
                        },
                      })
                    }
                  />
                }
              </span>,
            ];
          }))
          :
          [["","",permission_message]]
        }
        />
        <Pagination
          className
          subData={taskList?.data}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <div className="">
              {/* <div className="grid grid-cols-3 gap-5 bg-green-500 text-white py-2">
                <p className="bg-green-500 ml-2">Name</p>
                <p className="bg-green-500">Action Time</p>
                <p className="bg-green-500">Status</p>
              </div> */}
              <div className="overflow-auto flex flex-col gap-4 ">
                {activityData?.map((i, index) => {
                  return (
                    <div
                      key={index}
                      className="flex bg-purple-200 rounded-lg px-2  justify-between items-center lg:w-[40rem] md:w-[20rem]  sm:w-[10rem]  py-2"
                    >
                      <div className=" ">
                        <div className="flex items-center gap-5">
                          <Avatar sx={{}} className="!capitalize">
                            {i?.user_email?.substring(0, 2)?.toUpperCase()}
                          </Avatar>
                          <div className="flex flex-col">
                            <div>
                              <p className="text-blue-500">{i?.user_email}</p>
                              <p className="text-gray-600 text-sm">
                                {new Date(i?.action_time)?.toDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="pl-2 flex flex-col">
                          <span className="text-gray-700 font-bold">
                            {i?.object_repr}
                          </span>
                          <span>{i?.change_message}</span>
                        </div>
                      </div>

                      <div className="text-green-700 font-bold">#{i.id}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          title={"ACTIVITY:"}
        />
      )}
    </>
  );
}

// export default function TaskList(){
//     return <div>ds</div>
// }
