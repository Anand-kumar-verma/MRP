import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { getUnitOfProductFn } from "../../../Services/Product/GetUnitOfProduct";
import { useNavigate } from "react-router-dom";
import Loding from "../../../Loding";
import { AiTwotoneDelete } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import { getCustomerListFn } from "../../../Services/Sales/CreateCustomer/GetCustomerList";
import { salesOrderFn } from "../../../Services/Sales/CreateSalesOrder";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSaleProductFn } from "../../../Services/Sales/GetSaleProduct/getSaleProductFn";
import { toast } from "react-toastify";

const SalesOrderDetails = () => {
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

  function saveFunctionCalled(message) {
    handleSubmit((data) => {

      if(data.id === "")
      return toast.warn("Select Customer")
      if(data.order_number === "")
      return toast.warn("Enter Order No.")
      if(data.expected_date === "")
      return toast.warn("Enter expected date")
      if(data.order_date === "")
      return toast.warn("Enter order date")
    for(let i  = 0; i<rows.length; i++){
        if(rows[i].item === "")
         return toast.warn(`Select items name at ${i+1}`)
         if(rows[i].unit_of_measure === "")
         return toast.warn(`Select Unit of measure at ${i+1}`)
    }

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
        customer_id: Number(data?.id),
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

      salesOrderFn({
        formData: formData,
        setloding,
        navigate,
        link: message === "save" ? "/sales-order_list" : "/sales-order",
        reset,
      });
    })();
  }

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
    getCustomerListFn({
      setloding,
      setCustomerList: setcustomerList,
    });

    getUnitOfProductFn({
      setUnitOfProduct,
      setSubData,
    });

    getSaleProductFn({
      setloding,
      setsaleProductList,
    });

    handleAddRow();
  }, []);

  console.log(saleProductList,"varients list")

  // console.log(customerList)

  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
            <div className="h-full flex flex-col justify-between ">
              <form className="flex flex-col justify-evenly overflow-auto">
                <div className="h-full">
                  <div className="grid grid-cols-3 gap-5 pt-10">
                    <TextField
                      required
                      id="outlined-required"
                      label="Customer"
                      placeholder="Enter the Suplier"
                      type="text"
                      select
                      sx={{ color: "red" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("id")}
                    >
                      {customerList.map((singleItem, index) => {
                        return (
                          <MenuItem key={index} value={singleItem?.customer_id}>
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("order_number")}
                    />

                    <TextField
                      required
                      id="outlined-required"
                      label="Expected Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("expected_date")}
                    />

                    <TextField
                      required
                      id="outlined-required"
                      label="Order Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("order_date")}
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
                      {...register("shipment_to")}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Shipping Cost"
                      placeholder="Shipement TO"
                      type="number"
                      defaultValue={0.0}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("shiping_cost")}
                    />
                  </div>

                  <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                    <p className="p-4">Add Items</p>
                    <div className="flex flex-col gap-2">
                      {rows.map((row) => (
                        <div
                          className="w-full grid grid-cols-12 gap-3"
                          key={row.id}
                        >
                          <FormControl
                            sx={{ minWidth: 120 }}
                            className="col-span-6"
                          >
                            <InputLabel htmlFor="grouped-native-select">
                              Items
                            </InputLabel>
                            <Select
                              native
                              defaultValue=""
                              id="grouped-native-select"
                              label="Items"
                              onChange={(e) => {
                                const selectedVariantId = parseInt(
                                  e.target.value.split(" ")[0]
                                );
                                const selectedVariant = saleProductList.find(
                                  (product) =>
                                    product.variants.find(
                                      (variant) =>
                                        variant.v_id === selectedVariantId
                                    )
                                );
                                if (selectedVariant) {
                                  const selectedVariantInfo =
                                    selectedVariant.variants.find(
                                      (variant) =>
                                        variant.v_id === selectedVariantId
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
                                <em>None</em>
                              </option>
                              {saleProductList.map((singleItem, index) => {
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
                                              {singleItems?.variant_name}
                                            </span>
                                          </option>
                                        );
                                      }
                                    )}
                                  </optgroup>
                                );
                              })}
                            </Select>
                          </FormControl>

                          <TextField
                            required
                            label="Qnt"
                            type="number"
                            value={row.qnt}
                            onChange={(e) =>
                              handleFieldChange(row.id, "qnt", e.target.value)
                            }
                          />
                          <TextField
                            required
                            select
                            label="Unit Of Measure"
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
                          <TextField
                            required
                            label="Price per Unit"
                            type="number"
                            value={row.price_per_unit}
                            onChange={(e) =>
                              handleFieldChange(
                                row.id,
                                "price_per_unit",
                                e.target.value
                              )
                            }
                          />
                          <TextField
                            required
                            label="Total  Price"
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

                          <p className="text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center">
                            <span
                              onClick={() => handleDeleteItems(row.id)}
                              className="cursor-pointer"
                            >
                              <AiTwotoneDelete
                                className={rows.length === 1 && "hidden"}
                              />
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p
                    onClick={handleAddRow}
                    component="th"
                    scope="row"
                    className="mt-3 text-white  rounded-lg px-5 py-1  cursor-pointer !flex items-center  font-bold !text-lg"
                  >
                    <span className="bg-purple-600 rounded-l-xl p-2">
                      Add Items
                    </span>
                    <span className="text-[2rem] bg-purple-600 px-2 rounded-r-xl">
                      <IoIosAddCircle />
                    </span>
                  </p>
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

export default SalesOrderDetails;
