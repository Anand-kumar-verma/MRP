import * as React from "react";
import { Checkbox, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Shared/CustomTable";
import Pagination from "../../Shared/Pagination";
import { useQuery } from "react-query";
import moment from "moment";
import { ProjectListFn } from "../../Services/Project/AllProjectList";
import { GrFormView } from "react-icons/gr";
import { toast } from "react-toastify";
import { getPermission_along_with_user_id } from "../../Services/PermissionList";
import { isPermission } from "../../Services/PermissionList/BooleanFunctoinForPermissin";
import { permission_message } from "../../Mock";


export default function Project() {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const role = localStorage.getItem("role")
  const [Permission, setPermissions] = React.useState([])
  const role_user = localStorage.getItem("role_user");

  const { data } = useQuery(
    ["projectlist", searchValue, pageCount],
    () => ProjectListFn({ search: searchValue, limit: pageCount }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log("response", res);
      },
    }
  );

  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])

  function globalCheckBox() { }

  function singleCheckBox(id) { }

  function deleteHandler() { }
  const handlers = {
    ADD_NEW_ROW: () => {
      navigate("/project/create-project");
    },
  };




  const tableData = data?.data?.data

  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
        <input
          type="search"
          placeholder="Search..."
          className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>

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

        </div>
      </div>

      <div className="h-[100%] flex flex-col justify-between ">
        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span onClick={() => globalCheckBox()}>
              <Checkbox
              // checked={
              //   checkedBox.length !== 0 &&
              //   checkedBox.length === workOrder.length
              //     ? true
              //     : false
              // }
              />
            </span>,
            <span>Project No.</span>,
            <span>Name</span>,
            <span>Type</span>,
            <span>Status</span>,
            <span>Start Date</span>,
            <span>End Date</span>,
            <span>Material Cost</span>,
            <span>Operational Cost</span>,
            <span>Total Cost</span>,
            // <span>Manager approved</span>,
            <span>View</span>,
          ]}
          tablerow={tableData?.map(
            (i) => {
              return [
                <span onClick={() => singleCheckBox(Number(i?.id))}>
                  <Checkbox
                    checked={checkedBox.includes(Number(i?.id)) ? true : false}
                  />
                </span>,
                <span
                  onClick={() =>
                    role !== "Manager" ?
                      navigate("/project/project-tracking", {
                        state: {
                          project_id: i?.id,
                          plan_project_id: i?.planning_project?.id
                        },
                      })
                      :
                      toast.warn("You don't have permission")
                  }
                  className="text-blue-800"
                >
                  {i?.id}
                </span>,
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() =>

                    navigate("/open-project", {
                      state: {
                        project_name: i?.project_name,
                        project_id: i?.id,
                        type_of_project: i?.type_of_project,
                      },
                    })

                  }
                >
                  {i?.project_name}
                </span>,
                <span>{i?.type_of_project}</span>,
                <span
                  className={`${i?.status === "New" ? "text-blue-900" : "text-yellow-500"
                    }
                  ${i?.status === "On_Track" ? "text-green-900" : "text-yellow-500"
                    } font-bold`}
                >
                  {i?.status?.replaceAll("_", " ")}
                </span>,
                <span>
                  {i?.start_date
                    ? moment(i?.start_date).format("DD/MM/YYYY")
                    : "---"}
                </span>,
                <span>
                  {i?.end_date
                    ? moment(i?.end_date).format("DD/MM/YYYY")
                    : "---"}
                </span>,
                <span>{`${i?.materials_amount} ${i?.currency}`}</span>,
                <span>{`${i?.operations_amount} ${i?.currency}`}</span>,
                <span>{`${i?.total_amount} ${i?.currency}`}</span>,
                <span className="w-full flex justify-center text-2xl ">
                  {
                    <GrFormView
                      className="!text-blue-700 cursor-pointer"
                      onClick={() => {
                        if (role_user === "Project Based" || isPermission(Permission, "view_project")) {
                          {
                            navigate(
                              `/project/project-details/${i?.planning_project?.id}`,
                              {
                                state: "project",
                              }
                            )
                          }
                        }else{
                          toast.warn(permission_message)
                        }
                      }
                      }
                    />
                  }
                </span>,
              ];
            }
          )}
        />
        <Pagination
          className
          subData={data?.data}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>
    </>
  );
}
