import React,{useEffect, useState} from 'react'
import {SlCalender} from 'react-icons/sl';
import {RiArrowDropDownLine, RiUserStarFill} from 'react-icons/ri'
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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Loding from '../../../Loding'
import { salesRevenueReport } from '../../../Services/Report/SalesReport/SalesRevenue';
import { toast } from 'react-toastify';
import { salesProgressReport } from '../../../Services/Report/SalesReport/SalesProgressReport';
import { salesProfitMarginReportFn } from '../../../Services/Report/SalesReport/SalesProfitMarginReport';
import { productProfitMarginReportFn } from '../../../Services/Report/SalesReport/ProductProfitMarginReport';
const SalesReport = () => {
  const[loding,setloding] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuButton, setopenMenuButton] = useState(false);
  const [menuDataOnHandle, setmenuDataOnHandle] = useState('');
  const [menuButtonData, setMenuButtonData] = useState('Last 30 Days');
  


  // apidata useState
    const[sealeRevenue,setSalesRevenue] = useState({})
    const[startDate,setStartDate] = useState(null);
    const[endDate,setendDate] = useState(null);

    const[label,setLabel] = useState([])
    const[progressData,setProgressData] = useState([])

    const[cogsData,setcogsData] = useState([])
    const[profitData,setprofitData] = useState([])
    const[revenueData,setrevenueData] = useState([])

    const[salesProfitMarginlabel,setsalesProfitMarginlabel] = useState([])
    const[salesProfitMarginlabelData,setsalesProfitMarginlabelData] = useState([])
    const[profit_margin,setprofit_margin] = useState([])

    const[product_profit_margin_report,setproduct_profit_margin_report] = useState([])


useEffect(()=>{
  salesRevenueReport({
    setloding,
    setData:setSalesRevenue,
    filterBy:menuButtonData,
    startDate:null,
    endDate:null
  })
},[menuButtonData])

useEffect(()=>{
  salesProgressReport({
    setloding,
    setData:setProgressData,
    setLabel
  })
  salesProfitMarginReportFn({
    setloding,
    setData:setsalesProfitMarginlabelData,
    setLabel:setsalesProfitMarginlabel
  })
  productProfitMarginReportFn({
    setloding,
    setData:setproduct_profit_margin_report
  })
},[])


useEffect(()=>{
  setprofit_margin(
    salesProfitMarginlabelData.map((i)=>{
      return i?.profit_margin
    })
  )
},[salesProfitMarginlabelData])


useEffect(()=>{
  setcogsData(
    progressData.map((i)=>{
      return i.cogs
    })
  )
  setprofitData(
    progressData.map((i)=>{
      return i.profit
    })
  )
  setrevenueData(
    progressData.map((i)=>{
      return i.revenue
    })
  )
},[progressData])


// console.log(menuButtonData)

function submitHandlerFunctionCalled(){
  if(startDate === null){
    toast.warn("Plese select the start date")
    return
  }else if(endDate === null){
    toast.warn("Plese select the end date")
    return
  }else{
    salesRevenueReport({
      setloding,
      setData:setSalesRevenue,
      filterBy:'custom',
      startDate:startDate,
      endDate:endDate
    })
    setAnchorEl(null);
  }
}




  function openMenuBox(event,data){
    setAnchorEl(event.currentTarget)
    setopenMenuButton(true)
    setmenuDataOnHandle(data)
  }

  const sales_progress = {

    series: [
      {
        name: "COGS",
        data: cogsData
    },
    {
      name: "Profit",
      data: profitData
  },
  {
    name: "Revenue",
    data: revenueData
}
  ],
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
        categories: label,
      }
    }
  }


  const profit_margin_progress = {

    series: [{
        name: "Profit Margin",
        data: profit_margin
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
        text: 'Sales Profit Margin',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: salesProfitMarginlabel
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
        { id: 'name', label: 'V.Name', minWidth: 170 },
        { id: 'code', label: 'Qnt Sold', minWidth: 170 ,align: '',},
        {
          id: 'population',
          label: 'Revenue',
          minWidth: 170,
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'COGS',
          minWidth: 170,
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'siadsfaze',
          label: 'Profit',
          minWidth: 170,
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'sfda',
          label: 'Profit Margin',
          minWidth: 170,
          align: '',
          format: (value) => value.toLocaleString('en-US'),
        },

      ];

 if(loding)
  return <Loding/>     
  return (
    <>
      <div>
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
                  <p>${sealeRevenue?.revenue}</p>
              </div>
              <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                  <p>COGS</p>
                  <p>${sealeRevenue?.cogs}</p>
              </div>
              <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                  <p>PROFIT</p>
                  <p>${sealeRevenue?.profit}</p>
              </div>
              <div className="bg-[#F8F2FF] shadow-xl rounded-xl pt-3 pb-8 pl-5">
                  <p>PROFIT MARGIN</p>
                  <p>{sealeRevenue?.profit_margin}%</p>
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

{/* //table */}
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
                product_profit_margin_report.map((row,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.variant_name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.quantity_sold}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.revenue}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.cogs}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.profit_margin}</StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">{row?.profit}</StyledTableCell> */}

                  {/* <StyledTableCell component="th" scope="row">{new Date(row?.updated_at).toDateString()}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.timeline}</StyledTableCell> */}
            
                </StyledTableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
   
      
    
    </Paper>

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
                    onChange={(e)=>setStartDate(e.target.value)}
                    />
                  <TextField
                  id="outlined-basic"
                    label="End Date"
                    variant="outlined" 
                    type = "date"
                    InputLabelProps={{
                          shrink: true,
                        }}
                    onChange={(e)=>setendDate(e.target.value)}
               />
                </div>

               <button 
               onClick={submitHandlerFunctionCalled}
               className='bg-blue-950 text-white rounded-lg px-5 py-2'>GO</button>
            </form>
          </div>
          />
       
      }
    </>
  )
}

export default SalesReport