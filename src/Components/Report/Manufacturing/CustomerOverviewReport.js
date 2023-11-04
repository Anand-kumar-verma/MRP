import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { SlCalender } from "react-icons/sl";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import CustomMenuForFilter from "../../../Shared/CustomMenuForFiler";
// import DayWiseFormForFilter from './DayWiseFormDataForFilter';
import { TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Loding from "../../../Loding";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import ReactApexChart from "react-apexcharts";
import { manufacturingCostReportFn } from "../../../Services/Report/Manufacturing/CustomerOverview/ManufacturingCostReport";
import { productionUnitCostFn } from "../../../Services/Report/Manufacturing/CustomerOverview/ProductionUnitCost";
import { productUnitCostFn } from "../../../Services/Report/Manufacturing/CustomerOverview/ProductUnitCost";
import { moOrderStatusFn } from "../../../Services/Report/Manufacturing/CustomerOverview/MoOrderStatus";
import { materialAndOperationCostFn } from "../../../Services/Report/Manufacturing/CustomerOverview/MaterialAndOperationCost";

function CustomerOverviewReport() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState("");
  const [menuButtonData, setMenuButtonData] = useState("Daily");
  const [loding, setloding] = useState(false);

  //api data
  const [purchaseSpendData, setPurchaseSpendData] = useState({});
  const [productUnitCost, setProductUnitCost] = useState([]);

  const [manufacturing_cost_report, setmanufacturing_cost_report] = useState(
    []
  );

  const [bomProductName, setBomProductName] = useState([]);
  const [month_total_cost, setmonth_total_cost] = useState([]);
  const [month_total_quantity, setmonth_total_quantity] = useState([]);

  const [mo_orders_status, setmo_orders_status] = useState([]);
  const [materialandOperationCost, setmaterialandOperationCost] = useState({});
  


  useEffect(() => {
    materialAndOperationCostFn({
      setloding,
      setData: setmaterialandOperationCost,
    });

    moOrderStatusFn({
      setloding,
      setData: setmo_orders_status,
    });
    manufacturingCostReportFn({
      setloding,
      setData: setmanufacturing_cost_report,
    });
    productUnitCostFn({
      setloding,
      setData: setProductUnitCost,
    });
    productionUnitCostFn({
      setloding,
      setData: setPurchaseSpendData,
    });
  }, []);
  useEffect(() => {
    setBomProductName(
      productUnitCost.map((i) => {
        return i?.bom__product__name;
      })
    );
    setmonth_total_cost(
      productUnitCost.map((i) => {
        return i?.month_total_cost;
      })
    );
    setmonth_total_quantity(
      productUnitCost.map((i) => {
        return i?.month_total_quantity;
      })
    );
  }, [productUnitCost]);


  // console.log(mo_orders_status)
  function openMenuBox(event, data) {
    setAnchorEl(event.currentTarget);
    setopenMenuButton(true);
    setmenuDataOnHandle(data);
  }


  // console.log(materialandOperationCost);

  const state = {
    options: {
      chart: {
        type: "radialBar",
      },
      dataLabels: {
        enabled: true,
      },
    },
    series: [
      Number(`${purchaseSpendData?.total_manufacturing_cost}`),
      Number(`${purchaseSpendData?.total_quantity_manufactured}`),
      Number(`${purchaseSpendData?.total_production_hours}`),
      Number(`${purchaseSpendData?.cost_per_unit}`),
      Number(`${purchaseSpendData?.current_month_production_unit_cost}`),
    ],

    labels: [
      "Total Manufacturing Cost",
      "Total Quantity Manufactured",
      "Total Production Hrs.",
      "Cost/Unit",
      "Current Month Production Unit Cost",
    ],
  };

  // const [charts, setCharts] = useState(state);
  // chart 2
  const ch2_state = {
    series: [
      {
        data: month_total_cost,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: bomProductName,
      },
    },
  };

  const ch3_state = {
    series: [
      {
        data: month_total_quantity,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: bomProductName,
      },
    },
  };


  const ch4_state = {
    series: [
      {
        data: [materialandOperationCost?.total_materials_cost || 10,
          materialandOperationCost?.total_operations_cost || 10],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Total Material Cost','Total Operational Cost'],
      },
    },
  };


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
    { id: "name", label: "Product Name" },
    { id: "code", label: "Total Cost", align: "" },
    {
      id: "size",
      label: "Production Qnt",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sdfize",
      label: "Total Unit Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sidfsze",
      label: "Ingredient Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sidfsze",
      label: "Ingredient Unit Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sidfsze",
      label: "Operation Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sidfsze",
      label: "Operation Unit Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  if (loding) return <Loding />;
  return (
    <>
      <div className="w-full">
        {/* // filter */}
        {/* <div className='relative top-0'>
                    <div className='flex justify-between w-full z-50  bg-[#F5F5F5] fixed'>
                            <div className="grid grid-cols-3 place-items-center  gap-2 pb-5  bg-[#F5F5F5] z-50">
                                <div
                                onClick={(e)=>openMenuBox(e,"DaysMenu")}
                                className='cursor-pointer shadow-lg flex items-center  gap-5 h-full bg-white px-3 py-2 rounded-l-full rounded-r-full'>
                                    <p className='text-[#2563EB]'><SlCalender/></p>
                                    <span
                                    className='text-[#2563EB] '
                                    
                                    >{menuButtonData}</span>
                                    <p className='font-bold text-2xl text-[#2563EB]'><RiArrowDropDownLine/></p>
                                </div>
    
                                <div
                                onClick={(e)=>openMenuBox(e,"morefilter")}
                                className=' cursor-pointer text-[#2563EB] shadow-lg flex items-center  gap-5 h-full bg-white px-3 py-2 rounded-l-full rounded-r-full'>
                                <p> More Filter</p>
                                <p className='font-bold text-2xl text-[#2563EB]'><FiFilter/></p>
    
                                </div>
                                    
                            </div>
                          
                        </div>
                </div> */}

        {/* // cards */}
        <div className="bg-[#F3E8FF] mt-20 py-12">
          <div className="grid lg:grid-cols-5 px-10 gap-5 font-semibold">
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-16 pl-5">
              <p>Total Manufacturing Cost</p>
              <p className="text-2xl text-blue-600">
                {purchaseSpendData?.total_manufacturing_cost}
              </p>
            </div>
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
              <p>Total Quantity Manufactured</p>
              <p className="text-2xl text-blue-600">
                {purchaseSpendData?.total_quantity_manufactured}
              </p>
            </div>
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
              <p>Total Production Hrs.</p>
              <p className="text-2xl text-blue-600">
                {purchaseSpendData?.total_production_hours}
              </p>
            </div>
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
              <p>Cost/Unit</p>
              <p className="text-2xl text-blue-600">
                {purchaseSpendData?.cost_per_unit}
              </p>
            </div>
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
              <p>Current Month Production Unit Cost</p>
              <p className="text-2xl text-blue-600">
                {purchaseSpendData?.current_month_production_unit_cost}
              </p>
            </div>
          </div>
        </div>

        {/* // graph */}
        <div className=" mt-10 bg-white rounded-xl ">
          <p className="pb-6 font-bold p-3">Purchase Spend</p>
          <hr />
          <div className="grid lg:grid-cols-2 gap-x-10">
            <div className="bg-white rounded-xl">
              <div className="grid lg:grid-cols-1 pt-5 text-gray-600  ">
                <div>
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="radialBar"
                    width="100%"
                    height="auto"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <ul className="list-disc">
                {state.labels.map((i) => {
                  return <li className="pt-2">{i}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* // graph 2 */}
        <div className=" mt-10  bg-white rounded-xl ">
          <p className="pb-6 font-bold p-3">Product Unit Cost</p>
          <hr />
          <ReactApexChart
            options={ch2_state.options}
            series={ch2_state.series}
            type="bar"
            height={350}
          />
        </div>

        <div className=" mt-10  bg-white rounded-xl ">
          <p className="pb-6 font-bold p-3">Product Unit Quantity</p>
          <hr />
          <ReactApexChart
            options={ch3_state.options}
            series={ch3_state.series}
            type="bar"
            height={350}
          />
        </div>

        <div className=" mt-10  bg-white rounded-xl ">
          <p className="pb-6 font-bold p-3">Product Unit Quantity</p>
          <hr />
          <ReactApexChart
            options={ch4_state.options}
            series={ch4_state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      {/* //table */}
      <div className="bg-white mt-10  rounded-lg px-3 py-2">
        <Paper sx={{ mt: 5, maxHeight: 300, overflow: "scroll" }}>
          <p className="px-2 py-1 text-md font-bold">Manufacturing Cost</p>
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
                {manufacturing_cost_report.map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="capitalize"
                      >
                        {row?.product_name}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="capitalize"
                      >
                        {row?.total_cost}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.production_quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.total_unit_cost}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.ingredient_cost}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.ingredient_unit_cost}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.operations_cost}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.operations_unit_cost}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      {/* // table 2 */}
      <div className="bg-white mt-10  rounded-lg px-3 py-2">
        <Paper sx={{ mt: 5, maxHeight: 300, overflow: "scroll" }}>
          <p className="px-2 py-1 text-md font-bold">MO Order Status</p>
          <TableContainer sx={{ maxheight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="!bg-purple-300">
                <TableRow>
                  <TableCell className="!text-black !font-bold !bg-gray-300">
                    Working Stage
                  </TableCell>
                  <TableCell className="!text-black !font-bold !bg-gray-300">
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mo_orders_status.map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="capitalize"
                      >
                        {row?.working_stage}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="capitalize"
                      >
                        {row?.value}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      {/* {
              openMenuButton && menuDataOnHandle === 'DaysMenu' &&
              <CustomMenuForFilter
                setopenMenuButton = {setopenMenuButton}
                anchorEl = {anchorEl}
                setAnchorEl = {setAnchorEl}
                component = <DayWiseFormForFilter
                setopenMenuButton = {setopenMenuButton}
                setMenuButtonData = {setMenuButtonData}
                menuButtonData = {menuButtonData}
                />
              />
            } */}

      {/* {
              openMenuButton && menuDataOnHandle === 'morefilter' &&
              <CustomMenuForFilter
                setopenMenuButton = {setopenMenuButton}
                anchorEl = {anchorEl}
                setAnchorEl = {setAnchorEl}
                component = <div className='flex  gap-4 px-3 py-10'>
                  <form className='flex flex-col gap-4 px-3'>
                      <div className='flex  gap-4 px-3 py-10'>
                      <TextField
                        id="outlined-basic"
                        label="Start Date"
                        variant="outlined"
                        type = "date"
                        InputLabelProps={{
                            shrink: true,
                                }}
                          />
                        <TextField
                        id="outlined-basic"
                          label="End Date"
                          variant="outlined"
                          type = "date"
                          InputLabelProps={{
                                shrink: true,
                              }}
                     />
                      </div>
      
                     <button className='bg-blue-950 text-white rounded-lg px-5 py-2'>GO</button>
                  </form>
                </div>
                />
            } */}
    </>
  );
}

export default CustomerOverviewReport;
