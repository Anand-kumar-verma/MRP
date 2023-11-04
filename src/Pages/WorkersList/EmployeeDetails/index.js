import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { employeeDetailsFn } from "../../../Services/Project/Employee/EmployeeDetails";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { updateEmployeeDetailsFn } from "../../../Services/Project/Employee/UpdateEmployeeDetails";
import { projectRole } from "../../../Services/Project/Employee/AddEmployee/projectRole";
import { baseUrl } from "../../../URls";
import { API_URLS } from "../../../Config/apiUrls";
import axiosInstance from "../../../Config/axios";
import Loding from "../../../Loding";
import { City } from "../../../Shared/CityList";
import { State } from "../../../Shared/StateList";
import { Cuntry } from "../../../Shared/CountryList";
import { toast } from "react-toastify";
import { getPermission_along_with_user_id } from "../../../Services/PermissionList";
import { isPermission } from "../../../Services/PermissionList/BooleanFunctoinForPermissin";
import { permission_message } from "../../../Mock";

const EmployeeDetails = () => {
  const [loding, setloding] = useState(false);
  const [value, setValue] = useState("address");
  const [cuntryId, setCuntryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cuntry, setCuntry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const navigate = useNavigate();
  const [Permission, setPermissions] = React.useState([])
  const { empId } = useParams();
  const [userData, setuserData] = useState([]);
  const role_user = localStorage.getItem("role_user");

  const [designationList, setdesignationList] = useState([]);
  //     role_id: userData?.designation?.role?.id,
  //     designation_id: userData.designation?.designation?.id,
  const initialValues = {
    f_name: "",
    l_name: "",
    role_id: userData?.designation?.role?.id || "",
    designation_id: userData.designation?.id || "",
    name: userData.name || "",
    email: userData.email || "",
    role: userData?.designation?.role?.id || "",
    designation: userData.designation?.designation || "",
    cost_per_operation: userData.current_cost_per_hours || "",
    mobile: userData.mobile || "",
    address: userData?.address?.street || "",
    area: userData?.address?.area || "",
    country: userData?.address?.country || "",
    state: userData?.address?.state || "",
    city: userData?.address?.city || "",
    pin_code: userData?.address?.pincode || "",
    bank_name: userData?.banking_details?.bank_name || "",
    account_number: userData?.banking_details?.account_number || "",
    branch: userData?.banking_details?.branch || "",
    ifsc: userData?.banking_details?.ifsc || "",
    facebook: userData?.facebook || "",
    twitter: userData?.twitter || "",
    skype: userData?.skype || "",
    fax: userData?.fax || "",
    pan: userData.pan || "",
  };
  console.log(userData, "userData");
  const { data: employeeData } = useQuery(
    ["employeeDetails"],
    () => employeeDetailsFn({ emp_id: empId }),
    {
      onSuccess: (res) => {
        setuserData(res?.data?.data?.[0]);
      },

      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: updateEmployee } = useMutation(updateEmployeeDetailsFn, {
    onSuccess: (response) => {
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
        emp_id: empId,
        name: formik.values.name,
        // first_name: formik.values.f_name,
        // last_name: formik.values.l_name,
        email: formik.values.email,
        role_id: formik.values.role_id,
        designation_id: formik.values.designation_id,
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
      role_user === "Project Based" || isPermission(Permission, "change_employee") ? updateEmployee(reqBody) : toast.warn(permission_message);
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

  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])

  if (loding) return <Loding />;
  return (
    <div className="mt-5 p-4 rounded-lg h-full w-full bg-white">
      <form onSubmit={formik.handleSubmit}>
        <div className="h-full">
          <div className="grid grid-cols-3 gap-10">
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              placeholder="Enter Full Name"
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              required
              id="email"
              name="email"
              label="Email"
              placeholder="Enter Email"
              variant="standard"
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
              variant="standard"
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
              id="designation_id"
              select
              name="designation_id"
              label="Designation"
              placeholder="Enter Designation"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.designation_id}
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
              variant="standard"
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
              variant="standard"
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
              className={`${value === "address" && "text-blue-700 border-b-2"
                } cursor-pointer`}
            >
              Address
            </p>
            <p
              onClick={() => setValue("bank_details")}
              className={`${value === "bank_details" && "text-blue-700 border-b-2"
                } cursor-pointer`}
            >
              Bank Details
            </p>
            <p
              onClick={() => setValue("social_media")}
              className={`${value === "social_media" && "text-blue-700 border-b-2"
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
                  placeholder={formik.values.country}
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

                {!cuntryId ? (
                  <TextField
                    label="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                  />
                ) : (
                  <TextField
                    required
                    placeholder={formik.values.state}
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
                )}

                {!stateId ? (
                  <TextField label="city" value={formik.values.city} />
                ) : (
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
                )}

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

// const EmployeeDetails = () => {
//   const navigate = useNavigate();
//   const { empId } = useParams();
//   const [userData, setuserData] = useState([]);
//   const [designationList, setdesignationList] = useState([]);
//   const { data: employeeData } = useQuery(
//     ["employeeDetails"],
//     () => employeeDetailsFn({ emp_id: empId }),
//     {
//       onSuccess: (res) => {
//         setuserData(res?.data?.data?.[0]);
//       },

//       refetchOnReconnect: false,
//       refetchOnWindowFocus: false,
//     }
//   );
//   const { data: getRole } = useQuery(["role"], () => projectRole(), {
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     refetchOnWindowFocus: false,
//   });
//   function getDesignation(id) {
//     console.log(`${baseUrl}${API_URLS.designation}?role_id=${id}`);
//     axiosInstance
//       .get(`${API_URLS.designation}?role_id=${id}`)
//       .then((res) => setdesignationList(res.data.data))
//       .catch((e) => console.log(e));
//   }

//   const initiatValues = {
//     name: userData.name,
//     role: userData?.user_profile?.role?.[0]?.name,
//     mobile: userData.mobile,
//     pan: userData.pan,
//     designation: userData.designation?.designation,
//     email: userData.email,
//     current_cost_per_hours: userData.current_cost_per_hours,
//     area: userData?.address?.area,
//     city: userData?.address?.city,
//     country: userData?.address?.country,
//     state: userData?.address?.state,
//     pincode: userData?.address?.pincode,
//     street: userData?.address?.street,
//     role_id: userData?.designation?.role?.id,
//     designation_id: userData.designation?.designation?.id,
//   };

//   const { mutate } = useMutation(updateEmployeeDetailsFn, {
//     onSuccess: () => {
//       navigate("/workers");
//     },
//   });
//   const formik = useFormik({
//     initialValues: initiatValues,
//     enableReinitialize: true,
//     onSubmit: () => {
//       const fd = new FormData();
//       fd.append("emp_id", empId);
//       fd.append("name", formik.values.name);
//       fd.append("role_id", formik.values.role_id);
//       fd.append("mobile", formik.values.mobile);
//       fd.append("pan", formik.values.pan);
//       fd.append("designation_id", formik.values.designation_id);
//       fd.append("email", formik.values.email);
//       fd.append("current_cost_per_hours", formik.values.current_cost_per_hours);
//       fd.append("area", formik.values.area);
//       fd.append("city", formik.values.city);
//       fd.append("country", formik.values.country);
//       fd.append("state", formik.values.state);
//       fd.append("pincode", formik.values.pincode);
//       fd.append("street", formik.values.street);
//       mutate(fd);
//     },
//   });
//   console.log(userData);
//   useEffect(() => {
//     formik.values.role_id && getDesignation(Number(formik.values.role_id));
//   }, [formik.values.role_id]);
//   return (
//     <div className="h-full p-4 flex flex-col gap-2">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-start",
//           alignItems: "center",
//           background: "#f9f9f9",
//           borderRadius: "8px",
//         }}
//       >
//         <Avatar
//           alt="user image"
//           sx={{ height: "4rem", width: "4rem" }}
//           src={userData?.profile_pic}
//         />
//         <div style={{ marginTop: "2vh", marginLeft: "2vw" }}>
//           <p>{`Name:${userData.name ? userData.name : ""}`}</p>
//           <p>{`Role:${
//             userData.user_profile
//               ? userData?.user_profile?.role?.[0]?.name
//               : "---"
//           }`}</p>
//           <p>{`Company name:${
//             userData.user_profile
//               ? userData?.user_profile?.company?.name
//               : "---"
//           }`}</p>
//         </div>
//       </div>
//       <h4
//         style={{
//           background: "#dedfff",
//           borderRadius: "8px",
//           width: "100%",
//           textAlign: "center",
//         }}
//         className="bg-[#dedfff]"
//       >
//         Employee Details
//       </h4>
//       <form onSubmit={formik.handleSubmit}>
//         <div
//           style={{
//             marginTop: "12vh",
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "15px",
//             width: "100%",
//             // padding: "0px 8vh",
//           }}
//         >
//           <CustomTextField
//             name="name"
//             id="name"
//             onChange={formik.handleChange}
//             placeholder="Name"
//             value={`${formik.values.name}`}
//             color="secondary"
//             variant="standard"
//             label={"Name"}
//           />
//           <TextField
//             required
//             id="role_id"
//             name="role_id"
//             label="role"
//             variant="standard"
//             select
//             InputLabelProps={{
//               shrink: true,
//             }}
//             value={formik.values.role_id}
//             onChange={formik.handleChange}
//           >
//             {getRole?.data?.data.map((i, index) => {
//               return (
//                 <MenuItem value={i.id} key={index} className="!capitalize">
//                   {i?.name}
//                 </MenuItem>
//               );
//             })}
//           </TextField>
//           {/* <CustomTextField
//             name="role"
//             id="role"
//             onChange={formik.handleChange}
//             placeholder="Role"
//             value={`${formik.values?.role ? formik.values?.role : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"Role"}
//           /> */}
//           <CustomTextField
//             name="mobile"
//             id="mobile"
//             onChange={formik.handleChange}
//             placeholder="Mobile No."
//             value={`${formik.values.mobile ? formik.values.mobile : "Not Yet"}`}
//             color="secondary"
//             variant="standard"
//             label={"Mobile No."}
//             type="number"
//           />
//           <CustomTextField
//             name="pan"
//             id="pan"
//             onChange={formik.handleChange}
//             placeholder="PAN."
//             value={`${formik.values.pan ? formik.values.pan : "Not Yet"}`}
//             color="secondary"
//             variant="standard"
//             label={"PAN"}
//           />
//           {/* <CustomTextField
//             name="designation"
//             id="designation"
//             onChange={formik.handleChange}
//             placeholder="designation
//         "
//             value={`${
//               formik.values?.designation
//                 ? formik.values?.designation
//                 : "Not Yet"
//             }`}
//             color="secondary"
//             variant="standard"
//             label={"Designation"}
//           /> */}
//           <TextField
//             required
//             id="designation_id"
//             select
//             name="designation_id"
//             label="Designation"
//             placeholder="Enter Designation"
//             variant="standard"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             value={formik.values.designation_id}
//             onChange={formik.handleChange}
//           >
//             {designationList?.map((i) => {
//               return (
//                 <MenuItem value={i.id} className="!capitalize">
//                   {i?.designation}
//                 </MenuItem>
//               );
//             })}
//           </TextField>
//           <CustomTextField
//             name="email"
//             id="email"
//             type="email"
//             onChange={formik.handleChange}
//             placeholder="email"
//             value={`${formik.values.email ? formik.values.email : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"Email"}
//           />
//           <CustomTextField
//             name="current_cost_per_hours"
//             id="current_cost_per_hours"
//             onChange={formik.handleChange}
//             placeholder="current_cost_per_hours
//           "
//             value={`${
//               formik.values.current_cost_per_hours
//                 ? formik.values.current_cost_per_hours
//                 : "Not added"
//             }`}
//             color="secondary"
//             variant="standard"
//             label={"Current cost per hour"}
//           />
//           <CustomTextField
//             name="area"
//             id="area"
//             onChange={formik.handleChange}
//             placeholder="area"
//             value={`${formik.values?.area ? formik.values?.area : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"area"}
//           />
//           <CustomTextField
//             name="street"
//             id="street"
//             onChange={formik.handleChange}
//             placeholder="street"
//             value={`${formik?.values?.street ? formik.values?.street : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"street"}
//           />
//           <CustomTextField
//             name="city"
//             id="city"
//             onChange={formik.handleChange}
//             placeholder="city"
//             value={`${formik.values?.city ? formik.values?.city : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"city"}
//           />
//           <CustomTextField
//             name="state"
//             id="state"
//             onChange={formik.handleChange}
//             placeholder="State"
//             value={`${formik.values?.state ? formik.values?.state : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"State"}
//           />
//           <CustomTextField
//             name="country"
//             id="country"
//             onChange={formik.handleChange}
//             placeholder="country
//           "
//             value={`${formik.values?.country ? formik.values?.country : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"Country"}
//           />
//           <CustomTextField
//             name="pincode"
//             id="pincode"
//             onChange={formik.handleChange}
//             placeholder="pincode"
//             value={`${formik.values?.pincode ? formik.values?.pincode : ""}`}
//             color="secondary"
//             variant="standard"
//             label={"pincode"}
//             type="number"
//           />
//         </div>
//         <Button
//           variant="contained"
//           color="secondary"
//           type="submit"
//           sx={{ margin: "1rem" }}
//         >
//           Save Changes
//         </Button>
//       </form>
//     </div>
//   );
// };

export default EmployeeDetails;
