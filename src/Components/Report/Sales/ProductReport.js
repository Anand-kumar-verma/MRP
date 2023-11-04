import React,{useEffect, useState} from 'react'
import {SlCalender} from 'react-icons/sl';
import {RiArrowDropDownLine} from 'react-icons/ri'
import {FiFilter} from 'react-icons/fi'
import CustomMenuForFilter from '../../../Shared/CustomMenuForFiler'
import DayWiseFormForFilter from './DayWiseFormForFilter';
import {TextField} from '@mui/material'
import ReactApexChart from 'react-apexcharts';
import {Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import Loding from '../../../Loding'
import { productPerformancereportfn } from '../../../Services/Report/ProductReport/ProductPerformanceReport';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell'
import { low_profitabilityFn } from '../../../Services/Report/ProductReport/LowProfitabilityReport';
import { top_selling_productFn } from '../../../Services/Report/ProductReport/TopSellingReport';


const ProductReport = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState('');
  const [menuButtonData, setMenuButtonData] = useState('Last 30 Days');
  const [loding, setloding] = useState(false);


//api data
const [productPerformance, setproductPerformance] = useState([]);
const [low_profitability, setlow_profitability] = useState([]);
const [top_selling_product, settop_selling_product] = useState([]);
  useEffect(()=>{
    productPerformancereportfn({
      setloding,
      setData:setproductPerformance
    })
    low_profitabilityFn({
      setloding,
      setData:setlow_profitability
    })

    top_selling_productFn({
      setloding,
      setData:settop_selling_product
    })
  },[])
  

console.log(productPerformance)



  function openMenuBox(event,data){
    setAnchorEl(event.currentTarget)
    setopenMenuButton(true)
    setmenuDataOnHandle(data)
  }



  const sales_progress = {

    series: [{
        name: "Desktops",
        data: [0,500,1000,1500,2000,2500,3000]
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
        text: 'Sales Progress',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ["a",'B',"d"],
      }
    }
  }

  const profit_margin_progress = {

    series: [{
        name: "Desktops",
        data: [0,500,1000,1500,2000,2500,3000]
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
        text: 'Profit Margin Progress',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ["a",'B',"d"],
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
        { id: 'name', label: 'Product' },
        { id: 'code', label: 'Orders' ,align: '',},
        // {
        //   id: 'population',
        //   label: 'Order Line',
        
        //   align: '',
        //   format: (value) => value.toLocaleString('en-US'),
        // },
        {
          id: 'size',
          label: 'Default Price',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'sizead',
          label: 'average Sale..',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adasf',
          label: 'Quantity',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfaf',
          label: 'Revenue',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfasd',
          label: 'COGS',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfasd',
          label: 'COGS/Unit',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfasd',
          label: 'Profit',
         
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'adsfasd',
          label: 'Profit margin',
        
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
                <div className="grid lg:grid-cols-4 px-10 gap-5 font-semibold">
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-16 pl-5">
                        <p>Revenue</p>
                        <p>0</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>COGS</p>
                        <p>0 %</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>PROFIT</p>
                        <p>0</p>
                    </div>
                    <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                        <p>PROFIT MARGIN</p>
                        <p>0</p>
                    </div>
                    
                </div>
            </div>


            {/* //charts */}

            {/* charts 1 */}
            <div className='mt-10 bg-white p-2 rounded-lg w-full'>
            <ReactApexChart options={sales_progress.options} series={sales_progress.series} type="line" height={350} />
            </div>

            {/* charts 2 */}
            <div className='mt-10 bg-white p-2 rounded-lg w-full'>
            <ReactApexChart options={profit_margin_progress.options} series={profit_margin_progress.series} type="line" height={350} />
            </div>

              <div className='grid grid-cols-2 w-full mt-5 gap-10'>
              <div className='bg-white'>
                  <div className='flex justify-between px-5 mt-2'>
                   <p>Top Selling Products</p>
                   <p className='px-5 py-1'>
                      <select name='filter' className='outline-none'>
                      <option>Quantity</option>
                          <option>Revenue</option>
                          <option>Profit</option>
                          <option>Profit Margin</option>
                      </select>
                    </p>
                   </div>
                        <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Item Name</TableCell>
                              <TableCell>Qnt Sold</TableCell>
                              <TableCell>Revenue</TableCell>
                              <TableCell>COGS</TableCell>
                              <TableCell>Profit</TableCell>
                              <TableCell>Profit Margin</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {top_selling_product.map((row,index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell className='capitalize' >{row?.variant_name}</TableCell>
                                <TableCell >{row?.quantity_sold}</TableCell>
                                <TableCell >{row?.revenue}</TableCell>
                                <TableCell >{row?.cogs}</TableCell>
                                <TableCell >{row?.profit}</TableCell>
                                <TableCell >{row?.profit_margin}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </div>

                  <div className='bg-white'>
                  <div className='flex justify-between px-5 mt-2'>
                   <p>Low Porfitability Products</p>
                   <p className='px-5 py-1'>
                      <select name='filter' className='outline-none'>
                      <option>Quantity</option>
                          <option>Revenue</option>
                          <option>Profit</option>
                          <option>Profit Margin</option>
                      </select>
                    </p>
                   </div>
                        <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Item Name</TableCell>
                              <TableCell>Qnt Sold</TableCell>
                              <TableCell>Revenue</TableCell>
                              <TableCell>COGS</TableCell>
                              <TableCell>Profit</TableCell>
                              <TableCell>Profit Margin</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {low_profitability.map((row,index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell className='capitalize' >{row?.variant_name}</TableCell>
                                <TableCell >{row?.quantity_sold}</TableCell>
                                <TableCell >{row?.revenue}</TableCell>
                                <TableCell >{row?.cogs}</TableCell>
                                <TableCell >{row?.profit}</TableCell>
                                <TableCell >{row?.profit_margin}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </div>
              </div>

        {/* //table */}
       <div className='bg-white mt-10  rounded-lg px-3 py-2'>
       <Paper sx={{mt:5}}>
        <p className='px-2 py-1 text-md font-bold'>Product Profit Margin</p>
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
                productPerformance.map((row,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.name[0]}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.orders}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.default_price}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.average_sale_price}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.qty}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.revenue}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.cogs}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.cogs_per_unit}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit_margin}</StyledTableCell>
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

export default ProductReport