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
import CustomDialogBox from "../../../../src/Shared/CustomDialogBox";
import AddUnits from "./AddUnits";
import { baseUrl } from "../../../URls";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URLS } from "../../../Config/apiUrls";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loding from "../../../Loding";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UnitsandMeasurements() {
  const [unitOfProduct, setUnitOfProduct] = React.useState([]);
  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);
  const [dummy, setDummy] = React.useState();
  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [subData, setSubData] = React.useState({});
  const [loding, setloding] = React.useState(false);
  const [checkedBox, setCheckedBox] = React.useState([]);

  async function getUnitOfProductFn() {
    setloding(true);
    try {
      const response = await axios.get(
        `${baseUrl}${API_URLS.get_unit_of_product}?page=${page}&count=${pageCount}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setUnitOfProduct(response?.data?.units);
      setSubData(response?.data);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  React.useEffect(() => {
    getUnitOfProductFn();
  }, [dummy, page, pageCount]);

  //global checkbox
  function globalCheckBox() {
    if (checkedBox.length === unitOfProduct.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(
        unitOfProduct.map((singleItem, index) => {
          return Number(singleItem.id);
        })
      );
    }
  }

  function singleCheckBox(id) {
    if (checkedBox.includes(id)) {
      const filteredData = checkedBox.filter((item) => item !== Number(id));
      setCheckedBox(filteredData);
    } else {
      setCheckedBox([...checkedBox, Number(id)]);
    }
  }

  async function deleteFunctionCalled() {
    if (window.confirm("Are You Confirm ?") === true) {
      setloding(true);
      console.log(
        `${baseUrl}${API_URLS.delete_units_and_measurements}?ids=${checkedBox}`
      );
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_units_and_measurements}?ids=${checkedBox}`,
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
          toast.success("Units Deleted Successfully");
        }
      } catch (e) {
        console.log(e);
        toast.warn("Something went wrong");
      }
      setloding(false);
    }
  }

  // table data
  const columns = [
    { id: "name", label: "Unit Name", minWidth: 170 },
    { id: "code", label: "Created At", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Updated At",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Description",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
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
  return (
    <>
      <div className="w-full flex justify-end pr-4 pb-1 text-white gap-2 mt-1">
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
          onClick={() => setOpenCustomDialogBox(true)}
          component="th"
          scope="row"
          className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
        >
          <span>Add Rows</span>
          <span className="text-[2rem] ">
            <IoIosAddCircle />
          </span>
        </p>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
        <TableContainer sx={{ maxheight: "100%", height: "100%" }}>
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
                        checkedBox.length === unitOfProduct.length
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
              <div className="w-full h-[100%] flex items-center justify-center">
                <Loding />
              </div>
            ) : (
              <TableBody>
                {unitOfProduct.map((row, index) => (
                  <StyledTableRow key={index} className="hover:!bg-purple-200">
                    <StyledTableCell component="th" scope="row">
                      <div className=" flex justify-center">
                        <span onClick={() => singleCheckBox(Number(row?.id))}>
                          <Checkbox
                            disabled={row?.default === true ? true : false}
                            checked={
                              row?.default !== true &&
                              checkedBox.includes(row?.id)
                                ? true
                                : false
                            }
                          />
                        </span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.unit_name}
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {new Date(row?.created_at).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {new Date(row?.updated_at).toDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="" className="capitalize">
                      {row?.description}
                    </StyledTableCell>
                    {/* <StyledTableCell align="" className='!flex !text-red-600'>
                   <span className='cursor-pointer text-[1.5rem]'
                   ><AiFillDelete/></span>
                  </StyledTableCell> */}
                  </StyledTableRow>
                ))}
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
      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <AddUnits
              setOpenCustomDialogBox={setOpenCustomDialogBox}
              setDummy={setDummy}
            />
          }
          title="Add Units"
        />
      )}
    </>
  );
}
