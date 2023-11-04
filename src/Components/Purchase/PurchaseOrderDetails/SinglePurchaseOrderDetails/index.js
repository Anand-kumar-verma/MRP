import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { getUnitOfProductFn } from "../../../../Services/Product/GetUnitOfProduct";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../../Loding";
import { AiTwotoneDelete } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import { getVendorListFn } from "../../../../Services/Purchase/GetVendorList";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSaleProductFn } from "../../../../Services/Sales/GetSaleProduct/getSaleProductFn";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPurchaseOrderDetailsFn } from "../../../../Services/Purchase/GetPurchaseOrderById";
import { IoIosAddCircle } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { Button } from "@mui/material";
import { updatePurchaseOrderFn } from "../../../../Services/Purchase/UpdatePurchaseOrderFun";
const SinglePurchaseOrderDetails = () => {
  const { order_id } = useParams();
  console.log(order_id);

  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [unitOfProduct, setUnitOfProduct] = useState([]);
  const [subData, setSubData] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [rows, setRows] = useState([]);
  const [customerList, setcustomerList] = useState([]);
  const [saleProductList, setsaleProductList] = useState([]);
  const [subTotal, setSubTotal] = useState(0.0);
  const [totalUnit, seTotalUnit] = useState(0);
  const [total, seTotal] = useState(0);
  const [orderDetails, setorderDetails] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const [editable, setEditable] = useState(true);
  const [customerId, setcustomerId] = useState(0);

  function saveFunctionCalled(message) {
    handleSubmit((data) => {
      const value = rows.map((singleItem) => {
        return {
          apni_id: singleItem?.id,
          product_type: singleItem?.item.substring(
            singleItem?.item.indexOf(" ") + 1
          ),
          varient_id: Number(singleItem?.item?.split(" ")[0]),
          qnt: Number(singleItem?.qnt),
          unit_of_measure: singleItem?.unit_of_measure,
          price_per_unit: Number(singleItem?.price_per_unit),
          total_price: Number(singleItem?.total_price),
        };
      });

      const basic_details = {
        customer_id: customerId,
        order_no: data?.order_number,
        expected_date: data?.expected_date,
        order_date: data?.order_date,
        shipment_to: data?.shipment_to,
        shiping_cost: data?.shiping_cost,
        sub_total: subTotal,
        plus_tax: 0.0,
        total: total,
      };

      const formData = new FormData();
      formData.append("basic_details", JSON.stringify(basic_details));
      formData.append("varients", JSON.stringify(value));

      updatePurchaseOrderFn({
        formData: formData,
        setloding,
        navigate,
        link: "/purchase_order_list",
        reset,
        id: order_id,
      });
    })();
  }

  useEffect(() => {
    getPurchaseOrderDetailsFn({
      setloding,
      setproduct: setorderDetails,
      id: order_id,
    });
  }, [order_id]);

  console.log(orderDetails);

  useEffect(() => {
    if (orderDetails?.items_details) {
      setItemsArray(
        orderDetails.items_details.map((item) => ({
          name: item.name,
          varient_id: item.varient_id,
          in_stock: item.in_stock,
          quantity: item.quantity,
          price: item.price,
          total_item_price: item.total_item_price,
        }))
      );
    }
  }, [orderDetails]);

  useEffect(() => {
    // Prepopulate the rows state with data from items_details
    if (itemsArray.length !== 0) {
      const initialRows = itemsArray.map((item, index) => ({
        id: index + 1,
        item: `${item.varient_id} ${item.name}`,
        qnt: item.quantity,
        unit_of_measure: "",
        price_per_unit: parseFloat(item.price),
        total_price: parseFloat(item.total_item_price),
      }));
      setRows(initialRows);
    }
  }, [itemsArray]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      item: "",
      qnt: 0.0,
      unit_of_measure: "",
      price_per_unit: 0.0,
      total_price: 0.0,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleFieldChange = (rowId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        let newRow = { ...row, [field]: value };
        if (field === "qnt" || field === "price_per_unit") {
          // console.log(newRow.qnt ,)
          newRow.total_price =
            (parseFloat(newRow.qnt) || 0) *
            (parseFloat(newRow.price_per_unit) || 0);
        }
        return row.id === rowId ? newRow : row;
      })
    );
  };

  useEffect(() => {
    // Calculate the subtotal whenever the rows array changes
    const calculatedSubTotal = rows.reduce(
      (accumulator, row) => accumulator + row.total_price,
      0
    );
    setSubTotal(calculatedSubTotal);
    const calculatedSubTotalqnt = rows.reduce(
      (accumulator, row) => accumulator + Number(row.qnt),
      0
    );
    seTotalUnit(calculatedSubTotalqnt);
  }, [rows]);

  useEffect(() => {
    const tax = 0;
    const value = subTotal + tax;
    seTotal(value);
    console.log("total");
  }, [subTotal]);

  function handleDeleteItems(id) {
    setRows(rows.filter((singleItem) => singleItem.id !== id));
  }

  useEffect(() => {
    getVendorListFn({
      setloding,
      setVendorList: setcustomerList,
    });

    getUnitOfProductFn({
      setUnitOfProduct,
      setSubData,
    });

    getSaleProductFn({
      setloding,
      setsaleProductList,
    });
  }, []);

  console.log(customerList);

  // console.log(customerList)
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
    { id: "name", label: "Item", minWidth: 170 },
    { id: "code", label: "Quantity", minWidth: 170, align: "" },
    {
      id: "population",
      label: "Unit Of Measure ",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "popdsfdulation",
      label: "Price/Unit",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Total Price",
      minWidth: 170,
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "",
      minWidth: 170,
      align: "",
      format: (value) => value.toFixed(2),
    },
  ];

  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full overflow-auto flex flex-col justify-between border-2 border-gray-200">
            <div className="w-full  flex justify-end ">
              <span
                className={` ${
                  editable ? "bg-green-700" : "bg-blue-700"
                }  cursor-pointer text-[2rem] text-white p-4 rounded-full`}
                onClick={() => setEditable(!editable)}
              >
                <BiEdit />
              </span>
            </div>
            <div className=" flex flex-col justify-between overflow-y-scroll">
              <form className="flex flex-col h-[90vh] justify-evenly overflow-y-scroll">
                <div className="grid grid-cols-3 gap-5 pt-10">
                  <TextField
                    id="grouped-native-select"
                    label="Vendor"
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    select={editable ? false : true}
                    defaultValue={orderDetails?.vendor_name}
                    onChange={(e) => setcustomerId(e.target.value)}
                  >
                    <option value={orderDetails?.id}>
                      {orderDetails?.customer}
                    </option>

                    {!editable &&
                      customerList.map((singleItem, index) => {
                        return (
                          <MenuItem key={index} value={singleItem?.vendor_id}>
                            <div className="!flex !w-full !justify-between">
                              <span>{singleItem?.name}</span>
                              <span className="pr-3">{singleItem?.email}</span>
                            </div>
                          </MenuItem>
                        );
                      })}
                  </TextField>

                  <TextField
                    required
                    id="outlined-required"
                    label="Order Number"
                    placeholder="1234567890123"
                    type="number"
                    sx={{ color: "red" }}
                    defaultValue={orderDetails?.order_number || 123123}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    {...register("order_number")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Expected Date"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    defaultValue={orderDetails?.expected_date || "2023-12-12"}
                    {...register("expected_date")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Order Date"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    {...register("order_date")}
                    defaultValue={orderDetails?.order_date || "2023-12-12"}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Shipement To"
                    placeholder="Shipement TO"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    defaultValue={orderDetails?.shipping || "abcd"}
                    {...register("shipment_to")}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Shipping Cost"
                    placeholder="Shipement TO"
                    type="number"
                    // defaultValue={0.0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable ? false : true,
                    }}
                    defaultValue={orderDetails?.shipping_cost || 0}
                    {...register("shiping_cost")}
                  />
                </div>

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  <p className="p-4">Added Items</p>

                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 200 }}>
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
                          {rows.map((row, index) => {
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <FormControl
                                    sx={{ minWidth: 120 }}
                                    // className="col-span-6"
                                  >
                                    {/* <InputLabel htmlFor="grouped-native-select">
                                      Items
                                    </InputLabel> */}
                                    <Select
                                      native
                                      defaultValue=""
                                      id="grouped-native-select"
                                      InputProps={{
                                        readOnly: !editable ? false : true,
                                      }}
                                      onChange={(e) => {
                                        const selectedVariantId = parseInt(
                                          e.target.value.split(" ")[0]
                                        );
                                        const selectedVariant =
                                          saleProductList.find((product) =>
                                            product.variants.find(
                                              (variant) =>
                                                variant.v_id ===
                                                selectedVariantId
                                            )
                                          );
                                        if (selectedVariant) {
                                          const selectedVariantInfo =
                                            selectedVariant.variants.find(
                                              (variant) =>
                                                variant.v_id ===
                                                selectedVariantId
                                            );
                                          handleFieldChange(
                                            row.id,
                                            "item",
                                            e.target.value
                                          );
                                          handleFieldChange(row.id, "qnt", 1);
                                          handleFieldChange(
                                            row.id,
                                            "price_per_unit",
                                            selectedVariantInfo?.selling_price
                                          );
                                          handleFieldChange(
                                            row.id,
                                            "total_price",
                                            parseFloat(row.qnt || 1) *
                                              parseFloat(
                                                selectedVariantInfo?.selling_price
                                              )
                                          );
                                        }
                                      }}
                                    >
                                      <option>
                                        <em>{row?.item}</em>
                                      </option>
                                      {editable
                                        ? false
                                        : true &&
                                          saleProductList.map(
                                            (singleItem, index) => {
                                              return (
                                                <optgroup
                                                  label={singleItem?.name}
                                                  key={index}
                                                >
                                                  {singleItem?.variants.map(
                                                    (singleItems, index) => {
                                                      return (
                                                        <option
                                                          value={`${singleItems?.v_id} ${singleItem?.type}`}
                                                          key={index}
                                                          className="text-sm text-blue-600 flex w-full justify-end"
                                                        >
                                                          <span>
                                                            {
                                                              singleItems?.variant_name
                                                            }
                                                          </span>
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                                </optgroup>
                                              );
                                            }
                                          )}
                                    </Select>
                                  </FormControl>
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    InputProps={{
                                      readOnly: !editable ? false : true,
                                    }}
                                    // label="Qnt"
                                    type="number"
                                    value={row.qnt}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        row.id,
                                        "qnt",
                                        e.target.value
                                      )
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize w-20"
                                >
                                  <TextField
                                    InputProps={{
                                      readOnly: !editable ? false : true,
                                    }}
                                    required
                                    select
                                    // label="Unit Of Measure"
                                    type="text"
                                    value={row.unit_of_measure}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        row.id,
                                        "unit_of_measure",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {unitOfProduct.map((singleItem, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={singleItem.unit_name}
                                        >
                                          <span className="pr-3">
                                            {singleItem.unit_name}
                                          </span>
                                        </MenuItem>
                                      );
                                    })}
                                  </TextField>
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    // label="Price per Unit"
                                    type="number"
                                    InputProps={{
                                      readOnly: !editable ? false : true,
                                    }}
                                    value={row.price_per_unit}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        row.id,
                                        "price_per_unit",
                                        e.target.value
                                      )
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  className="capitalize"
                                >
                                  <TextField
                                    required
                                    InputProps={{
                                      readOnly: !editable ? false : true,
                                    }}
                                    // label="Total  Price"
                                    type="number"
                                    value={row.total_price}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        row.id,
                                        "total_price",
                                        e.target.value
                                      )
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className="text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center">
                                    <span
                                      onClick={() => handleDeleteItems(row.id)}
                                      className="cursor-pointer"
                                    >
                                      <AiTwotoneDelete
                                        className={
                                          rows.length === 1 && "hidden"
                                        }
                                      />
                                    </span>
                                  </p>
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
                {!editable && (
                  <p
                    component="th"
                    scope="row"
                    className="pt-1 text-blue-950 pl-2
                  rounded-lg  cursor-pointer !flex items-center  font-bold !text-lg"
                  >
                    <span className="" onClick={handleAddRow}>
                      Add Items
                    </span>
                    <span className="text-[2rem] ">
                      <IoIosAddCircle />
                    </span>
                  </p>
                )}
                <div className="w-full  flex justify-end p-5">
                  <div className="">
                    <p className="grid grid-cols-2 border-2 px-2">
                      <span className="grid grid-cols-1 place-items-start font-bold ">
                        Total Units:
                      </span>
                      <span className="grid grid-cols-1 place-items-end">
                        {totalUnit}pcs
                      </span>
                    </p>
                    <p className="grid grid-cols-2 border-2 px-2">
                      <span className="grid grid-cols-1 place-items-start">
                        Sub Total:
                      </span>
                      <span className="grid grid-cols-1 place-items-end">
                        {subTotal}USD
                      </span>
                    </p>
                    <p className="grid grid-cols-2 border-2 px-2">
                      <span className="grid grid-cols-1 place-items-start">
                        Plus Tax:
                      </span>
                      <span className="grid grid-cols-1 place-items-end">
                        0.00USD
                      </span>
                    </p>
                    <p className="grid grid-cols-2 border-2 px-2">
                      <span className="grid grid-cols-1 place-items-start">
                        Total:
                      </span>
                      <span className="grid grid-cols-1 place-items-end">
                        {total}USD
                      </span>
                    </p>
                  </div>
                </div>
              </form>

              <div className="w-full flex justify-center  bottom-0">
                {!editable && (
                  <Button
                    variant="contained"
                    onClick={() => saveFunctionCalled()}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default SinglePurchaseOrderDetails;
