import { MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Cuntry } from "../../../Shared/CountryList";
import { State } from "../../../Shared/StateList";
import { City } from "../../../Shared/CityList";
import { addEmployee } from "../../../Services/Project/Employee/AddEmployee";
import { useMutation, useQuery } from "react-query";
import Loding from "../../../Loding";
import { projectRole } from "../../../Services/Project/Employee/AddEmployee/projectRole";
import axiosInstance from "../../../Config/axios";
import { baseUrl } from "../../../URls";
import { API_URLS } from "../../../Config/apiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateWorkers = () => {
  const [loding, setloding] = useState(false);
  const [value, setValue] = useState("address");
  const [cuntryId, setCuntryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cuntry, setCuntry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
 const navigate = useNavigate()
 
  const [designationList, setdesignationList] = useState([]);
  const initialValues = {
    f_name: "",
    l_name: "",
    email: "",
    role: "",
    designation: "",
    cost_per_operation: "",
    mobile: "",
    address: "",
    area: "",
    country: "",
    state: "",
    city: "",
    pin_code: "",
    bank_name: "",
    account_number: "",
    branch: "",
    ifsc: "",
    facebook: "",
    twitter: "",
    skype: "",
    fax: "",
    pan: "",
  };

  const { mutate: employee } = useMutation(addEmployee, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        navigate("/workers");
      }
      toast.success(response.data.message);
    },
  });
  
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    onSubmit: (values) => {
      const reqBody = {
        first_name: formik.values.f_name,
        last_name: formik.values.l_name,
        email: formik.values.email,
        role_id: formik.values.role,
        designation_id: formik.values.designation,
        current_cost_per_hours: formik.values.cost_per_operation,
        mobile: formik.values.mobile,
        street: formik.values.address,
        area: formik.values.area,
        country: formik.values.country,
        state: formik.values.state,
        city: formik.values.city,
        pincode: formik.values.pin_code,
        bank_name: formik.values.bank_name,
        account_number: formik.values.account_number,
        branch: formik.values.branch,
        ifsc: formik.values.ifsc,
        facebook: formik.values.facebook,
        twitter: formik.values.twitter,
        skype: formik.values.skype,
        fax: formik.values.fax,
        pan: formik.values.pan,
      };
      // console.log(formik.values);
      employee(reqBody);
    },
  });

  const { data: getRole } = useQuery(["role"], () => projectRole(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function getDesignation(id) {
    console.log(`${baseUrl}${API_URLS.designation}?role_id=${id}`);
    axiosInstance
      .get(`${API_URLS.designation}?role_id=${id}`)
      .then((res) => setdesignationList(res.data.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    formik.values.role && getDesignation(Number(formik.values.role));
  }, [formik.values.role]);

  console.log(designationList, "employee list");

  useEffect(() => {
    Cuntry({ setCuntry, setloding });
  }, []);

  useEffect(() => {
    cuntryId && State({ setState, cuntryId, setloding });
  }, [cuntryId]);

  useEffect(() => {
    stateId && City({ setCity, cuntryId, stateId, setloding });
  }, [stateId]);

  console.log(loding);

  if (loding) return <Loding />;
  return (
    <div className="mt-5 p-4 rounded-lg h-full w-full bg-white">
      <form onSubmit={formik.handleSubmit}>
        <div className="h-full">
          <div className="grid grid-cols-3 gap-10">
            <TextField
            required
              id="f_name"
              name="f_name"
              label="First Name"
              placeholder="Enter First Name"
              variant="outlined"
              value={formik.values.f_name}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="l_name"
              name="l_name"
              label="Last Name"
              placeholder="Enter Last Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.l_name}
              onChange={formik.handleChange}
            />
            <TextField
            required
              id="email"
              name="email"
              label="Email"
              placeholder="Enter Email"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <TextField
            required
              id="role"
              name="role"
              label="Role"
              variant="outlined"
              select
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              {getRole?.data?.data.map((i, index) => {
                return (
                  <MenuItem value={i.id} key={index} className="!capitalize">
                    {i?.name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
            required
              id="designation"
              select
              name="designation"
              label="Designation"
              placeholder="Enter Designation"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.designation}
              onChange={formik.handleChange}
            >
              {designationList?.map((i) => {
                return (
                  <MenuItem value={i.id} className="!capitalize">
                    {i?.designation}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
            required
              id="cost_per_operation"
              name="cost_per_operation"
              label="Cost Per Hours"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.cost_per_operation}
              onChange={formik.handleChange}
            />
            <TextField
            required
              id="mobile"
              name="mobile"
              label="Mobile No"
              variant="outlined"
              type="number"
              placeholder="0000-000-000"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />
            <TextField
              id="pan"
              name="pan"
              label="PAN No"
              variant="outlined"
              type="text"
              placeholder="0000-000-000"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.pan}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex gap-5  p-4 bg-purple-300 mt-2">
            <p
              onClick={() => setValue("address")}
              className={`${
                value === "address" && "text-blue-700 border-b-2"
              } cursor-pointer`}
            >
              Address
            </p>
            <p
              onClick={() => setValue("bank_details")}
              className={`${
                value === "bank_details" && "text-blue-700 border-b-2"
              } cursor-pointer`}
            >
              Bank Details
            </p>
            <p
              onClick={() => setValue("social_media")}
              className={`${
                value === "social_media" && "text-blue-700 border-b-2"
              } cursor-pointer`}
            >
              Social Media
            </p>
          </div>
          {value === "address" && (
            <>
              <div className="grid grid-cols-3 gap-5 pt-7">
                <TextField
                required
                  id="address"
                  label="Address"
                  placeholder="Enter Address here"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <TextField
                required
                  id="area"
                  label="Area"
                  placeholder="Enter Area"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="area"
                  value={formik.values.area}
                  onChange={formik.handleChange}
                />

                <TextField
                required
                  select
                  id="country"
                  label="Select Country"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="text-black"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                >
                  {cuntry?.map((item) => {
                    return (
                      <MenuItem
                        className="text-black"
                        onClick={() => setCuntryId(item.id)}
                        value={item?.name}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </TextField>

                <TextField
                required
                  select
                  id="state"
                  label="Select State"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
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
                required
                  select
                  id="city"
                  label="Select City"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                >
                  {city.map((item) => {
                    return <MenuItem value={item.city}>{item.city}</MenuItem>;
                  })}
                </TextField>

                <TextField
                required
                  id="pin_code"
                  label="Pin Code"
                  type="number"
                  placeholder="Enter PIN Code here"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="pin_code"
                  value={formik.values.pin_code}
                  onChange={formik.handleChange}
                />
              </div>
            </>
          )}
          {value === "bank_details" && (
            <>
              <div className="grid grid-cols-3 gap-5 pt-7">
                <TextField
                  
                  id="bank_name"
                  label="Bank Name"
                  placeholder="Enter Bank Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="bank_name"
                  value={formik.values.bank_name}
                  onChange={formik.handleChange}
                />

                <TextField
                  
                  id="account_number"
                  label="Account Number"
                  type="number"
                  placeholder="Enter Account Number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="account_number"
                  value={formik.values.account_number}
                  onChange={formik.handleChange}
                />

                <TextField
                  
                  id="branch"
                  label="Branch"
                  placeholder="Enter Branch"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="branch"
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                />

                <TextField
                  
                  id="ifsc"
                  label="IFSC Code"
                  placeholder="Enter IFSC Code"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="ifsc"
                  value={formik.values.ifsc}
                  onChange={formik.handleChange}
                />
              </div>
            </>
          )}
          {value === "social_media" && (
            <>
              <div className="grid grid-cols-3 gap-5 pt-7">
                <TextField
                  id="facebook"
                  label="Facebook"
                  placeholder="Enter Facebook Id"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="facebook"
                  value={formik.values.facebook}
                  onChange={formik.handleChange}
                />

                <TextField
                  id="twitter"
                  label="Twitter"
                  placeholder="Enter Twitter"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="twitter"
                  value={formik.values.twitter}
                  onChange={formik.handleChange}
                />

                <TextField
                  id="skype"
                  label="Skype"
                  placeholder="Enter Skype"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="skype"
                  value={formik.values.skype}
                  onChange={formik.handleChange}
                />

                <TextField
                  id="fax"
                  label="Fax"
                  type="number"
                  placeholder="Enter Fax"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="fax"
                  value={formik.values.fax}
                  onChange={formik.handleChange}
                />
              </div>
            </>
          )}
        </div>

        <button className="p-4 bg-purple-500 text-white rounded flex justify-end gap-10 mt-5 w-full">
          <span className=" bg-white px-5 py-2 text-black rounded-lg cursor-pointer">
            Save
          </span>
        </button>
      </form>
    </div>
  );
};

export default CreateWorkers;
