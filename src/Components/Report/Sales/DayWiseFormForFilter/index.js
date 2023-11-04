import React from 'react';
import {BsCheck2} from 'react-icons/bs'

const DayWiseFormForFilter = ({setopenMenuButton,setMenuButtonData,menuButtonData}) => {

    function functionCallid(data){
        setMenuButtonData(data)
        setopenMenuButton(false)
    }


    const menuItems = ['Last 7 days','Last 30 Days','This Month','Last Month']
  
  
    return (
    <div className='px-10 flex flex-col gap-3'>
    {
        menuItems.map((singleItems,index)=>{
            return <div 
            className='cursor-pointer text-[#8F38F1] grid grid-cols-2 border-b-2 pb-1'
            onClick={()=>functionCallid(singleItems)}
            key = {index}>
            
            <div>
            {singleItems}
            </div>
            <div className='grid grid-cols-1 place-items-end'>
                {
                    menuButtonData === singleItems &&
                    <BsCheck2/>
                }
                
                    
            </div>
           
          
            </div>
        })
    }

    </div>
  );
}

export default DayWiseFormForFilter;
