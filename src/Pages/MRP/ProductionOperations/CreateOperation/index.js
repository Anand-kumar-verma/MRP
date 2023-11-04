import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loding from "../../../../Loding";
import { createOperationsFn } from "../../../../Services/ProductionOperations/CreateOperation";
import { toast } from "react-toastify";
const CreateOperations = () => {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  //   console.log(rows)

  function saveFunctionCalled(message) {
    handleSubmit((data) => {
      if (data.name === "")
        return toast.warn("Please enter the operation name");
      if (data.description === "")
        return toast.warn("Please enter the description");

      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);

      createOperationsFn({
        formData: formData,
        setloding,
        navigate,
        link:
          message === "save"
            ? "/mrp/production-operations"
            : "/mrp/production-operation/create-production-operation",
        reset,
      });
    })();
  }

  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
            <p className=" pt-2 text-2xl font-poppins font-bold ">
              Create Operation:
            </p>
            <div className="h-full flex flex-col justify-between ">
              <form className="flex flex-col justify-evenly overflow-auto">
                <div className="grid grid-cols-2 gap-5 mt-10">
                  <TextField
                    required
                    id="outlined-required"
                    label="Operation Name"
                    placeholder="Enter Resource name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("name")}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    type="text"
                    placeholder="Enter Description"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("description")}
                  />
                </div>
              </form>

              <div className="w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 ">
                <button
                  onClick={() => reset()}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Clear
                </button>

                <button
                  onClick={() => saveFunctionCalled("save")}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => saveFunctionCalled("save_and_new")}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Save and New
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CreateOperations;
