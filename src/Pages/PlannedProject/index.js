import * as React from "react";
import { Checkbox, Button, IconButton } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getManufacturingList } from "../../Services/Manufacturing/CreateManufacturingProcess/GetManufacturingList";
import { deleteFunctionCalled } from "../../Services/Sales/DeleteSalesOrder";
import CustomTable from "../../Shared/CustomTable";
import Pagination from "../../Shared/Pagination";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ProjectPlanningListFn,
  projectPlanningApprovalFn,
} from "../../Services/ProjectPlanning";
import moment from "moment";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";

export default function PlannedProject() {
  const navigate = useNavigate();
  const [workOrder, setworkOrder] = React.useState([]);
  const [dummy, setDummy] = React.useState();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [subData, setSubData] = React.useState({});
  const [loding, setloding] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const client = useQueryClient();
  const { data } = useQuery(
    ["projectPlanningList", searchValue],
    () => ProjectPlanningListFn({ search: searchValue }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log("response", res);
      },
    }
  );
  console.log(data, "bharat response");

  React.useEffect(() => {
    getManufacturingList({
      setloding,
      page,
      pageCount,
      setproduct: setworkOrder,
      setSubData,
      searchValue,
    });
  }, [dummy, page, pageCount, searchValue]);

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
    deleteFunctionCalled({
      setloding,
      checkedBox,
      setDummy,
      setCheckedBox,
    });
  }
  const handlers = {
    ADD_NEW_ROW: () => {
      navigate("/project/create-project");
    },
  };
  const handleDetails = (item) => {
    navigate(`/project/project-details/${item.id}`);
  };

  const { mutate: approvedFunctionCalledApi } = useMutation(
    projectPlanningApprovalFn,
    {
      onSuccess: (res) => {
        console.log("hello");
        toast.success(res.data?.message);
        if (res.data.response_code === 200) {
          client.refetchQueries("projectPlanningList");
        }
      },
    }
  );
  function approvedFunctionCalled(status, id) {
    console.log(status, id, "ccc");
    approvedFunctionCalledApi({
      planning_project_id: id,
      manager_approval_status: status,
    });

    // setId(`${id} ${status}`);
    // if (status === "Declined") {
    //   setopenDialogBox(true);
    // } else {
    //   handleMiddleApproved(status, id, reason);
    // }
  }
  // HotKeys keyMap={keyMap} handlers={handlers}

  const tableData = data?.data?.data
  console.log(tableData)
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
            size="small"
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
            onClick={() => navigate("/plan-new-project")}
            className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
          >
            <span>Plan new Project</span>
            <span className="text-[2rem]">
              <IoIosAddCircle fontSize={"small"} />
            </span>
          </p>
        </div>
      </div>

      <div className="h-[100%] flex flex-col justify-between ">
        <CustomTable
          size="small"
          className={""}
          isLoding={false}
          tablehead={[
            <span onClick={() => globalCheckBox()}>
              <Checkbox
                size="small"
                checked={
                  checkedBox.length !== 0 &&
                    checkedBox.length === workOrder.length
                    ? true
                    : false
                }
              />
            </span>,
            <span>Project No.</span>,
            <span>Name</span>,
            <span>Type</span>,
            <span>Start Date</span>,
            <span>End Date</span>,
            <span>Material Cost</span>,
            <span>Operational Cost</span>,
            <span>Total Cost</span>,
            <span>Manager approved</span>,
            <span>Actions</span>,
          ]}
          tablerow={tableData?.map(
            (i) => {
              return [
                <span onClick={() => singleCheckBox(Number(i?.id))}>
                  <Checkbox
                    size="small"
                    checked={checkedBox.includes(Number(i?.id)) ? true : false}
                  />
                </span>,
                <span>{i?.id}</span>,
                <span>{i?.project_name}</span>,
                <span>{i?.type_of_project}</span>,
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
                <span>
                  <select
                    id="approve"
                    name="approve"
                    value={i?.manager_approval_status}
                    onChange={(e) => {
                      i?.manager_approval_status === "Pending"
                        ? approvedFunctionCalled(e.target.value, i?.id)
                        : toast.warn("Can't be change");
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                  </select>
                </span>,

                <span>{
                  <IconButton disabled={i?.manager_approval_status === "Accepted" ? true : false} onClick={() => handleDetails(i)}>
                    <CreateIcon
                    />
                  </IconButton>
                }</span>

              ];
            }
          )}
        />
        <Pagination
          className
          subData={subData}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>
    </>
  );
}
