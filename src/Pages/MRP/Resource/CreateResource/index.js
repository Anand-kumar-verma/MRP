import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { getUnitOfProductFn } from '../../../../Services/Product/GetUnitOfProduct';
import { useNavigate } from 'react-router-dom';
import Loding from '../../../../Loding';
import { createResourceFn } from '../../../../Services/Resources/CreateResource';
import { toast } from 'react-toastify';

const CreateResource = () => {
  const navigate = useNavigate()
  const[loding,setloding] = useState(false)
  const { register, handleSubmit ,reset} = useForm();
  

//   console.log(rows)

  function saveFunctionCalled(message){
    handleSubmit((data) => {

      if(data.resource_name === "")
        return toast.warn("Plase enter the resource name")
        if(data.description === "")
        return toast.warn("Plase enter the description")
        if(data.resource_type === "")
        return toast.warn("Plase enter the resource type")
        if(data.cost_per_hour === "")
        return toast.warn("Plase enter the cost/hour")
      

        const formData = new FormData()
        formData.append("resource_name",data?.resource_name)
        formData.append("description",data?.description)
        formData.append("resource_type",data?.resource_type)
        formData.append("cost_per_hour",data?.cost_per_hour)
        formData.append("create_date",data?.create_date)
 
        createResourceFn({
          formData:formData,
          setloding,
          navigate,
          link:message === 'save'?'/mrp/resource':'/mrp/resource/create-resource',
          reset,
        })
      })();
  }


   if(loding)
    return <Loding/>
  else
    return (
    <>
      <div className='w-full h-full overflow-auto flex gap-2'>
          <div className='w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200'>
                  <p className=' pt-2 text-2xl font-poppins font-bold '>Create Resource :</p>
                  <div className='h-full flex flex-col justify-between '>
                      <form   className='flex flex-col justify-evenly overflow-auto'>
                            <div className='grid grid-cols-2 gap-5 mt-10'>
                                
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Resource Name"
                                      placeholder='Enter Resource name'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          {...register('resource_name')}
                                         
                                    />
                                    
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Description"
                                      type='text'
                                      placeholder='Enter Description'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          {...register('description')}
                                    />
                                    
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Resource Type"
                                      type='text'
                                      placeholder='Resource Type'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          {...register('resource_type')}
                                    />
                                    <TextField
                                      required
                                      id="outlined-required"
                                      label="Cost/Hours"
                                      placeholder='Enter the Cost/Hours'
                                      type='number'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          {...register('cost_per_hour')}
                                    />
                                    <TextField
                                      
                                      id="outlined-required"
                                      label="Create Date"
                                      placeholder='Enter the description'
                                      type='date'
                                      InputLabelProps={{
                                            shrink: true,
                                          }}
                                          {...register('create_date')}
                                    />    
                            </div>
                      </form>
                    
                      <div className='w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 '>
                            
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

export default CreateResource