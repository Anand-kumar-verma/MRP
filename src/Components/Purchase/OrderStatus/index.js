import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { loginFn } from '../../../Services/Login';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
const OrderStatus = () => {

  const[value,setValue] =useState()
  const { register, handleSubmit ,reset} = useForm();
    
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
              label="Order Process"
              type='text'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("order_process")}
            />


            <TextField
              required
              id="outlined-required"
              label="actual Delivery Date"
              type='date'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("actual_delivery_date")}
            />

            <TextField
              required
              id="outlined-required"
              label="Receiving Personal"
              placeholder='123456789012'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("receiving_personal")}
            />
           
        </div>
    </form>
  </>
  )
}

export default OrderStatus