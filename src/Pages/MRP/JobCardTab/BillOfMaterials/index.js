import React, { useState,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { createBomFn } from '../../../../Services/MRP/JobCards/createBom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from 'react-query';
import {getProductFn} from '../../../../Services/Product/GetProduct'
import { toast } from 'react-toastify';
import {CircleOutlined } from "@mui/icons-material";
import { getUnitOfProductFn } from '../../../../Services/Product/GetUnitOfProduct';


const BillOfMaterials = () => {
    const[value,setValue] =useState()
    const { register, handleSubmit ,reset} = useForm();
    const[product,setProduct] =useState([])
    const[unitOfProduct,setUnitOfProduct] = useState([])


    useEffect(()=>{
      getProductFn({setProduct})
    },[])

    useEffect(()=>{
      getUnitOfProductFn({setUnitOfProduct})
    },[])


    function submithandler(data){
            console.log(data)

            const formData = { ...data, total_cost: Number(data?.quantity) * Number(data?.cost) };
            mutate(formData)
            console.log(formData)
            reset()
    }

    const { mutate, isLoading } = useMutation(createBomFn, {
        onSuccess: (response) => {
            if(response?.data?.message){
              toast.success(response?.data?.message)
            }
        },
      });


      
    return (
       <>
        <form onSubmit={handleSubmit(submithandler)}>
        <div className='grid grid-cols-3 gap-10 mt-10 '>
        <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              InputLabelProps={{
                shrink: true,
               }}
              label="Material Name"
              {...register('product_id')}
            >
            {
              product.map((singleData,index)=>{
                return <MenuItem key={index} value={singleData?.id}>
              <div  className='!flex !w-full !justify-between'>
                  <span>{singleData?.name}</span>
                  {/* <span className='pr-3'>{singleData?.timeline}</span> */}
              </div>  
              </MenuItem>
              })
            }
            </TextField>

            <TextField
              required
              id="outlined-required"
              label="Material Description"
              type='text'
              placeholder='Material Description'
              InputLabelProps={{
                shrink: true,
               }}
            {...register("material_description")}
            
            />
            <TextField
              required
              id="outlined-required"
              label="Quantity Required"
              type='number'
              placeholder='120'
              
              InputLabelProps={{
                shrink: true,
               }}
               {...register("quantity")}
            />
              <TextField
                  required
                  id="outlined-required"
                  label="Cost"
                  type='number'
                  placeholder='100Rs.'
                  
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("cost")}
                />

            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              InputLabelProps={{
                shrink: true,
               }}
              label="Unit Of Measurement"
              {...register('unit_of_measurement')}
            >
            {
              unitOfProduct.map((singleData,index)=>{
                return <MenuItem key={index} value={singleData?.unit_name}>
              <div  className='!flex !w-full !justify-between'>
                  <span>{singleData?.unit_name}</span>
                  {/* <span className='pr-3'>{singleData?.timeline}</span> */}
              </div>  
              </MenuItem>
              })
            }
            </TextField>
           
            <TextField
              required
              id="outlined-required"
              label="Supplier"
              type='text'
              placeholder='ABC Sri'
              InputLabelProps={{
                shrink: true,
               }}
               {...register("supplier")}
            />

           </div>
           <div className='w-full flex items-center justify-center pt-4'>
              <button className='p-3 bg-blue-500 text-white rounded-lg'>{isLoading ? <CircleOutlined /> : "Submit"}</button>
           </div>
        </form>
       </>
    )
}

export default BillOfMaterials