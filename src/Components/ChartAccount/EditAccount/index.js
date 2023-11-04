import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import CustomInput from "../../../Shared/CustomInput";
import { get_account } from "../../../Services/Account";
import axiosInstance from "../../../Config/axios";

const EditAccount = ({ setdummy, id, AccName, AccCode, description }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    AccountData();
  };
  const [data, setData] = useState([]);
  const [value, setvalue] = useState("None");
  const [idAcount, setIdAcount] = useState();

  const initialValues = {
    account_type: "None",
    account_name: AccName,
    account_code: AccCode,
    description: description,
  };

  const AccountData = () => {
    axiosInstance
      .get(`ac/charts_account_group/`)
      .then((response) => {
        setData(response.data.account_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values, action) => {
      const reqBody = {
        account_id: id,
        id: idAcount,
        account_type: values.account_type,
        account_name: values.account_name,
        account_code: values.account_code,
        description: values.description,
      };
      axiosInstance
        .put(`ac/charts_account_group/`, reqBody)
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
      action.resetForm();
    },
  });
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          // component={GlassDiv}
          className="absolute top-1/2 left-1/2 bg-white outline-none -translate-x-1/2 -translate-y-1/2 w-1/3 shadow-md p-6 rounded-xl"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full mx-auto gap-2"
          >
            <p className="text-2xl font-semibold text-center my-5">
              Edit Account
            </p>
            <p>Account Type</p>
            <Select
              name="account_type"
              id="account_type"
              // value={value}

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
                              setvalue(i?.group_name);
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

            <Button className="!mx-auto px-4 w-full !my-7 !p-2" type="submit">
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditAccount;
