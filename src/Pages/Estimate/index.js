import * as React from "react";
import { Checkbox, Button, TextField, IconButton } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteFunctionCalled } from "../../Services/Sales/DeleteSalesOrder";
import { useQuery, useQueryClient } from "react-query";
import { getEstimateList } from "../../Services/Estimate/AddEstimate/GetEstimate";
import CustomTable from "../../Shared/CustomTable";
import Pagination from "../../Shared/Pagination";
import axiosInstance from "../../Config/axios";
import { API_URLS } from "../../Config/apiUrls";
import { toast } from "react-toastify";
import CustomDialogBox from "../../Shared/CustomDialogBox";
import { Edit, PictureAsPdf } from "@mui/icons-material";
export default function Estimate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [workOrder, setworkOrder] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [openDialogBox, setopenDialogBox] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);
  const [filterData, setfilterData] = React.useState("");
  const [id, setId] = React.useState("");
  const [reason, setreason] = React.useState("");

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

  const { data: employeelist, isLoading } = useQuery(
    ["estimateListList", page, searchValue, pageCount, filterData],
    () =>
      getEstimateList({
        page: page,
        search: searchValue,
        limit: pageCount,
      }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  function handleMiddleApproved(status, id, reason) {
    const reqBody = {
      customer_estimate_status: status,
      estimate_project_id: Number(id),
      feedback: reason,
    };
    axiosInstance
      .post(API_URLS?.approved, reqBody)
      .then((res) => {
        queryClient.refetchQueries("estimateListList");
        toast.success("Status has been changed");
        setopenDialogBox(false);
      })
      .catch((e) => console.log(e));
  }

  function approvedFunctionCalled(status, id) {
    setId(`${id} ${status}`);
    if (status === "Declined") {
      setopenDialogBox(true);
    } else {
      handleMiddleApproved(status, id, reason);
    }
    queryClient.refetchQueries("projectPlanningList")
    
  }

  const tableBody = employeelist?.data?.data?.map((i) => {
    return {
      id: i.id,
      estimate_no: i?.estimate_no,
      total_amount: i?.total_amount,
      type_of_project: i?.type_of_project,
      project_name: i?.project_name,
      estimate_date: new Date(i?.estimate_date).toDateString(),
      customer_estimate_status: i?.customer_estimate_status,
    };
  });

  // console.log(employeelist?.data)

  return (
    <div>
      <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
        <input
          type="search"
          placeholder="Search Estimate by name..."
          className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>

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
            onClick={() => navigate("/estimate/add-estimate")}
            className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
          >
            <span>Add Estimate</span>
            <span className="text-[2rem]">
              <IoIosAddCircle />
            </span>
          </p>
        </div>
      </div>

      <div className="h-full flex flex-col justify-between ">
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
            <span>Estimate No.</span>,
            <span>Total Amount</span>,
            <span>project_name</span>,
            <span>Project Type</span>,
            <span>Date</span>,
            <span>Status</span>,
            <span>Actions</span>,
          ]}
          tablerow={tableBody?.map((i) => {
            return [
              <span onClick={() => singleCheckBox(Number(i?.estimate_no))}>
                <Checkbox
                  checked={
                    checkedBox.includes(Number(i?.estimate_no)) ? true : false
                  }
                />
              </span>,
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/day-book")}
              >
                {i?.estimate_no}
              </span>,
              <span>{i?.total_amount}</span>,
              <span>{i?.project_name}</span>,
              <span>{i?.type_of_project}</span>,
              <span>{i?.estimate_date}</span>,
              <span>
                <select
                  id="approve"
                  name="approve"
                  value={i?.customer_estimate_status}
                  onChange={(e) => {
                    i?.customer_estimate_status === "Pending"
                      ? approvedFunctionCalled(e.target.value, i?.id)
                      : toast.warn("Can't be change");
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                </select>
              </span>,
              <span>
                <IconButton onClick={() => alert("not created edit page!")}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => navigate(`/estimate-pdf/${i.id}`)}>
                  <PictureAsPdf className="!text-red-500" />
                </IconButton>
              </span>,
            ];
          })}
        />
        {/* i?.approved_by_manager */}
        <Pagination
          className="className"
          subData={employeelist?.data || {}}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>

      {openDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openDialogBox}
          setOpenCustomDialogBox={setopenDialogBox}
          component={
            <div className="flex flex-col justify-center">
              <TextField
                id="reason"
                name="reason"
                multiline={true}
                rows={4}
                value={reason}
                onChange={(e) => setreason(e.target.value)}
              />
              <button
                className="bg-blue-700 px-5 text-white mt-5 rounded-lg"
                onClick={() => {
                  handleMiddleApproved(
                    id.split(" ")[1],
                    Number(id.split(" ")[0]),
                    reason
                  );
                }}
              >
                OK
              </button>
            </div>
          }
          title={"Please Enter the Reason of Declined"}
        />
      )}
    </div>
  );
}
