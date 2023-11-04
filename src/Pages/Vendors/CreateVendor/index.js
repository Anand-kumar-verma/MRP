import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { createVendorFn } from "../../../Services/Purchase/CreateVendor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loding from "../../../Loding";
import axiosInstance from "../../../Config/axios";
import axiosInstance1 from "../../../Test";
import axios from "axios";
import { firm, gst_cat, vendor_cat } from "../../../Assets/data";
import { API_URLS } from "../../../Config/apiUrls";
import { Button } from "@mui/material";
import { countryStateCityFn } from "../../../Services/CountryStateCity";
import { useQuery } from "react-query";

const CreateVendor = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState(0);
  const [loding, setloding] = useState(false);
  const [cuntryId, setCuntryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cuntry, setCuntry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [splyPlace, setSplyPlace] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  const [data, setdata] = useState({
    // basic details
    vendor_name: "",
    vendor_email: "",
    vendor_mobile: "",
    // Banking Details
    company_name: "",
    tax_vat: "",
    place_of_supply: "",
    account_number: "",
    bank_name: "",
    routing_number: "",
    branch: "",
    Ifsc: "",
    vendor_type: "",
    //Social media
    facebook: "",
    twitter: "",
    skype: "",
    fax: "",
    area: "",
    street: "",
    //Address Data
    city: "",
    state: "",
    country: "",
    pincode: "",
    // Buinsess Details
    buiness_type: "",
    firm_status: "",
    gst_category: "",
    gst_number: "",
    pan: "",
  });

  const clearForm = () => {
    setdata({
      // basic details
      vendor_name: "",
      vendor_email: "",
      vendor_mobile: "",
      // Banking Details
      company_name: "",
      tax_vat: "",
      place_of_supply: "",
      account_number: "",
      bank_name: "",
      routing_number: "",
      branch: "",
      Ifsc: "",
      vendor_type: "",
      //Social media
      facebook: "",
      twitter: "",
      skype: "",
      fax: "",
      area: "",
      street: "",
      //Address Data
      city: "",
      state: "",
      country: "",
      pincode: "",
      // Buinsess Details
      buiness_type: "",
      firm_status: "",
      gst_category: "",
      gst_number: "",
      pan: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function saveFunctionCalled(message) {
    if (data.vendor_name === "") return toast.warn("Enter vendor name"); //1
    if (data.vendor_mobile === "") return toast.warn("Enter vendor mobile"); //2
    if (data.vendor_email === "") return toast.warn("Enter vendor email"); //3
    if (data.company_name === "") return toast.warn("Enter the company name");
    if (data.firm_status === "") return toast.warn("Enter the Firm Status");
    if (data.vendor_type === "") return toast.warn("Enter the vendor type");
    if (data.gst_category === "") return toast.warn("Enter the gst category");
    if (data.buiness_type === "") return toast.warn("Enter the buiness type");
    if (data.place_of_supply === "")
      return toast.warn("Enter the place of supply");
    if (data.gst_number === "") return toast.warn("Enter the GST number");
    if (data.pan === "") return toast.warn("Enter the PAN number");
    if (data.street === "") return toast.warn("Enter the Address");
    if (data.area === "") return toast.warn("Enter the area");
    if (data.country === "") return toast.warn("Enter the country");
    if (data.state === "") return toast.warn("Enter the state");
    if (data.city === "") return toast.warn("Enter the city");
    if (data.pincode === "") return toast.warn("Enter the pin code");
    if (data.bank_name === "") return toast.warn("Enter the bank name");
    if (data.account_number === "")
      return toast.warn("Enter the bank account number");
    if (data.branch === "") return toast.warn("Enter the branch");
    if (data.Ifsc === "") return toast.warn("Enter the bank Ifsc");

    createVendorFn({
      formData: JSON.stringify(data),
      setloding,
      navigate,
      link: message === "save" ? "/vendor" : "/vendor/create-vendor",
      clearForm,
    });
  }
  useQuery(["countries"], () => countryStateCityFn(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (response) => {
      setCuntry(response?.data?.data);
      console.log(response.data.data, "bharararar");
    },
  });

  useQuery(
    ["State", cuntryId],
    () => countryStateCityFn({ country_id: cuntryId }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: cuntryId ? true : false,
      onSuccess: (response) => {
        setState(response?.data?.data);
      },
    }
  );
  useQuery(
    ["City", stateId],
    () =>
      countryStateCityFn({
        country_id: cuntryId,
        state_id: stateId,
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: cuntryId && stateId ? true : false,
      onSuccess: (response) => {
        setCity(response?.data?.data);
      },
    }
  );

  const SplyPlace = () => {
    axiosInstance
      .get(API_URLS.vendor.place_of_supply_list)
      .then((response) => {
        setSplyPlace(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    SplyPlace();
  }, []);
  const BusinessType = () => {
    axiosInstance
      .get(`business-type/`)
      .then((response) => {
        setBusinessData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    BusinessType();
  }, []);

  // console.log(cuntryId, "cuntry");
  const supplierMoreInformationData = [
    "Other Details",
    "Address",
    "Bank Details",
    "Social Media",
  ];

  if (loding) return <Loding />;
  return (
    <>
      <div className="w-full bg-white h-full overflow-auto flex gap-2">
        <div className="w-full p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
          <p className=" pt-2 text-2xl font-poppins font-bold ">
            Create Vendor :
          </p>
          <form className="flex flex-col ">
            <div className="h-full">
              <div className="grid grid-cols-3 gap-10 ">
                <TextField
                  required
                  size="small"
                  id="outlined-required"
                  label="Vendor Name"
                  placeholder="ABC"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="vendor_name"
                  value={data.vendor_name}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  size="small"
                  id="outlined-required"
                  label="Vendor mo.no"
                  type="number"
                  placeholder="Enter Vendor mobile number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="vendor_mobile"
                  value={data.vendor_mobile}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  size="small"
                  id="outlined-required"
                  label="Vendor Email"
                  placeholder="johndoe@email.com"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="vendor_email"
                  value={data.vendor_email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 pt-10 ">
                {supplierMoreInformationData.map((singleData, index) => {
                  return (
                    <p
                      className={`${
                        item === index
                          ? "border-b-2 border-blue-500 text-blue-800"
                          : "border-b-2 border-white opacity-50"
                      }
          cursor-pointer text-sm 
          `}
                      key={index}
                      onClick={() => setItems(index)}
                    >
                      {singleData}
                    </p>
                  );
                })}
              </div>
              <div>
                {/* // other Details */}
                {item === 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-7">
                    <TextField
                      required
                      size="small"
                      id="outlined-required"
                      label="Company Name"
                      placeholder="AARA Group"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="company_name"
                      value={data.company_name}
                      onChange={handleInputChange}
                    />

                    <TextField
                      required
                      size="small"
                      select
                      label="Firm Status"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="firm_status"
                      value={data.firm_status}
                      onChange={handleInputChange}
                    >
                      {firm.map((item) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      required
                      size="small"
                      select
                      label="Vendor Type"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="vendor_type"
                      value={data.vendor_type}
                      onChange={handleInputChange}
                    >
                      {vendor_cat?.map((category) => {
                        return (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="Business Type"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="buiness_type"
                      value={data.buiness_type}
                      onChange={handleInputChange}
                    >
                      {businessData.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.name}>
                            {item?.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="GST Category"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="gst_category"
                      value={data.gst_category}
                      onChange={handleInputChange}
                    >
                      <MenuItem key={1} value="igst">
                        IGST
                      </MenuItem>
                      <MenuItem key={2} value="gst">
                        GST
                      </MenuItem>
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="Place Of Supply"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="place_of_supply"
                      value={data.place_of_supply}
                      onChange={handleInputChange}
                    >
                      {splyPlace.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item?.purchase_of_supply}
                          >
                            {item?.purchase_of_supply}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      required
                      size="small"
                      id="outlined-required"
                      label="GST Number"
                      type="text"
                      placeholder="27ABCDE1234F1Z5"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="gst_number"
                      value={data.gst_number}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      id="outlined-required"
                      label="PAN"
                      type="text"
                      placeholder="Enter PAN Number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="pan"
                      value={data.pan}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {/* // address */}
                {item === 1 && (
                  <div className="grid grid-cols-3 gap-5 pt-7">
                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Street"
                      placeholder="Enter street here"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="street"
                      value={data.street}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Area"
                      placeholder="Enter Area"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="area"
                      value={data.area}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      select
                      label="Select Country"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="country"
                      value={data.country}
                      onChange={handleInputChange}
                    >
                      {cuntry?.map((item) => {
                        return (
                          <MenuItem
                            onClick={() => setCuntryId(item.id)}
                            value={item?.name}
                          >
                            {item?.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      size="small"
                      select
                      label="Select State"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="state"
                      value={data.state}
                      onChange={handleInputChange}
                    >
                      {state.map((item) => {
                        return (
                          <MenuItem
                            onClick={() => setStateId(item.id)}
                            value={item.state}
                          >
                            {item.state}
                          </MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="Select City"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="city"
                      value={data.city}
                      onChange={handleInputChange}
                    >
                      {city.map((item) => {
                        return (
                          <MenuItem value={item.city}>{item.city}</MenuItem>
                        );
                      })}
                    </TextField>

                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Pin Code"
                      type="number"
                      placeholder="Enter PIN Code here"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="pincode"
                      value={data.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {/* Bank Details */}
                {item === 2 && (
                  <div className="grid grid-cols-3 gap-5 pt-7">
                    <TextField
                      size="small"
                      required
                      id="outlined-required"
                      label="Bank Name"
                      placeholder="Enter Bank Name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="bank_name"
                      value={data.bank_name}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      required
                      id="outlined-required"
                      label="Account Number"
                      type="number"
                      placeholder="Enter Account Number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="account_number"
                      value={data.account_number}
                      onChange={handleInputChange}
                    />

                    <TextField
                      required
                      size="small"
                      id="outlined-required"
                      label="Branch"
                      placeholder="Enter Branch"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="branch"
                      value={data.branch}
                      onChange={handleInputChange}
                    />

                    <TextField
                      required
                      size="small"
                      id="outlined-required"
                      label="IFSC Code"
                      placeholder="Enter IFSC Code"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="Ifsc"
                      value={data.Ifsc}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {/* Social Media */}
                {item === 3 && (
                  <div className="grid grid-cols-3 gap-5 pt-7">
                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Facebook"
                      placeholder="Enter Facebook Id"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="facebook"
                      value={data.facebook}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Twitter"
                      placeholder="Enter Twitter"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="twitter"
                      value={data.twitter}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Skype"
                      placeholder="Enter Skype"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="skype"
                      value={data.skype}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      id="outlined-required"
                      label="Fax"
                      type="number"
                      placeholder="Enter Fax"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fax"
                      value={data.fax}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>

          <div className="w-full flex gap-2  bg-gradient-to-b from-purple-200 to-purple-500 p-1">
            <Button
              size="small"
              variant="contained"
              onClick={() => clearForm()}
              // className="text-white p-3 bg-blue-600 rounded-lg"
            >
              Clear
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() => saveFunctionCalled("save")}
              // className="text-white p-3 bg-blue-600 rounded-lg"
            >
              Save
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => saveFunctionCalled("save_and_new")}
              // className="text-white p-3 bg-blue-600 rounded-lg"
            >
              Save and New
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVendor;
