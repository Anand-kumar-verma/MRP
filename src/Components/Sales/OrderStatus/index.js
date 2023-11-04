import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { loginFn } from '../../../Services/Login';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Order Progress"
              InputLabelProps={{
                shrink: true,
               }}
              {...register("order_progress")}
            >
              <MenuItem key={1} value="order_progress1">
              Order Progress 
              </MenuItem>
              <MenuItem key={2} value="order_progress2">
              Order Progress 
              </MenuItem>
            </TextField>

            <TextField
              required
              id="outlined-required"
              label="Estimated Delivery Date"
              type='date'
              InputLabelProps={{
                    shrink: true,
                  }}
            />
            <TextField
              required
              id="outlined-required"
              label="Shipment Tracking Number"
              placeholder='123456789012'
              InputLabelProps={{
                    shrink: true,
                  }}
            />
           
        </div>
        <div className='w-full pt-10 flex justify-center'> 
                  <Button variant="contained">Submit</Button>
            </div>
    </form>
  </>
  )
}

export default OrderStatus