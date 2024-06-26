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

export default function Materials() {
  const navigate = useNavigate();
  const [product, setproduct] = React.useState([]);
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
        `${baseUrl}${API_URLS.create_bom_api}?page=${page}&count=${pageCount}&search=${searchValue}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setproduct(response?.data?.data);
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

  async function getmaterialsFn() {
    setloding(true);
    try {
      const response = await axios.get(
        `${baseUrl}${API_URLS.create_bom_api}?page=${page}&count=${pageCount}`,
        {
          headers: {
            Authorization: localStorage.getItem("erp_token"),
            "Content-Type": "application/json",
          },
        }
      );
      setproduct(response?.data?.data);
      setSubData(response?.data);

      console.log(response);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  React.useEffect(() => {
    getmaterialsFn();
  }, [dummy, page, pageCount]);

  // console.log(subData)

  //global checkbox
  function globalCheckBox() {
    if (checkedBox.length === product.length) {
      setCheckedBox([]);
    } else {
      setCheckedBox(
        product.map((singleItem, index) => {
          return Number(singleItem.bom_id);
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
    console.log(checkedBox);

    if (window.confirm("Are You Confirm ?") === true) {
      setloding(true);
      // console.log(`${baseUrl}${API_URLS.delete_vendor_by_id}?ids=${checkedBox}`)
      try {
        const response = await axios.delete(
          `${baseUrl}${API_URLS.delete_product_by_id}?ids=${checkedBox}`,
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
          toast.success("Product Deleted Successfully");
        }
      } catch (e) {
        console.log(e);
        toast.warn("Something went wrong");
      }
      setloding(false);
    }
  }

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "Category", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Units",
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
    {
      id: "timeLine",
      label: "Time Line",
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
            onClick={() => navigate("/create-materials")}
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
                {product.length !== 0 ? (
                  <div className="flex w-full justify-center">
                    <p>No Data Found</p>
                  </div>
                ) : (
                  [
                    {
                      bom_id:1,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:2,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:3,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:4,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:5,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:6,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:7,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:8,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:9,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:10,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:11,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:12,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },

                    {
                      bom_id:13,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:14,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },
                    {
                      bom_id:15,
                      material_name:"Wood",
                      category:"Medium",
                      unit_of_measure:"pcs",
                      created_at:"2024-12-12",
                      updated_at:"2024-12-01",
                      timeline:"2024-12-01"
                    },

                  ].map((row, index) => (
                    <StyledTableRow key={index} className="hover:!bg-purple-200">
                      <StyledTableCell component="th" scope="row">
                        <div className=" flex justify-center">
                          <span
                            onClick={() => singleCheckBox(Number(row?.bom_id))}
                          >
                            <Checkbox
                              checked={
                                checkedBox.includes(Number(row?.bom_id))
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
                          className="cursor-pointer text-blue-800"
                          onClick={() =>
                            navigate(
                              `/material/material-details/${row?.bom_id}`
                            )
                          }
                        >
                          {row?.material_name}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="capitalize"
                      >
                        {row?.category}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.unit_of_measure}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {new Date(row?.created_at).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {new Date(row?.updated_at).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.timeline}
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
