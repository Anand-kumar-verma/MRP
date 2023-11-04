import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { createVendorFn } from '../../../Services/Purchase/CreateVendor';
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import {CircleOutlined } from "@mui/icons-material";
import { toast } from 'react-toastify';

const SupplierInformation = () => {


  const { register, handleSubmit ,reset} = useForm();

  const[item,setItems] = useState(0)
  const [value,setValue] = useState()
 
    
  function submithandler(data){
          mutate(data)
  }


  const { mutate, isLoading } = useMutation(createVendorFn, {
      onSuccess: (response) => {
          if(response?.data?.message){
            toast.success(response?.data?.message)
            reset()
          }
      },
    });

    const supplierMoreInformationData = [
      'Other Details',
      "Address",
      "Bank Details",
      "Social Media"
    ]

  return (
  <>
    <form onSubmit={handleSubmit(submithandler)}>
        <div className='grid grid-cols-3 gap-10 mt-10'>
        <TextField
              required
              id="outlined-required"
              label="Supplier ID"
              placeholder='1234567890123'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('vendor_id')}
            />
            <TextField
              required
              id="outlined-required"
              label="Supplier Name"
              placeholder='Anand Kumar'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('vendor_name')}
            />
            
            <TextField
              required
              id="outlined-required"
              label="Supplier Contact"
              type='number'
              placeholder='0000-000-000'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('contact')}
            />
            <TextField
              required
              id="outlined-required"
              label="Supplier Email"
              placeholder='abc@gmail.com'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('email')}
            />
           <TextField
             
              id="outlined-required"
              label="Supplier Phone"
              type='number'
              placeholder='0000-000-000'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('phone')}
            />

        </div>

        <div className='flex gap-3 pt-10 '>
      {
        supplierMoreInformationData.map((singleData,index)=>{
          return <p 
          className={`${item === index ? 'border-b-2 border-blue-500 text-blue-800' : 'border-b-2 border-white opacity-50'}
          cursor-pointer text-sm 
          `}
          key={index}
          onClick={()=>setItems(index)}
          >{singleData}</p>
        })
      }
    </div>
      <div>

    {/* // other Details */}
      {item === 0 && 
      <div className='grid grid-cols-3 gap-5 pt-7'>
      <TextField
              required
              id="outlined-required"
              label="Vendor Name"
              placeholder='ABC'
              InputLabelProps={{
                    shrink: true,
                  }}
              {...register('vendor_name')}
            />
        <TextField
            required
              id="outlined-required"
              label="Company Name"
              placeholder='AARA Group'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('company_name')}
            />
            
            <TextField
            required
              value={value}
              // onChange={(e) => setValue(e.target.value)}
              label="Firm Status"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("firm_status")}
            />
              {/* <MenuItem key={1} value="True">
              Firm Status 1
              </MenuItem>
              <MenuItem key={2} value="False">
              Firm Status 2
              </MenuItem>
            </TextField> */}


            <TextField
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Vendor Type"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("vendor_type")}
            >
              <MenuItem key={1} value="Type1">
              Vendor Type 1
              </MenuItem>
              <MenuItem key={2} value="Type2">
              Vendor Type 2
              </MenuItem>
            </TextField>


            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Business Type"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("buiness_type")}
            >
              <MenuItem key={1} value="type1">
              Business Type 1
              </MenuItem>
              <MenuItem key={2} value="type1">
              Business Type 2
              </MenuItem>
            </TextField>


            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="GST Category"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("gst_category")}
            >
              <MenuItem key={1} value="sgst">
              SGST
              </MenuItem>
              <MenuItem key={2} value="cgst">
              CGST
              </MenuItem>
            </TextField>

            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Place Of Supply"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("place_of_supply")}
            >
              <MenuItem key={1} value="place1">
              Place Of Supplyd 1
              </MenuItem>
              <MenuItem key={2} value="place1">
              Place Of Supply 2
              </MenuItem>
            </TextField>


            <TextField
            required
              id="outlined-required"
              label="GST Number"
              type='text'
              placeholder='27ABCDE1234F1Z5'
              InputLabelProps={{
                    shrink: true,
                  }}
                {...register('gst_number')}
            />
            <TextField
              id="outlined-required"
              label="PAN"
              type='text'
              placeholder='Enter PAN Number'
              InputLabelProps={{
                    shrink: true,
                  }}
                {...register('pan_number')}
            />
        </div>
      }

      {/* // address */}
      {item === 1 && 
        <div className='grid grid-cols-3 gap-5 pt-7'>
        <TextField
              id="outlined-required"
              label="Address"
              placeholder='Enter Address here'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('address')}
            />
            <TextField
              id="outlined-required"
              label="Area"
              placeholder="Enter Area"
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('area')}
            />
            
            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Select Country"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("country")}
            >
              <MenuItem key={1} value="India">
              Select Country 1
              </MenuItem>
              <MenuItem key={2} value="Pakistan">
              Select Country 2
              </MenuItem>
            </TextField>


            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Select State"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("state")}
            >
              <MenuItem key={1} value="Uttar Pradesh">
              India
              </MenuItem>
              <MenuItem key={2} value="Maharastra">
              Pakistan
              </MenuItem>
            </TextField>


            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              select 
              label="Select City"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("city")}
            >
              <MenuItem key={1} value="Delhi">
              Select City 1
              </MenuItem>
              <MenuItem key={2} value="Lucknow">
              Select City 2
              </MenuItem>
            </TextField>


            <TextField
              id="outlined-required"
              label="Pin Code"
              type='number'
              placeholder='Enter PIN Code here'
              InputLabelProps={{
                    shrink: true,
                  }}
              {...register("pin_code")}
            />
        
        </div>
    
      }

      {/* Bank Details */}
      {item === 2 && 
        <div className='grid grid-cols-3 gap-5 pt-7'>
            <TextField
            required
              id="outlined-required"
              label="Bank Name"
              placeholder='Enter Bank Name'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("bank_name")}
            />

            <TextField
            required
              id="outlined-required"
              label="Account Number"
              type='number'
              placeholder='Enter Account Number'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("account_number")}
            />

            <TextField
            required
              id="outlined-required"
              label="Branch"
              placeholder='Enter Branch'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("branch")}
            />
            
          

            <TextField
            required
              id="outlined-required"
              label="IFSC Code"
              placeholder='Enter IFSC Code'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("Ifsc")}
            />

        </div>
      
      }

      {/* Social Media */}
      {item === 3 && 
        <div className='grid grid-cols-3 gap-5 pt-7'>
            <TextField
              id="outlined-required"
              label="Facebook"
              placeholder='Enter Facebook Id'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('facebook')}
            />

            <TextField
              id="outlined-required"
              label="Twitter"
              placeholder='Enter Twitter'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('twitter')}
            />

            <TextField
              id="outlined-required"
              label="Skype"
              placeholder='Enter Skype'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('skype')}
            />
            
          

            <TextField
              id="outlined-required"
              label="Fax"
              type='number'
              placeholder='Enter Fax'
              InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('fax')}
            />
        </div>
      }
    </div>


<div className='w-full flex justify-center pt-3'>

    <button className='text-white p-3 bg-blue-600 rounded-lg'>{isLoading ? <CircleOutlined/>:"Submit"}</button>

</div>
    </form>

   

  </>
  )
}

export default SupplierInformation