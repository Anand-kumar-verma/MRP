import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Loding";
import Avatar from "@mui/material/Avatar";
import { getSingleProductOrderDetailsFn } from "../../../Services/Product/SingleProductDetails";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
const SingleProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate()
  const [loding, setloding] = useState(false);
  const [button, setButton] = useState(0);
  const [isMade, setIsMade] = useState(false);

  const [dataOrder, setdataOrder] = useState([]);
  const [materials, setmaterials] = useState([]);
  const [operations, setoperations] = useState([]);
  const [variants, setvariants] = useState([]);

  const [totalSellingPrice, settotalSellingPrice] = useState(0.0);
  const [totalPurchasingPrice, settotalPurchasingPrice] = useState(0.0);
  const [totalInStock, setotalInStock] = useState(0);

  const [totalBomQnt, settotalBomQnt] = useState(0);
  const [totaloperationCost, settotaloperationCost] = useState(0);
  const [totalTimeInOperation, settotalTimeInOperation] = useState(0);

  function addTotalTime(operations) {
    let totalSeconds = 0;
    for (const operation of operations) {
      const timeParts = operation.time.split(':');
      if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);
  
        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
          totalSeconds += hours * 3600 + minutes * 60 + seconds;
        }
      }
    }
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }


  useEffect(() => {
    getSingleProductOrderDetailsFn({
      setloding,
      id: product_id,
      setData: setdataOrder,
      setmaterials,
      setoperations,
      setvariants,
    });
  }, [product_id]);

  useEffect(() => {
    setIsMade(dataOrder?.is_made);
  }, [dataOrder]);

  useEffect(()=>{
    settotalSellingPrice(  variants.reduce((accumulator, row) => accumulator + Number(row.selling_price), 0))
    settotalPurchasingPrice(variants.reduce((accumulator, row) => accumulator + Number(row.purchasing_price), 0))
    setotalInStock(variants.reduce((accumulator, row) => accumulator + Number(row.in_stock), 0))
  },[variants])

  useEffect(()=>{
    settotalBomQnt(  materials.reduce((accumulator, row) => accumulator + Number(row.quantity), 0))
  },[materials])

  useEffect(()=>{
    settotaloperationCost(operations.reduce((accumulator, row) => accumulator + Number(row.cost), 0))
    settotalTimeInOperation(addTotalTime(operations))
},[operations])


  
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
  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full overflow-auto flex flex-col justify-between border-2 border-gray-200">
            <p className="py-2  font-poppins font-bold bg-blue-200 flex items-center justify-between px-5">
              <span className="text-2xl">
                <span>Product Details :</span>
                <span className="text-blue-400 cursor-pointer text-sm pl-5"
                onClick={()=>navigate(`/product/update-product-details/${product_id}`)}
                >edit</span>
              </span>
              <p className="flex">
                {isMade
                  ? ["General Info", "BOM", "Production Operation"].map(
                      (singleItem, index) => {
                        return (
                          <span
                            onClick={() => setButton(index)}
                            key={index}
                            className={`${
                              button === index && "bg-white"
                            } cursor-pointer px-4 py-2 rounded-lg`}
                          >
                            {singleItem}
                          </span>
                        );
                      }
                    )
                  : ["General Info"].map((singleItem, index) => {
                      return (
                        <span
                          onClick={() => setButton(index)}
                          key={index}
                          className={`${
                            button === index && "bg-white"
                          } cursor-pointer px-4 py-2 rounded-lg`}
                        >
                          {singleItem}
                        </span>
                      );
                    })}
              </p>
            </p>
            <div className=" flex flex-col justify-between overflow-auto h-[90%] ">
              <form className="flex flex-col justify-evenly overflow-auto  pt-50">
                <div>
                  {button === 0 && (
                    <div>
                      <div className="grid grid-cols-3 gap-5 mt-10">
                        <TextField
                          required
                          id="outlined-required"
                          label="Product Name"
                          placeholder="Enter product name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          //   {...register('name')}
                          defaultValue={dataOrder?.product_name}
                        />

                        <TextField
                          required
                          id="outlined-required"
                          label="Scope"
                          type="text"
                          placeholder="Enter Scope"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          //   {...register('scope')}
                          defaultValue={dataOrder?.scope}
                        />
                        <div className="row-span-3  h-full w-full border-2 flex justify-center items-center relative">
                          <div
                            className="
                                       w-[50%] h-[50%]
                                        flex justify-center items-center overflow-auto relative"
                          >
                            <Avatar
                              sx={{ width: "100px", height: "100px" }}
                              alt="Cindy Baker"
                              src={dataOrder?.product_image}
                            />
                          </div>
                        </div>

                        <TextField
                          required
                          id="outlined-required"
                          label="Time Line"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          //   {...register('timeline')}
                          defaultValue={new Date(
                            dataOrder?.timeline
                          ).toDateString()}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Category"
                          placeholder="Enter the product category"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={dataOrder?.category}
                          //   {...register('category')}
                        >

                        </TextField>
                        <TextField
                          id="outlined-required"
                          label="Description"
                          placeholder="Enter the description"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={dataOrder?.description}
                        />
                        <div className="border-2 rounded-lg flex items-center pl-4 gap-3">

                          <p className="w-full flex items-center justify-center font-bold">
                            {isMade ? "I Make" : "I Purchase"}
                          </p>
                        </div>
                      </div>

                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Add Varients of Products:</p>
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
                                    Variant
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Selling Price
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Purchasing Price
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    In Stock
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {variants.map((row, index) => (
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
                                      {row?.selling_price}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.purchasing_price}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.in_stock}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                        <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Selling Price:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalSellingPrice}
                            </span>
                            <span> Rs.</span>
                          </span>
                        </p>
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Purchasing Price:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalPurchasingPrice}
                            </span>
                            <span> Rs.</span>
                          </span>
                        </p>
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total In Stock:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalInStock}
                            </span>
                            <span> pcs</span>
                          </span>
                        </p>

                        <hr />
                      </p>
                      </div>
                    </div>
                  )}
                  {button === 1 && (
                    <div>
                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Added material of Products:</p>
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
                                    Items
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Notes
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Quantity
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {materials.map((row, index) => (
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
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.quantity}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </div>

                      <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <span className="">
                          <hr />
                          <hr />
                          <hr />
                          <hr />

                          <p className=" gap-8 py-2 grid grid-cols-2">
                            <span className="font-bold !text-lg">
                              Quantity:
                            </span>
                            <span className="">
                              <span className="font-bold !text-lg">
                                {totalBomQnt}
                              </span>
                              <span>pcs</span>
                            </span>
                          </p>
                          <hr />
                        </span>
                      </p>
                    </div>
                  )}

                  {button === 2 && (
                    <div>
                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Added Operations:</p>

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
                                    Operation Name
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Resource
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Cost/Unit
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Cost
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Time
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {operations.map((row, index) => (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.operation_name}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.resource}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.cost_per_hour}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.cost}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.time}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </div>

                      <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Cost:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totaloperationCost}
                            </span>
                            <span>Rs.</span>
                          </span>
                        </p>
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Time:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalTimeInOperation}
                            </span>
                            <span></span>
                          </span>
                        </p>


                        <hr />
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default SingleProductDetails;
