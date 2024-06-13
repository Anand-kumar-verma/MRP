import * as React from "react";
import { Checkbox, Button } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getManufacturingList } from "../../Services/Manufacturing/CreateManufacturingProcess/GetManufacturingList";
import { deleteFunctionCalled } from "../../Services/Sales/DeleteSalesOrder";
import CustomTable from "../../Shared/CustomTable";
import Pagination from "../../Shared/Pagination";
import axiosInstance from "../../Config/axios";
import { useQuery } from "react-query";
import { getEmployeeList } from "../../Services/Project/Employee/GetEmployeeList";
import { projectRole } from "../../Services/Project/Employee/AddEmployee/projectRole";
import { getPermission_along_with_user_id } from "../../Services/PermissionList";
import { isPermission } from "../../Services/PermissionList/BooleanFunctoinForPermissin";
import { permission_message } from "../../Mock";
import { toast } from "react-toastify";

export default function WorkersList() {
  const navigate = useNavigate();
  const [workOrder, setworkOrder] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const [filterData, setfilterData] = React.useState("");
  const [Permission, setPermissions] = React.useState([])
  const role_user = localStorage.getItem("role_user");


  function globalCheckBox() {
    // if (checkedBox.length === workOrder.length) {
    //   setCheckedBox([]);
    // } else {
    //   setCheckedBox(
    //     workOrder.map((singleItem, index) => {
    //       return Number(singleItem.id);
    //     })
    //   );
    // }
  }

  function singleCheckBox(id) {
    // if (checkedBox.includes(id)) {
    //   const filteredData = checkedBox.filter((item) => item !== id);
    //   setCheckedBox(filteredData);
    // } else {
    //   setCheckedBox([...checkedBox, id]);
    // }
  }

  function deleteHandler() {
    // deleteFunctionCalled({
    //   setloding,
    //   checkedBox,
    //   setDummy,
    //   setCheckedBox,
    // });
  }

  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])

  console.log(Permission)

  const { data: employeelist, isLoading } = useQuery(
    ["employeeList", page, searchValue, pageCount, filterData],
    () =>
      getEmployeeList({
        page: page,
        search: searchValue,
        limit: pageCount,
        role_id: filterData,
      }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  console.log(employeelist?.data?.data)

  const { data: getRole } = useQuery(["role"], () => projectRole(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // const deleteWorker = ()=>{
  //   axiosInstance.put("",{
  //     costomer_id:array,
  //   })
  //   .then((res)=>console.log(res))
  //   .catch((e)=>console.log(e))
  // }

  const tableBody = employeelist?.data?.data?.filter((i)=>i?.type==="Associate")?.map((i,index) => {
    return {
      emp_id: i?._id,
      name: i?.f_name,
      designation: "Cutting",
      current_cost_per_hours: index+10
    };
  });


  console.log(isPermission(Permission, "view_employee"))
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <select
            type="search"
            placeholder="Select Role"
            className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
            onChange={(e) => setfilterData(e.target.value)}
          >
            {getRole?.data?.data?.map((i) => {
              return <option value={i.id}>{i?.name}</option>;
            })}
          </select>
        </div>

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
          <p
            onClick={() => {
              if (role_user === "Project Based" || isPermission(Permission, "add_employee")) {
                navigate("/worker/create-worker")
              }else{
                toast.warn(permission_message)
              }
            }
            }
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
            <span>S.No.</span>,
            <span>Name</span>,
            <span>Operation</span>,
            <span>Cost/Hrs</span>,
            <span>GetDetails</span>,
          ]}
          tablerow={
           role_user === "Project Based" || isPermission(Permission, "view_employee") ?
            tableBody?.map((i) => {
            return [
              <span onClick={() => singleCheckBox(Number(i?.emp_id))}>
                <Checkbox
                  checked={
                    checkedBox.includes(Number(i?.emp_id)) ? true : false
                  }
                />
              </span>,
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/day-book",{
                  state:{
                    emp_id:i?.emp_id,
                    emp_name:i?.name
                  }
                })}
              >
                {i?.emp_id}
              </span>,
              <span>{i?.name}</span>,
              <span>{i?.designation}</span>,
              <span>{i?.current_cost_per_hours}</span>,
              <span
                title="click to view details"
                className="cursor-pointer hover:underline"
                onClick={() => {
                  navigate(`/employee-details/${i?.emp_id}`);
                }}
              >
                {"view detail"}
              </span>,
            ];
          })
          :
          [["","",permission_message]]
        
        }
        />
        <Pagination
          className="className"
          subData={employeelist?.data || {}}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>
    </>
  );
}
