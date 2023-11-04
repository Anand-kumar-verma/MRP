import React,{useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { loginFn } from '../../../../Services/Login';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import {getProductFn} from '../../../../Services/Product/GetProduct'
const JOBDetails = () => {

  const[value,setValue] =useState()
  const[product,setProduct] = useState([])
  const { register, handleSubmit ,reset} = useForm();
    

  // const {isLoading } = useMutation(getProductFn, {
  //   onSuccess: (response) => {
  //       console.log(response)
  //   },
  // });


useEffect(()=>{

  getProductFn(
    {
      setProduct
    }
  )

  // console.log(product)

},[])



  function submithandler(data){
          console.log(data)
          mutate(data)
          reset()
  }



  const { mutate, isLoading } = useMutation(loginFn, {
      onSuccess: (response) => {
          console.log(response)
      },
    });

  return (
  <>
    <form onSubmit={handleSubmit(submithandler)}>
        <div className='grid grid-cols-3 gap-10 mt-10'>

            <TextField
              required
              id="outlined-required"
              label="Job Card Number"
              type='number'
              placeholder='JOB-9472234'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("job_card_number")}
            />


            <TextField
              required
              id="outlined-required"
              label="Work Order Number"
              type='text'
              placeholder='3453'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("work_order_number")}
            />

            <TextField
              required
              id="outlined-required"
              label="Product/Part"
              placeholder='ABC'
              type='text'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("product_part")}
            />
             <TextField
              required
              id="outlined-required"
              label="Associated Order"
              placeholder='XYZ-3543'
              type='text'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("associated_orde")}
            />
             <TextField
              required
              id="outlined-required"
              label="Product Description"
              placeholder='Prodrct Description'
              type='text'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("product_description")}
            />
             
        </div>
    </form>
  </>
  )
}

export default JOBDetails