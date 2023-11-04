import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { createCustomerFn } from "../../../Services/Sales/CreateCustomer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loding from "../../../Loding";
import axios from "axios";
import axiosInstance from "../../../Config/axios";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState(0);
  const [value, setValue] = useState();
  const [cuntryId, setCuntryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cuntry, setCuntry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [loding, setloding] = useState(false);
  const [splyPlace, setSplyPlace] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  const [data, setdata] = useState({
    // basic details
    company_name: "",
    tax_vat: "",
    customer_mobile: "",
    // other details
    customer_email: "",
    customer_name: "",
    customer_type: "",
    firm_status: "",
    gst_category: "",
    buiness_type: "",
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

  const clearForm = () => {
    setdata({
      company_name: "",
      tax_vat: "",
      customer_mobile: "",
      // other details
      customer_email: "",
      customer_name: "",
      customer_type: "",
      firm_status: "",
      gst_category: "",
      buiness_type: "",
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
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function saveFunctionCalled(message) {
    if (data.company_name === "") return toast.warn("Enter the company name");
    if (data.tax_vat === "") return toast.warn("Enter the Tax ID/VAT Number");
    if (data.customer_mobile === "")
      return toast.warn("Enter the customer mobile");
    if (data.customer_email === "")
      return toast.warn("Enter the customer email");
    if (data.customer_name === "") return toast.warn("Enter the customer name");
    if (data.customer_type === "") return toast.warn("Enter the customer type");
    if (data.firm_status === "") return toast.warn("Enter the firm status");
    if (data.gst_category === "") return toast.warn("Enter the gst category");
    if (data.buiness_type === "") return toast.warn("Enter the buiness type");
    if (data.place_of_supply === "")
      return toast.warn("Enter the place of supply");
    if (data.gst_number === "") return toast.warn("Enter the GST number");
    if (data.pan_number === "") return toast.warn("Enter the PAN number");
    if (data.address === "") return toast.warn("Enter the address");
    if (data.area === "") return toast.warn("Enter the area");
    if (data.country === "") return toast.warn("Enter the country");
    if (data.state === "") return toast.warn("Enter the state");
    if (data.city === "") return toast.warn("Enter the city");
    if (data.pin_code === "") return toast.warn("Enter the pin code");
    if (data.bank_name === "") return toast.warn("Enter the bank name");
    if (data.account_number === "")
      return toast.warn("Enter the bank account number");
    if (data.branch === "") return toast.warn("Enter the branch");
    if (data.Ifsc === "") return toast.warn("Enter the bank Ifsc");

    createCustomerFn({
      formData: JSON.stringify(data),
      setloding,
      navigate,
      link: message === "save" ? "/contacts" : "/contact/create-contact",
      clearForm,
    });
  }
  const Cuntry = () => {
    axios
      .get(`https://mrpb1.aaragroups.com/country_data/`, {
        headers: {
          authorization: "",
        },
      })
      .then((response) => {
        setCuntry(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Cuntry();
  }, []);
  const State = () => {
    axios
      .get(`https://mrpb1.aaragroups.com/state_data/?country_id=${cuntryId}`, {
        headers: {
          authorization: "",
        },
      })
      .then((response) => {
        setState(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    cuntryId && State();
  }, [cuntryId]);
  const City = () => {
    axios
      .get(`https://mrpb1.aaragroups.com/city_data/?state_id=${stateId}`, {
        headers: {
          authorization: "",
        },
      })
      .then((response) => {
        setCity(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    stateId && City();
  }, [stateId]);

  const SplyPlace = () => {
    axiosInstance
      .get(`place-of-supply-list/`)
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
  const customerMoreInformationData = [
    "Other Details",
    "Address",
    "Bank Details",
    "Social Media",
  ];

  if (loding) return <Loding />;
  return (
    <>
      <div className="w-full h-full overflow-auto flex gap-2">
        <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
          <p className=" pt-2 text-2xl font-poppins font-bold ">
            Create Customer :
          </p>
          <form className="flex flex-col justify-evenly ">
            <div className="grid grid-cols-3 gap-5 mt-10">
              <TextField
                required
                id="outlined-required"
                label="Company Name"
                placeholder="Aara Groups"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.company_name}
                name="company_name"
                onChange={handleInputChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Tax ID/VAT Number"
                placeholder="123456789012"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.tax_vat}
                name="tax_vat"
                onChange={handleInputChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone Number"
                placeholder="0000-000-000"
                InputLabelProps={{
                  shrink: true,
                }}
                name="customer_mobile"
                onChange={handleInputChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Email Address"
                placeholder="abc@gmail.com"
                InputLabelProps={{
                  shrink: true,
                }}
                name="customer_email"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-3 pt-10 ">
              {customerMoreInformationData.map((singleData, index) => {
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
                    id="outlined-required"
                    label="Customer Name"
                    placeholder="ABC"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.customer_name}
                    name="customer_name"
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    // onChange={(e) => setValue(e.target.value)}
                    label="Firm Status"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.firm_status}
                    name="firm_status"
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    value={data.customer_type}
                    select
                    label="Customer Type"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="customer_type"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    <MenuItem key={1} value="Retailer">
                      Retailer
                    </MenuItem>
                    <MenuItem key={2} value="Wholesaler">
                      Wholesaler
                    </MenuItem>
                    <MenuItem key={2} value="Distributor">
                      Distributor
                    </MenuItem>
                  </TextField>

                  <TextField
                    value={data.buiness_type}
                    select
                    label="Business Type"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="buiness_type"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    {businessData.map((item) => {
                      return (
                        <MenuItem key={2} value={item?.name}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>

                  <TextField
                    value={data.gst_category}
                    select
                    label="GST Category"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="gst_category"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    <MenuItem key={1} value="sgst">
                      SGST
                    </MenuItem>
                    <MenuItem key={2} value="cgst">
                      CGST
                    </MenuItem>
                  </TextField>

                  <TextField
                    value={data.place_of_supply}
                    select
                    label="Place Of Supply"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="place_of_supply"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    {splyPlace.map((item) => {
                      return (
                        <MenuItem key={1} value={item?.purchase_of_supply}>
                          {item?.purchase_of_supply}
                        </MenuItem>
                      );
                    })}
                  </TextField>

                  <TextField
                    required
                    id="outlined-required"
                    label="GST Number"
                    type="text"
                    placeholder="27ABCDE1234F1Z5"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.gst_number}
                    name="gst_number"
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="outlined-required"
                    label="PAN"
                    type="text"
                    placeholder="Enter PAN Number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.pan_number}
                    name="pan_number"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* // address */}
              {item === 1 && (
                <div className="grid grid-cols-3 gap-2 pt-7">
                  <TextField
                    id="outlined-required"
                    label="Address"
                    placeholder="Enter Address here"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.address}
                    name="address"
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="outlined-required"
                    label="Area"
                    placeholder="Enter Area"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.area}
                    name="area"
                    onChange={handleInputChange}
                  />

                  <TextField
                    value={data.country}
                    select
                    label="Select Country"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="country"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    {cuntry?.map((item) => {
                      return (
                        <MenuItem
                          onClick={() => setCuntryId(item.id)}
                          value={item?.country}
                        >
                          {item?.country}
                        </MenuItem>
                      );
                    })}
                  </TextField>

                  <TextField
                    value={data.state}
                    select
                    label="Select State"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="state"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    {" "}
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
                    value={data.city}
                    select
                    label="Select City"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="city"
                    onChange={(e) => {
                      handleInputChange(e);
                      setValue(e.target.value);
                    }}
                  >
                    {city.map((item) => {
                      return <MenuItem value={item.city}>{item.city}</MenuItem>;
                    })}
                  </TextField>

                  <TextField
                    id="outlined-required"
                    label="Pin Code"
                    type="number"
                    placeholder="Enter PIN Code here"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.pin_code}
                    name="pin_code"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* Bank Details */}
              {item === 2 && (
                <div className="grid grid-cols-3 gap-2 pt-7">
                  <TextField
                    required
                    id="outlined-required"
                    label="Bank Name"
                    placeholder="Enter Bank Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.bank_name}
                    name="bank_name"
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Account Number"
                    type="number"
                    placeholder="Enter Account Number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.account_number}
                    name="account_number"
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Branch"
                    placeholder="Enter Branch"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.branch}
                    name="branch"
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="IFSC Code"
                    placeholder="Enter IFSC Code"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.Ifsc}
                    name="Ifsc"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* Social Media */}
              {item === 3 && (
                <div className="grid grid-cols-3 gap-2 pt-7">
                  <TextField
                    id="outlined-required"
                    label="Facebook"
                    placeholder="Enter Facebook Id"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.facebook}
                    name="facebook"
                    onChange={handleInputChange}
                  />

                  <TextField
                    id="outlined-required"
                    label="Twitter"
                    placeholder="Enter Twitter"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.twitter}
                    name="twitter"
                    onChange={handleInputChange}
                  />

                  <TextField
                    id="outlined-required"
                    label="Skype"
                    placeholder="Enter Skype"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.skype}
                    name="skype"
                    onChange={handleInputChange}
                  />

                  <TextField
                    id="outlined-required"
                    label="Fax"
                    type="number"
                    placeholder="Enter Fax"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.fax}
                    name="fax"
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </form>

          <div className="w-full flex  gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2">
            <button
              onClick={() => clearForm()}
              className="text-purple-700 px-3 py-2 bg-white rounded-lg"
            >
              Clear
            </button>

            <button
              onClick={() => saveFunctionCalled("save")}
              className="text-purple-700 px-3 py-2 bg-white rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => saveFunctionCalled("save_and_new")}
              className="text-purple-700  px-3 py-2 bg-white rounded-lg"
            >
              Save and New
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCustomer;
