import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { IoIosAddCircle } from "react-icons/io";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loding from "../../../Loding";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteFunctionCalled } from "../../../Services/Product/DeleteProduct";
import { getManufacturingList } from "../../../Services/Manufacturing/CreateManufacturingProcess/GetManufacturingList";
import { changeStatusOfOrder } from "../../../Services/Manufacturing/ChangeStatusOfOrder";

export default function WorkOrders() {
  const navigate = useNavigate();
  const [workOrder, setworkOrder] = React.useState([]);
  const [dummy, setDummy] = React.useState();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [subData, setSubData] = React.useState({});
  const [loding, setloding] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [checkedBox, setCheckedBox] = React.useState([]);

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

  function changeStatusFunction(value, ID) {
    changeStatusOfOrder({
      id: ID,
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
    { id: "name", label: "MO No.", minWidth: 170 },
    { id: "code", label: "Quantity", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Start Date",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Deadline",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Working Stage",
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
            onClick={deleteHandler}
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
            onClick={() => navigate("/work-order/create-work-order")}
            className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
          >
            <span>Add Rows</span>
            <span className="text-[2rem]">
              <IoIosAddCircle />
            </span>
          </p>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
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
                        checkedBox.length === workOrder.length
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
            <TableBody>
              {workOrder?.length === 0 ? (
                <div className="flex w-full justify-center">
                  <p>No Data Found</p>
                </div>
              ) : (
                workOrder?.map((row, index) => (
                  <StyledTableRow key={index} className="hover:!bg-purple-200">
                    <StyledTableCell component="th" scope="row">
                      <div className=" flex justify-center">
                        <span onClick={() => singleCheckBox(Number(row?.id))}>
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
                        onClick={() =>
                          navigate(`/mrp/single-work-order-details/${row?.id}`)
                        }
                        className="text-blue-700 cursor-pointer"
                      >
                        {row?.mo_number}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {row?.quantity_produced}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {new Date(row?.start_time).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {new Date(row?.end_time).toDateString()}
                    </StyledTableCell>
                    {/* <StyledTableCell component="th" scope="row">{row?.working_stage}</StyledTableCell> */}
                    <StyledTableCell component="th" scope="row">
                      <select
                        name="plan"
                        id="plan"
                        className="w-[80%] p-2"
                        onChange={(e) =>
                          changeStatusFunction(e.target.value, row?.id)
                        }
                      >
                        <option
                          value="done"
                          selected={
                            row?.working_stage === "done" ? true : false
                          }
                        >
                          Done
                        </option>

                        <option
                          value="work in progress"
                          selected={
                            row?.working_stage === "work in progress"
                              ? true
                              : false
                          }
                        >
                          Work In Progress{" "}
                        </option>

                        <option
                          value="blocked"
                          selected={
                            row?.working_stage === "blocked" ? true : false
                          }
                        >
                          Blocked{" "}
                        </option>

                        <option
                          value="not started"
                          selected={
                            row?.working_stage === "not started" ? true : false
                          }
                        >
                          Not Started{" "}
                        </option>
                      </select>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
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
    </>
  );
}
