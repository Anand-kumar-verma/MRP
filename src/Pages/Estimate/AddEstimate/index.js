import React, {useState } from "react";
import { toast } from "react-toastify";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import { useFormik } from "formik";
import { addEstimateFn } from "../../../Services/Estimate/AddEstimate";
import { useMutation } from "react-query";
import Stregic from "./Strategic";
import Tactical from "./Tactical";
import Operational from "./Operational";
import { useNavigate } from "react-router-dom";
import BasicData from "./BasicData";
import AllCalculation from "./AllCalculation";

const AddEstimate = () => {
  const navigate = useNavigate();
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);

  const initialValues = {
    type_tax:"",
    customer: "",
    estimate_no: "",
    estimate_date: "",
    expiry_date: "",
    project_name: "",
    project_type: "",
    subproject_of: "",
    no_of_phase: "",
    description: "",
    tax: "",

    phase_data: [],
    material_data: [],
    operation_data: [],
    milestone_data: [],
    workOrder_data: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    // enableReinitialize: true,
    onSubmit: (values) => {
      const phaseData = formik.values.phase_data?.map((i) => {
        return {
          phase_name: i?.phase_name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
        };
      });

      const mileStone = formik.values.milestone_data?.map((i) => {
        return {
          phase_name: i?.phase,
          milestone_name: i?.name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
        };
      });

      const workOrders = formik.values.workOrder_data?.map((i) => {
        return {
          work_order_or_task_name: i?.phase_name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
        };
      });

      const materialData = formik.values.material_data?.map((i) => {
        return {
          work_order_or_task_name:
            formik.values.project_type === "Operational" ? i?.phase : "",
          milestone_name:
            formik.values.project_type === "Strategic" ? i?.phase : "",
          materials_id: i?.material,
          cost: i?.cost,
          phase_name: formik.values.project_type === "Tactical" ? i?.phase : "",
        };
      });

      const operationData = formik.values.operation_data?.map((i) => {
        return {
          work_order_or_task_name:
            formik.values.project_type === "Operational" ? i?.phase : "",
          milestone_name:
            formik.values.project_type === "Strategic" ? i?.phase : "",
          time: i?.time,
          cost: i?.cost,
          phase_name: formik.values.project_type === "Tactical" ? i?.phase : "",
          operations_id: i?.operation,
        };
      });

      const reqBody = {
        type_tax:formik.values.type_tax,
        customer_id: formik?.values?.customer,
        estimate_no: formik?.values?.estimate_no,
        estimate_date: formik?.values.estimate_date,
        expiry_date: formik?.values?.expiry_date,
        project_name: formik?.values?.project_name,
        type_of_project: formik?.values?.project_type,
        description: formik?.values?.description,
        no_of_phases:
          formik.values.phase_data.length ||
          formik.values.workOrder_data?.length,
        total_amount:
          Number(
            formik.values.operation_data
              ?.reduce((a, b) => a + Number(b?.cost), 0)
              .toFixed(2)
          ) +
          Number(
            formik.values.material_data
              ?.reduce((a, b) => a + Number(b?.cost), 0)
              .toFixed(2)
          ) +
          ((Number(
            formik.values.operation_data
              ?.reduce((a, b) => a + Number(b?.cost), 0)
              .toFixed(2)
          ) +
            Number(
              formik.values.material_data
                ?.reduce((a, b) => a + Number(b?.cost), 0)
                .toFixed(2)
            )) *
            Number(formik.values.tax)) /
            100,
        total_price:
          Number(
            formik.values.operation_data
              ?.reduce((a, b) => a + Number(b?.cost), 0)
              .toFixed(2)
          ) +
          Number(
            formik.values.material_data
              ?.reduce((a, b) => a + Number(b?.cost), 0)
              .toFixed(2)
          ),
        igst: formik.values.tax,
        milestone_on_phases_on_estimate_project: mileStone,
        work_order_or_task_on_estimate_project: workOrders,
        phases_on_estimate_project: phaseData,
        materials_on_estimate_project: materialData,
        operations_on_estimate_project: operationData,
      };

      estimate(reqBody);
    },
  });

  const { mutate: estimate } = useMutation(addEstimateFn, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        navigate("/estimate");
      }
      toast.success(response.data.message);
    },
  });

  
  return (
    <>
      <div className="w-full h-full overflow-auto flex gap-2">
        <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
          <div className="h-full flex flex-col justify-between overflow-auto ">
            <form className="flex flex-col justify-evenly overflow-auto">
              <div className="overflow-scroll px-2">
               <BasicData formik={formik}/>
                {formik.values.project_type === "Strategic" && (
                  <Stregic formik={formik} />
                )}
                {formik.values.project_type === "Tactical" && (
                  <Tactical formik={formik} />
                )}
                {formik.values.project_type === "Operational" && (
                  <Operational formik={formik} />
                )}

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  <AllCalculation formik = {formik}/>
                </div>
              </div>
            </form>

            <div className="w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 ">
              <button
                // onClick={() =>}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  setopenCustomDialogBox(true);
                }}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Calculate
              </button>

              <button
                onClick={() => {
                  formik.handleSubmit();
                  setopenCustomDialogBox(true);
                }}
                className="text-white p-3 bg-blue-600 rounded-lg"
              >
                Calculate and Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={
            <div className=" w-full mt-4 flex flex-col gap-3 px-2">
             <AllCalculation formik={formik}/>
            </div>
          }
          title="Total Cost:"
        />
      )}
    </>
  );
};

export default AddEstimate;
