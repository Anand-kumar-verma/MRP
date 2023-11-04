import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import {BiEdit} from 'react-icons/bi'
import { Button } from '@mui/material';
import { getCustomerById } from '../../../Services/Sales/GetCustomerById';
import Loding from '../../../Loding';
import { updateCustomerByIdFn } from '../../../Services/Sales/UpdateCustomerById';
import { useForm } from 'react-hook-form';
const ShowCustomerDetails = () => {

    // console.log("HIIIII")
   const navigate = useNavigate()
    const {id} = useParams()
    const [width,setWidth] = useState(false)
    const [editable,setEditable] = useState(true)
    const [loding,setloding] = useState(false)
    const [customerDetails,setcustomerDetails] = useState({})
    const {reset} = useForm()
    

    const [formData, setFormData] = useState({
        // basic details
        customer_name: '',
        contact: '',
        email: '',
        // other details
        company_name:'',
        customer_type:'',
        firm_status:'',
        buiness_type:'',
        gst_category:'',
        place_of_supply:'',
        gst_number:'',
        pan_number:'',
        // address
        address:'',
        area:'',
        country:'',
        state:'',
        city:'',
        pin_code:'',
        //bank Details
        bank_name:'',
        account_number:'',
        branch:'',
        Ifsc:'',
        //social media
        facebook:'',
        twitter:'',
        skype:'',
        fax:''

      });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })
    );
  };
  

useEffect(()=>{
    setFormData({
        customer_name: customerDetails?.name,
        contact: customerDetails?.mobile,
        email: customerDetails?.email,
        // other details
        company_name:customerDetails?.company,
        customer_type:customerDetails?.person_type,
        firm_status:customerDetails?.firm_status,
        buiness_type:customerDetails?.buiness_type,
        gst_category:customerDetails?.gst_category,
        place_of_supply:customerDetails?.place_of_supply,
        gst_number:customerDetails?.gst_number,
        pan_number:customerDetails?.pan,
        // address
        address:customerDetails?.address?.street,
        area:customerDetails?.address?.area,
        country:customerDetails?.address?.country,
        state:customerDetails?.address?.state,
        city:customerDetails?.address?.city,
        pin_code:customerDetails?.address?.pincode,
        //bank Details
        bank_name:customerDetails?.banking_details?.bank_name,
        account_number:customerDetails?.banking_details?.account_number,
        branch:customerDetails?.banking_details?.branch,
        Ifsc:customerDetails?.banking_details?.ifsc,
        //social media
        facebook:customerDetails?.facebook,
        twitter:customerDetails?.twitter,
        skype:customerDetails?.skype,
        fax:customerDetails?.fax
      })
},[customerDetails])


useEffect(()=>{
    getCustomerById({
         setloding,
         id,
         setData:setcustomerDetails
     })
 },[id])


 async function saveFunctionCalled(){
    updateCustomerByIdFn({
        formData:formData,
        setloding,
        navigate,
        link:`/contacts`,
        reset,
        id:id
    })
 }
 

console.log(customerDetails)


    
// console.log(editable)

if(loding)
    return <Loding/>
else
  return (
    <div className='w-full h-full flex justify-between'>
        <div className='w-full  overflow-auto h-auto gap-20 px-5 py-10  border-2 border-gray-200 rounded-lg bg-white'>
        <div className='w-full  flex justify-end '>
                <span className={` ${editable ? 'bg-green-700':'bg-blue-700'} cursor-pointer text-[2rem] text-white p-4 rounded-full`}
                 onClick={()=>setEditable(!editable)}
                ><BiEdit /></span>
        </div>
            <p className='font-bold mt-3'>Basic Details:</p>
           <div className=' grid grid-cols-3 gap-x-20 gap-y-2'>
     
           <TextField id="standard-basic" label="Name:" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="customer_name"
                shrink={true}
                value={formData.customer_name}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Contact:" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="contact"
                shrink={true}
                value={formData.contact}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Email:" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="email"
                shrink={true}
                value={formData.email}
                onChange={handleInputChange}
            />
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
           </div>

           <p className='font-bold mt-5'>Other Details:</p>

           <div className=' grid grid-cols-3 gap-x-20 gap-y-5'>
           <TextField 
            id="standard-basic" 
            label="Company Name"
            variant="standard" 
            InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="company_name"
                shrink={true}
                value={formData.company_name}
                onChange={handleInputChange}
                        />
            <TextField id="standard-basic" label="Firm Status" variant="standard"
            InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="customer_type"
                shrink={true}
                value={formData.customer_type}
                onChange={handleInputChange}
                 />
            <TextField id="standard-basic" label="customer Type" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="firm_status"
                shrink={true}
                value={formData.firm_status}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Business Type" variant="standard"
            InputProps={{
                readOnly: !editable ? false : true,
                }} 
                name="buiness_type"
                shrink={true}
                value={formData.buiness_type}
                onChange={handleInputChange}
                />
            <TextField id="standard-basic" label="GST Category" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="gst_category"
                shrink={true}
                value={formData.gst_category}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" 
                label="Place Of Supply" 
                variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="place_of_supply"
                shrink={true}
                value={formData.place_of_supply}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" 
                label="GST Number" 
                variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="gst_number"
                shrink={true}
                value={formData.gst_number}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" 
                label="PAN Number" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="pan_number"
                shrink={true}
                value={formData.pan_number}
                onChange={handleInputChange}
            />
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

           </div>

           <p className='font-bold mt-5'> Address:</p>
           <div className=' grid grid-cols-3 gap-x-20 gap-y-5'>
           <TextField id="standard-basic" label="Address" variant="standard" 
            InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="address"
                shrink={true}
                value={formData.address}
                onChange={handleInputChange}
           />
            <TextField id="standard-basic" label="Area" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="area"
                shrink={true}
                value={formData.area}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Country" variant="standard"
            InputProps={{
                readOnly: !editable ? false : true,
                }} 
                name="country"
                shrink={true}
                value={formData.country}
                onChange={handleInputChange}
                />
            <TextField id="standard-basic" label="State" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="state"
                shrink={true}
                value={formData.state}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="City" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="city"
                shrink={true}
                value={formData.city}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Pin Code" variant="standard"
            InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="pin_code"
                shrink={true}
                value={formData.pin_code}
                onChange={handleInputChange}
                 />
           </div>

           <p className='font-bold mt-5'> Bank Details:</p>
           <div className=' grid grid-cols-3 gap-x-20 gap-y-5'>
           <TextField id="standard-basic" label="Bank Name" variant="standard"
           InputProps={{
                readOnly: !editable ? false : true,
                }} 
                name="bank_name"
                shrink={true}
                value={formData.bank_name}
                onChange={handleInputChange}
                />
            <TextField id="standard-basic" label="Account Number" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                 name="account_number"
                shrink={true}
                value={formData.account_number}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Branch" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="branch"
                shrink={true}
                value={formData.branch}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="IFSC Code" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="Ifsc"
                shrink={true}
                value={formData.Ifsc}
                onChange={handleInputChange}
            />
            
           </div>

           <p className='font-bold mt-5'> Social Media:</p>
           <div className=' grid grid-cols-3 gap-x-20 gap-y-5'>
           <TextField id="standard-basic" label="Facebook" variant="standard" 
            InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="facebook"
                shrink={true}
                value={formData.facebook}
                onChange={handleInputChange}
           />
            <TextField id="standard-basic" label="Twitter" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="twitter"
                shrink={true}
                value={formData.twitter}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Skype" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="skype"
                shrink={true}
                value={formData.skype}
                onChange={handleInputChange}
            />
            <TextField id="standard-basic" label="Fax" variant="standard" 
                InputProps={{
                readOnly: !editable ? false : true,
                }}
                name="fax"
                shrink={true}
                value={formData.fax}
                onChange={handleInputChange}
            />
            {/* <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" /> */}
           </div>

           <div className='w-full flex justify-center'>
              { !editable &&
                <Button variant="contained"
                onClick={()=>saveFunctionCalled()}
                >Save</Button>
              }
           </div>
        </div>


  

    </div>
  )
}

export default ShowCustomerDetails