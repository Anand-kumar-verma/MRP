import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { loginFn } from '../../../../Services/Login';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';

const WorkProgress = () => {

    const[value,setValue] = useState()

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
              InputLabelProps={{
                shrink: true,
               }}
              label="Task List"
              {...register('last_list')}
            >
              <MenuItem key={1} value="taskList1">
                <div className='flex justify-between w-full'>
                    <span> Task 1</span>
                    <span> Prepare Components</span>
                </div>
              </MenuItem>
              <MenuItem key={2} value="taskList2">
              <div className='flex justify-between w-full'>
                    <span> Task 2</span>
                    <span> Ready Components</span>
                </div>
              </MenuItem>
            </TextField>

        <TextField
              required
              id="outlined-required"
              label="Worker Assignment"
              placeholder='Worker Assignment'
              InputLabelProps={{
                    shrink: true,
                  }}
            />
            <TextField
              required
              id="outlined-required"
              label="Task Start/End Times"
              placeholder='Task Start/ End Time'
              InputLabelProps={{
                    shrink: true,
                  }}
            />
            
            <TextField
              required
              id="outlined-required"
              label="Task Completion Notes"
              type='number'
              placeholder='Enter Here'
              InputLabelProps={{
                    shrink: true,
                  }}
            />
        </div>
    </form>
  </>
  )
}

export default WorkProgress