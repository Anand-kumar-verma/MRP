import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoIosAddCircle } from "react-icons/io";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loding from "../../../Loding";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { changeStatus } from "../../../Services/Product/ChangeStatus";
import { deleteFunctionCalled } from "../../../Services/Purchase/DeletePurchaseOrder";
import { getPurchaseOrderList } from "../../../Services/Purchase/GetPurchaseOrderListPagination";
import { searchDataApi } from "../../../Services/Purchase/SearchPurchaseOrder";
import axiosInstance from "../../../Config/axios";
import { toast } from "react-toastify";

export default function PurhaseOrderList() {
  const navigate = useNavigate();
  const [product, setproduct] = React.useState([]);
  const [dummy, setDummy] = React.useState();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [subData, setSubData] = React.useState({});
  const [loding, setloding] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);

  React.useEffect(() => {
    searchDataApi({
      setloding,
      page,
      pageCount,
      searchValue,
      setproduct,
      setSubData,
    });
  }, [searchValue]);

  React.useEffect(() => {
    getPurchaseOrderList({
      setloding,
      setproduct,
      setSubData,
      page,
      pageCount,
    });
  }, [dummy, page, pageCount]);

  //global checkbox

  const createInvoice = (id) => {
    const fd = new FormData();
    fd.append("order_id", id);
    axiosInstance
      .post(`purchase-invoice-list/`, fd)
      .then((response) => {
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function globalCheckBox() {
    if (checkedBox.length === product.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(
        product.map((singleItem, index) => {
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

  function handleDelete() {
    deleteFunctionCalled({
      checkedBox,
      setloding,
      setDummy,
      setCheckedBox,
    });
  }

  function changeStatusFunction(value, id) {
    changeStatus({
      order_id: id,
      status: value,
      setloding,
      setdummy: setDummy,
    });
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "8px 16px", // Adjust the padding values as needed
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const columns = [
    { id: "name", label: "Order Id", minWidth: 170 },
    { id: "code", label: "Name", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Exp-Date",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Order Amount(Rs)",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Payment",
      minWidth: 170,
      align: "",
      format: (value) => value.toFixed(2),
    },
    {
      id: "timeLine",
      label: "Order Status",
      minWidth: 170,
      minWidth: 170,
      align: "",
      format: (value) => value.toFixed(2),
    },
    {
      id: "timeLine",
      label: "Invoice",
      minWidth: 170,
      align: "",
      format: (value) => value.toFixed(2),
    },
  ];

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
            onClick={handleDelete}
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
            onClick={() => navigate("/purchase-order")}
            component="th"
            scope="row"
            className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
          >
            <span>Add Rows</span>
            <span className="text-[2rem]">
              <IoIosAddCircle />
            </span>
          </p>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between">
        <Paper sx={{ width: "100%", overflow: "scroll", height: "100%" }}>
          <TableContainer sx={{ maxheight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="!bg-purple-300">
                <TableRow>
                  <TableCell
                    key="checkbox"
                    align="center"
                    style={{ minWidth: "auto" }}
                    className="!text-black !font-bold !bg-purple-300"
                  >
                    <span onClick={() => globalCheckBox()}>
                      <Checkbox
                        checked={
                          checkedBox.length !== 0 &&
                          checkedBox.length === product.length
                            ? true
                            : false
                        }
                      />
                    </span>
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="!text-black !font-bold !bg-purple-300"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loding ? (
                <div className="w-[100%] h-[100%] flex items-center justify-center">
                  <Loding />
                </div>
              ) : (
                <TableBody>
                  {product.length === 0 ? (
                    <div className="flex w-full justify-center">
                      <p>No Data Found</p>
                    </div>
                  ) : (
                    product.map((row, index) => (
                      <StyledTableRow key={index} className="hover:!bg-purple-200">
                        <StyledTableCell component="th" scope="row">
                          <div className=" flex justify-center">
                            <span
                              onClick={() => singleCheckBox(Number(row?.id))}
                            >
                              <Checkbox
                                checked={
                                  checkedBox.includes(Number(row?.id))
                                    ? true
                                    : false
                                }
                              />
                            </span>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          <span
                            className="cursor-pointer text-blue-700"
                            onClick={() =>
                              navigate(
                                `/sales/single-purchase-order-details/${row?.id}`
                              )
                            }
                          >
                            {row?.order_id}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize !text-blue-700"
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/show-details/${row?.vendor_id}`)
                            }
                          >
                            {row?.vendor_name}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {new Date(row?.expected_date).toDateString()}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {row?.total_order_amount}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {row?.is_paid}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {/* {row?.order_status} */}

                          <select
                            name="plan"
                            id="plan"
                            className="w-[80%] p-2"
                            onChange={(e) =>
                              changeStatusFunction(e.target.value, row?.id)
                            }
                          >
                            <option
                              value="pending"
                              selected={
                                row?.order_status === "pending" ? true : false
                              }
                            >
                              Pending
                            </option>
                            <option
                              value="completed"
                              selected={
                                row?.order_status === "completed" ? true : false
                              }
                            >
                              Completed{" "}
                            </option>
                          </select>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize hover:bg-green-300 hover:py-2 hover:px-2 hover:rounded"
                          onClick={() => createInvoice(row?.id)}
                        >
                          Create Invoice
                        </StyledTableCell>

                        {/* <StyledTableCell component="th" scope="row">{row?.timeline}</StyledTableCell> */}
                        {/* <StyledTableCell align="" className='!flex !text-red-600'>
                              <span className='cursor-pointer text-[1.5rem]'
                              ><AiFillDelete/></span>
                              </StyledTableCell> */}
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>

        <div className="!flex  gap-2  !text-[1.2rem] justify-end pr-2 py-2  items-center bg-purple-300">
          <div className="flex gap-1 items-center">
            <span className="">Items per pages</span>
            <select
              className="outline-none"
              onChange={(e) => setPageCount(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <span>{page}</span>
            <span>of</span>
            <span>{subData?.total_pages}</span>
            <span
              className="!text-sm cursor-pointer"
              onClick={() => (page - 1 <= 0 ? 1 : setPage(page - 1))}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </span>
            &nbsp;
            <span
              className="cursor-pointer"
              onClick={() =>
                subData?.total_pages < page + 1
                  ? subData?.total_pages
                  : setPage(page + 1)
              }
            >
              <ArrowForwardIosIcon fontSize="small" color="black" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
