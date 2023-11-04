import React,{useEffect, useState} from 'react'
import {SlCalender} from 'react-icons/sl';
import {RiArrowDropDownLine} from 'react-icons/ri'
import {FiFilter} from 'react-icons/fi'
import CustomMenuForFilter from '../../../Shared/CustomMenuForFiler'
import DayWiseFormForFilter from './DayWiseFormDataForFilter';
import {TextField} from '@mui/material'
import {Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import Loding from '../../../Loding'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell'
import Chart from 'react-apexcharts';
import { purchaseSpendFn } from '../../../Services/Report/PurchaseReports/PurchaseSpend';
import ReactApexChart from "react-apexcharts";
import { purchase_order_overtimeFn } from '../../../Services/Report/PurchaseReports/PurchaseOrderOverTime';
import { purchaseReportProductFn } from '../../../Services/Report/PurchaseReports/PurchaseReportProduct';
import { purchasingReportRowFn } from '../../../Services/Report/PurchaseReports/PurchasingReportRow';


const PurchaseOverview = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState('');
  const [menuButtonData, setMenuButtonData] = useState('Daily');
  const [loding, setloding] = useState(false);


//api data
const [purchaseSpendData, setPurchaseSpendData] = useState({});
const [purchaseOrderOverTime, setpurchaseOrderOverTime] = useState({});
const [purchaseReportProduct, setPurchaseReportProduct] = useState([]);
const [purchasingReportRow, setPurchasingReportRow] = useState([]);

  useEffect(()=>{
    purchasingReportRowFn({
        setloding,
        setData:setPurchasingReportRow
    })

    purchase_order_overtimeFn({
      setloding,
      setData:setpurchaseOrderOverTime
    })
    purchaseReportProductFn({
      setloding,
      setData:setPurchaseReportProduct
    })
  },[])


useEffect(()=>{
  purchaseSpendFn({
    setloding,
    setData:setPurchaseSpendData,
    filter:
    menuButtonData === 'Daily' && 'daily' ||
    menuButtonData === 'Weekly' && 'weekly' ||
    menuButtonData === 'Monthly' && 'monthly' ||
    menuButtonData === 'Quarterly' && 'quarterly' 
  })
},[menuButtonData])

// console.log(menuButtonData)



  function openMenuBox(event,data){
    setAnchorEl(event.currentTarget)
    setopenMenuButton(true)
    setmenuDataOnHandle(data)
  }

console.log(menuButtonData)

  const state = {
    options: {
        chart: {
            type: 'radialBar',

        },
        dataLabels: {
            enabled: true
        }
    },
    series: [
        Number(`${purchaseSpendData?.received}`),
        Number( `${purchaseSpendData?.not_received}`),
        Number(`${purchaseSpendData?.order_count}`),
    ],
  //   series: [
  //    10,20,30
  // ],
    labels: ['Received',' Not Received','Order Count'],
}

  // const [charts, setCharts] = useState(state);


  // chart 2
  const state2 = {
    options: {
        chart: {
            type: 'radialBar',

        },
        dataLabels: {
            enabled: true
        }
    },
    series: [
        Number(`${purchaseOrderOverTime?.received}`),
        Number( `${purchaseOrderOverTime?.not_received}`),
        Number(`${purchaseOrderOverTime?.order_count}`),
    ],
    labels: ['Received',' Not Received','Order Count'],
}






const OrderRevenue = {

  series: [{
      name: "Purchase Spend",
      data: [
        Number(`${purchaseSpendData?.received}`),
        Number( `${purchaseSpendData?.not_received}`),
        Number(`${purchaseSpendData?.order_count}`),
      ]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Purchase Spend',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Received',' Not Received','Order Count'],
    }
  }
}



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '8px 16px', // Adjust the padding values as needed
    },
  }));
  
  
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
      const columns = [
        { id: 'name', label: 'Received' },
        { id: 'code', label: 'Not Received' ,align: '',},
        {
          id: 'size',
          label: 'Order Count',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
      ];

      if(loding)
      return <Loding/>
  return (
    <>
      <div className='w-full' >
            {/* // filter */}
            <div className='relative top-0'>
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

                            {/* <div 
                            onClick={(e)=>openMenuBox(e,"morefilter")}
                            className=' cursor-pointer text-[#2563EB] shadow-lg flex items-center  gap-5 h-full bg-white px-3 py-2 rounded-l-full rounded-r-full'>
                            <p> More Filter</p>
                            <p className='font-bold text-2xl text-[#2563EB]'><FiFilter/></p>

                            </div>      */}
                                
                        </div>
                      
                    </div>
            </div>

            {/* // cards */}
              <div className="bg-[#F3E8FF] mt-20 py-12">
                <div className="grid lg:grid-cols-3 px-10 gap-5 font-semibold">
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-16 pl-5">
                        <p>Received</p>
                        <p>{purchaseSpendData?.received}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Not Received</p>
                        <p>{purchaseSpendData?.not_received}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Order Count</p>
                        <p>{purchaseSpendData?.order_count}</p>
                    </div>
                </div>
            </div>


            {/* //charts */}

            {/* charts 1 */}
            {/* revenue */}
            <div className='mt-10 bg-white p-2 rounded-lg w-full'>
         
            <div className="donut w-full">
                <Chart options={OrderRevenue.options} series={OrderRevenue.series} type="bar" width="100%" height='300px' />
            </div>
                         
            </div>
            {/* // graph */}
            <div className=' mt-10 bg-white rounded-xl '>
            <p className="pb-6 font-bold p-3">Purchase Spend</p>
                            <hr />
                    <div className="grid lg:grid-cols-2 gap-x-10">
                        <div className="bg-white rounded-xl">
                            <div className="grid lg:grid-cols-1 pt-5 text-gray-600  ">
                                <div>
                                    <ReactApexChart options={state.options} series={state.series} type='radialBar' width="100%" height="auto" />
                                </div>
                                
                            </div>
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                        
                                    <ul className="list-disc">
                                        {state.labels.map((i) => {
                                            return (
                                                <li className="pt-2">{i}</li>
                                            )
                                        })}
                                    </ul>

                                </div>
                        
                    </div>
            </div>

            {/* // graph 2 */}
            <div className=' mt-10  bg-white rounded-xl '>
                   <p className="pb-6 font-bold p-3">Purchase Order Overtime</p>
                            <hr />
                    <div className="grid lg:grid-cols-2 gap-x-10">
                     
                               <div className="w-[50%]  flex items-center pl-8 justify-center">
                               
                                    <ul className="list-disc">
                                        {state2.labels.map((i) => {
                                            return (
                                                <li className="pt-2">{i}</li>
                                            )
                                        })}
                                    </ul>

                                </div>
                                <div className="bg-white rounded-xl">
                            
                            <div className="grid lg:grid-cols-1 pt-5 text-gray-600  ">
                                <div>
                                    <ReactApexChart options={state2.options} series={state2.series} type='radialBar' width="100%" height="auto" />
                                </div>
                                
                            </div>
                        </div>
                        
                       </div>
                        
                        
            </div>




        {/* //table */}
       <div className='bg-white mt-10  rounded-lg px-3 py-2'>
       <Paper sx={{mt:5,maxHeight:300 , overflow:"scroll"}}>
        <p className='px-2 py-1 text-md font-bold'>Purchasing Report Product</p>
      <TableContainer sx={{maxheight:'100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='!bg-purple-300'>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className='!text-black !font-bold !bg-gray-300'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
             {
                purchaseReportProduct.map((singleItem,index)=>{
                    return <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{singleItem?.name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{singleItem?.stock}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{singleItem?.spend}</StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">{row?.total_orders_items}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit_margin}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.total_profit}</StyledTableCell> */}
                </StyledTableRow>
                })
             }
                
             
            </TableBody>
        </Table>
      </TableContainer>
   
      
    
    </Paper>
       </div>


       {/* // table 2 */}
       <div className='bg-white mt-10  rounded-lg px-3 py-2'>
       <Paper sx={{mt:5,maxHeight:300 , overflow:"scroll"}}>
        <p className='px-2 py-1 text-md font-bold'>Purchasing Report Row</p>
      <TableContainer sx={{maxheight:'100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='!bg-purple-300'>
            <TableRow>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Vendor Name</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Order No.</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Purchase Date</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Name</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Category</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Product Name</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Default Value</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Price/Unit</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>Purchase Qnt</TableCell>
            <TableCell className='!text-black !font-bold !bg-gray-300'>In Stock</TableCell>

            </TableRow>
          </TableHead>
            <TableBody>
             {
                purchasingReportRow.map((row,index)=>{
                    return <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.vendor_name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.order_number}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{new Date(row?.purchase_date).toDateString()}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.category}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.product_name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.default_purchase}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.price_per_unit}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.purchase_qty}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.in_stock_qty}</StyledTableCell>
                </StyledTableRow>
                })
             }
            </TableBody>
        </Table>
      </TableContainer>
   
      
    
    </Paper>
       </div>

      </div>
     


      {
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
      }

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
  )
}

export default PurchaseOverview