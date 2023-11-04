import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Config/axios";
import MuiSelect from "../../Shared/MuiSelect";
import Slide from "../../Assets/loginImage.png";
import logo1 from "../../Assets/capture.jpg";
import { Cuntry } from "../../Shared/CountryList";
import { State } from "../../Shared/StateList";
import { City } from "../../Shared/CityList";

const CompanyCreation = () => {
  const [logo, setLogo] = useState("");
  const [cuntryId, setCuntryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cuntry, setCuntry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [buinessData, setBusinessData] = useState([]);
  const navigate = useNavigate();

  
  const initialValue1 = {
    name: "",
    business_legal_name: "",
    business_trade_name: "",
    mobile: "",
    index: "",
    company_email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    buisness_type: "",
  };

  const formik = useFormik({
    initialValues: initialValue1,

    onSubmit: (values, { resetForm }, action) => {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("buisness_type", values.buisness_type);
      fd.append("business_legal_name", values.business_legal_name);
      fd.append("business_trade_name", values.business_trade_name);
      fd.append("mobile", values.mobile);
      fd.append("company_email", values.company_email);
      fd.append("address", values.address);
      fd.append("country", values.country);
      fd.append("state", values.state);
      fd.append("city", values.city);
      fd.append("pincode", values.pincode);
      fd.append("logo", logo);
      fd.append("user_id", localStorage.getItem("erm_user_id"));



      axios
        .post(`https://mrpb1.aaragroups.com/create-company/`, fd, {
          headers: {
            authorization: localStorage.getItem("token1"),
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          response.data.message === "Company created successfully." &&
            navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  
  useEffect(() => {
    Cuntry({setCuntry});
  }, []);

  useEffect(() => {
    cuntryId && State({setState,cuntryId});
  }, [cuntryId]);

  useEffect(() => {
    stateId && City({setCity,cuntryId,stateId});
  }, [stateId]);


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
  return (
    <>
      <div className="flex w-screen relative">
        <img
          src={Slide}
          className="w-full h-screen object-fill absolute"
          alt=""
        />
        <div className="flex justify-end  h-screen w-[40%] absolute right-0 top-0 overflow-auto z-20 shadow-">
          <div className="w-full flex  justify-evenly h-full">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5 items-center">
                <img className="Capture w-[25rem] pt-5" src={logo1} alt="" />

                <p className="text-xl font-bold thover:underline text-black">
                  Create Company
                </p>
              </div>
              <div className=" flex flex-col cursor-pointer my-5 ">
                <TextField
                  className="!my-2"
                  type="text"
                  label="Name"
                  variant="outlined"
                  id="name"
                  name="name"
                  value={formik.values["name"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  size="small"
                />
                <TextField
                  className="!my-2"
                  id="business_legal_name"
                  name="business_legal_name"
                  value={formik.values["business_legal_name"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  label="Business legal Name"
                  variant="outlined"
                  type="text"
                  size="small"
                />

                <TextField
                  className="!my-2"
                  id="business_trade_name"
                  name="business_trade_name"
                  value={formik.values["business_trade_name"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  label="Business Trade Name"
                  variant="outlined"
                  type="text"
                  size="small"
                />
                <MuiSelect
                  className="!my-2"
                  placeholder="Buisness Type"
                  id="buisness_type"
                  name="buisness_type"
                  value={formik.values.buisness_type || ""}
                  onChange={formik.handleChange}
                >
                  {buinessData?.map((customer) => {
                    return (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    );
                  })}
                </MuiSelect>
                <TextField
                  className="!my-2"
                  id="mobile"
                  name="mobile"
                  value={formik.values["mobile"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  type="Number"
                  label="Mobile"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  className="!my-2"
                  id="company_email"
                  name="company_email"
                  value={formik.values["company_email"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  type="email"
                  label="Company Email"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  className="!my-2"
                  id="address"
                  name="address"
                  value={formik.values["address"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  label="Address"
                  type="text"
                  variant="outlined"
                  size="small"
                />
                <MuiSelect
                  className="!my-2"
                  placeholder="country"
                  id="country"
                  name="country"
                  value={formik.values.country || ""}
                  onChange={formik.handleChange}
                >
                  {cuntry?.map((customer) => {
                    return (
                      <MenuItem
                        onClick={() => setCuntryId(customer.id)}
                        key={customer.id}
                        value={customer.name}
                      >
                        {customer.name}
                      </MenuItem>
                    );
                  })}
                </MuiSelect>
                <MuiSelect
                  className="!my-2"
                  placeholder="state"
                  id="state"
                  name="state"
                  value={formik.values.state || ""}
                  onChange={formik.handleChange}
                >
                  {state?.map((customer) => {
                    return (
                      <MenuItem
                        onClick={() => setStateId(customer.id)}
                        key={customer.id}
                        value={customer.state}
                      >
                        {customer.state}
                      </MenuItem>
                    );
                  })}
                </MuiSelect>
                <MuiSelect
                  className="!my-2"
                  placeholder="city"
                  id="city"
                  name="city"
                  value={formik.values.city || ""}
                  onChange={formik.handleChange}
                >
                  {city?.map((customer) => {
                    return (
                      <MenuItem key={customer.id} value={customer.city}>
                        {customer.city}
                      </MenuItem>
                    );
                  })}
                </MuiSelect>

                <TextField
                  className="!my-2"
                  id="pincode"
                  name="pincode"
                  value={formik.values["pincode"]}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  label="Pincode"
                  type="number"
                  variant="outlined"
                  size="small"
                />
                <input
                  onChange={(e) => setLogo(e.target.files[0])}
                  id="logo"
                  label="logo"
                  type="file"
                  variant="outlined"
                />
                <Button
                  color="success"
                  className="!my-3 !py-2 !px-3 !bg-green-500 !text-white !text-xl"
                  type={"submit"}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCreation;
