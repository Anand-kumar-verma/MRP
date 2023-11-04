import React from "react";
import CustomDiv from "../../../Shared/CustomDiv";
import { useState } from "react";
import JOBDetails from "./JOBDetails";
import BillOfMaterials from "./BillOfMaterials";
import WorkProgress from "./WorkProgress";

const JobCardTab = () => {

 const[haderIndex,setHeaderIndex] =  useState(0)

  const salesHeaderData =[
    
      "Job Details",
      "Bill Of Materials (BOM)",
      'Work Progress',
    
  ]
  

  return (
    <>
      <CustomDiv className=" flex flex-col gap-2 fixed w-full z-20 bg-gray-100">
        <CustomDiv className="flex">
          <div className="flex gap-5">
              {
                salesHeaderData.map((signleData,index)=>{
                  return <div 
                  onClick={()=>setHeaderIndex(index)}
                  className={`
                                      ${index === 0 && 'bg-gradient-to-b from-[#7f7cee] to-[#2E28B0]'}
                                      ${index === 1 && 'bg-gradient-to-b from-[#89c3ec] to-[#1679AC]'}
                                      ${index === 2 && 'bg-gradient-to-b from-[#8b77dc] to-[#5038B7]'}
                                     
                                     mt-5 mb-6  text-white 
                                     px-5 py-4 flex flex-col    rounded-xl
                                      w-[35%]  items-center shadow-xl cursor-pointer relative
                                      justify-center
                                `}>
                             <div className='font-bold justify-center'>{signleData}</div>
                             <div className={`
                             ${haderIndex === index && index === 0 &&
                              'bg-gradient-to-b from-[#625EF4] to-[#2E28B0]'
                             }
                             ${haderIndex === index && index === 1 &&
                              'bg-gradient-to-b from-[#75BDF1] to-[#1679AC]'
                             }
                             ${haderIndex === index && index === 2 &&
                              'bg-gradient-to-b from-[#7458E0] to-[#7458E0]'
                             }
                             w-full h-[3px] absolute -bottom-3`}></div>
                     </div>

                })
                }
          </div>
        </CustomDiv>
      </CustomDiv>
      <div className=" pt-[8%] px-3 relative w-full">
        {
          haderIndex === 0 && <JOBDetails/>
        }
        {
          haderIndex === 1 && <BillOfMaterials/>
        }
        {
          haderIndex === 2 && <WorkProgress/>
        }
        
        </div>
    </>
  );
};

export default JobCardTab;
