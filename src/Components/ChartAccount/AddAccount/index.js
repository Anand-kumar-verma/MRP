import { Box, MenuItem, Modal, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import CustomSelect from "../../../Shared/CustomSelect";
import CustomInput from "../../../Shared/CustomInput";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
import { get_account } from "../../../Services/Account";
import axiosInstance from "../../../Config/axios";
const AddAccount = ({ setdummy }) => {
  const [open, setOpen] = useState(false);
  // const [selectName, setSelectName] = useState("none");
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    AccountData();
  };
  const [value1, setvalue1] = useState("None");
  const [idAcount, setIdAcount] = useState();
  const [data, setData] = useState([]);

  const initialValues = {
    account_type: "",
    account_name: "",
    account_code: "",
    description: "",
  };

  const AccountData = () => {
    axiosInstance
      .get(`ac/charts_account_group/`)
      .then((response) => {
        setData(response.data.account_data);
        // response.data.status === 200 && handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values, action) => {
      const reqBody = {
        id: idAcount,
        account_type: values.account_type,
        account_name: values.account_name,
        account_code: values.account_code,
        description: values.description,
      };
      axiosInstance
        .post(`ac/charts_account_group/`, reqBody)
        .then((response) => {
          toast.success(response.data.msg);
          if (response.data.status === 200) {
            handleClose();
            setdummy(response);
          }

          // response.data.status === 200 && get_account();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Button onClick={handleOpen} className="mx-2 !px-5">
        <p
          component="th"
          scope="row"
          className=" bg-purple-500 rounded-lg px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg"
        >
          <span className="text-white text-sm">Add</span>
          <span className="text-[1rem]">
            <IoIosAddCircle className="!text-white" />
          </span>
        </p>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 bg-white outline-none -translate-x-1/2 -translate-y-1/2 w-1/3 shadow-md p-6 rounded-xl">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full mx-auto gap-2"
          >
            <p className="text-2xl font-semibold text-center my-5">
              Create Account
            </p>
            <p>Account Type</p>
            <Select
              name="account_type"
              id="account_type"
              // defaultValue={value1}

              // className="!w-32"
            >
              {data.map((i) => {
                return (
                  <MenuItem value={i.head}>
                    <div>
                      <p className="font-bold text-sm">{i.head}</p>
                      {i.groups.map((i) => {
                        return (
                          <p
                            onClick={() => {
                              setIdAcount(i.id);
                              setvalue1(i?.group_name);
                            }}
                            className="pl-10 hover:bg-green-100"
                          >
                            {i.group_name}
                          </p>
                        );
                      })}
                    </div>
                  </MenuItem>
                );
              })}
            </Select>

            <div className="flex justify-between">
              <CustomInput
                formik={formik}
                type="text"
                className="w-full"
                label="Account Name"
                name="account_name"
                id="account_name"
                value={formik.values["account_name"]}
                onChange={formik.handleChange}
              />
              <CustomInput
                formik={formik}
                type="text"
                className="w-full"
                label="Account Code"
                name="account_code"
                id="account_code"
                value={formik.values["account_code"]}
                onChange={formik.handleChange}
              />
            </div>

            <CustomInput
              formik={formik}
              type="text"
              name="description"
              id="description"
              value={formik.values["description"]}
              onChange={formik.handleChange}
              className="w-full"
              label="Description"
            />

            <Button
              variant="contained"
              className="!mx-auto px-4 w-full !my-7 !p-2"
              type="submit"
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddAccount;
