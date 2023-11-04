import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { projectRole } from "../../../../Services/Project/Employee/AddEmployee/projectRole";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";
import { addMembersFun } from "../../../../Services/ProjectTracking/AddMember";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddMember = ({ project_id, setOpenCustomDialogBox }) => {
  // console.log(project_id)
  const [designationList, setdesignationList] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const client = useQueryClient();
  console.log(personName);

  const initialValue = {
    role: "",
    designation: "",
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      const reqBody = {
        project_id: project_id || "",
        employees: personName || [],
        action: "Add",
      };

      addMember(reqBody);
      console.log(formik.values);
    },
  });

  const { mutate: addMember } = useMutation(addMembersFun, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        // navigate("/project-planning");
        setOpenCustomDialogBox(false);
      }
      toast.success(response.data.message);
      client.refetchQueries("getmemberlist");
    },
  });

  const { data: getRole } = useQuery(["role"], () => projectRole(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function getDesignation(id) {
    axiosInstance
      .get(`${API_URLS.designation}?role_id=${id}`)
      .then((res) => setdesignationList(res.data.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    formik.values.role && getDesignation(Number(formik.values.role));
  }, [formik.values.role]);

  // console.log(designationList)

  function getEmployee(id) {
    axiosInstance
      .get(`${API_URLS.employee_list}?designation_id=${id}`)
      .then((res) => setemployeeList(res.data.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    formik.values.designation && getEmployee(Number(formik.values.designation));
  }, [formik.values.designation]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(employeeList);
  return (
    <div className="mt-5 ">
      <div className="grid grid-cols-2 gap-5">
        <TextField
          select
          className="!w-[200px]"
          id="role"
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          {getRole?.data?.data?.map((i) => {
            return <MenuItem value={i.id}>{i?.name}</MenuItem>;
          })}
        </TextField>
        <TextField
          select
          className="!w-[200px]"
          id="designation"
          label="Designation"
          name="designation"
          value={formik.values.designation}
          onChange={formik.handleChange}
        >
          {designationList?.map((i) => {
            return <MenuItem value={i.id}>{i?.designation}</MenuItem>;
          })}
        </TextField>

        <FormControl className="!mt-8 !col-span-2">
          <InputLabel id="demo-multiple-checkbox-label" size="small">
            Select Employee
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            label="Select Employee"
            variant="standard"
            size="large"
            className="!bg-gray-200 !text-black !opacity-50"
            value={personName}
            onChange={handleChange1}
            input={<OutlinedInput label="Tag" />}
            // renderValue={(selected) => selected.join(", ")}
            renderValue={(selected) => {
              const selectedNames = employeeList
                .filter((skill) => selected.includes(skill.emp_id))
                .map((skill) => skill.email);
              return selectedNames.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {employeeList?.map((name, index) => (
              <MenuItem key={name} value={name?.emp_id}>
                <Checkbox checked={personName.indexOf(name?.emp_id) > -1} />
                <ListItemText
                  primary={`${name?.email} | Cost/Hrs: ${name?.current_cost_per_hours}`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="mt-5  flex justify-center col-span-2">
          <span
            className="text-white px-5 py-2 bg-green-500 rounded-full cursor-pointer"
            onClick={formik.handleSubmit}
          >
            Add Member
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
