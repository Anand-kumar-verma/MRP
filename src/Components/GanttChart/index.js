import React, { useEffect, useState } from 'react'
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import axiosInstance from '../../Config/axios';
import { API_URLS } from '../../Config/apiUrls';
import { MenuItem, TextField } from '@mui/material';

export const GanttChart = () => {
    const [data, setData] = useState([])
    const [range,setRange] = useState("This Year")

    useEffect(()=>{
        axiosInstance?.get(`${API_URLS.create_task}?selected_range=${range}`).then((res)=>setData(res?.data?.data)).catch((e)=>console.log(e))
    },[range])


let main_data = []
     main_data = [
        {
            id:1,
            task_name:"Cutting",
            spent_time:"10",
            estimated_time:"12",
            start_date:"2024-12-12",
            end_date:"2025-01-12"
        },
        {
            id:2,
            task_name:"Penting",
            spent_time:"10",
            estimated_time:"15",
            start_date:"2024-12-12",
            end_date:"2025-01-12"
        },
        {
            id:3,
            task_name:"Maining",
            spent_time:"24",
            estimated_time:"24",
            start_date:"2024-12-12",
            end_date:"2025-01-12"
        },
        {
            id:4,
            task_name:"Shielding",
            spent_time:"10",
            estimated_time:"24",
            start_date:"2024-12-12",
            end_date:"2025-01-12"
        }
     ]?.map((i) => {
        return {
            start:new Date(Number(i?.start_date?.slice(0, 10)?.substring(0, i?.start_date?.slice(0, 10)?.indexOf("-"))),Number(i?.start_date?.slice(0, 10)?.substring(i?.start_date?.slice(0, 10)?.indexOf("-") + 1, i?.start_date?.slice(0, 10)?.indexOf('-', i?.start_date?.slice(0, 10)?.indexOf('-') + 1)) - 1),Number(i?.start_date?.slice(0, 10)?.substring(i?.start_date?.slice(0, 10)?.indexOf('-', i?.start_date?.slice(0, 10)?.indexOf('-') + 1) + 1))) || new Date(),
            end:new Date(Number(i?.end_date?.slice(0, 10)?.substring(0, i?.end_date?.slice(0, 10)?.indexOf("-"))),Number(i?.end_date?.slice(0, 10)?.substring(i?.end_date?.slice(0, 10)?.indexOf("-") + 1, i?.end_date?.slice(0, 10)?.indexOf('-', i?.end_date?.slice(0, 10)?.indexOf('-') + 1)) - 1),Number(i?.end_date?.slice(0, 10)?.substring(i?.end_date?.slice(0, 10)?.indexOf('-', i?.end_date?.slice(0, 10)?.indexOf('-') + 1) + 1))) || new Date(),
            name: i?.task_name,
            id: i?.id,
            type: i?.priority,
            progress: Number((Number(i?.spent_time) * 100 )/Number(i?.estimated_time)) || 0,
            isDisabled: true,
            styles: { progressColor: '#54ff84',
            progressSelectedColor: '#54ff84', 
            barProgressColor:"54ff84",
            barBackgroundSelectedColor:"54ff84",
            barBackgroundColor:"54ff84",
            barProgressSelectedColor:"54ff84",
   
           },

        }
    })

let main = [
    {
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 1),
        name: 'NO Data Found',
        id: 'NO Data Found',
        type:'NO Data Found',
        progress: 0,
        isDisabled: false,
        styles: { progressColor: '#54ff84',
         progressSelectedColor: '#54ff84', 
         barProgressColor:"54ff84",
         barBackgroundSelectedColor:"54ff84",
         barBackgroundColor:"54ff84",
         barProgressSelectedColor:"54ff84",
         barFill:100

        },
      }
]




    return (
      <>
        <div className='w-[1250px] overflow-scroll bg-white p-4'>
            <div className='w-full flex justify-between items-center'>
                <p className='font-bold text-2xl'>{range}</p>
                <TextField 
                className='!h-[5%] !w-[20%]'
                select
                placeholder='Filter By'
                value={range}
                onChange={(e)=>setRange(e.target.value)}
                >
                    <MenuItem value = ""><em>--None--</em></MenuItem>
                    {
                       [
                        "This Month","Today","Yesterday","This Week","Previous Week","Previous Month","This Quarter","Previous Quarter","This Year","Previous Year"
                       ]?.map((i)=>{
                        return  <MenuItem value = {i}>{i}</MenuItem>
                       })
                    }
                </TextField>
            </div>
            <div className='mt-5'>
            <Gantt
                tasks={main_data?.length === 0 ? main : main_data}
              
            // viewMode={view}
            // onDateChange={onTaskChange}
            // onTaskDelete={onTaskDelete}
            // onProgressChange={onProgressChange}
            // onDoubleClick={onDblClick}
            // onClick={onClick}
            />
            </div>
        </div>
      </>
    )
}
