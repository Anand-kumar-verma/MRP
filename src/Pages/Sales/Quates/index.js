import {
  AddTwoTone,
  DeleteTwoTone,
  Edit,
  FilterAlt,
  ReportTwoTone,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  IconButton,
  InputAdornment,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import NotFound from "../../../Assets/pana.svg";
import { useMutation, useQuery, useQueryClient } from "react-query";

import moment from "moment";

import { toast } from "react-toastify";
import CustomInput from "../../../Shared/CustomInput";
import { estimatesListFn } from "../../../Services/Estimates/EstimatesList";
import axiosInstance from "../../../Config/axios";
import { approveEstimatesFn } from "../../../Services/Estimates/ApproveEstimates";

const Quotes = () => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const client = useQueryClient();
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(selectedIds);
  const { data: estimatesListData, isLoading } = useQuery(
    ["estimates", page, search],
    () => estimatesListFn({ page: page, search_value: search }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const estimates = estimatesListData?.data?.data;
  const handleSelectRow = (id) => {
    setSelectedIds((prevSelectedRow) =>
      prevSelectedRow.includes(id)
        ? prevSelectedRow.filter((i) => i !== id)
        : [...prevSelectedRow, id]
    );
  };
  const handleAllRowSelect = (event) => {
    setSelectedIds(event.target.checked ? estimates?.map((i) => i.id) : []);
  };
  console.log(JSON.stringify(selectedIds), "selectedIds");
  const handleDelete = () => {
    axiosInstance
      .delete(`estimate-list/?estimate_id=[${selectedIds}]`)
      .then((response) => {
        if (response.data.response_code === 200) {
          toast.success(response.data.message);
          setIsDelete(false);
          setSelectedIds([]);
          client.refetchQueries("estimates");
        }
      });
  };
  const { mutate: approve, isLoading: isLoadingApprove } = useMutation(
    approveEstimatesFn,
    {
      onSuccess: (response) => {
        if (response.data.response_code === 200) {
          toast.success(response.data.message);
          client.refetchQueries("estimates");
        }
      },
    }
  );

  console.log(estimates, "estimates");
  return (
    <>
      <div className="!px-0">
        <span className="flex justify-between px-4 pb-2 items-center">
          <CustomInput
            placeholder="Search Estimates..."
            className="!rounded-none"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="flex gap-4 items-center">
            {selectedIds?.length !== 0 && (
              <>
                <Button
                  startIcon={<DeleteTwoTone />}
                  className="!text-white bg-gradient-to-r from-red-500 to-rose-500"
                  onClick={() => setIsDelete(true)}
                >
                  Delete Selected
                </Button>
                <Dialog
                  open={isDelete}
                  onClose={() => setIsDelete(false)}
                  PaperProps={{ className: "!max-w-[500px] w-96" }}
                >
                  <div className="flex flex-col items-center gap-3 p-5">
                    <ReportTwoTone color="error" className="!text-5xl" />
                    <p className="text-xl">Are you sure!</p>
                    <p>You want to delete selected products?</p>
                  </div>
                  <span className="flex gap-3 justify-end pr-3 pb-3">
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      onClick={() => setIsDelete(false)}
                      className="!capitalize"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      disableElevation
                      color="error"
                      className="!capitalize"
                      variant="contained"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </Button>
                  </span>
                </Dialog>
              </>
            )}
            <Button
              startIcon={<AddTwoTone />}
              className="!text-white bg-gradient-to-r !px-4 from-blue-500 to-sky-500"
              onClick={() => navigate("/sales/add-estimate")}
            >
              New
            </Button>
          </div>
        </span>
        <TableContainer component="div" className="!p-0">
          <Table>
            <TableHead>
              <TableRow className="bg-white bg-opacity-30">
                <TableCell className="!p-1 w-20">
                  <Checkbox onChange={handleAllRowSelect} />
                </TableCell>
                <TableCell className="!font-bold">Date</TableCell>
                <TableCell className="!font-bold">
                  <Link to="/sales/sales-returns-details">Reference</Link>
                </TableCell>

                <TableCell className="!font-bold">Customer Name</TableCell>
                <TableCell className="!font-bold">Estimate No</TableCell>
                <TableCell className="!font-bold">Status</TableCell>
                <TableCell className="!font-bold">Total Amount</TableCell>
                <TableCell className="!font-bold">Action</TableCell>
                <TableCell className="!font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(() => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : estimates?.map((estimate, index) => {
                    return (
                      <TableRow
                        key={estimate.id}
                        className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer"
                      >
                        <TableCell className="!p-1">
                          <Checkbox
                            value={estimate.id}
                            checked={
                              selectedIds.filter((id) => id === estimate.id)
                                ?.length === 1
                                ? true
                                : false
                            }
                            onChange={() => handleSelectRow(estimate.id)}
                          />
                        </TableCell>
                        <TableCell>
                          {moment(estimate.date).format("lll")}
                        </TableCell>
                        <TableCell>{estimate.reference_no}</TableCell>
                        <TableCell>{estimate?.customer?.name}</TableCell>
                        <TableCell>{estimate?.estimate_no}</TableCell>
                        <TableCell>
                          {estimate?.customer_estimate_status === "Pending"
                            ? "Draft"
                            : estimate?.customer_estimate_status}
                        </TableCell>
                        <TableCell>{estimate?.total_amount}</TableCell>
                        <TableCell className="!p-1">
                          {estimate?.approved_by_manager ? (
                            <Chip color="success" label="Approved" />
                          ) : (
                            <Chip
                              color="error"
                              label="Pending"
                              onClick={() =>
                                approve({ estimate_id: estimate?.id })
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="!p-1">
                          <IconButton
                            onClick={() =>
                              navigate("/sales/add-estimate", {
                                state: { estimate_id: estimate?.id },
                              })
                            }
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          {estimates?.length === 0 && (
            <Box className="flex flex-col justify-center items-center h-full py-12 gap-3">
              <img src={NotFound} alt="" />
              <p className="text-3xl font-semibold">No Data Found</p>
            </Box>
          )}

          {estimatesListData && estimatesListData?.data?.total_pages !== 1 && (
            <span className="flex justify-center p-1">
              <Pagination
                page={estimatesListData?.data?.current_page || 0}
                size="large"
                count={estimatesListData?.data?.total_pages || 0}
                variant="outlined"
                color="primary"
                onChange={handleChange}
              />
            </span>
          )}
        </TableContainer>
      </div>
    </>
  );
};

export default Quotes;
