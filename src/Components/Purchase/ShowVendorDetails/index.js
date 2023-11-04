import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { BiEdit } from "react-icons/bi";
import { Button } from "@mui/material";
import { getVendorById } from "../../../Services/Purchase/GetVendorById";
import Loding from "../../../Loding";
import { updateVendorByIdFn } from "../../../Services/Purchase/UpdateVendor";
import { useForm } from "react-hook-form";
const ShowVendorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [width, setWidth] = useState(false);
  const [editable, setEditable] = useState(true);
  const [loding, setloding] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({});
  const { reset } = useForm();

  const [formData, setFormData] = useState({
    // basic details
    vendor_name: "",
    contact: "",
    email: "",
    // other details
    company_name: "",
    vendor_type: "",
    firm_status: "",
    buiness_type: "",
    gst_category: "",
    place_of_supply: "",
    gst_number: "",
    pan_number: "",
    // address
    address: "",
    area: "",
    country: "",
    state: "",
    city: "",
    pin_code: "",
    //bank Details
    bank_name: "",
    account_number: "",
    branch: "",
    Ifsc: "",
    //social media
    facebook: "",
    twitter: "",
    skype: "",
    fax: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData({
      vendor_name: vendorDetails?.name,
      contact: vendorDetails?.mobile,
      email: vendorDetails?.email,
      // other details
      company_name: vendorDetails?.company,
      vendor_type: vendorDetails?.person_type,
      firm_status: vendorDetails?.firm_status,
      buiness_type: vendorDetails?.buiness_type,
      gst_category: vendorDetails?.gst_category,
      place_of_supply: vendorDetails?.place_of_supply,
      gst_number: vendorDetails?.gst_number,
      pan_number: vendorDetails?.pan,
      // address

      address: vendorDetails?.address?.street,
      area: vendorDetails?.address?.area,
      country: vendorDetails?.address?.country,
      state: vendorDetails?.address?.state,
      city: vendorDetails?.address?.city,
      pin_code: vendorDetails?.address?.pincode,
      //bank Details
      bank_name: vendorDetails?.banking_details?.bank_name,
      account_number: vendorDetails?.banking_details?.account_number,
      branch: vendorDetails?.banking_details?.branch,
      Ifsc: vendorDetails?.banking_details?.ifsc,
      //social media
      facebook: vendorDetails?.facebook,
      twitter: vendorDetails?.twitter,
      skype: vendorDetails?.skype,
      fax: vendorDetails?.fax,
    });
  }, [vendorDetails]);

  useEffect(() => {
    getVendorById({
      setloding,
      id,
      setData: setVendorDetails,
    });
  }, [id]);

  //  console.log(vendorDetails)

  async function saveFunctionCalled() {
    updateVendorByIdFn({
      formData: formData,
      setloding,
      navigate,
      link: `/vendor`,
      reset,
      id: id,
    });
  }

  if (loding) return <Loding />;
  else
    return (
      <div className="w-full h-full flex justify-between">
        <div className="w-full  overflow-auto h-auto gap-20 px-5 py-10  border-2 border-gray-200 rounded-lg bg-white">
          <div className="w-full  flex justify-end ">
            <span
              className={` ${
                editable ? "bg-green-700" : "bg-blue-700"
              } cursor-pointer text-[2rem] text-white p-4 rounded-full`}
              onClick={() => setEditable(!editable)}
            >
              <BiEdit />
            </span>
          </div>
          <p className="font-bold mt-3">Basic Details:</p>
          <div className=" grid grid-cols-3 gap-x-20 gap-y-2">
            <TextField
              id="standard-basic"
              label="Name:"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="vendor_name"
              shrink={true}
              value={formData.vendor_name}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Contact:"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="contact"
              shrink={true}
              value={formData.contact}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Email:"
              variant="standard"
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

          <p className="font-bold mt-5">Other Details:</p>

          <div className=" grid grid-cols-3 gap-x-20 gap-y-5">
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
            <TextField
              id="standard-basic"
              label="Firm Status"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="vendor_type"
              shrink={true}
              value={formData.vendor_type}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Vendor Type"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="firm_status"
              shrink={true}
              value={formData.firm_status}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Business Type"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="buiness_type"
              shrink={true}
              value={formData.buiness_type}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="GST Category"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="gst_category"
              shrink={true}
              value={formData.gst_category}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
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
            <TextField
              id="standard-basic"
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
            <TextField
              id="standard-basic"
              label="PAN Number"
              variant="standard"
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

          <p className="font-bold mt-5"> Address:</p>
          <div className=" grid grid-cols-3 gap-x-20 gap-y-5">
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="address"
              shrink={true}
              value={formData.address}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Area"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="area"
              shrink={true}
              value={formData.area}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Country"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="country"
              shrink={true}
              value={formData.country}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="State"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="state"
              shrink={true}
              value={formData.state}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="city"
              shrink={true}
              value={formData.city}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Pin Code"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="pin_code"
              shrink={true}
              value={formData.pin_code}
              onChange={handleInputChange}
            />
          </div>

          <p className="font-bold mt-5"> Bank Details:</p>
          <div className=" grid grid-cols-3 gap-x-20 gap-y-5">
            <TextField
              id="standard-basic"
              label="Bank Name"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="bank_name"
              shrink={true}
              value={formData.bank_name}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Account Number"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="account_number"
              shrink={true}
              value={formData.account_number}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Branch"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="branch"
              shrink={true}
              value={formData.branch}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="IFSC Code"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="Ifsc"
              shrink={true}
              value={formData.Ifsc}
              onChange={handleInputChange}
            />
          </div>

          <p className="font-bold mt-5"> Social Media:</p>
          <div className=" grid grid-cols-3 gap-x-20 gap-y-5">
            <TextField
              id="standard-basic"
              label="Facebook"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="facebook"
              shrink={true}
              value={formData.facebook}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Twitter"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="twitter"
              shrink={true}
              value={formData.twitter}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Skype"
              variant="standard"
              InputProps={{
                readOnly: !editable ? false : true,
              }}
              name="skype"
              shrink={true}
              value={formData.skype}
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Fax"
              variant="standard"
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

          <div className="w-full flex justify-center">
            {!editable && (
              <Button variant="contained" onClick={() => saveFunctionCalled()}>
                Save
              </Button>
            )}
          </div>
        </div>

     
      </div>
    );
};

export default ShowVendorDetails;
