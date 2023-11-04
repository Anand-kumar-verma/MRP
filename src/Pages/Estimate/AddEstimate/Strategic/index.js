import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";
import { baseUrl } from "../../../../URls";
import { toast } from "react-toastify";

const Stregic = ({ formik }) => {
  const [material_list, setmaterial_list] = React.useState([]);
  const [operationList, setOperationList] = useState([]);
  const [loding, setloding] = useState(false);

  function deletePhase(id, phase_name) {
    formik.setFieldValue(
      "phase_data",
      formik.values.phase_data?.filter((i) => i?.id !== Number(id))
    );
    formik.setFieldValue(
      "milestone_data",
      formik.values.milestone_data.filter((i) => i.phase !== phase_name)
    );
  }
  function deleteMileStone(id, name) {
    formik.setFieldValue(
      "milestone_data",
      formik.values.milestone_data.filter((i) => i.id !== Number(id))
    );
    formik.setFieldValue(
      "operation_data",
      formik.values.operation_data.filter((i) => i?.phase !== name)
    );
    formik.setFieldValue(
      "material_data",
      formik.values.material_data.filter((i) => i?.phase !== name)
    );
  }

  //milestone
  const handleAddRowForMileStone = () => {
    const newRow = {
      id: formik.values.milestone_data.length + 1,
      phase: "",
      name: "",
      description: "",
      cost: "0",
      time: "0",
    };
    formik.setFieldValue("milestone_data", [
      ...formik.values.milestone_data,
      newRow,
    ]);
  };

  const handleFieldChangeForMileSton = (rowId, field, value) => {
    formik.setFieldValue(
      "milestone_data",
      formik.values.milestone_data.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  // materials
  const handleAddRowForMaterial = () => {
    const newRow = {
      id: formik.values.material_data.length + 1,
      material: "",
      phase: "",
      cost: "",
      time: "0",
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

  // operations
  const handleAddRowForOperations = () => {
    const newRow = {
      id: formik.values.operation_data.length + 1,
      operation: "",
      phase: "",
      cost: "",
      time: "0",
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
      id: formik.values.phase_data.length + 1,
      phase_name: "",
      description: "",
      time: "",
      cost: "",
    };
    formik.setFieldValue("phase_data", [...formik.values.phase_data, newRow]);
  };
  // console.log(formik.values.project_phase_data)

  const handleFieldChange = (rowId, field, value) => {
    formik.setFieldValue(
      "phase_data",
      formik.values.phase_data.map((row) =>
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
    const milestoneData = formik.values.milestone_data.map((phaseItem) => {
      const phaseId = phaseItem.name;

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
    formik.setFieldValue("milestone_data", milestoneData);
    // console.log(milestoneData)
  }, [formik.values.operation_data, formik.values.material_data]);

  useEffect(() => {
    // console.log(milestone)
    const phaseData = formik.values.phase_data.map((phaseItem) => {
      const phaseId = phaseItem.phase_name;

      // Calculate the total cost and time for this phase
      const totalCost = formik.values.milestone_data
        .filter((item) => item.phase === phaseId)
        .reduce((sum, item) => sum + parseFloat(item.cost), 0);

      const totalTime = formik.values.milestone_data
        .filter((item) => item.phase === phaseId)
        .reduce((sum, item) => sum + parseFloat(item.time), 0);

      return {
        ...phaseItem,
        cost: totalCost.toString(), // Convert to string if needed
        time: totalTime.toString(), // Convert to string if needed
      };
    });
    formik.setFieldValue("phase_data", phaseData);
  }, [formik.values.milestone_data]);

  return (
    <>
      <div className="overflow-scroll">
        <p className="bg-purple-500 p-2 mt-5 text-white">Phases:</p>
        <div className="bg-gray-400 p-2">
          <div className="w-full grid grid-cols-7 place-items-center gap-3">
            <p className="col-span-2">Phase</p>
            <p className="col-span-2">Description</p>
            <p className="col-span-1">Time (Hrs)</p>
            <p>Cost</p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3 px-2">
          {formik.values.phase_data.map((row) => (
            <div className="w-full grid grid-cols-7 gap-3" key={row.id}>
              <TextField
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
              {formik.values.phase_data.length > 1 && (
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

        <div
          onClick={handleAddRow}
          className="bg-purple-200 p-2 mt-1 cursor-pointer"
        >
          Add New +
        </div>

        {/* // mile stone */}
        <p className="bg-purple-500 p-2 mt-5 text-white">MILESTONE:</p>
        <div className="bg-gray-400 p-2">
          <div className="w-full grid grid-cols-9 place-items-center gap-3">
            <p className="col-span-2">Phase</p>
            <p className="col-span-2">Name</p>
            <p className="col-span-2">Description</p>
            <p className="col-span-1">Cost</p>
            <p className="col-span-1">Time (Hrs)</p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3 px-2">
          {formik.values.milestone_data.map((row) => (
            <div className="w-full grid grid-cols-9 gap-3" key={row.id}>
              <TextField
                required
                select
                className="!col-span-2"
                id="phase"
                name="phase"
                type="text"
                placeholder="Enter Phase"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.phase}
                onChange={(e) =>
                  handleFieldChangeForMileSton(row.id, "phase", e.target.value)
                }
              >
                {formik.values.phase_data?.map((i) => {
                  return (
                    <MenuItem value={i?.phase_name}>{i?.phase_name}</MenuItem>
                  );
                })}
              </TextField>
              <TextField
                required
                className="!col-span-2"
                id="name"
                name="name"
                type="text"
                placeholder="development"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.name}
                onChange={(e) =>
                  handleFieldChangeForMileSton(row.id, "name", e.target.value)
                }
              />

              <TextField
                required
                className="!col-span-2"
                id="description"
                name="description"
                type="text"
                placeholder="
                          Enter description"
                InputLabelProps={{
                  shrink: true,
                }}
                value={row?.description}
                onChange={(e) =>
                  handleFieldChangeForMileSton(
                    row?.id,
                    "description",
                    e.target.value
                  )
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
                value={row?.time}
              />

              {formik.values.milestone_data.length > 1 && (
                <div
                  className="text-2xl text-red-900 ml-[20%] "
                  onClick={() => deleteMileStone(row?.id, row?.name)}
                >
                  <AiFillDelete className="!cursor-pointer" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={handleAddRowForMileStone}
          className="bg-purple-200 p-2 mt-1 cursor-pointer"
        >
          Add New +
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="bg-purple-500 p-2 mt-5 text-white">
              Material Requirement:
            </p>
            <div className="bg-gray-400 p-2">
              <div className="w-full grid grid-cols-7 place-items-center gap-3">
                <p className="col-span-2">Material</p>
                <p className="col-span-2">Milestone</p>
                <p className="col-span-2">Cost</p>
                <p></p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2 px-2">
              {formik.values.material_data.map((row) => (
                <div className="w-full grid grid-cols-7 gap-3" key={row.id}>
                  <TextField
                    className="!col-span-2"
                    required
                    select
                    id="material"
                    name="material"
                    placeholder="Enter material"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={row?.material}
                    onChange={(e) =>
                      handleFieldChangeForMaterial(
                        row.id,
                        "material",
                        e.target.value
                      )
                    }
                  >
                    {material_list.map((i) => {
                      return <MenuItem value={i?.bom_id}>{i?.name}</MenuItem>;
                    })}
                  </TextField>
                  <TextField
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
                    {formik.values.milestone_data?.map((i) => {
                      return <MenuItem value={i?.name}>{i?.name}</MenuItem>;
                    })}
                  </TextField>
                  <TextField
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
                  {formik.values.material_data.length > 1 && (
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
            <div
              onClick={handleAddRowForMaterial}
              className="bg-purple-200 p-2 mt-1 cursor-pointer"
            >
              Add New +
            </div>
          </div>

          <div>
            <p className="bg-purple-500 p-2 mt-5 text-white">
              Operation Requirement:
            </p>
            <div className="bg-gray-400 p-2">
              <div className="w-full grid grid-cols-9 place-items-center gap-3">
                <p className="col-span-2">operations</p>
                <p className="col-span-2">Milestone</p>
                <p className="col-span-2">Cost</p>
                <p className="col-span-2">Time (Hrs)</p>
                <p></p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-2 px-2">
              {formik.values.operation_data.map((row) => (
                <div className="w-full grid grid-cols-9 gap-3 " key={row.id}>
                  <TextField
                    className="!col-span-2"
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
                  </TextField>
                  <TextField
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
                      handleFieldChangeForOperation(
                        row.id,
                        "phase",
                        e.target.value
                      )
                    }
                  >
                    {formik.values.milestone_data?.map((i) => {
                      return <MenuItem value={i?.name}>{i?.name}</MenuItem>;
                    })}
                  </TextField>
                  <TextField
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
                      handleFieldChangeForOperation(
                        row.id,
                        "cost",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    className="!col-span-2"
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
                  {formik.values.operation_data.length > 1 && (
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
            <div
              onClick={handleAddRowForOperations}
              className="bg-purple-200 p-2 mt-1 cursor-pointer"
            >
              Add New +
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stregic;
