import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { loginFn } from '../../../Services/Login';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
const PaymentInformation = () => {

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
              label="Invoice Number"
              type='number'
              placeholder='8239472234'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("invoice_number")}
            />


            <TextField
              required
              id="outlined-required"
              label="Invoice Date"
              type='date'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("invoice_date")}
            />

            <TextField
              required
              id="outlined-required"
              label="Payment Status"
              placeholder='Staus'
              type='text'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("payment_status")}
            />
             <TextField
              required
              id="outlined-required"
              label="Payment Due Date"
              placeholder='Status'
              type='date'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("poayment_due_date")}
            />
             <TextField
              required
              id="outlined-required"
              label="Total Amount"
              placeholder='100 Rs.'
              type='number'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("total_amount")}
            />
             <TextField
              required
              id="outlined-required"
              label="Taxes and Discounts"
              placeholder='213'
              type='number'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("taxes_discount")}
            />
           
        </div>
    </form>
  </>
  )
}

export default PaymentInformation