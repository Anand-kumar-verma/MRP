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
import { baseUrl } from "../../URls";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URLS } from "../../Config/apiUrls";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loding from "../../Loding";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const navigate = useNavigate();
  const [customer, setcustomer] = React.useState([]);
  const [dummy, setDummy] = React.useState();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [subData, setSubData] = React.useState({});
  const [loding, setloding] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);

  async function searchDataApi() {
    setloding(true);
    try {
      const response = await axios.get(
        `${baseUrl}${API_URLS.create_get_customer_api}?page=${page}&count=${pageCount}&search=${searchValue}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setcustomer(response?.data?.data);
      setSubData(response?.data);

      console.log(response);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  React.useEffect(() => {
    searchDataApi();
  }, [searchValue]);

  async function getcustomerFn() {
    setloding(true);
    try {
      const response = await axios.get(
        `${baseUrl}${API_URLS.create_get_customer_api}?page=${page}&count=${pageCount}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setcustomer(response?.data?.data);
      setSubData(response?.data);

      console.log(response);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  React.useEffect(() => {
    getcustomerFn();
  }, [dummy, page, pageCount]);

  //global checkbox
  function globalCheckBox() {
    if (checkedBox.length === customer.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(
        customer.map((singleItem, index) => {
          return Number(singleItem._id);
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

  async function deleteFunctionCalled() {
    // console.log(checkedBox)

    if (window.confirm("Are You Confirm ?") === true) {
      setloding(true);
      // console.log(`${baseUrl}${API_URLS.delete_customer_by_id}?ids=${checkedBox}`)
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_customer_by_id}?ids=${checkedBox}`,
          {
            headers: {
              Authorization: localStorage.getItem("erp_token"),
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.message) {
          setDummy(response);
          setCheckedBox([]);
          toast.success("Customer Deleted Successfully");
        }
      } catch (e) {
        console.log(e);
        toast.warn("Something went wrong");
      }
      setloding(false);
    }
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
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "Email", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Mobile",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Created Date",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Updated Date",
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
          className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400  rounded-lg "
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>

        <div className="flex gap-1">
          <Button
            onClick={deleteFunctionCalled}
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
            onClick={() => navigate("/contact/create-contact")}
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
                        checkedBox.length === customer.length
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
                {customer.length === 0 ? (
                  <div className="flex w-full justify-center">
                    <p>No Data Found</p>
                  </div>
                ) : (
                  customer?.map((row, index) => (
                    <StyledTableRow
                      className="hover:!bg-purple-200"
                      // onClick={()=>navigate(`/show-details/${row?._id}`)}
                      key={index}
                    >
                      <StyledTableCell component="th" scope="row">
                        <div className=" flex justify-center">
                          <span
                            onClick={() =>
                              singleCheckBox(Number(row?._id))
                            }
                          >
                            <Checkbox
                              checked={
                                checkedBox.includes(Number(row?._id))
                                  ? true
                                  : false
                              }
                            />
                          </span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.customer_name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <span
                          className="!text-blue-600 cursor-pointer"
                          onClick={() =>
                            navigate(`/customer-details/${row?._id}`)
                          }
                        >
                          {row?.customer_email}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.customer_mobile}
                      </StyledTableCell>
                      <StyledTableCell align="">
                        {new Date(row?.createdAt).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="">
                        {new Date(row?.updatedAt).toDateString()}
                      </StyledTableCell>
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
      {/* {
                    openCustomDialogBox && 
                    <CustomDialogBox
                        openCustomDialogBox = {openCustomDialogBox}
                        setOpenCustomDialogBox = {setOpenCustomDialogBox}
                        component = {<AddUnits setOpenCustomDialogBox = {setOpenCustomDialogBox} setDummy = {setDummy}/>}
                        title = "Add Units"
                    />
                } */}
    </>
  );
}
