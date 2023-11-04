import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import {IoIosAddCircle} from 'react-icons/io'
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { getUnitOfProductFn } from '../../../Services/Product/GetUnitOfProduct';
import { createMaterialsFn } from '../../../Services/Materials/CreateMaterials';
import { useNavigate } from 'react-router-dom';
import Loding from '../../../Loding';
import {AiTwotoneDelete} from 'react-icons/ai'
import axiosInstance from '../../../Config/axios';
import { API_URLS } from '../../../Config/apiUrls';

const CreateMaterials = () => {
  const navigate = useNavigate()
  const[loding,setloding] = useState(false)
  const[unitOfProduct,setUnitOfProduct] = useState([])
  const[subData,setSubData] = useState({})
  const { register, handleSubmit ,reset} = useForm();
  const [rows, setRows] = useState([]);
  const [categorie_data,setCategorie_data] = useState([])

  // console.log(rows)

  function saveFunctionCalled(message){
    handleSubmit((data) => {

      if(data.name === "")
      return toast.warn("Enter the material name")
      if(data.scope === "")
      return toast.warn("Enter the material scope")
      if(data.timeline === "")
      return toast.warn("Enter the material Time Line")
      if(data.category === "")
      return toast.warn("Enter the material category")
      if(data.description === "")
      return toast.warn("Enter the material description")
      if(data.unit_of_measure === "")
      return toast.warn("Enter the material unit of measure")
      if(data.igst === "")
      return toast.warn("Enter the  igst")
      if(data.gst === "")
      return toast.warn("Enter the gst")
    
      for(let i = 0; i<rows.length; i++){
        if(rows[i].variant === '')
        return toast.warn(`Please Enter the Variant Name at ${i+1}`)
      }

      if(rows.length === 0 ){
        toast.warn("Please add varients")
        return
      }
        const formData = new FormData()
        formData.append("basic_details",JSON.stringify(data))
        formData.append("varients",JSON.stringify(rows))
        createMaterialsFn({
          formData:formData,
          setloding,
          navigate,
          link:message === 'save'?'/materials':'/create-materials',
          reset,
        })
      })();
  }


  useEffect(()=>{
    getUnitOfProductFn({
      setUnitOfProduct,
      setSubData
    })
    axiosInstance.get(API_URLS.category).then((res)=>setCategorie_data(res?.data?.data)).catch((e)=>console.log(e))
  },[])


  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      variant: '',
      purchasing_price: 0.0,
      stock: 0,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  
  const handleFieldChange = (rowId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  function handleDeleteItems(id){
    setRows(
      rows.filter((singleItem)=>singleItem.id !== id)
    )
  }

  useEffect(()=>{
    handleAddRow()
  },[])

   if(loding)
    return <Loding/>
  else
    return (
    <>
      <div className='w-full h-full flex gap-2'>
          <div className='w-full bg-white p-2 rounded-lg shadow-lg h-full overflow-auto flex flex-col justify-between border-2 border-gray-200'>
                  <p className='py-2  font-poppins font-bold bg-blue-200 flex items-center justify-between px-5'>
                    <span className='text-2xl'>Create Material :</span>
                    </p>
                  <div className='h-full flex flex-col justify-between '>
                      <form   className='flex flex-col justify-evenly overflow-auto'>
                          <div className='h-full'>
                          <div className='grid grid-cols-3 gap-5 pt-2'>
                                
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Material Name"
                                  placeholder='Enter material name'
                                  InputLabelProps={{
                                        shrink: true,
                                      }}
                                      {...register('name')}
                                     
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
                                      {...register('scope')}
                                />
                                <div className='row-span-3 border-2 flex justify-center items-center' >

                                </div>

                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Time Line"
                                  type='date'
                                  InputLabelProps={{
                                        shrink: true,
                                      }}
                                      {...register('timeline')}
                                />
                                <TextField
                                  required
                                  select
                                  id="outlined-required"
                                  label="Category"
                                  placeholder='Enter the product category'
                                  type='text'
                                  InputLabelProps={{
                                        shrink: true,
                                      }}
                                      {...register('category')}
                                >
                                  {
                                    categorie_data?.map((i)=>{
                                      return <MenuItem value={i?.name}>{i?.name}</MenuItem>
                                    })
                                  }
                                  </TextField>
                                <TextField
                                  
                                  id="outlined-required"
                                  label="Description"
                                  placeholder='Enter the description'
                                  type='text'
                                  InputLabelProps={{
                                        shrink: true,
                                      }}
                                      {...register('description')}
                                />
                              <TextField
                                  required
                                  id="outlined-required"
                                  label="Select Unit"
                                  select
                                  InputLabelProps={{
                                        shrink: true,
                                      }}
                                      {...register('unit_of_measure')}
                                      >
                                      {
                                        unitOfProduct.map((singleData,index)=>{
                                          return <MenuItem key={index} value= {singleData?.unit_name} >
                                                    {singleData?.unit_name} 
                                                </MenuItem>
                                        })
                                      }

                                      
                                  </TextField>


                                  <TextField
                                required
                                id="outlined-required"
                                label="IGST"
                                select
                                defaultValue={18}
                                InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register('igst')}
                                    >
                                    {
                                      [5,12,18,28].map((singleData,index)=>{
                                        return <MenuItem key={index} value= {singleData} >
                                                  {singleData} %
                                              </MenuItem>
                                      })
                                    }

                                    
                                </TextField>
                               
                                <TextField
                                required
                                id="outlined-required"
                                label="GST"
                                defaultValue={18}
                                select
                                InputLabelProps={{
                                      shrink: true,
                                    }}
                                    {...register('gst')}
                                    >
                                    {
                                      [5,12,18,28].map((singleData,index)=>{
                                        return <MenuItem key={index} value= {singleData} >
                                                  {singleData} %
                                              </MenuItem>
                                      })
                                    } 
                                </TextField>
                        </div>

                        <div className=' w-full mt-4 flex flex-col gap-3 px-2'>
                              <p className='p-4'>Add Varients of Materials:</p>
                              {rows.map((row) => (
                                        <div className='w-full grid grid-cols-9 gap-3' key={row.id}>
                                          <TextField
                                            required
                                            label="Variant"
                                            value={row.variant}
                                            className='col-span-2'
                                            onChange={(e) => handleFieldChange(row.id, 'variant', e.target.value)}
                                          />
                                       
                                          <TextField
                                            required
                                            className='col-span-2'
                                            label="Purchasing Price"
                                            type='number'
                                            value={row.purchasing_price}
                                            onChange={(e) => handleFieldChange(row.id, 'purchasing_price', e.target.value)}
                                          />
                                          <TextField
                                            required
                                            label="Stock"
                                            type='number'
                                            className='col-span-2'
                                            value={row.stock}
                                            onChange={(e) => handleFieldChange(row.id, 'stock', e.target.value)}
                                          />
                                           <p className='text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center'>
                                               <span 
                                               onClick={()=>handleDeleteItems(row.id)}
                                               className='cursor-pointer'><AiTwotoneDelete
                                               className={rows.length === 1 && 'hidden'}
                                               /></span>
                                             </p>
                                        </div>
                                      ))}
                              
                        </div>

                        <p
                          onClick={handleAddRow}
                          component="th" scope="row" className= 'mt-3 text-white  rounded-lg px-5 py-1  cursor-pointer !flex items-center  font-bold !text-lg'>
                          <span className='bg-purple-600 rounded-l-xl p-2'>Add Varients</span>
                          <span className='text-[2rem] bg-purple-600 px-2 rounded-r-xl'><IoIosAddCircle/></span>
                      </p>
                          </div>
                      </form>
                    
                      <div className='w-full flex gap-2 bg-gradient-to-b from-purple-200 to-purple-500 p-1 '>
                            
                            <button 
                            onClick={()=>reset()}
                            className='text-white p-3 bg-blue-600 rounded-lg'>
                                Clear
                              </button>
                
                            <button 
                              onClick={()=>saveFunctionCalled('save')}
                            className='text-white p-3 bg-blue-600 rounded-lg'>
                                    Save
                            </button>
                
                            <button 
                              onClick={()=>saveFunctionCalled('save_and_new')}
                              className='text-white p-3 bg-blue-600 rounded-lg'>
                                Save and New
                            </button>
                    </div>
                  </div>
          </div>
          
         
      </div>
  

    </>
    )
}

export default CreateMaterials