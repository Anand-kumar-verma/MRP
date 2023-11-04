import  React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import {Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {IoIosAddCircle} from 'react-icons/io'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loding from '../../../Loding';
import { useNavigate } from 'react-router-dom';
import { getMaterialsInventoryList } from '../../../Services/Inventory/MaterialsInventoryList';

export default function InventoryMaterialsList() {
    const navigate = useNavigate()
    const[product,setproduct] = React.useState([])
    const [pageCount, setPageCount] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [subData,setSubData] = React.useState({})
    const [loding,setloding] = React.useState(false)
    const[searchValue,setSearchValue] = React.useState('')
    


      React.useEffect(()=>{
        getMaterialsInventoryList({
        setloding,
        page,
        pageCount,
        setproduct,
        setSubData,
        searchValue
       })
      },[page,pageCount,searchValue])



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
      { id: 'name', label: 'Material' },
      { id: 'image', label: 'Category'  },
      { id: 'code', label: 'Total Price (INR)'  ,align: '',},
      {
        id: 'population',
        label: 'In Stock',
        
        align: '',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'size',
        label: 'Missing',
        
        align: '',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'density',
        label: 'Committed',
        
        align: '',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'timeLine',
        label: 'Expected',
        
        align: '',
        format: (value) => value.toFixed(2),
      },
    ];

if(loding)
  return <Loding/>
return (
    <>
   <div className='w-full flex justify-between gap-2 items-center py-2  px-4  text-white'>
        
        <input  
        type='search'
        placeholder='Search...'
        className='px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg '
        onChange={(e)=>setSearchValue(e.target.value)}
        ></input>
     
     <div className='flex gap-1'>
         {/* <Button
          onClick={deleteHandler}
          className={`${checkedBox.length <= 0 ? 'opacity-10':'opacity-100'} !text-red-700 `}
          disabled = {checkedBox.length > 0 ? false : true}
           variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button> */}
        <p
          onClick={()=>navigate('/create-materials')}
          className= ' bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg'>
          <span >Add Rows</span>
          <span className='text-[2rem]'><IoIosAddCircle/></span>
       </p>
     </div>
    </div>

{/* // my table */}
    <Paper sx={{ width: '100%', overflow: 'hidden' ,height:'100%'}}>
      <TableContainer sx={{maxheight:'100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='!bg-purple-300'>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className='!text-black !font-bold !bg-purple-300'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {
                product.length === 0 ? <div className='flex w-full justify-center'>
                    <p>No Data Found</p>
                </div> : 
                product.map((row,index) => (
                <StyledTableRow key={index}>

                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.material_name}/{row?.variant_name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.category}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.value_in_stock}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.in_stock}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.missing}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.committed}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row?.expected}</StyledTableCell>
            
                </StyledTableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
    </Paper>

  
    <div 
      className='!flex  gap-2  !text-[1.2rem] justify-end pr-2 py-2  items-center bg-purple-300'
      >

      <div className='flex gap-1 items-center'>
      <span className=''>Items per pages</span> 
      <select className='outline-none'
      onChange={(e)=>setPageCount(e.target.value)}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
      <span>{page}</span>
      <span>of</span>
      <span>{subData?.total_page}</span>

      <span className='!text-sm cursor-pointer'
       onClick={()=>
       page-1 <= 0 ? 1 :
       setPage(page-1)}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </span>
      &nbsp;
      <span className='cursor-pointer'
      onClick={
        ()=>
        subData?.total_page < page+1 ? subData?.total_page : 
        setPage(page+1)}
      >
        <ArrowForwardIosIcon fontSize="small" color='black' />
     </span>
      </div>
      </div>

        </>
      );
 
}