import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Config/axios";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function PurchaseInvoiceDatials() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const Invoice = () => {
    axiosInstance
      .get(`purchase-invoice-list/?invoice_id=${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Invoice();
  }, []);
  return (
    <>
      <div className=" bg-red-50 px-5 py-20 w-full">
        <div className="border-2 lg:px-10 px-2 bg-white w-[100%]">
          <div className="ribbon ribbon-top-left lg:!block !hidden">
            <span
              className={classNames(
                data?.customer_estimate_status === "Pending" &&
                  "bg-yellow-500 border-2 border-yellow-700",
                data?.customer_estimate_status === "Accepted" &&
                  "bg-green-500 border-2 border-green-700",
                data?.customer_estimate_status === "Declined" &&
                  "bg-red-500 border-2 border-red-700"
              )}
            >
              {data?.customer_estimate_status}
            </span>
          </div>

          <div className="lg:flex justify-end items-end py-5">
            <div className="lg:flex grid grid-cols-2 flex-row gap-5 justify-center items-center ">
              <div className="lg:hidden lg:my-0 my-3 w-32">
                <span
                  className={classNames(
                    data?.customer_estimate_status === "Pending" &&
                      "bg-yellow-500 border-2 border-yellow-700 py-2 px-5 font-bold rounded-md",
                    data?.customer_estimate_status === "Accepted" &&
                      "bg-green-500 border-2 border-green-700 py-2 px-5 font-bold rounded-md",
                    data?.customer_estimate_status === "Declined" &&
                      "bg-red-500 border-2 border-red-700 py-2 px-5 font-bold rounded-md"
                  )}
                >
                  {data?.customer_estimate_status}
                </span>
              </div>
              <button className="font-bold w-32 lg:my-0 my-1 py-2 px-5 border-2 border-blue-700 bg-blue-400 hover:bg-blue-200 rounded-md">
                View PDF
              </button>
              {/* <Pdf targetRef={ref} filename={"Estimates"}>
                  {({ toPdf }) => ( */}
              {/* <button
                onClick={DownloadPDF}
                className="font-bold w-32 lg:my-0 my-1 py-2 px-5 border-2 border-green-700 bg-green-400 hover:bg-green-200 rounded-md"
              >
                Download
              </button> */}
              {/* )}
                </Pdf> */}
              {/* {data?.customer_estimate_status === "Pending" ? (
                <div className="flex gap-5">
                  <button
                    onClick={() => ShowStatus("Declined")}
                    className="font-bold w-32 lg:my-0 my-1 py-2 px-5 border-2 border-yellow-700 bg-yellow-400 hover:bg-yellow-200 rounded-md"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => ShowStatus("Accepted")}
                    className="font-bold   lg:my-0 my-1 py-2 px-5 border-2 border-green-700 bg-green-500 hover:bg-green-200 rounded-md"
                  >
                    Accepted
                  </button>
                </div>
              ) : (
                <div>
                  {data?.customer_estimate_status === "Declined" ? (
                    <button
                      onClick={() => ShowStatus("Accepted")}
                      className="font-bold lg:my-0 my-1 py-2 px-5 border-2 border-green-700 bg-green-500 hover:bg-green-200 rounded-md"
                    >
                      Accepted
                    </button>
                  ) : (
                    <button
                      onClick={() => ShowStatus("Declined")}
                      className="font-bold lg:my-0 my-1 py-2 px-5 border-2 border-yellow-700 bg-yellow-400 hover:bg-yellow-200 rounded-md"
                    >
                      Decline
                    </button>
                  )}
                </div>
              )} */}
            </div>
          </div>
          <div id="pdf" className=" w-full h-full px-10 py-5">
            <div className="lg:flex flex-row justify-between items-center  border-b-2">
              <div className="flex flex-col my-5 ">
                {/* <div className="flex">
                  <p className="font-bold">Recipient:</p>
                  <p>{data.customer.}</p>
                </div> */}
                <div className="flex">
                  <p className="font-bold">Company :</p>
                  <p className="px-3">
                    {data?.[0]?.company?.business_legal_name}
                  </p>
                </div>
                <div className="flex">
                  <p className="font-bold">Customer :</p>
                  <p className="px-3">{data?.[0]?.company?.name}</p>
                </div>
                {/* <div className="flex">
                  <p className="font-bold">Add :</p>
                  <p className="px-3">
                    {data?.[0]?.company?.address?.city}
                  </p>
                </div> */}
                <div className="flex">
                  <p className="font-bold">City :</p>
                  <p className="px-3">{data?.[0]?.company?.address?.city}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">State :</p>
                  <p className="px-3">{data?.[0]?.company?.address?.state}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Country :</p>
                  <p className="px-3">{data?.[0]?.company?.address?.country}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">PAN :</p>
                  <p className="px-3">{data?.[0]?.company?.pan}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">GSTIN :</p>
                  <p className="px-3">{data?.[0]?.company?.gst_number}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Phone:</p>
                  <p className="px-3">{data?.[0]?.company?.mobile}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Email:</p>
                  <p className="px-3">{data?.[0]?.company?.email}</p>
                </div>
              </div>
              <div className="flex flex-col my-5">
                <img src={data?.store?.logo} alt="" className="w-32 h-32" />
                <div className="flex">
                  <p className="font-bold">{data?.store?.store_name}</p>
                  <p className="px-2"></p>
                </div>
                <div className="flex">
                  <p className="font-bold">City :</p>
                  <p className="px-2">{data?.[0]?.vendor?.address?.city}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">State :</p>
                  <p className="px-2">{data?.[0]?.vendor?.address?.state}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Country :</p>
                  <p className="px-2">{data?.[0]?.vendor?.address?.country}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">GSTIN :</p>
                  <p className="px-2">{data?.[0]?.vendor?.gst_number}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Invoice:</p>
                  <p className="px-2">{data?.[0]?.invoice_no}</p>
                </div>
              </div>
            </div>
            <div className="lg:flex flex-row justify-between items-center border-b-2">
              <div className="flex flex-row truncate">
                <p className="font-bold py-2">Place Of Supply :</p>
                <p className="lg:px-5 lg:py-2 lg:mt-0 mt-2 text-ellipsis overflow-hidden">
                  {data?.[0]?.customer?.source_of_supply}
                </p>
              </div>
              <div className="flex flex-row truncate ">
                <p className="font-bold py-2">Description :</p>
                <p
                  dangerouslySetInnerHTML={{ __html: data?.[0]?.notes }}
                  className="px-5 py-2 text-ellipsis overflow-hidden"
                ></p>
              </div>
            </div>
            <div>
              <div className="my-5">
                <TableContainer className="!shadow-none" component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="!bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ">
                        <TableCell className=" !text-xl">#</TableCell>
                        <TableCell className=" !text-xl" align="right">
                          Item
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          HSN/SAC
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          Rate
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          Quantity
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          SGST
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          CGST
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          IGST
                        </TableCell>
                        <TableCell className=" !text-xl" align="right">
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.[0]?.purchase_order?.orderItem?.map((item) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item?.id}
                            </TableCell>
                            <TableCell align="right">
                              {item?.item?.item_name}
                            </TableCell>
                            <TableCell align="right">
                              {item?.item?.hsn}
                            </TableCell>
                            <TableCell align="right">
                              {item?.total_price}
                            </TableCell>
                            <TableCell align="right">
                              {item?.quantity}
                            </TableCell>
                            {data?.[0]?.customer?.source_of_supply?.slice(3) ===
                            data?.[0]?.customer?.state ? (
                              <TableCell align="right">
                                {item?.item?.sgst} %
                              </TableCell>
                            ) : (
                              <TableCell align="right">---</TableCell>
                            )}
                            {data?.[0]?.customer?.source_of_supply?.slice(3) ===
                            data?.[0]?.customer?.state ? (
                              <TableCell align="right">
                                {item?.item?.cgst} %
                              </TableCell>
                            ) : (
                              <TableCell align="right">---</TableCell>
                            )}
                            {data?.[0]?.customer?.source_of_supply?.slice(3) ===
                            data?.[0]?.customer?.state ? (
                              <TableCell align="right">---</TableCell>
                            ) : (
                              <TableCell align="right">
                                {item.item?.igst} %
                              </TableCell>
                            )}

                            <TableCell align="right">
                              {item?.total_amount}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="lg:flex flex-row w-full justify-between items-center my-5 border-b-2">
                <div className="flex flex-col lg:w-[50%] w-full">
                  <p className="font-bold my-3 ">Scan UPI for payment</p>
                  <img
                    src={data?.[0]?.store?.store_qr_code_image}
                    alt=""
                    className="h-28 w-28"
                  />
                </div>
                <div className="flex flex-col lg:w-[50%] w-full my-3">
                  <div className="flex flex-row w-full  justify-between items-center my-2 border-b-2">
                    <p>Sub Total</p>
                    <p>
                      {data?.[0]?.total_price} {data?.store?.currency}
                    </p>
                  </div>
                  <div className="flex flex-row w-full  justify-between items-center my-2 border-b-2">
                    <p>Discount</p>
                    <p>{data?.[0]?.discount} </p>
                  </div>
                  {data?.[0]?.customer?.source_of_supply?.slice(3) ===
                  data?.[0]?.customer?.state ? (
                    <>
                      <div className="flex flex-row w-full  justify-between items-center my-2 border-b-2">
                        <p>CGST</p>
                        <p>{data?.[0]?.cgst} </p>
                      </div>
                      <div className="flex flex-row w-full  justify-between items-center my-2 border-b-2">
                        <p>SGST</p>
                        <p>{data?.[0]?.sgst} </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row w-full  justify-between items-center my-2 border-b-2">
                      <p>IGST</p>
                      <p>{data?.[0]?.igst} </p>
                    </div>
                  )}

                  <div className="flex flex-row w-full  justify-between items-center my-2 ">
                    <p className="font-bold">Total</p>
                    <p>
                      {data?.[0]?.total_amount} {data?.store?.currency}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:flex flex-row justify-between items-center w-full my-5">
                <div className="flex flex-col w-full">
                  <p className="font-bold">Authorised Signature</p>
                  <img
                    src={data?.[0]?.store?.signature}
                    alt=""
                    className="h-32 w-32"
                  />
                  <p className="font-bold">Terms and Conditions :</p>
                  <p>Pay according to Terms and conditions.</p>
                </div>
                <div className="flex flex-col w-full lg:items-end lg:my-0 my-5">
                  <p className="font-bold my-2">
                    Bank Details are Given Below :
                  </p>
                  <div className="flex flex-row my-2">
                    <p className="font-bold">Bank name :</p>
                    <p className="px-2">
                      {data?.[0]?.customer?.banking_details?.bank_name}
                    </p>
                  </div>
                  <div className="flex flex-row my-2">
                    <p className="font-bold">Bank A/c. No. :</p>
                    <p className="px-2">
                      {data?.[0]?.customer?.banking_details?.account_no}
                    </p>
                  </div>
                  <div className="flex flex-row my-2">
                    <p className="font-bold">IFSC Code :</p>
                    <p className="px-2">
                      {data?.[0]?.customer?.banking_details?.IFSC}
                    </p>
                  </div>
                  <div className="flex flex-row my-2">
                    <p className="font-bold">Swift Code :</p>
                    <p className="px-2">
                      {data?.[0]?.customer?.banking_details?.swift_code}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
