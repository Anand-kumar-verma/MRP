import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import bg from "../../Assets/bg.png";
// import logo from "../../Assets/capture.jpg";
import bg from "../../../Assets/bg.png";
import logo from "../../../Assets/capture.jpg";
import { CircleOutlined, Email, Lock, NoEncryption } from "@mui/icons-material";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { empLoginFn } from "../../../Services/Login/EmpLogin";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import classNames from "classnames";

const EmpLogin = () => {
  const isLogined = localStorage.getItem("erp_token");
  const [showPassword, setShowPassword] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(formik.values);
      const reqBody = {
        email: formik?.values.email,
        password: formik?.values.password,
      };
      employeeLogin(reqBody);
    },
  });
  const { mutate: employeeLogin, isLoading } = useMutation(empLoginFn, {
    onSuccess: (response) => {
      console.log(response);
      if (response?.data?.response_code === 201) {
        toast.error(response?.data?.message);
        return;
      }
      if (response?.data?.response_code === 200) {
        localStorage.setItem("erp_employee_id", response?.data?.data?.emp_id);
        localStorage.setItem("erp_response", JSON.stringify(response?.data));
        localStorage.setItem("erp_token", response?.data?.data?.token);
        localStorage.setItem("erp_company", response?.data?.data?.company);
        localStorage.setItem("role", response?.data?.data?.role);
        localStorage.setItem("role_user", response?.data?.data?.designation);
        localStorage.setItem("erp_designation", response?.data?.designation);
        if (response?.data?.role !== "Company Admin") {
          navigate("/task-list");
        } else {
          navigate("/dashboard");
        }
      } else {
        // toast("Something went Wrong");
      }
    },
  });

  useEffect(() => {
    isLogined && navigate("/task-list");
  }, [isLogined]);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="flex w-screen relative">
        <img src={bg} className="w-full h-screen object-fill absolute" alt="" />
        <div className="absolute h-screen bg-red w-[38%] left-0 top-0  text-white flex items-center justify-center">
          <p className="text-[10rem] font-bold pt-[3%] font-poppins">MRP</p>
        </div>

        <div className="flex justify-end  h-screen w-[40%] absolute right-0 top-0 overflow-auto z-20 shadow-">
          <div className="w-full flex flex-col items-center  gap-1  h-full">
            <form
              className="flex flex-col  items-center rounded-2xl w-full h-[80%] justify-evenly"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-5 items-center">
                <img className="Capture w-[25rem] pt-20" src={logo} alt="" />

                <p className="text-lg hover:underline text-gray-500">
                  Login into your account
                </p>
              </div>
              <div className="w-[70%] ">
                <label className="text-gray-500">Email Id:</label>
                <br />
                <div className="flex items-center">
                  <TextField
                    size="small"
                    type="text"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="w-[70%] ">
                <label className="text-gray-500">Password:</label>
                <br />
                <div className="flex items-center">
                  <TextField
                    size="small"
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter your password here"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {showPassword ? (
                            <NoEncryption onClick={handleClickShowPassword} />
                          ) : (
                            <Lock onClick={handleClickShowPassword} />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    // className="w-full h-14 focus:outline-none bg-[#E8F0FE] rounded-l-lg px-3 py-2 border border-r-0 border-t-0 border-l-0 tracking-wider"
                  />
                </div>

                <div className="w-full flex justify-end hover:text-blue-800 cursor-pointer ">
                  <p className="text-sm font-poppins">Forgot Password?</p>
                </div>
              </div>

              <div className=" w-[70%]">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{
                    background: "#1E2772",
                    ":hover": { background: "#1E2772", opacity: ".8" },
                  }}
                  fullWidth
                >
                  {isLoading ? (
                    <CircularProgress variant="determinate" value={progress} />
                  ) : (
                    "Login now"
                  )}
                </Button>
              </div>
            </form>

            {/* <div className=" w-[70%]">
              <button
                onClick={() => navigate("/signup")}
                size="large"
                className="w-full cursor-pointer !border-2 text-[#1E2772]  border-[#1E2772] !rounded-lg !px-10 py-2 !bg-white bg-opacity-50 hover:bg-opacity-80"
              >
                Signup Now
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpLogin;
