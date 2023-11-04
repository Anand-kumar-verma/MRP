import React from 'react'
import TextField from '@mui/material/TextField';
import {CircleOutlined } from "@mui/icons-material";
import { createCategoryFn } from '../../../../Services/Category/AddCategory';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddCategory = ({setOpenCustomDialogBox,setDummy}) => {

    const { register, handleSubmit ,reset} = useForm();
    
    function submithandler(data){
            console.log(data)
            mutate(data)

    }

    const { mutate, isLoading } = useMutation(createCategoryFn, {
        onSuccess: (response) => {
            if(response?.data?.message){
                toast.success(response?.data?.message)
                setDummy(response)
                reset()
                setOpenCustomDialogBox(false)

            } 
        },
      });
      

  return (
    <div className='flex flex-col gap-3 pt-5'>
       <form className='flex flex-col gap-3 pt-5' onSubmit={handleSubmit(submithandler)}>
       <TextField
          required
          id="outlined-required"
          label="Category"
          placeholder='Mobile/Laptop'
          {...register('name')}
        />

         <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          placeholder='Enter Descriptin'
          {...register('description')}
        />

        <div className='w-full flex items-center justify-center'>
            <button className='p-3 bg-blue-400  rounded-lg px-10 text-white'>{isLoading ? <CircleOutlined/> : "OK"}</button>
        </div>
       </form>
    </div>
  )
}

export default AddCategory