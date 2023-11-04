import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {IoIosAddCircle} from 'react-icons/io'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loding from '../../../Loding'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { deleteProductionPhaseItems } from '../../../Services/ProductionPhase/DeleteProductionPhaseItem';
import { getProducntionPhaseList } from '../../../Services/ProductionPhase/GetProductionPhaseList';

export default function ProductionPhase() {
    const navigate = useNavigate()
    const[produntionPhaseList,setproduntionPhaseList] = React.useState([])
    const[dummy,setDummy] = React.useState()
    const [pageCount, setPageCount] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [subData,setSubData] = React.useState({})
    const [loding,setloding] = React.useState(false)
    const[searchValue,setSearchValue] = React.useState('')
    const[checkedBox,setCheckedBox] = React.useState([])


      React.useEffect(()=>{
        getProducntionPhaseList({
        setloding,
        page,
        pageCount,
        setproduntionPhaseList,
        setSubData,
        searchValue
       })
      },[dummy,page,pageCount,searchValue])


   function globalCheckBox(){
    if(checkedBox.length === produntionPhaseList.length){
      setCheckedBox([])
    }else{
      setCheckedBox(
        produntionPhaseList.map((singleItem,index)=>{
          return Number(singleItem.id)
        })
      )
    }
   }

   function singleCheckBox(id){
    if(checkedBox.includes(id)){
      const filteredData = checkedBox.filter(item => item !== id);
      setCheckedBox(filteredData);
    }else{
      setCheckedBox([...checkedBox, id]);
    }
   }


function deleteHandler(){
    deleteProductionPhaseItems({
    setloding,
    checkedBox,
    setDummy,
    setCheckedBox
  })
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
      { id: 'name', label: 'Company Id', minWidth: 170 },
      { id: 'code', label: 'Name', minWidth: 170 ,align: '',},
      {
        id: 'population',
        label: 'Details',
        minWidth: 170,
        align: '',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'size',
        label: 'Resource Type',
        minWidth: 170,
        align: '',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'density',
        label: 'Cost/hour',
        minWidth: 170,
        align: '',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'timeLine',
        label: 'Created Date',
        minWidth: 170,
        align: '',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'timUpdatedeLine',
        label: 'Updated Date',
        minWidth: 170,
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
         <Button
          onClick={deleteHandler}
          className={`${checkedBox.length <= 0 ? 'opacity-10':'opacity-100'} !text-red-700 `}
          disabled = {checkedBox.length > 0 ? false : true}
           variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        <p
          onClick={()=>navigate('/create-product')}
          className= ' bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg'>
          <span >Add Rows</span>
          <span className='text-[2rem]'><IoIosAddCircle/></span>
       </p>
     </div>
    </div>

    <Paper sx={{ width: '100%', overflow: 'hidden' ,height:'100%'}}>
      <TableContainer sx={{maxheight:'100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='!bg-purple-300'>
            <TableRow>
            <div className= ' flex justify-center'>
            <span 
              onClick={()=>globalCheckBox()}
              >
              <Checkbox
                checked = {(checkedBox.length !== 0 && checkedBox.length === produntionPhaseList.length )? true : false}
              />
              </span>
            </div>
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
                produntionPhaseList.length === 0 ? <div className='flex w-full justify-center'>
                    <p>No Data Found</p>
                </div> : 
                produntionPhaseList.map((row,index) => (
                <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                <div className= ' flex justify-center'>
                <span
                  onClick={()=>singleCheckBox(Number(row?.id))}
                  ><Checkbox
                  checked={checkedBox.includes(Number(row?.id)) ? true : false}
                  /></span>
                </div>
                </StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.company_id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" className='capitalize'>{row?.name}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.details}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.resource_type}</StyledTableCell>
                  <StyledTableCell component="th" scope="row" >{row?.cost_per_hour}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{new Date(row?.created_at).toDateString()}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{new Date(row?.updated_at).toDateString()}</StyledTableCell>
                  
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
      <span>{subData?.total_pages}</span>

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
        subData?.total_pages < page+1 ? subData?.total_pages : 
        setPage(page+1)}
      >
        <ArrowForwardIosIcon fontSize="small" color='black' />
     </span>
      
      </div>
      </div>
              
        </>
      );
 
}

