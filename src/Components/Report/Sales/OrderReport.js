import React,{useEffect, useState} from 'react'
import {SlCalender} from 'react-icons/sl';
import {RiArrowDropDownLine} from 'react-icons/ri'
import {FiFilter} from 'react-icons/fi'
import CustomMenuForFilter from '../../../Shared/CustomMenuForFiler'
import DayWiseFormForFilter from './DayWiseFormForFilter';
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
import { orderRevunueFn } from '../../../Services/Report/OrderReport/OrderRevenue';
import { sales_order_details_rowFn } from '../../../Services/Report/OrderReport/SalesOrderRow';
import ReactApexChart from "react-apexcharts";
const OrderReport = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState('');
  const [menuButtonData, setMenuButtonData] = useState('Last 30 Days');
  const [loding, setloding] = useState(false);


//api data
const [orderRevenue, setOrderRevenue] = useState({});

const [sales_order_details_row, setsales_order_details_row] = useState([]);

  useEffect(()=>{
    
    sales_order_details_rowFn({
      setloding,
      setData:setsales_order_details_row
    })

    orderRevunueFn({
      setloding,
      setData:setOrderRevenue
    })
  },[])



// console.log(orderRevenue)



  function openMenuBox(event,data){
    setAnchorEl(event.currentTarget)
    setopenMenuButton(true)
    setmenuDataOnHandle(data)
  }



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
      Number(`${orderRevenue?.order_count}`),
      Number( `${orderRevenue?.total_orders_items}`),
      Number(`${orderRevenue?.total_revenue}`),
      Number(`${orderRevenue?.total_profit}`),
      Number(`${orderRevenue?.profit_margin}`)
    ],
    labels: ['Order Count','Total Order Items','Total Revenue','Total Profit','Profit Margin'],
}

  const [charts, setCharts] = useState(state);

  const blankDonut = {
      state: {
          series: [
            Number(`${orderRevenue?.order_count}`),
            Number( `${orderRevenue?.total_orders_items}`),
            Number(`${orderRevenue?.total_revenue}`),
            Number(`${orderRevenue?.total_profit}`),
            Number(`${orderRevenue?.profit_margin}`)
          ],
          options: {
              chart: {
                  width: 380,
                  type: 'donut',
              },
              dataLabels: {
                  enabled: false
              },
              responsive: [{
                  breakpoint: 480,
                  options: {
                      chart: {
                          width: 200
                      },
                      legend: {
                          show: false
                      }
                  }
              }],
              legend: {
                  position: 'right',
                  offsetY: 0,
                  height: 230,
              }
          },


      }
  }



const OrderRevenue = {

  series: [{
      name: "Order Revenue",
      data: [
        Number(`${orderRevenue?.order_count}`),
        Number( `${orderRevenue?.total_orders_items}`),
        Number(`${orderRevenue?.total_revenue}`),
        Number(`${orderRevenue?.total_profit}`),
        Number(`${orderRevenue?.profit_margin}`)
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
      text: 'Order Revenue',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Order Count','Total Order Items','Total Revenue','Total Profit','Profit Margin'],
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
        { id: 'name', label: 'Name' },
        { id: 'code', label: 'Total Revenue' ,align: '',},
        {
          id: 'size',
          label: 'Orders',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'sizead',
          label: 'Total Orders Items',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adasf',
          label: 'Profit Margin',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfaf',
          label: 'Total Profit',
         
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

                            <div 
                            onClick={(e)=>openMenuBox(e,"morefilter")}
                            className=' cursor-pointer text-[#2563EB] shadow-lg flex items-center  gap-5 h-full bg-white px-3 py-2 rounded-l-full rounded-r-full'>
                            <p> More Filter</p>
                            <p className='font-bold text-2xl text-[#2563EB]'><FiFilter/></p>

                            </div>     
                                
                        </div>
                      
                    </div>
            </div>

            {/* // cards */}
              <div className="bg-[#F3E8FF] mt-20 py-12">
                <div className="grid lg:grid-cols-5 px-10 gap-5 font-semibold">
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-16 pl-5">
                        <p>Total Order</p>
                        <p>{orderRevenue?.order_count}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Total Order Items</p>
                        <p>{orderRevenue?.total_orders_items}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Total Revenue</p>
                        <p>{orderRevenue?.total_revenue}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Total Profit</p>
                        <p>{orderRevenue?.total_profit}</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>Profit Margin</p>
                        <p>{orderRevenue?.profit_margin}</p>
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
            <div>
                    <div className="grid lg:grid-cols-2 pt-10 gap-10 l">
                        <div className="bg-white rounded-xl">
                            <p className="pb-6 font-bold p-3">Order Revenue</p>
                            <hr />
                            <div className="grid lg:grid-cols-2 pt-12 text-gray-600  ">
                                <div>
                                    <ReactApexChart options={charts} series={charts.series} type='radialBar' width="100%" height="auto" />
                                </div>
                                <div className="">
                                    <ul className="list-disc">
                                        {charts.labels.map((i) => {
                                            return (
                                                <li className="pt-2">{i}</li>
                                            )
                                        })}
                                    </ul>

                                </div>
                            </div>



                            <div className="flex justify-center">


                            </div>
                        </div>
                        <div className="bg-white rounded-xl">
                            <p className="pb-6 font-bold p-3">Revenue</p>
                            <hr />

                            <div className="flex  justify-center pt-5">
                                <ReactApexChart options={blankDonut.state.options} series={blankDonut.state.series} type='donut' width="100%" height="auto" />

                            </div>
                            <p className="lg:pl-48 pt-5">No Status Found</p>

                        </div>
                    </div>
                </div>




        {/* //table */}
       <div className='bg-white mt-10  rounded-lg px-3 py-2'>
       <Paper sx={{mt:5,maxHeight:300 , overflow:"scroll"}}>
        <p className='px-2 py-1 text-md font-bold'>Sales Order Row Details</p>
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
                sales_order_details_row.map((row,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.total_revenue}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.orders}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.total_orders_items}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit_margin}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.total_profit}</StyledTableCell>
                </StyledTableRow>
              ))}
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

      {
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
      }
    </>
  )
}

export default OrderReport