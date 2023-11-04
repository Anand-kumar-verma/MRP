import { Divider, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { projectRole } from "../../../../Services/Project/Employee/AddEmployee/projectRole";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addDesignation } from "../../../../Services/Designation";
import { toast } from "react-toastify";
const CreateDesignation = ({setOpenCustomDialogBox}) => {

 const client = useQueryClient()
  const initialValue = {
    role_id: "",
    desgination: [],
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
        const designation_list = formik?.values?.desgination?.map((i)=>{
            return i?.disgnation_name;
        })
       
        const reqbody = {
            role_id : formik.values.role_id,
            designation_name: designation_list
        }

        planProject(reqbody)
    },
  });

  const { mutate: planProject,isLoading } = useMutation(addDesignation, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        setOpenCustomDialogBox(false)
        client.refetchQueries("designation")
      }
      toast.success(response.data.message);
    },
  });

  const handleAddRowForMaterial = () => {
    const newRow = {
      id: formik.values.desgination.length + 1,
      disgnation_name: "",
    };

    formik.setFieldValue("desgination", [...formik.values.desgination, newRow]);
  };

  const handleFieldChangeForMaterial = (rowId, field, value) => {
    formik.setFieldValue(
      "desgination",
      formik.values.desgination.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    handleAddRowForMaterial();
  }, []);

  const { data: getRole } = useQuery(["role"], () => projectRole(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div>
        <p className="bg-purple-500 p-2 mt-5 text-white rounded-lg">
          Add Designation:
        </p>

        <Divider className="pt-5" />
        <div className="flex flex-col gap-3 mt-2 px-2">
          <TextField
            required
            id="role_id"
            name="role_id"
            label="Role"
            variant="outlined"
            select
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.role_id}
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

          {formik.values.desgination.map((row) => (
            <div className="w-full grid grid-cols-8 gap-3 place-items-center" key={row.id}>
              <TextField
                className={`${formik.values.desgination.length > 1 ? "!col-span-7" : "!col-span-8"}`}
                required
                id="disgnation_name"
                name="disgnation_name"
                placeholder="Enter Disgnation"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.cost}
                onChange={(e) =>
                  handleFieldChangeForMaterial(
                    row.id,
                    "disgnation_name",
                    e.target.value
                  )
                }
              />
              {formik.values.desgination.length > 1 && (
                <div
                  className="text-2xl text-red-900 ml-[20%] "
                  onClick={() =>
                    formik.setFieldValue(
                      "desgination",
                      formik.values.desgination?.filter((i) => i?.id !== row.id)
                    )
                  }
                >
                  <AiFillDelete className="!cursor-pointer" />
                </div>
              )}
            </div>
          ))}
        </div>
        {!formik?.values?.state && (
          <div className="mt-[5%] flex items-center">
            <span
              onClick={handleAddRowForMaterial}
              className="bg-green-500 px-5 py-2 rounded-full cursor-pointer"
            >
              Add New +
            </span>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
      <span
        onClick={formik.handleSubmit}
        className="bg-blue-500 px-5 py-2 rounded-full cursor-pointer"
      >
        SUBMIT
      </span>
      </div>
    </>
  );
};

export default CreateDesignation;
