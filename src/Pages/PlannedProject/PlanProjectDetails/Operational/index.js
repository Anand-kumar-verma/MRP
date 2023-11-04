import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";
import { baseUrl } from "../../../../URls";
import { toast } from "react-toastify";

const OperationalDetailsData = ({ formik }) => {
  const [material_list, setmaterial_list] = React.useState([]);
  const [operationList, setOperationList] = useState([]);
  const [loding, setloding] = useState(false);
  const [material_var, setmaterial_var] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance
      .get(API_URLS?.projectPlanningDetails, {
        params: { planning_project_id: formik.values.project_id },
      })
      .then((res) => setData(res?.data?.data?.[0] || {}))
      .catch((e) => console.log(e));
  }, [formik.values.project_id]);

  console.log(data);

  useEffect(() => {
    try {
      axiosInstance
        .get(API_URLS?.create_bom_api)
        .then((res) => setmaterial_var(res?.data?.data))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    //set phase
    const newrows = data?.work_order_or_task_on_planning_project?.map(
      (i, index) => {
        return {
          id: index + 1,
          phase_name: i?.work_order_or_task_name || "",
          description: i?.description || "",
          time: i?.spent_time || "",
          cost: i?.spent_cost || "",
          start_date: i?.start_date?.slice(0, 10) || "",
          end_date: i?.end_date?.slice(0, 10) || "",
          idd:i?.id,
        };
      }
    );

    formik.setFieldValue("workOrder_data", newrows);

    const newmaterial = data?.work_order_or_task_on_planning_project?.flatMap(
      (i, firstIndex) => {
        return i?.materials_on_planning_project?.map((item, index) => {
          return {
            id: firstIndex + 1, // This will give you 0, 1, 2, ...
            material: item?.materials?.name || "",
            bom_id: item?.materials?.bom_id || "",
            phase: i?.work_order_or_task_name || "",
            cost: item?.materials?.varients?.purchasing_price || "",
            time: "0",
            varients: item?.materials?.varients || [],
            v_id: item?.materials?.varients?.id || "",
            qnt: item?.quantity || 1,
            idd:item?.id,
          };
        });
      }
    );
    // ;cost: material?.cost || "",
    if (newmaterial) {
      formik.setFieldValue("material_data", newmaterial);
    }

    const newOperationData =
      data?.work_order_or_task_on_planning_project?.flatMap((i, firstIndex) => {
        return i?.operations_on_planning_project?.map((item, index) => {
          return {
            id: firstIndex + 1, // This will give you 0, 1, 2, ...
            operation: item?.operations?.id || "",
            phase: i?.work_order_or_task_name || "",
            cost: item?.cost || "",
            time: item?.time || "0",
            start_date: item?.start_date?.slice(0, 10) || "",
            end_date: item?.start_date?.slice(0, 10) || "",
            idd:item?.id,
          };
        });
      });

    if (newOperationData)
      formik.setFieldValue("operation_data", newOperationData);
  }, [data]);

  function deletePhase(id, phase_name) {
    formik.setFieldValue(
      "workOrder_data",
      formik.values.workOrder_data.filter((i) => i?.id !== Number(id))
    );
    formik.setFieldValue(
      "operation_data",
      formik.values.operation_data.filter((i) => i?.phase !== phase_name)
    );
    formik.setFieldValue(
      "material_data",
      formik.values.material_data.filter((i) => i?.phase !== phase_name)
    );
  }

  // materials
  const handleAddRowForMaterial = () => {
    const newRow = {
      id: formik.values.material_data.length + 1,
      material: "",
      bom_id: "",
      phase: "",
      cost: "",
      time: "0",
      varients: [],
      v_id: "",
      qnt: 1,
      idd:"",
    };

    formik.setFieldValue("material_data", [
      ...formik.values.material_data,
      newRow,
    ]);
  };

  const handleFieldChangeForMaterial = (rowId, field, value) => {
    formik.setFieldValue(
      "material_data",
      formik.values.material_data.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const handleFieldChangeForMaterial_v_id = (rowId, field, value) => {
    formik.setFieldValue(
      "material_data",
      formik.values.material_data.map((row) =>
        row.id === rowId
          ? {
              ...row,
              [field?.split(" ")[0]]: value?.split(" ")[0],
              [field?.split(" ")[1]]: value?.split(" ")[1],
            }
          : row
      )
    );
  };

  const handleFieldChangeForMaterial_qnt = (rowId, field, value) => {
    formik.setFieldValue(
      "material_data",
      formik.values.material_data.map((row) =>
        row.id === rowId
          ? {
              ...row,
              [field?.split(" ")[0]]: value?.split(" ")[0],
              [field?.split(" ")[1]]: value?.split(" ")[1],
            }
          : row
      )
    );
  };

  // operations
  const handleAddRowForOperations = () => {
    const newRow = {
      id: formik.values.operation_data.length + 1,
      operation: "",
      phase: "",
      cost: "",
      time: "0",
      start_date: "",
      end_date: "",
      idd:"",
    };
    formik.setFieldValue("operation_data", [
      ...formik.values.operation_data,
      newRow,
    ]);
  };

  const handleFieldChangeForOperation = (rowId, field, value) => {
    formik.setFieldValue(
      "operation_data",
      formik.values.operation_data.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  //phase
  const handleAddRow = () => {
    const newRow = {
      id: formik.values.workOrder_data.length + 1,
      phase_name: "",
      description: "",
      time: "",
      cost: "",
      start_date: "",
      end_date: "",
      idd:"",
    };
    formik.setFieldValue("workOrder_data", [
      ...formik.values.workOrder_data,
      newRow,
    ]);
  };

  const handleFieldChange = (rowId, field, value) => {
    formik.setFieldValue(
      "workOrder_data",
      formik.values.workOrder_data.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  async function getMaterial() {
    setloding(true);
    try {
      const response = await axios.get(`${baseUrl}${API_URLS?.material}`, {
        headers: {
          Authorization: localStorage.getItem("erp_token"),
          "Content-Type": "application/json",
        },
      });
      setmaterial_list(response?.data?.data);

      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  async function getOperationList() {
    setloding(true);
    try {
      const response = await axiosInstance.get(`${API_URLS.operations}`, {
        headers: {
          Authorization: localStorage.getItem("erp_token"),
          "Content-Type": "application/json",
        },
      });
      setOperationList(response?.data?.data);

      console.log(response);
    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  useEffect(() => {
    // getcustomerFn();
    getMaterial();
    getOperationList();
  }, []);

  useEffect(() => {
    const updatedData = formik.values.workOrder_data.map((phaseItem) => {
      const phaseId = phaseItem.phase_name;

      // Calculate the total cost and time for this phase
      const totalCost = formik.values.operation_data
        .concat(formik.values.material_data)
        .filter((item) => item.phase === phaseId)
        .reduce((sum, item) => sum + parseFloat(item.cost), 0);

      const totalTime = formik.values.operation_data
        .concat(formik.values.material_data)
        .filter((item) => item.phase === phaseId)
        .reduce((sum, item) => sum + parseFloat(item.time), 0);

      return {
        ...phaseItem,
        cost: totalCost.toString(), // Convert to string if needed
        time: totalTime.toString(), // Convert to string if needed
      };
    });
    formik.setFieldValue("workOrder_data", updatedData);
  }, [formik.values.operation_data, formik.values.material_data]);

  return (
    <>
      <div className="overflow-scroll">
        <p className="bg-purple-500 p-2 mt-5 text-white">Work Order:</p>
        <div className="bg-gray-400 p-2">
          <div className="w-full grid grid-cols-9 place-items-center gap-3">
            <p className="col-span-2">Name</p>
            <p className="col-span-2">Description</p>
            <p className="col-span-1">Time (Hrs)</p>
            <p>Cost</p>
            <p>Start Date</p>
            <p>End Date</p>

            <p></p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3 px-2">
          {formik.values.workOrder_data.map((row) => (
            <div className="w-full grid grid-cols-9 gap-3" key={row.id}>
              <TextField
                disabled={formik?.values?.state ? true : false}
                required
                className="!col-span-2"
                id="phase_name"
                name="phase_name"
                type="text"
                placeholder="Enter Phase"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.phase_name}
                onChange={(e) =>
                  handleFieldChange(row.id, "phase_name", e.target.value)
                }
              />
              <TextField
                disabled={formik?.values?.state ? true : false}
                required
                className="!col-span-2"
                id="description"
                name="description"
                type="text"
                placeholder="development"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.description}
                onChange={(e) =>
                  handleFieldChange(row.id, "description", e.target.value)
                }
              />

              <TextField
                required
                className="!col-span-1"
                id="time"
                name="time"
                type="number"
                placeholder="00"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                value={row?.time}
                onChange={(e) =>
                  handleFieldChange(row?.id, "time", e.target.value)
                }
              />
              <TextField
                required
                className="!col-span-1"
                id="cost"
                name="cost"
                type="number"
                placeholder="00"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                value={row?.cost}
                onChange={(e) =>
                  handleFieldChange(row?.id, "cost", e.target.value)
                }
              />
              <TextField
                disabled={formik?.values?.state ? true : false}
                required
                className="!col-span-1"
                id="start_date"
                name="start_date"
                type="date"
                placeholder="00"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.start_date}
                onChange={(e) =>
                  handleFieldChange(row?.id, "start_date", e.target.value)
                }
              />
              <TextField
                disabled={formik?.values?.state ? true : false}
                required
                className="!col-span-1"
                id="end_date"
                name="end_date"
                type="date"
                placeholder="00"
                value={row?.end_date}
                onChange={(e) =>
                  handleFieldChange(row?.id, "end_date", e.target.value)
                }
              />
              {formik.values.workOrder_data.length > 1 &&
                !formik?.values?.state && (
                  <div
                    className="text-2xl text-red-900 ml-[20%] "
                    onClick={() => deletePhase(row?.id, row?.phase_name)}
                  >
                    <AiFillDelete className="!cursor-pointer" />
                  </div>
                )}
            </div>
          ))}
        </div>

        {!formik?.values?.state && (
          <div
            onClick={handleAddRow}
            className="bg-purple-200 p-2 mt-1 cursor-pointer"
          >
            Add New +
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="bg-purple-500 p-2 mt-5 text-white">
              Material Requirement:
            </p>
            <div className="bg-gray-400 p-2">
              <div className="w-full grid grid-cols-10 place-items-center gap-3">
                <p className="col-span-2">Material</p>
                <p className="col-span-2">Select Variants</p>
                <p>Qnt</p>
                <p className="col-span-2">Work Order</p>
                <p className="col-span-2">Cost</p>
                <p></p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2 px-2">
              {formik.values.material_data.map((row) => (
                <div className="w-full grid grid-cols-10 gap-3" key={row.id}>
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    className="!col-span-2"
                    required
                    select
                    id="bom_id"
                    name="bom_id"
                    placeholder="Enter material"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.bom_id}
                    onChange={(e) =>
                      handleFieldChangeForMaterial(
                        row.id,
                        "bom_id",
                        e.target.value
                      )
                    }
                  >
                    {material_list.map((i) => {
                      return <MenuItem value={i?.bom_id}>{i?.name}</MenuItem>;
                    })}
                  </TextField>
                  <FormControl sx={{ minWidth: 120 }} className="col-span-2">
                    <Select
                      disabled={formik?.values?.state ? true : false}
                      native
                      name="v_id"
                      id="v_id"
                      value={row?.v_id}
                      defaultValue=""
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        handleFieldChangeForMaterial_v_id(
                          row.id,
                          "v_id cost",
                          `${selectedValue} ${
                            material_var
                              ?.find((i) => i.bom_id === Number(row?.bom_id))
                              ?.varients?.find(
                                (i) => i?.id === Number(selectedValue)
                              )?.cost
                          }`
                        );
                      }}
                    >
                      <option>
                        <em>None</em>
                      </option>
                      <optgroup
                        label={
                          material_var?.find(
                            (i) => i.bom_id === Number(row?.bom_id)
                          )?.material
                        }
                      >
                        {material_var
                          ?.find((i) => i.bom_id === Number(row?.bom_id))
                          ?.varients.map((i, index) => {
                            return (
                              <option
                                value={i?.id}
                                key={index}
                                className="text-sm text-blue-600 flex w-full justify-end"
                              >
                                <span>
                                  {i?.name} | T Qnt:{i?.in_stock}
                                </span>
                              </option>
                            );
                          })}
                      </optgroup>
                    </Select>
                  </FormControl>

                  <TextField
                    required
                    disabled={formik?.values?.state ? true : false}
                    type="number" // Should be "number" if input should be a number
                    id="qnt"
                    name="qnt"
                    label="Quantity" // Use label instead of placeholder for accessibility
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.qnt}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.warn("Please add quantity");
                      } else {
                        const quantity = Number(e.target.value); // Convert to a number
                        const newCost =
                          quantity *
                          Number(
                            material_var
                              ?.find((i) => i.bom_id === Number(row?.bom_id))
                              ?.varients?.find(
                                (i) => i?.id === Number(row?.v_id)
                              )?.cost
                          );
                        handleFieldChangeForMaterial_qnt(
                          row.id,
                          "qnt cost",
                          `${quantity} ${newCost}`
                        );
                      }
                    }}
                  />
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    className="!col-span-2"
                    required
                    select
                    id="phase"
                    name="phase"
                    placeholder="Enter phase"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.phase}
                    onChange={(e) =>
                      handleFieldChangeForMaterial(
                        row.id,
                        "phase",
                        e.target.value
                      )
                    }
                  >
                    {formik.values.workOrder_data?.map((i) => {
                      return (
                        <MenuItem value={i?.phase_name}>
                          {i?.phase_name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    className="!col-span-2"
                    required
                    id="cost"
                    name="cost"
                    placeholder="Enter cost"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.cost}
                    onChange={(e) =>
                      handleFieldChangeForMaterial(
                        row.id,
                        "cost",
                        e.target.value
                      )
                    }
                  />
                  {formik.values.material_data.length > 1 &&
                    !formik?.values?.state && (
                      <div
                        className="text-2xl text-red-900 ml-[20%] "
                        onClick={() =>
                          formik.setFieldValue(
                            "material_data",
                            formik.values.material_data?.filter(
                              (i) => i?.id !== row.id
                            )
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
              <div
                onClick={handleAddRowForMaterial}
                className="bg-purple-200 p-2 mt-1 cursor-pointer"
              >
                Add New +
              </div>
            )}
          </div>

          <div>
            <p className="bg-purple-500 p-2 mt-5 text-white">
              Operation Requirement:
            </p>
            <div className="bg-gray-400 p-2">
              <div className="w-full grid grid-cols-7 place-items-center gap-3">
                <p>operations</p>
                <p>Work Order</p>
                <p>Cost</p>
                <p>Time (Hrs)</p>
                <p>Start Date</p>
                <p>End </p>
                <p></p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-2 px-2">
              {formik.values.operation_data.map((row) => (
                <div className="w-full grid grid-cols-7 gap-3 " key={row.id}>
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    required
                    select
                    id="operation"
                    name="operation"
                    placeholder="Enter operation"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.operation}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "operation",
                        e.target.value
                      )
                    }
                  >
                    {operationList?.map((i) => {
                      return <MenuItem value={i?.id}>{i?.stage}</MenuItem>;
                    })}

                    {/* <MenuItem value={2}>m2 (KG)</MenuItem> */}
                  </TextField>
                  <TextField
                    required
                    disabled={formik?.values?.state ? true : false}
                    select
                    id="phase"
                    name="phase"
                    placeholder="Enter phase"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.phase}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "phase",
                        e.target.value
                      )
                    }
                  >
                    {formik.values.workOrder_data?.map((i) => {
                      return (
                        <MenuItem value={i?.phase_name}>
                          {i?.phase_name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    required
                    id="cost"
                    name="cost"
                    placeholder="Enter cost"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.cost}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "cost",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    required
                    id="time"
                    name="time"
                    placeholder="Enter time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="number"
                    value={row?.time}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "time",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    className=""
                    required
                    id="start_date"
                    name="start_date"
                    placeholder="Enter time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    value={row?.start_date}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "start_date",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    disabled={formik?.values?.state ? true : false}
                    required
                    id="end_date"
                    name="end_date"
                    placeholder="Enter time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    value={row?.end_date}
                    onChange={(e) =>
                      handleFieldChangeForOperation(
                        row.id,
                        "end_date",
                        e.target.value
                      )
                    }
                  />
                  {formik.values.operation_data.length > 1 &&
                    !formik?.values?.state && (
                      <div
                        className="text-2xl text-red-900 ml-[20%] "
                        onClick={() =>
                          formik.setFieldValue(
                            "operation_data",
                            formik.values.operation_data?.filter(
                              (i) => i?.id !== row.id
                            )
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
              <div
                onClick={handleAddRowForOperations}
                className="bg-purple-200 p-2 mt-1 cursor-pointer"
              >
                Add New +
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationalDetailsData;
