import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loding from "../../../../Loding";
import MenuItem from "@mui/material/MenuItem";
import { manufacturingProcessFn } from "../../../../Services/Manufacturing/CreateManufacturingProcess";
import { getBomProductDetailsList } from "../../../../Services/BOM/GetProductBomDetails";
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
const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);

  const [bomProductDetailsList, setBomProductDetailsList] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [Id, setId] = useState(null);

  const [planedQuantity, setPlanedQuantity] = useState(1);
  const [calculatedData, setCalculatedData] = useState([]);
  const [calculatedDataOfOperation, setcalculatedDataOfOperation] = useState(
    []
  );

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

  useEffect(() => {
    if (Id !== null) {
      const updatedCalculatedData = bomProductDetailsList
        .find((singleItem) => singleItem?.bom_id === Id)
        ?.materials.map((singleData, index) => ({
          name: singleData?.name,
          notes: singleData?.notes,
          quantity: planedQuantity * Number(singleData?.quantity),
          cost: singleData?.cost * planedQuantity,
          available: singleData?.available,
        }));
      setCalculatedData(updatedCalculatedData);

      const updatedCalculatedDataOfOperation = bomProductDetailsList
        .find((singleItem) => singleItem?.bom_id === Id)
        ?.operations.map((singleData, index) => ({
          operationSteps: singleData?.operations_step,
          resource: singleData?.resource,
          planed: multiplyTimeString(singleData?.planned, planedQuantity),
          cost: singleData?.cost * planedQuantity,
          status: singleData?.status,
        }));
      setcalculatedDataOfOperation(updatedCalculatedDataOfOperation);
    }
  }, [planedQuantity, Id, bomProductDetailsList]);

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
                    placeholder="Enter Mf. Order No."
                    type="text"
                    sx={{ color: "red" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("manufacturing_order_no")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Production Deadline"
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
                    label="Created Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("created_date")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Product"
                    type="text"
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("bom_id")}
                    onChange={(e) => setId(e.target.value)}
                  >
                    {bomProductDetailsList.map((singleItem, index) => {
                      return (
                        <MenuItem key={index} value={singleItem.bom_id}>
                          <span className="pr-3">
                            {singleItem.product_name}
                          </span>
                        </MenuItem>
                      );
                    })}
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
                    defaultValue={1}
                    // value={planedQuantity}

                    onChange={(e) =>
                      setPlanedQuantity(parseInt(e.target.value))
                    }
                    // {...register('planed_quantity')}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Actual Quantity"
                    placeholder="Actual Quantity"
                    type="number"
                    defaultValue={0.0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("actual_quantity")}
                  />
                </div>

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  {Id !== null && (
                    <p className="pt-3 text-xl font-bold">Ingredients</p>
                  )}

                  {Id !== null && (
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
                                    {row?.quantity || ". . . . . ."}
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
                  )}

                  {Id !== null && (
                    <p className="pt-3 text-xl font-bold">Operations</p>
                  )}
                  {Id !== null && (
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
                                    <StyledTableCell component="th" scope="row">
                                      {singleData?.planed || ". . . . . ."}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                      {singleData?.cost || ". . . . . ."}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
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
                  )}
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CreateWorkOrder;
