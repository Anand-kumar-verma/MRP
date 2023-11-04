import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { manufacturingProcessFn } from "../../../Services/Manufacturing/CreateManufacturingProcess";
import { getBomProductDetailsList } from "../../../Services/BOM/GetProductBomDetails";
import Loding from "../../../Loding";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
const CreateProject = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState("");
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);
  const [loding, setloding] = useState(false);

  const [bomProductDetailsList, setBomProductDetailsList] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();

  const [planedQuantity, setPlanedQuantity] = useState(1);
  const [phases, setPhases] = useState([]);


  console.log(value);

  function multiplyTimeString(timeString, multiplier) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const newTotalSeconds = totalSeconds * multiplier;
    const newHours = Math.floor(newTotalSeconds / 3600);
    const remainingSeconds = newTotalSeconds % 3600;
    const newMinutes = Math.floor(remainingSeconds / 60);
    const newSeconds = remainingSeconds % 60;

    const formattedTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;

    return formattedTime;
  }

  function saveFunctionCalled(message) {
    handleSubmit((data) => {
      if (data.manufacturing_order_no === "")
        return toast.warn("Enter the Mf. Order No. ");
      if (data.production_deadline === "")
        return toast.warn("Enter production deadline");
      if (data.created_date === "") return toast.warn("Enter created date");
      if (data.bom_id === "") return toast.warn("Select Product");
      setValue("planned_quantity", `${planedQuantity}`);

      // console.log(data)

      manufacturingProcessFn({
        formData: data,
        setloding,
        navigate,
        link:
          message === "save"
            ? "/mrp/work-orders"
            : "/work-order/create-work-order",
        reset,
      });
    })();
  }

  useEffect(() => {
    getBomProductDetailsList({
      setloding,
      setBomProductDetailsList,
    });
  }, []);

  const handleAddRowForProduction = () => {
    const newRow = {
      id: phases.length + 1,
      phase: 'Phase 1',
      description: 'This is phase 1',
      time_in_days:1,
      start_date: "",
      end_date:"",
    };
    setPhases((prevRows) => [...prevRows, newRow]);
  };

  const handleProductionFieldChange = (rowId, field, value) => {
    setPhases((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(()=>{
    handleAddRowForProduction()
  },[])



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
    { id: "no", label: "S.No.", minWidth: 170 },
    { id: "name", label: "Phase", minWidth: 170 },
    { id: "code", label: "Description", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Time in Days",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "population",
      label: "Start Date",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "population",
      label: "Dead Line",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  //   if (loding) return <Loding />;
  //   else

  return (
    <>
      <div className="w-full h-full overflow-auto flex gap-2">
        <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
          <div className="h-full flex flex-col justify-between overflow-auto ">
            <form className="flex flex-col justify-evenly overflow-auto">
              <div className="overflow-scroll">
                <div className="grid grid-cols-3 gap-5 pt-10">
                  <TextField
                    required
                    id="outlined-required"
                    label="Project Name"
                    placeholder="Enter Project Name"
                    select
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("manufacturing_order_no")}
                  >
                  <MenuItem values ="Project 1">Project 1</MenuItem>
                  <MenuItem values ="Project 2">Project 2</MenuItem>
                  </TextField>
                  <TextField
                    required
                    id="outlined-required"
                    select
                    label="Type of project"
                    className="!w-full"
                    placeholder="select operation"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("created_date")}
                  >
                    {/* <MenuItem value={1}>mile Stone</MenuItem> */}
                    <MenuItem value={1}>strategic</MenuItem>
                    <MenuItem value={2}>tactical</MenuItem>
                    <MenuItem value={3}>operational</MenuItem>
                  </TextField>

                  <TextField
                    required
                    id="outlined-required"
                    label="Start Date"
                    type="date"
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("production_deadline")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="End Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("created_date")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Subproject Of"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("created_date")}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="No of Phases"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("created_date")}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    placeholder="Enter Description"
                    type="text"
                    multiline
                    rows={4}
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("manufacturing_order_no")}
                  />
                </div>

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
                    <TableContainer sx={{ maxheight: "100%" }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead className="!bg-purple-300">
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                className="!text-black !font-bold !bg-gray-300"
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {false ? (
                            <div className="flex w-full justify-center">
                              <p>No Data Found</p>
                            </div>
                          ) : (
                            
                            phases.map((i)=>{
                                return <StyledTableRow>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                className="capitalize"
                              >
                                {i?.id}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                className="capitalize"
                              >
                                <TextField
                                  required
                                  id="outlined-required"
                                  type="text"
                                  value={`${i?.phase}`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  {...register("created_date")}
                                />
                              </StyledTableCell>
                             
                              <StyledTableCell component="th" scope="row">
                                <TextField
                                  required
                                  id="outlined-required"
                                  type="text"
                                  value={`${i?.description}`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  {...register("created_date")}
                                />
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                <TextField
                                  required
                                  id="outlined-required"
                                  type="number"
                                  value={`${i?.time_in_days}`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  {...register("created_date")}
                                />
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                              <TextField
                                  required
                                  name="start_date"
                                  type="date"
                                  value={`${i?.start_date}`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => handleProductionFieldChange(i.id, 'start_date', e.target.value)}
                                />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                              <TextField
                                  required
                                  id="outlined-required"
                                  type="date"
                                  value={`${i?.end_date}`}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => handleProductionFieldChange(i.id, 'end_date', e.target.value)}
                                />
                                </StyledTableCell>
                            </StyledTableRow>
                              })
                            
                            
                          )}
                          {/* <TableCell className="cursor-pointer text-blue-700"
                          onClick={()=>handleAddRowForProduction()}
                          >Add New +</TableCell> */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>

                  <br />
                  <div className="grid grid-cols-2 w-full gap-5">
                    <Paper
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        height: "100%",
                      }}
                    >
                      <TableContainer sx={{ maxheight: "100%" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead className="!bg-purple-300">
                            <TableRow>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Material
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Phase
                              </TableCell><TableCell className="!text-black !font-bold !bg-gray-300">
                                Amount
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Cost
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                In Stock
                              </TableCell>

                              <TableCell className="!text-black !font-bold !bg-gray-300"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {false ? (
                              <div className="flex w-full justify-center">
                                <p>No Data Found</p>
                              </div>
                            ) : (
                              <StyledTableRow>
                              <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    id="outlined-required"
                                   type="text"
                                    className="!w-full"
                                    placeholder="select operation"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                   
                                
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                   <TextField
                                    required
                                    id="outlined-required"
                                   type="text"
                                    className="!w-full"
                                    placeholder="select operation"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    id="outlined-required"
                                    type="number"
                                    className="!w-full"
                                    placeholder="select operation"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                   
                            
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    id="outlined-required"
                                    className="!w-full"
                                    placeholder="10INR"
                                    disabled={true}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                </StyledTableCell>

                                <StyledTableCell component="th" scope="row">
                                  <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    className="!w-full"
                                    placeholder="2"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => setvalue(e.target.value)}
                                    //   {...register("created_date")}
                                  />
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                            {/* <StyledTableRow>
                              <TableCell className="">Add New +</TableCell>
                            </StyledTableRow> */}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                    <Paper
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        height: "100%",
                      }}
                    >
                      <TableContainer sx={{ maxheight: "100%" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead className="!bg-purple-300">
                            <TableRow>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Phase
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Operation
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Workers
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300">
                                Cost
                              </TableCell>
                              <TableCell className="!text-black !font-bold !bg-gray-300"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {false ? (
                              <div className="flex w-full justify-center">
                                <p>No Data Found</p>
                              </div>
                            ) : (
                              <StyledTableRow>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    id="outlined-required"
                                    type="text"
                                    className="!w-full"
                                    placeholder="select operation"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                  
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    id="outlined-required"
                                    type="text"
                                    className="!w-full"
                                    placeholder="select operation"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register("created_date")}
                                  />
                                  
                                </StyledTableCell>

                                <StyledTableCell component="th" scope="row">
                                  <TextField
                                    required
                                    id="outlined-required"
                                   select
                                    className="!w-full"
                                    placeholder="select worker"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => setvalue(e.target.value)}
                                    //   {...register("created_date")}
                                  >
                                    <MenuItem
                                      value={1000}
                                      className="!w-full flex justify-between"
                                    >
                                      <span>Jhon</span>{" "}
                                      <span className="pl-5">
                                        penting(10INR/hrs)
                                      </span>
                                    </MenuItem>
                                    <MenuItem
                                      value={2000}
                                      className="!w-full flex justify-between"
                                    >
                                      <span>Bob</span>{" "}
                                      <span className="pl-5">
                                        penting(20INR/hrs)
                                      </span>
                                    </MenuItem>
                                  </TextField>{" "}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  <TextField
                                    required
                                    id="outlined-required"
                                    name="ads"
                                    disabled={true}
                                    values={value}
                                    defaultValue={`${value} INR`}
                                    className="!w-full"
                                    placeholder="1000 INR"
                                    //   InputLabelProps={{
                                    //     shrink: true,
                                    //   }}
                                    //   {...register("created_date")}
                                  />
                                  {/* {singleData?.cost || ". . . . . ."} */}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {/* {singleData?.status} */}
                                </StyledTableCell>
                              </StyledTableRow>
                            )}
                            {/* <StyledTableRow>
                              <TableCell className="">Add New +</TableCell>
                            </StyledTableRow> */}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
                </div>
              </div>
            </form>
            <div className="w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 ">
              <button
                onClick={() => reset()}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Clear
              </button>

              <button
                onClick={() => setopenCustomDialogBox(true)}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Calculate
              </button>

              <button
                onClick={() => saveFunctionCalled("save_and_new")}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Calculate and Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={<div>
               <h1 className="text-lg font-bold ">Project 1</h1>
                <p>No of Phases: <span className="font-bold">4</span></p>
                 <table>
                    <thead >
                        <tr className="">
                            <td className="text-center border-r-2 font-bold px-5">Phase</td>
                            <td className="text-center border-r-2 font-bold px-5">Workers</td>
                            <td className="text-center border-r-2 font-bold px-5">Total Cost</td>
                            <td className="text-center border-r-2 font-bold px-5">Operation</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center border-r-2 ">1</td>
                            <td className="text-center border-r-2 ">Penting</td>
                            <td className="text-center border-r-2 ">Sumit</td>
                            <td className="text-center border-r-2 ">500 INR</td>
                        </tr>
                        <tr>
                            <td className="text-center border-r-2 ">1</td>
                            <td className="text-center border-r-2 ">Penting</td>
                            <td className="text-center border-r-2 ">Santosh</td>
                            <td className="text-center border-r-2 ">200 INR</td>
                        </tr>
                    </tbody>
                 </table>
                 <p className="mt-5">Total Cost: <sapn className="font-bold text-xl">1200 INR</sapn></p>
          </div>}
          title="Total Cost:"
        />
      )}
    </>
  );
};

export default CreateProject;
