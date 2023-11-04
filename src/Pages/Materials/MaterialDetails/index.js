import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { getMaterialDetaisFn } from '../../../Services/Materials/GetMaterialDetails';
import { useNavigate, useParams } from 'react-router-dom';
import Loding from '../../../Loding';
import {AiTwotoneDelete} from 'react-icons/ai'
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const MaterialDetails = () => {

    const {material_id} = useParams()
    // console.log(material_id)
    const navigate = useNavigate()
    const[loding,setloding] = useState(false);
    const [materialData,setmaterialData] = useState({})
    const [varients,setvarients] = useState([])
    const [totalpurchasingPrice, settotalPurchasingPrice] = useState(0.0);
    const [totalInStock, setotalInStock] = useState(0);

    useEffect(()=>{
        getMaterialDetaisFn({
            setloding, 
            material_id,
            setmaterialData,
            setvarients
        })
    },[material_id])


    useEffect(()=>{
        settotalPurchasingPrice(  varients.reduce((accumulator, row) => accumulator + Number(row.purchasing_price), 0))
        setotalInStock(varients.reduce((accumulator, row) => accumulator + Number(row.in_stock), 0))
      },[varients])
    

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
   if(loding)
    return <Loding/>
  else
    return (
    <>
      <div className='w-full h-full overflow-auto flex gap-2'>
          <div className='w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200'>
                  <p className=' pt-2 text-2xl font-poppins font-bold '>
                  <span className="text-2xl">
                <span>Material Details :</span>
                <span className="text-blue-400 cursor-pointer text-sm pl-5"
                onClick={()=>navigate(`/material/update-material-details/${material_id}`)}
                >edit</span>
              </span>
                  </p>
                  <div className='h-full flex flex-col justify-between '>
                      <form   className='flex flex-col justify-evenly overflow-auto'>
                            <div className='grid grid-cols-3 gap-5 mt-10'>
                                
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Material Name"
                                      placeholder='Enter product name'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={materialData?.name}
                                        //   {...register('name')}
                                         
                                    />
                                    
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Scope"
                                      type='text'
                                      placeholder='Enter Scope'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={materialData?.scope}
                                        //   {...register('scope')}
                                    />
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Time Line"
                                      type='text'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={new Date(materialData?.timeline).toDateString()}
                                        //   {...register('timeline')}
                                    />
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Category"
                                      placeholder='Enter the product category'
                                      type='text'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={materialData?.category}
                                        //   {...register('category')}
                                    />
                                    <TextField
                                      
                                      id="outlined-required"
                                      label="Description"
                                      placeholder='Enter the description'
                                      type='text'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={materialData?.description}
                                        //   {...register('description')}
                                    />
                                  <TextField
                                      required
                                      id="outlined-required"
                                      label="Unit"
                                    
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          defaultValue={materialData?.unit_of_measure}
                                        //   {...register('unit_of_measure')}
                                          >
                                          {/* {
                                            unitOfProduct.map((singleData,index)=>{
                                              return <MenuItem key={index} value= {singleData?.unit_name} >
                                                        {singleData?.unit_name} 
                                                    </MenuItem>
                                            })
                                          } */}

                                          
                                      </TextField>


                                      <TextField
                                    required
                                    id="outlined-required"
                                    label="IGST %"
                                    InputLabelProps={{
                                          shrink: true,
                                        }}
                                        defaultValue={materialData?.igst}
                                        // {...register('igst')}
                                        >
                                        
                                        
                                    </TextField>
                                   
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="GST %"
                                   
                                   
                                    InputLabelProps={{
                                          shrink: true,
                                        }}
                                        defaultValue={materialData?.gst}
                                        // {...register('gst')}
                                        >
                                        
                                    </TextField>
                            </div>

                           

                      </form>
                      <div className=" w-full flex flex-col gap-3 px-2">
                        <p className="p-4">Added Varients of Products:</p>
                        <Paper
                          sx={{
                            width: "100%",
                            overflow: "hidden",
                            height: "100%",
                          }}
                        >
                          <TableContainer sx={{ maxheight: "100%" }}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead className="!bg-purple-300">
                                <TableRow>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Variant
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                   Additional Price
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    Purchasing Price
                                  </TableCell>
                                  <TableCell className="!text-black !font-bold !bg-gray-300">
                                    In Stock
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {varients.map((row, index) => (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.name}
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.additional_price} Rs.
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.purchasing_price} Rs.
                                    </StyledTableCell>
                                    <StyledTableCell
                                      component="th"
                                      scope="row"
                                      className="capitalize"
                                    >
                                      {row?.in_stock}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                        <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Purchasing Price:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalpurchasingPrice}
                            </span>
                            <span> Rs.</span>
                          </span>
                        </p>
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total In Stock:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalInStock}
                            </span>
                            <span> pcs</span>
                          </span>
                        </p>

                        <hr />
                      </p>
                      </div>
                    
 
                  </div>
          </div>
         
      </div>
  

    </>
    )
}

export default MaterialDetails