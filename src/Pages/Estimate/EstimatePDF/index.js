import React from "react";
import { getEstimateList } from "../../../Services/Estimate/AddEstimate/GetEstimate";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import imageLogo from "../../../Assets/bharatLogo.svg";
import imageSinature from "../../../Assets/bharatLogo.svg";
import imageUPI from "../../../Assets/bharatLogo.svg";
import { Margin, usePDF } from "react-to-pdf";
import classNames from "classnames";
import { Download } from "@mui/icons-material";
import CustomButton from "../../../Shared/CustomButton";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SpanningTable from "./newTable";

const EstimatePDF = () => {
  const { estimate_project_id } = useParams();
  const { data: estimateData } = useQuery(
    ["estimatePDF"],
    () => getEstimateList({ estimate_project_id }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      //   refetchOnMount: false,
      enabled: estimate_project_id ? true : false,
    }
  );
  const data = estimateData?.data?.data?.[0];
  console.log(data, "userda");

  const { toPDF, targetRef } = usePDF({
    filename: `EST-${data?.id}.pdf`,
    page: { margin: Margin.MEDIUM },
  });
  const changeStatus = () => {
    "changeStatus";
    alert("pending");
  };
  const convertMilesStoneDataToNTC = (API_data) => {
    // name time cost
    console.log(API_data, "bharatxxxxxx");
    const data = API_data?.map((singleObject) => {
      singleObject["name"] = singleObject["milestone_name"];

      singleObject["time"] = singleObject["spent_time"];

      singleObject["cost"] = singleObject["spent_cost"];

      return singleObject;
    });
    return data;
  };
  const convertMaterialDataToNTC = (API_data) => {
    // name time cost
    console.log(API_data, "bharat");
    const data = API_data?.map((singleObject) => {
      singleObject["name"] = singleObject?.materials?.name;

      return singleObject;
    });
    console.log(data, "bharat");
    return data;
  };
  const convertOperationDataToNTC = (API_data) => {
    // name time cost
    const data = API_data.map((singleObject) => {
      singleObject["name"] = singleObject?.operations?.stage;
      return singleObject;
    });
    return data;
  };

  return (
    <div className="overflow-y-auto">
      <div className="relative flex flex-col h-[240vh] overflow-hidden w-full">
        <div className="border-2 px-2 bg-white w-[100%]">
          <span
            className={classNames(
              "absolute left-[-50px] p-2 !pl-5 text-center text-white -rotate-45 bg-blue-500 w-44 top-7",
              data?.customer_estimate_status === "Pending"
                ? "bg-yellow-500"
                : data?.customer_estimate_status === "Declined"
                ? "bg-red-500"
                : data?.customer_estimate_status === "Accepted"
                ? "bg-green-500"
                : "bg-gray-500"
            )}
          >
            {data?.customer_estimate_status}
          </span>
          <div className="flex justify-end gap-2 p-3">
            <CustomButton
              startIcon={<Download />}
              className="!bg-gray-300"
              onClick={toPDF}
            >
              Download
            </CustomButton>

            {!data?.estimate_order_status && (
              <>
                <CustomButton
                  className="!bg-green-500 !bg-opacity-100"
                  onClick={() =>
                    changeStatus({
                      estimate_id: estimate_project_id,
                      estimate_status: "Accepted",
                    })
                  }
                >
                  Accept
                </CustomButton>
                <CustomButton
                  className="!bg-red-500 !bg-opacity-100"
                  onClick={() =>
                    changeStatus({
                      estimate_id: estimate_project_id,
                      estimate_status: "Declined",
                    })
                  }
                >
                  Declined
                </CustomButton>
              </>
            )}
          </div>
          {/* //pdf data */}
          <div className="w-full h-full px-10 py-5">
            <div className="flex-row items-center justify-between border-b-2 lg:flex">
              <div className="flex flex-col my-5">
                <div>
                  <img alt="" className="h-32" src={data?.company?.logo} />
                </div>
              </div>
              <div className="flex flex-col my-5">
                <div className="flex">
                  <p className="text-3xl font-bold capitalize">ESTIMATE</p>
                </div>
                <div className="flex justify-end w-full">
                  <p className="flex">
                    <p className="font-bold">{data?.estimate_no}</p>
                  </p>
                </div>
                <br />
                <div className="flex justify-end w-full">
                  <p className="">
                    <p className="">Estimate Date:</p>
                    <p className="font-bold">
                      {new Date(data?.estimate_date).toDateString()}
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <hr className="text-black bg-black" />

            <div className="flex-row justify-between lg:flex">
              <div className="flex flex-col my-5 ">
                <div className="flex">
                  <p className="text-2xl font-bold underline">Bill To</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Company :</p>
                  <p className="px-3">{data?.customer?.company_name}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Customer :</p>
                  <p className="px-3">{data?.customer?.name}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Area :</p>
                  <p className="px-3">{data?.company?.address?.area}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">street :</p>
                  <p className="px-3">{data?.customer?.address?.street}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">City :</p>
                  <p className="px-3">{data?.customer?.address?.city}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">State :</p>
                  <p className="px-3">{data?.customer?.address?.state}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Country :</p>
                  <p className="px-3">{data?.customer?.address?.country}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Pincode :</p>
                  <p className="px-3">{data?.customer?.address?.pincode}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">PAN :</p>
                  <p className="px-3">{data?.customer?.pan}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">GSTIN :</p>
                  <p className="px-3">{data?.customer?.gst_number}</p>
                </div>
                <div className="flex pt-2">
                  <p className="font-bold">Place of Supply :</p>
                  <p className="px-3">{data?.customer?.place_of_supply}</p>
                </div>
              </div>
              <div className="flex flex-col my-5">
                <div className="flex">
                  <p className="text-2xl font-bold underline">Billed From</p>
                </div>

                <div className="flex mt-2">
                  <p className="font-bold">Company :</p>
                  <p className="px-3">{data?.company?.business_legal_name}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Name :</p>
                  <p className="px-3">{data?.company?.name}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Mob No. :</p>
                  <p className="px-3">{data?.company?.mobile}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">email :</p>
                  <p className="px-3">{data?.company?.email}</p>
                </div>

                <div className="flex">
                  <p className="font-bold">Area :</p>
                  <p className="px-3">{data?.company?.address?.area}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">street :</p>
                  <p className="px-3">{data?.company?.address?.street}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">City :</p>
                  <p className="px-3">{data?.company?.address?.city}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">State :</p>
                  <p className="px-3">{data?.company?.address?.state}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">Country :</p>
                  <p className="px-3">{data?.company?.address?.country}</p>
                </div>
                <div className="flex">
                  <p className="font-bold">GSTIN :</p>
                  <p className="px-3">{data?.company?.gst_number}</p>
                </div>
              </div>
            </div>
            <Divider />
            {/* //done */}
            <div>
              <div className="my-5">
                <Divider />
                <TableContainer elevation={0} component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className="!font-bold" align="center">
                          #
                        </TableCell>
                        {data?.type_of_project !== "Operational" ? (
                          <TableCell
                            className="!font-bold !border-r"
                            align="center"
                          >
                            Phase
                          </TableCell>
                        ) : (
                          <TableCell
                            className="!font-bold !border-r"
                            align="center"
                          >
                            Work Order
                          </TableCell>
                        )}

                        {data?.type_of_project === "Strategic" && (
                          <TableCell
                            className="!font-bold !border-r"
                            align="center"
                          >
                            Miles Stone
                          </TableCell>
                        )}
                        <TableCell
                          className="!font-bold !border-r"
                          align="center"
                        >
                          Material
                        </TableCell>
                        <TableCell
                          className="!font-bold !border-r"
                          align="center"
                        >
                          Operation
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell className="!font-bold" align="center">
                          0
                        </TableCell>
                        {data?.type_of_project !== "Operational" ? (
                          <TableCell
                            className={"!flex !justify-between bg-red-500"}
                          >
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        ) : (
                          <TableCell className={"!flex !justify-between"}>
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        )}

                        {data?.type_of_project === "Strategic" && (
                          <TableCell className={"!flex !justify-between"}>
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        )}
                        <TableCell className={"!flex !justify-between"}>
                          <p>Name</p> <p>Cost</p>
                        </TableCell>
                        <TableCell className={"!flex !justify-between"}>
                          <p>Name</p> <p>Time</p> <p>Cost</p>
                        </TableCell>
                      </TableRow> */}
                    </TableHead>
                    <TableBody>
                      {(data?.phases_on_estimate_project
                        ? data?.phases_on_estimate_project
                        : data?.work_order_or_task_on_estimate_project
                      )?.map((row, index) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          {data?.type_of_project !== "Operational" ? (
                            <TableCell>
                              <p className="flex flex-col">
                                <span className="font-bold">
                                  {/* Phase */}
                                  <SpanningTable
                                    currency={data?.currency}
                                    rows={[
                                      {
                                        name: row?.phase_name,
                                        time: row?.spent_time,
                                        cost: row?.spent_cost,
                                      },
                                    ]}
                                  />
                                </span>
                              </p>
                            </TableCell>
                          ) : (
                            <TableCell>
                              {/* Work Order */}
                              {
                                <SpanningTable
                                  currency={data?.currency}
                                  rows={[
                                    {
                                      name: row.work_order_or_task_name,
                                      time: row.spent_time,
                                      cost: row.spent_cost,
                                    },
                                  ]}
                                />
                              }
                            </TableCell>
                          )}

                          {data?.type_of_project === "Strategic" && (
                            <TableCell>
                              {/* Miles Stone */}
                              {console.log(row, "bharatxx")}
                              <SpanningTable
                                currency={data?.currency}
                                rows={convertMilesStoneDataToNTC(
                                  row?.milestone_on_phases_on_estimate_project
                                )}
                              />
                            </TableCell>
                          )}
                          <TableCell>
                            {/* Material */}

                            {
                              <SpanningTable
                                currency={data?.currency}
                                rows={convertMaterialDataToNTC(
                                  data?.type_of_project === "Strategic"
                                    ? row
                                        ?.milestone_on_phases_on_estimate_project?.[0]
                                        ?.materials_on_estimate_project
                                    : data?.type_of_project === "Tactical"
                                    ? row?.materials_on_estimate_project
                                    : row?.materials_on_estimate_project
                                )}
                              />
                            }
                          </TableCell>
                          <TableCell>
                            {/* Operation */}
                            {console.log(row, "rowname")}
                            <SpanningTable
                              currency={data?.currency}
                              rows={convertOperationDataToNTC(
                                data?.type_of_project === "Strategic"
                                  ? row
                                      ?.milestone_on_phases_on_estimate_project?.[0]
                                      ?.operations_on_estimate_project
                                  : data?.type_of_project === "Tactical"
                                  ? row?.operations_on_estimate_project
                                  : row?.operations_on_estimate_project
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="flex-row items-center justify-between w-full my-5 lg:flex">
                <div className="flex flex-col lg:w-[50%] w-full">
                  <p className="font-bold text-gray-700 ">Estimate Feedback*</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.feedback
                        ? data?.feedback
                        : "Currently No Feedback",
                    }}
                  ></p>
                </div>
                <div className="flex flex-col lg:w-[50%] w-full my-3">
                  <div className="flex flex-row items-center justify-between w-full my-2">
                    <p className="!font-bold">Project Name :</p>
                    <p>{data?.project_name}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-row items-center justify-between w-full my-2">
                    <p className="!font-bold">Type of Project</p>
                    <p>{data?.type_of_project}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-row items-center justify-between w-full my-2">
                    <p className="!font-bold">No. of Phases</p>
                    <p>{data?.no_of_phases}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-row items-center justify-between w-full my-2">
                    <p className="!font-bold">Price</p>
                    <p>
                      {data?.total_price} {data?.currency}
                    </p>
                  </div>
                  <Divider />
                  {data?.type_tax === "IGST" ? (
                    <div className="flex flex-row items-center justify-between w-full my-2">
                      <p className="!font-bold">IGST</p>
                      <p>
                        {data?.igst}
                        {"%"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row items-center justify-between w-full my-2">
                        <p className="!font-bold">CGST</p>
                        <p>
                          {data?.cgst}
                          {"%"}
                        </p>
                      </div>
                      <Divider />
                      <div className="flex flex-row items-center justify-between w-full my-2">
                        <p className="!font-bold">SGST</p>
                        <p>
                          {data?.sgst}
                          {"%"}
                        </p>
                      </div>
                    </>
                  )}
                  <Divider />

                  <div className="flex flex-row items-center justify-between w-full my-2 ">
                    <p className="font-bold">Total Amount</p>
                    <p>
                      {data?.total_amount} {data?.currency}
                    </p>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="flex-row items-center justify-between w-full my-5 lg:flex">
                <div className="flex flex-col w-full">
                  <p className="font-bold">Authorised Signature</p>
                  <img src={imageSinature} alt="" className="w-32 h-32 p-1" />
                  <p className="font-bold">Terms and Conditions :</p>
                  <p>Pay according to Terms and conditions.</p>
                </div>
                <div className="flex flex-col justify-center w-full">
                  <p className="font-bold">Scan UPI for payment</p>
                  <img src={imageUPI} alt="" className="w-32 h-32 p-1" />
                  {/* <p className="font-bold">Terms and Conditions :</p>
                    <p>Pay according to Terms and conditions.</p> */}
                </div>
              </div>
              <div>
                <div className="flex flex-col my-2">
                  <p className="font-bold text-center">Description</p>
                  <Divider />
                  <p className="px-2">{data?.description}</p>
                </div>
              </div>
            </div>
          </div>
          {/* //copy of upper code for pdf */}
          <div
            ref={targetRef}
            className="h-[1920px] w-[1080px] mt-[100vh] px-5 py-5"
          >
            {/* //add here */}
            <div className="w-full h-full px-10 py-5">
              <div className="flex-row items-center justify-between border-b-2 lg:flex">
                <div className="flex flex-col my-5">
                  <div>
                    <img alt="" className="h-32" src={data?.company?.logo} />
                  </div>
                </div>
                <div className="flex flex-col my-5">
                  <div className="flex">
                    <p className="text-3xl font-bold capitalize">ESTIMATE</p>
                  </div>
                  <div className="flex justify-end w-full">
                    <p className="flex">
                      <p className="font-bold">{data?.estimate_no}</p>
                    </p>
                  </div>
                  <br />
                  <div className="flex justify-end w-full">
                    <p className="">
                      <p className="">Estimate Date:</p>
                      <p className="font-bold">
                        {new Date(data?.estimate_date).toDateString()}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <hr className="text-black bg-black" />

              <div className="flex-row justify-between lg:flex">
                <div className="flex flex-col my-5 ">
                  <div className="flex">
                    <p className="text-2xl font-bold underline">Bill To</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Company :</p>
                    <p className="px-3">{data?.customer?.company_name}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Customer :</p>
                    <p className="px-3">{data?.customer?.name}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Area :</p>
                    <p className="px-3">{data?.company?.address?.area}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">street :</p>
                    <p className="px-3">{data?.customer?.address?.street}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">City :</p>
                    <p className="px-3">{data?.customer?.address?.city}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">State :</p>
                    <p className="px-3">{data?.customer?.address?.state}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Country :</p>
                    <p className="px-3">{data?.customer?.address?.country}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Pincode :</p>
                    <p className="px-3">{data?.customer?.address?.pincode}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">PAN :</p>
                    <p className="px-3">{data?.customer?.pan}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">GSTIN :</p>
                    <p className="px-3">{data?.customer?.gst_number}</p>
                  </div>
                  <div className="flex pt-2">
                    <p className="font-bold">Place of Supply :</p>
                    <p className="px-3">{data?.customer?.place_of_supply}</p>
                  </div>
                </div>
                <div className="flex flex-col my-5">
                  <div className="flex">
                    <p className="text-2xl font-bold underline">Billed From</p>
                  </div>

                  <div className="flex mt-2">
                    <p className="font-bold">Company :</p>
                    <p className="px-3">{data?.company?.business_legal_name}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Name :</p>
                    <p className="px-3">{data?.company?.name}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Mob No. :</p>
                    <p className="px-3">{data?.company?.mobile}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">email :</p>
                    <p className="px-3">{data?.company?.email}</p>
                  </div>

                  <div className="flex">
                    <p className="font-bold">Area :</p>
                    <p className="px-3">{data?.company?.address?.area}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">street :</p>
                    <p className="px-3">{data?.company?.address?.street}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">City :</p>
                    <p className="px-3">{data?.company?.address?.city}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">State :</p>
                    <p className="px-3">{data?.company?.address?.state}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">Country :</p>
                    <p className="px-3">{data?.company?.address?.country}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">GSTIN :</p>
                    <p className="px-3">{data?.company?.gst_number}</p>
                  </div>
                </div>
              </div>
              <Divider />
              {/* //done */}
              <div>
                <div className="my-5">
                  <Divider />
                  <TableContainer elevation={0} component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell className="!font-bold" align="center">
                            #
                          </TableCell>
                          {data?.type_of_project !== "Operational" ? (
                            <TableCell
                              className="!font-bold !border-r"
                              align="center"
                            >
                              Phase
                            </TableCell>
                          ) : (
                            <TableCell
                              className="!font-bold !border-r"
                              align="center"
                            >
                              Work Order
                            </TableCell>
                          )}

                          {data?.type_of_project === "Strategic" && (
                            <TableCell
                              className="!font-bold !border-r"
                              align="center"
                            >
                              Miles Stone
                            </TableCell>
                          )}
                          <TableCell
                            className="!font-bold !border-r"
                            align="center"
                          >
                            Material
                          </TableCell>
                          <TableCell
                            className="!font-bold !border-r"
                            align="center"
                          >
                            Operation
                          </TableCell>
                        </TableRow>
                        {/* <TableRow>
                        <TableCell className="!font-bold" align="center">
                          0
                        </TableCell>
                        {data?.type_of_project !== "Operational" ? (
                          <TableCell
                            className={"!flex !justify-between bg-red-500"}
                          >
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        ) : (
                          <TableCell className={"!flex !justify-between"}>
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        )}

                        {data?.type_of_project === "Strategic" && (
                          <TableCell className={"!flex !justify-between"}>
                            <p>Name</p> <p>Time</p> <p>Cost</p>
                          </TableCell>
                        )}
                        <TableCell className={"!flex !justify-between"}>
                          <p>Name</p> <p>Cost</p>
                        </TableCell>
                        <TableCell className={"!flex !justify-between"}>
                          <p>Name</p> <p>Time</p> <p>Cost</p>
                        </TableCell>
                      </TableRow> */}
                      </TableHead>
                      <TableBody>
                        {(data?.phases_on_estimate_project
                          ? data?.phases_on_estimate_project
                          : data?.work_order_or_task_on_estimate_project
                        )?.map((row, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            {data?.type_of_project !== "Operational" ? (
                              <TableCell>
                                <p className="flex flex-col">
                                  <span className="font-bold">
                                    {/* Phase */}
                                    <SpanningTable
                                      currency={data?.currency}
                                      rows={[
                                        {
                                          name: row?.phase_name,
                                          time: row?.spent_time,
                                          cost: row?.spent_cost,
                                        },
                                      ]}
                                    />
                                  </span>
                                </p>
                              </TableCell>
                            ) : (
                              <TableCell>
                                {/* Work Order */}
                                {
                                  <SpanningTable
                                    currency={data?.currency}
                                    rows={[
                                      {
                                        name: row.work_order_or_task_name,
                                        time: row.spent_time,
                                        cost: row.spent_cost,
                                      },
                                    ]}
                                  />
                                }
                              </TableCell>
                            )}

                            {data?.type_of_project === "Strategic" && (
                              <TableCell>
                                {/* Miles Stone */}

                                <SpanningTable
                                  currency={data?.currency}
                                  rows={convertMilesStoneDataToNTC(
                                    row?.milestone_on_phases_on_estimate_project
                                  )}
                                />
                              </TableCell>
                            )}
                            <TableCell>
                              {/* Material */}

                              {
                                <SpanningTable
                                  currency={data?.currency}
                                  rows={convertMaterialDataToNTC(
                                    data?.type_of_project === "Strategic"
                                      ? row
                                          ?.milestone_on_phases_on_estimate_project?.[0]
                                          ?.materials_on_estimate_project
                                      : data?.type_of_project === "Tactical"
                                      ? row?.materials_on_estimate_project
                                      : row?.materials_on_estimate_project
                                  )}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              {/* Operation */}
                              {console.log(row, "rowname")}
                              <SpanningTable
                                currency={data?.currency}
                                rows={convertOperationDataToNTC(
                                  data?.type_of_project === "Strategic"
                                    ? row
                                        ?.milestone_on_phases_on_estimate_project?.[0]
                                        ?.operations_on_estimate_project
                                    : data?.type_of_project === "Tactical"
                                    ? row?.operations_on_estimate_project
                                    : row?.operations_on_estimate_project
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="flex-row items-center justify-between w-full my-5 lg:flex">
                  <div className="flex flex-col lg:w-[50%] w-full">
                    <p className="font-bold text-gray-700 ">
                      Estimate Feedback*
                    </p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data?.feedback
                          ? data?.feedback
                          : "Currently No Feedback",
                      }}
                    ></p>
                  </div>
                  <div className="flex flex-col lg:w-[50%] w-full my-3">
                    <div className="flex flex-row items-center justify-between w-full my-2">
                      <p className="!font-bold">Project Name :</p>
                      <p>{data?.project_name}</p>
                    </div>
                    <Divider />
                    <div className="flex flex-row items-center justify-between w-full my-2">
                      <p className="!font-bold">Type of Project</p>
                      <p>{data?.type_of_project}</p>
                    </div>
                    <Divider />
                    <div className="flex flex-row items-center justify-between w-full my-2">
                      <p className="!font-bold">No. of Phases</p>
                      <p>{data?.no_of_phases}</p>
                    </div>
                    <Divider />
                    <div className="flex flex-row items-center justify-between w-full my-2">
                      <p className="!font-bold">Price</p>
                      <p>
                        {data?.total_price} {data?.currency}
                      </p>
                    </div>
                    <Divider />
                    {data?.type_tax === "IGST" ? (
                      <div className="flex flex-row items-center justify-between w-full my-2">
                        <p className="!font-bold">IGST</p>
                        <p>
                          {data?.igst}
                          {"%"}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-row items-center justify-between w-full my-2">
                          <p className="!font-bold">CGST</p>
                          <p>
                            {data?.cgst}
                            {"%"}
                          </p>
                        </div>
                        <Divider />
                        <div className="flex flex-row items-center justify-between w-full my-2">
                          <p className="!font-bold">SGST</p>
                          <p>
                            {data?.sgst}
                            {"%"}
                          </p>
                        </div>
                      </>
                    )}
                    <Divider />

                    <div className="flex flex-row items-center justify-between w-full my-2 ">
                      <p className="font-bold">Total Amount</p>
                      <p>
                        {data?.total_amount} {data?.currency}
                      </p>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="flex-row items-center justify-between w-full my-5 lg:flex">
                  <div className="flex flex-col w-full">
                    <p className="font-bold">Authorised Signature</p>
                    <img src={imageSinature} alt="" className="w-32 h-32 p-1" />
                    <p className="font-bold">Terms and Conditions :</p>
                    <p>Pay according to Terms and conditions.</p>
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    <p className="font-bold">Scan UPI for payment</p>
                    <img src={imageUPI} alt="" className="w-32 h-32 p-1" />
                    {/* <p className="font-bold">Terms and Conditions :</p>
                    <p>Pay according to Terms and conditions.</p> */}
                  </div>
                </div>
                <div>
                  <div className="flex flex-col my-2">
                    <p className="font-bold text-center">Description</p>
                    <Divider />
                    <p className="px-2">{data?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* end here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePDF;
