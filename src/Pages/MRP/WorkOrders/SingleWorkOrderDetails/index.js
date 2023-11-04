import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../../Loding";
import MenuItem from "@mui/material/MenuItem";
import { manufacturingProcessFn } from "../../../../Services/Manufacturing/CreateManufacturingProcess";
import { getSingleManufacturingOrderDetails } from "../../../../Services/MRP/JobCards/WorkOrderList/SingleManufacturingOrderDetails";
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


const SingleWorkOrderDetails = () => {

  const {order_id} = useParams()
  // console.log(order_id)
  
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);

  const [bomProductDetailsList, setBomProductDetailsList] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [Id, setId] = useState(1);

  const [planedQuantity, setPlanedQuantity] = useState(1);
  const [calculatedData, setCalculatedData] = useState([]);
  const [calculatedDataOfOperation, setcalculatedDataOfOperation] = useState([]);

  const [ingredientsArray,setingredientsArray] = useState([])
  const [operationsArray,setoperationsArray] = useState([])

  function multiplyTimeString(timeString, multiplier) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const newTotalSeconds = totalSeconds * multiplier;
    const newHours = Math.floor(newTotalSeconds / 3600);
    const remainingSeconds = newTotalSeconds % 3600;
    const newMinutes = Math.floor(remainingSeconds / 60);
    const newSeconds = remainingSeconds % 60;
  
    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
  
    return formattedTime;
  }



function saveFunctionCalled(message) {
    handleSubmit((data) => {
      manufacturingProcessFn({
        formData: data,
        setloding,
        navigate,
        link: message === "save" ? "/sales-order_list" : "/sales-order",
        reset,
      });
    })();
  }

  useEffect(() => {
    getSingleManufacturingOrderDetails({
      setloding,
      setData:setBomProductDetailsList,
      id:order_id,
      setingredientsArray,
      setoperationsArray
    });
  }, []);

  console.log(bomProductDetailsList)

  useEffect(() => {

    // console.log(bomProductDetailsList?.ingredients)
    if (bomProductDetailsList) {
      const updatedCalculatedData = ingredientsArray.map(
        (singleData, index) => ({
          name: singleData?.name,
          notes: singleData?.notes,
          quantity:  Number(singleData?.planned_qty),
          cost: singleData?.cost ,
          available: singleData?.availability,
        })
      );
      setCalculatedData(updatedCalculatedData);
  
      const updatedCalculatedDataOfOperation = operationsArray.map(
        (singleData, index) => ({
          operationSteps: singleData?.operation_step,
          resource: singleData?.resource,
          planed: singleData?.planned_time,
          cost: singleData?.cost ,
          status: singleData?.status,
        })
      );
      setcalculatedDataOfOperation(updatedCalculatedDataOfOperation);
    }
  }, [ingredientsArray]);
  

  // console.log(calculatedData)
  // console.log(bomProductDetailsList)

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
    { id: "name", label: "Material", minWidth: 170 },
    { id: "image", label: "Notes", minWidth: 170 },
    { id: "code", label: "Qnt", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Cost",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Avalibility",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
            <div className="h-full flex flex-col justify-between ">
              <form className="flex flex-col justify-evenly overflow-auto">
                <div className="grid grid-cols-3 gap-5 pt-10">
                  <TextField
                    required
                    id="outlined-required"
                    label="Mf. Order No."
                    placeholder="Enter the Suplier"
                    type="text"
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={bomProductDetailsList?.mo_number}
                    // {...register("manufacturing_order_no")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Production Deadline"
                    type="text"
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={new Date(bomProductDetailsList?.end_time).toDateString()}
                    // {...register("production_deadline")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Created Date"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={new Date(bomProductDetailsList?.created_at).toDateString()}
                    // {...register("created_date")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Product"
                    type="text"
                   
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={bomProductDetailsList?.product_name}
                    // {...register("bom_id")}
                    // onChange={(e) => setId(e.target.value)}
                  >
                   
                    {/* {bomProductDetailsList.map((singleItem, index) => {
                      return (
                        <MenuItem key={index} value={singleItem.bom_id}>
                          <span className="pr-3">
                            {singleItem.product_name}
                          </span>
                        </MenuItem>
                      );
                    })} */}
                  </TextField>

                  <TextField
                    required
                    id="outlined-required"
                    label="Planed Quantity"
                    placeholder="Planed Quantity"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // value={planedQuantity}
                    defaultValue={bomProductDetailsList?.planned_qty}

                    // onChange={(e) =>
                    //   setPlanedQuantity(parseInt(e.target.value))
                    // }
                    // {...register('planed_quantity')}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Actual Quantity"
                    placeholder="Actual Quantity"
                    type="number"
                    // defaultValue={0.0}
                    InputLabelProps={{
                      shrink: true,
                    }}

                    defaultValue={bomProductDetailsList?.quantity_produced}
                    // {...register("actual_quantity")}
                  />
                </div>

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  {Id !== null && (
                    <p className="pt-3 text-xl font-bold">Ingredients</p>
                  )}

                 
                   
                      <Paper
                        sx={{
                          width: "100%",
                          overflow: "hidden",
                          height: "100%",
                        }}
                      >
                        <TableContainer sx={{ maxheight: "100%" }}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead className="!bg-purple-300" style={{ height: "40px" }}>
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
                              {calculatedData.length === 0 ? (
                                <div className="flex w-full justify-center">
                                  <p>No Data Found</p>
                                </div>
                              ) : (
                                calculatedData.map((row, index) => (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.name}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.notes}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                      {row?.quantity || ". . . . . ."} pcs
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                      {row?.cost || ". . . . . ."}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                      {row?.available}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    

                  {Id !== null && (
                    <p className="pt-3 text-xl font-bold">Operations</p>
                  )}
                  {Id !== null &&
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
                                  Operation Step
                                </TableCell>
                                <TableCell className="!text-black !font-bold !bg-gray-300">
                                  Resource
                                </TableCell>
                                <TableCell className="!text-black !font-bold !bg-gray-300">
                                  Planned/Actual Time
                                </TableCell>
                                <TableCell className="!text-black !font-bold !bg-gray-300">
                                  Cost
                                </TableCell>
                                <TableCell className="!text-black !font-bold !bg-gray-300">
                                  Step
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {calculatedDataOfOperation.length === 0 ? (
                                <div className="flex w-full justify-center">
                                  <p>No Data Found</p>
                                </div>
                              ) : (
                                calculatedDataOfOperation.map(
                                  (singleData, index) => (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                        className="capitalize"
                                      >
                                        {singleData?.operationSteps}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                        className="capitalize"
                                      >
                                        {singleData?.resource}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {singleData?.planed || ". . . . . ."}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {singleData?.cost || ". . . . . ."}
                                      </StyledTableCell>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {singleData?.status}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  )
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    }
                </div>
              </form>

              {/* <div className="w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 ">
                <button
                  onClick={() => reset()}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Clear
                </button>

                <button
                  onClick={() => saveFunctionCalled("save")}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => saveFunctionCalled("save_and_new")}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Save and New
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
};

export default SingleWorkOrderDetails;
