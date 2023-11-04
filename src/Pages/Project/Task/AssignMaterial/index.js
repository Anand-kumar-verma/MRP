import * as React from "react";
import { Checkbox, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import Pagination from "../../../../Shared/Pagination";
import CustomTable from "../../../../Shared/CustomTable";
import { TaskListFunction } from "../../../../Services/Task/TaskList";
import axiosInstance from "../../../../Config/axios";
import { API_URLS } from "../../../../Config/apiUrls";
import Loding from "../../../../Loding";
import { toast } from "react-toastify";
import { permission_message } from "../../../../Mock";
import { getPermission_along_with_user_id } from "../../../../Services/PermissionList";
import { isPermission } from "../../../../Services/PermissionList/BooleanFunctoinForPermissin";
import CustomDialogBox from '../../../../Shared/CustomDialogBox'
export default function AssignMaterial({
}) {
  const role = localStorage.getItem("role");

  const navidate = useNavigate();
  const [workOrder, setworkOrder] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);
  const [loding, setloding] = React.useState(false);
  const [Permission, setPermissions] = React.useState([])
  const role_user = localStorage.getItem("role_user");

  const { data: taskList } = useQuery(
    ["taskList", searchValue, pageCount, page],
    () => TaskListFunction({ search: searchValue, limit: pageCount, page: page }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  function deleteHandler() {
  }

  const tableData = taskList?.data?.data;

  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])





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
          </div>
        )}
      </div>

      <div className="h-[100%] flex flex-col justify-between ">
        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span
            // onClick={() => globalCheckBox()}
            >
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
          //   project_id ? taskList?.data?.data?filter((i)=>i?.project?.id === Number(project_id))
          tablerow={

            tableData?.map((i) => {
              return [
                <span
                //   onClick={() => singleCheckBox(Number(i?.id))}
                >
                  <Checkbox
                    checked={checkedBox.includes(Number(i?.id)) ? true : false}
                  />
                </span>,
                <span
                  className="text-blue-500 cursor-pointer "
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
                <span>{i?.status?.replaceAll("_", " ")}</span>,
                <span className="hover:underline text-blue-800"
                  onClick={() => setOpenCustomDialogBox(true)}
                >
                  Assign
                </span>,
              ];
            })

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
            <div className="flex flex-col gap-5 mt-5">
              <TextField
                disabled
                label="Material"
                id="material"
                name="material"
                value="Material"
              />
              <TextField
                disabled
                label="Varient"
                id="varient"
                name="varient"
                value="Varient"
              />
              <TextField
                type="number"
                label={"Qnt"}
                id="varient"
                name="varient"
                value="0"
              />
              <div className="text-center bg-blue-600 text-white py-2 rounded-full cursor-pointer">
                OK
              </div>

            </div>
          }
          title={"Assign Materials :"}
        />
      )}
    </>
  );
}

// export default function TaskList(){
//     return <div>ds</div>
// }
