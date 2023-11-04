import React, { useEffect, useState } from "react";

import { Add, Close } from "@mui/icons-material";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Percentage from "../../../Assets/percentage.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../../Shared/CustomInput";
import axiosInstance from "../../../Config/axios";
import { estimatesListFn } from "../../../Services/Estimates/EstimatesList";
import { addEstimatesFn } from "../../../Services/Estimates/AddEstimates";
import { updateEstimateFn } from "../../../Services/Estimates/UpdateEstimate";
import MuiSelect from "../../../Shared/MuiSelect";


const AddEstimates = () => {
  const { state } = useLocation();
  const [salesItems, setSalesItems] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [rows, setRows] = useState([
    {
      id: "",
      quantity: 1,
      rate: 1,
      total_price: "",
      slug: "",
      tax_amount: "",
    },
  ]);
  const { data: estimateData, isLoading } = useQuery(
    ["estimate", state],
    () => estimatesListFn({ estimate_id: state?.estimate_id }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: state ? true : false,
    }
  );
  const estimate = estimateData?.data?.data;

  useEffect(() => {
    state && setRows(estimate?.estimate_item);
  }, [estimate]);
  console.log(rows);
  const navigate = useNavigate();

  const sub_total = rows
    ?.map((i) => Number(i.total_price))
    .reduce((a, b) => a + b, 0);

  const tax_amount = rows
    ?.map((i) => Number(i.tax_amount))
    .reduce((a, b) => a + b, 0);

  const salesOrders = () =>
    axiosInstance.get("estimate-list/").then((res) => {
      setSalesItems(res.data.item_data);
    });

  const customersList = () =>
    axiosInstance.get("create-get-customer-api/").then((res) => {
      setCustomers(res.data.data);
    });

  useEffect(() => {
    salesOrders();
    customersList();
  }, []);
  const { mutate: addEstimates } = useMutation(addEstimatesFn, {
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate("/quotes");
    },
  });
  const { mutate: updateEstimates } = useMutation(updateEstimateFn, {
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate("/quotes");
    },
  });

  const initialValues = {
    customer_id: estimate?.customer || "",
    estimate_no: estimate?.estimate_no || "EST",
    reference_no: estimate?.reference_no || "",
    estimate_date: estimate?.date?.slice(0, 10) || "",
    expiry_date: estimate?.expiry_date?.slice(0, 10) || "",
    estimate_notes: estimate?.notes || "",
    currency: estimate?.currency || "INR",
    total_amount: estimate?.total_amount || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const requestBody = {
        estimate_id: state?.estimate_id,
        customer_id: formik.values.customer_id,
        estimate_no: formik.values.estimate_no,
        reference_no: formik.values.reference_no,
        estimate_date: formik.values.estimate_date,
        expiry_date: formik.values.expiry_date,
        currency: formik.values.currency,
        estimate_notes: formik.values.estimate_notes,
        subtotal: sub_total,
        sgst: tax_amount / 2,
        cgst: tax_amount / 2,
        total_amount: sub_total + tax_amount,
        item_id: rows,
      };
      state ? updateEstimates(requestBody) : addEstimates(requestBody);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-full w-full">
      <div className="w-full h-fit !p-0">
        <div className="flex justify-between flex-row p-3">
          <div className="w-5/6 h-fit">
            <div className="flex items-center">
              <img src={Percentage} alt="" />
              <p className="text-lg font-semibold pl-3">
                {state ? "Update" : "New"} Estimate
              </p>
            </div>
          </div>

          <Link to={"/quotes"}>
            <IconButton>
              <Close />
            </IconButton>
          </Link>
        </div>

        <div className="w-full flex p-3">
          <div className="flex flex-col gap-3 w-3/6">
            <MuiSelect
              label="Customer"
              className="!w-4/5"
              placeholder="Select Customer"
              id="customer_id"
              name="customer_id"
              value={formik.values.customer_id || ""}
              onChange={formik.handleChange}
            >
              {customers?.map((customer) => {
                return (
                  <MenuItem key={customer.id} value={customer.customer_id}>
                    {customer.name}
                  </MenuItem>
                );
              })}
            </MuiSelect>

            {customers?.find((i) => i.id === formik.values.customer_id)
              ?.source_of_supply && (
              <CustomInput
                label="Place Of Supply"
                className="w-4/5"
                value={`${
                  customers?.find((i) => i.id === formik.values.customer_id)
                    ?.source_of_supply
                }`}
              />
            )}
            <div className="flex items-center gap-3">
              <CustomInput
                label="Estimate Date*"
                className="!w-full"
                type="date"
                id="estimate_date"
                name="estimate_date"
                value={formik.values.estimate_date}
                onChange={formik.handleChange}
              />

              <CustomInput
                label="Expiry Date*"
                className="!w-full ml-2"
                type="date"
                id="expiry_date"
                name="expiry_date"
                value={formik.values.expiry_date}
                onChange={formik.handleChange}
              />
            </div>
            <CustomInput
              label="Currency"
              className="w-4/5"
              id="currency"
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex flex-col gap-3 w-3/6">
            <CustomInput
              label="Estimate No*"
              className="w-4/5"
              id="estimate_no"
              name="estimate_no"
              value={formik.values.estimate_no}
              onChange={formik.handleChange}
            />

            <CustomInput
              label="Reference Number*"
              className="w-4/5"
              id="reference_no"
              name="reference_no"
              value={formik.values.reference_no}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="p-3">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="!text-center !font-bold">
                    Item Details
                  </TableCell>
                  <TableCell className="!text-center !font-bold">
                    Quantity
                  </TableCell>
                  <TableCell className="!text-center !font-bold">
                    Rate
                  </TableCell>
                  <TableCell className="!text-center !font-bold">Tax</TableCell>
                  <TableCell className="!text-center !font-bold">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((sales, index) => {
                  return (
                    <TableRow key={rows?.[index].id}>
                      <TableCell className="!w-1/5">
                        <span className="flex flex-col gap-1">
                          <MuiSelect
                            placeholder="Select Items"
                            id="id"
                            name="id"
                            value={rows[index].id || ""}
                            onChange={(event) => {
                              const updatedRows = [...rows];
                              updatedRows[index]["id"] = Number(
                                event.target.value
                              );
                              updatedRows[index]["tax_amount"] =
                                salesItems?.filter(
                                  (i) => i.id === rows[index].id
                                )?.[0]?.selling_price *
                                  rows?.[index].quantity *
                                  (salesItems?.filter(
                                    (i) => i.id === rows[index].id
                                  )?.[0]?.tax /
                                    100 +
                                    1) -
                                salesItems?.filter(
                                  (i) => i.id === rows[index].id
                                )?.[0]?.selling_price *
                                  rows?.[index].quantity;
                              updatedRows[index]["selling_price"] =
                                salesItems?.filter(
                                  (i) => i.id === rows[index].id
                                )?.[0]?.selling_price;

                              updatedRows[index]["total_price"] =
                                salesItems?.filter(
                                  (i) => i.id === rows[index].id
                                )?.[0]?.selling_price * rows?.[index].quantity;
                              updatedRows[index]["slug"] = salesItems?.filter(
                                (i) => i.id === rows[index].id
                              )?.[0]?.slug;
                              setRows([...updatedRows]);
                              formik.handleChange(event);
                            }}
                          >
                            {salesItems?.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.product}
                                </MenuItem>
                              );
                            })}
                          </MuiSelect>
                          {rows?.[index].slug && (
                            <Chip
                              size="small"
                              label={rows?.[index].slug || ""}
                              className="!capitalize"
                            />
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <CustomInput
                          type="number"
                          placeholder="Quantity"
                          id="customer_id"
                          name="customer_id"
                          value={rows?.[index].quantity}
                          onChange={(event) => {
                            const updatedRows = [...rows];
                            updatedRows[index]["quantity"] =
                              event.target.value > 0
                                ? Number(event.target.value)
                                : updatedRows[index]["quantity"];
                            updatedRows[index]["total_price"] =
                              salesItems?.filter(
                                (i) => i.id === rows[index].id
                              )?.[0]?.selling_price * rows?.[index].quantity;
                            updatedRows[index]["tax_amount"] =
                              salesItems?.filter(
                                (i) => i.id === rows[index].id
                              )?.[0]?.selling_price *
                                rows?.[index].quantity *
                                (salesItems?.filter(
                                  (i) => i.id === rows[index].id
                                )?.[0]?.tax /
                                  100 +
                                  1) -
                              salesItems?.filter(
                                (i) => i.id === rows[index].id
                              )?.[0]?.selling_price *
                                rows?.[index].quantity;
                            setRows([...updatedRows]);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomInput
                          placeholder="Selling Price"
                          value={rows[index].selling_price}
                        />
                      </TableCell>

                      <TableCell className="!w-1/5">
                        <CustomInput
                          value={`${
                            customers?.filter(
                              (i) => i.id === formik.values.customer_id
                            )?.[0]?.tax
                              ? customers?.filter(
                                  (i) => i.id === formik.values.customer_id
                                )?.[0]?.tax
                              : ""
                          }${
                            salesItems?.filter(
                              (i) => i.id === rows[index].id
                            )?.[0]?.tax
                              ? `(${
                                  salesItems?.filter(
                                    (i) => i.id === rows[index].id
                                  )?.[0]?.tax
                                }%)`
                              : ""
                          }`}
                        />
                      </TableCell>

                      <TableCell>
                        <CustomInput
                          placeholder="Amount"
                          id="total_amount"
                          name="total_amount"
                          value={`${
                            salesItems?.filter(
                              (i) => i.id === rows[index].id
                            )?.[0]?.selling_price
                              ? `₹${rows[index].total_price}`
                              : ""
                          }`}
                          onChange={(event) => {
                            const updatedRows = [...rows];
                            updatedRows[index]["total_price"] =
                              event.target.value;
                            setRows([...updatedRows]);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            className="my-1 flex items-center cursor-pointer"
            onClick={() =>
              setRows([
                ...rows,
                {
                  id: "",
                  quantity: 1,
                  rate: "",
                  total_price: "",
                  slug: "",
                },
              ])
            }
          >
            <Add /> New Row
          </div>
        </div>

        <div className="flex flex-row w-full p-3 pt-5">
          <div className="flex flex-col w-3/6">
            <CustomInput
              label="Estimate Notes"
              className="w-4/5"
              id="estimate_notes"
              name="estimate_notes"
              rows="4"
              multiline={true}
              value={formik.values.estimate_notes}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex flex-col w-3/6 h-full">
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-4/6 pl-4">
                <p className="mt-3 mb-3 text-sm">Sub Total</p>
                {customers?.filter(
                  (i) => i.id === formik.values.customer_id
                )?.[0]?.tax === "GST" ? (
                  <>
                    <p className="mt-3 mb-3 text-sm">CGST Amount</p>
                    <p className="mt-3 mb-3 text-sm">SGST Amount</p>
                  </>
                ) : (
                  <p className="mt-3 mb-3 text-sm">IGST Amount</p>
                )}
                <p className="mt-3 mb-3 text-sm">Total Amount</p>
              </div>
              <div className="flex flex-col w-2/6 pl-4">
                <p className="mt-3 mb-3 text-sm">₹{sub_total || 0}</p>
                {customers?.filter(
                  (i) => i.id === formik.values.customer_id
                )?.[0]?.tax === "GST" ? (
                  <>
                    <p className="mt-3 mb-3 text-sm">₹{tax_amount / 2 || 0}</p>
                    <p className="mt-3 mb-3 text-sm">₹{tax_amount / 2 || 0}</p>
                  </>
                ) : (
                  <p className="mt-3 mb-3 text-sm">₹{tax_amount || 0}</p>
                )}

                <p className="mt-3 mb-3 text-sm">
                  ₹{sub_total + tax_amount || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-5 my-2">
        <Button
          className="text-sm !bg-green-400 !py-2 !px-2 !rounded"
          type="submit"
        >
          Save
        </Button>

        <Button className="ml-2 text-sm !bg-red-400 !py-2 !px-2 !rounded">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddEstimates;
