import React, { useEffect, useState } from "react";
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
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { supplierReport } from "../../../Services/Report/PurchaseReports/Supplier/SupplierReport";
import { top_supplierFn } from "../../../Services/Report/PurchaseReports/Supplier/TopSupplier";
import { ingredientUsagesReportFn } from "../../../Services/Report/Manufacturing/IngredientsReport/IngUsagesReport";
import { materialPerUnitCost } from "../../../Services/Report/Manufacturing/IngredientsReport/MaterialPerUnitCost";
const IngredientsReport = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState("");
  const [menuButtonData, setMenuButtonData] = useState("Daily");
  const [loding, setloding] = useState(false);

  //api data
  const [topSupplierData, setTopSupplierData] = useState([]);
  const [supplierReportData, setSupplierReportData] = useState({});

  const [material_per_unit_cost, setmaterial_per_unit_cost] = useState([]);
  const [period, setperiod] = useState([]);
  const [period_total_cost, setperiod_total_cost] = useState([]);
  const [period_total_quantity, setperiod_total_quantity] = useState([]);

  const [ingredientsUsageReport, setIngredientsUsageReport] = useState([]);
  useEffect(() => {
    // top_10_item_from_supplierFn({
    //     setloding,
    //     setData:settop_10_item_from_supplier
    // })
    // top_supplierFn({
    //   setloding,
    //   setData:setTopSupplierData
    // })
    ingredientUsagesReportFn({
      setloding,
      setData: setIngredientsUsageReport,
    });

    materialPerUnitCost({
      setloding,
      setData: setmaterial_per_unit_cost,
    });
  }, []);

  console.log(ingredientsUsageReport);

  useEffect(() => {
    setperiod(
      material_per_unit_cost.map((i) => {
        return i?.period;
      })
    );
    setperiod_total_cost(
      material_per_unit_cost.map((i) => {
        return i?.period_total_cost;
      })
    );
    setperiod_total_quantity(
      material_per_unit_cost.map((i) => {
        return i?.period_total_quantity;
      })
    );
  }, [material_per_unit_cost]);

  function openMenuBox(event, data) {
    setAnchorEl(event.currentTarget);
    setopenMenuButton(true);
    setmenuDataOnHandle(data);
  }

  // console.log(menuButtonData)

  const state = {
    options: {
      chart: {
        type: "radialBar",
      },
      dataLabels: {
        enabled: true,
      },
    },
    series: [period_total_cost[0] || 0, period_total_quantity[0] || 0],
    //   series: [
    //    10,20,30
    // ],
    labels: period,
  };


  const OrderRevenue = {
    series: [
      {
        name: "Total Cost",
        data: period_total_cost,
      },
      {
        name: "Total Quantity",
        data: period_total_quantity,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Material Per Unit Cost",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: period,
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
    { id: "name", label: "Act Qnt" },
    { id: "code", label: "Avg act Qnt/Order", align: "" },
    {
      id: "size",
      label: "Material Actual Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "dgdg",
      label: "Material Planned Cost",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "dsf",
      label: "Material Varients Name",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "dfd",
      label: "Planned Qnt",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sidfadfze",
      label: "Product Name",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "sizdde",
      label: "Production Date",
      align: "",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sdsdize",
      label: "Qnt Diff",
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
          <div className="grid lg:grid-cols-2 px-10 gap-5 font-semibold">
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-16 pl-5">
              <p>Daily Total Cost</p>
              <p>{period_total_cost[0] || 0}</p>
            </div>
            <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
              <p> Daily Total Quantity</p>
              <p>{period_total_cost[0] || 0}</p>
            </div>
          </div>
        </div>

        {/* //charts */}

        {/* charts 1 */}
        {/* revenue */}
        <div className="mt-10 bg-white p-2 rounded-lg w-full">
          <div className="donut w-full">
            <ReactApexChart
              options={OrderRevenue.options}
              series={OrderRevenue.series}
              type="line"
              height={350}
            />
          </div>
        </div>
        {/* // graph */}
        <div className=" mt-10 bg-white rounded-xl ">
          <p className="pb-6 font-bold p-3">Supplier Report</p>
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

        {/* //table */}
        <div className="bg-white mt-10  rounded-lg px-3 py-2">
          <Paper sx={{ mt: 5, maxHeight: 300, overflow: "scroll" }}>
            <p className="px-2 py-1 text-md font-bold">
              Purchasing Report Product
            </p>
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
                  {ingredientsUsageReport.map((singleItem, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.actual_qty}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.avg_actual_quantity_per_order}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {singleItem?.material_actual_cost}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.material_planned_cost}
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.material_variant_name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {singleItem?.planned_qty}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.product_name}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="capitalize"
                        >
                          {singleItem?.production_date}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {singleItem?.qty_difference}
                        </StyledTableCell>

                        {/* <StyledTableCell component="th" scope="row" className='capitalize'>{singleItem?.total_spend}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{singleItem?.order_accuracy_days}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{singleItem?.orders}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{singleItem?.price_per_unit}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{singleItem?.quantity_purchase_unit}</StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
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
};

export default IngredientsReport;
