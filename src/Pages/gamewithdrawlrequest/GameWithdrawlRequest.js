import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, TablePagination, TextField } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
const GameWithdrawlRequest = () => {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [data, setData] = useState([]);
  const client = useQueryClient();
  const [from_date, setFrom_date] = useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  const [to_date, setTo_date] = useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );

  const withdrawlRequestFunction = async () => {
    setloding(true);
    if (!from_date || !to_date) return toast("Both date should be selected");
    try {
      const res = await axiosInstance.post(API_URLS?.withdrawl_Request, {
        from_date: from_date,
        to_date: to_date,
      });
      setData(res?.data?.data || []);
      // if (res) {
      //   setTo_date("");
      //   setFrom_date("");
      // }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    withdrawlRequestFunction();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, data]);

  const changeStatusApprovedFunction = async (id) => {
    try {
      const res = await axiosInstance.put(
        `${API_URLS?.withdrawl_approved}?id=${id}`
      );
      if (res) withdrawlRequestFunction();
      toast(res?.data?.message);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const changeStatusRejectFunction = async (id) => {
    try {
      const res = await axiosInstance.put(
        `${API_URLS?.withdrawl_reject}?id=${id}`
      );
      if (res) withdrawlRequestFunction();
      toast(res?.data?.message);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const tablehead = [
    <span>Id</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Amount</span>,
    <span>Admin Charge</span>,
    <span>Pay Amount</span>,
    <span>Account No</span>,
    <span>IFSC</span>,
    <span>Status</span>,
    <span>Date</span>,
    <span>Type</span>,
    <span>Action</span>,
  ];

  const tablerow = visibleRows?.map((i) => {
    return [
      <span>{i?.id}</span>,
      <span>{i?.uname}</span>,
      <span>{i?.fullname}</span>,
      <span>{i?.m_w_admin}</span>,
      <span>
        {Number(
          Number(i?.m_w_admin || 0) + Number(i?.m_w_tdscharges || 0) || 0
        )?.toFixed(2)}
      </span>,
      <span>{i?.amount}</span>,
      <span>{i?.acno}</span>,
      <span>{i?.ifsc}</span>,
      <span>
        {i?.status === "0"
          ? "Pending"
          : i?.status === "1"
          ? "Approved"
          : "Reject"}
      </span>,
      <span>{moment(i?.request_date)?.format("DD-MM-YYYY")}</span>,
      <span>{"Bonus Incentive"}</span>,
      <div className="flex flex-col gap-1">
        <Button
          variant="contained"
          className="!bg-[#198754]"
          onClick={() => changeStatusApprovedFunction(i?.id)}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          className="!bg-[#dc3545]"
          onClick={() => changeStatusRejectFunction(i?.id)}
        >
          Reject
        </Button>
      </div>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
        <span className="font-bold">From:</span>
        <TextField
          type="date"
          size="small"
          value={from_date}
          onChange={(e) => setFrom_date(e.target.value)}
        />
        <span className="font-bold">To:</span>
        <TextField
          type="date"
          size="small"
          value={to_date}
          onChange={(e) => setTo_date(e.target.value)}
        />
        <Button
          onClick={() => withdrawlRequestFunction()}
          variant="contained"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <TablePagination
        rowsPerPageOptions={[8, 10, 20, 50]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default GameWithdrawlRequest;
