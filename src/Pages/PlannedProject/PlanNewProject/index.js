
import React, {useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import AllCalculation from "./AllCalculation";
import BasicData from "./BasicData";
import Stregic from "./Strategic";
import Tactical from "./Tactical";
import Operational from "./Operational";
import axiosInstance from "../../../Config/axios";
import { API_URLS } from "../../../Config/apiUrls";
import { addProjectPlanning } from "../../../Services/ProjectPlanning";
import Loding from "../../../Loding";

const PlanNewProject = () => {
  const navigate = useNavigate();
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);
  const [projectData,setprojectData] = useState({})
 const [project_id,setproject_id] = useState("")
// async function getProjectData(){
//   axiosInstance.get(`API_URLS?.estimate`)
// }


  const initialValues = {
    customer_name:projectData?.customer?.name || "",
    project_id:project_id,
    type_tax:projectData?.type_tax || "",
    customer: projectData?.customer?.customer_id || "",
    estimate_no: "" ,
    start_date: "",
    end_date: "",
    project_type: projectData?.type_of_project,
    subproject_of: "",
    no_of_phase: projectData?.no_of_phases || 0,
    description: projectData?.description || "",
    tax: projectData?.igst || "",
    project_name:projectData?.project_name,
 
    operational_tax:"",
    material_tax:"",

    phase_data: [],
    material_data: [],
    operation_data: [],
    milestone_data: [],
    workOrder_data: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const phaseData = formik.values.phase_data?.map((i) => {
        return {
          phase_name: i?.phase_name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
          start_date:i?.start_date,
          end_date:i?.end_date,
        };
      });


      const mileStone = formik.values.milestone_data?.map((i) => {
        return {
          phase_name: i?.phase,
          milestone_name: i?.name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
          start_date:i?.start_date,
          end_date:i?.end_date,
        };
      });

      const workOrders = formik.values.workOrder_data?.map((i) => {
        return {
          work_order_or_task_name: i?.phase_name,
          description: i?.description,
          spent_time: i?.time,
          spent_cost: i?.cost,
          start_date:i?.start_date,
          end_date:i?.end_date,
        };
      });

      const materialData = formik.values.material_data?.map((i) => {
        return {
          work_order_or_task_name:
            formik.values.project_type === "Operational" ? i?.phase : "",
            milestone_name:
            formik.values.project_type === "Strategic" ? i?.phase : "",
            materials_variant_id: i?.v_id,
            cost: i?.cost,
          quantity:i?.qnt,
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
          start_date:i?.start_date,
          end_date:i?.end_date
        };
      });

      const reqBody = {
        estimate_project_id:project_id,
        type_tax:projectData?.type_tax,
        customer_id: formik?.values?.customer,
        end_date:formik.values.end_date,

        start_date: formik?.values.start_date,
        
        project_name: formik?.values?.project_name,
        type_of_project: formik?.values?.project_type,
        description: formik?.values?.description,
        no_of_phases:
          formik.values.phase_data.length ||
          formik.values.workOrder_data?.length,

        total_amount:
        Number(Number((
          formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) +
          (formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) *
            formik.values.material_tax) /
            100
        ).toFixed(2)) +
    
        Number((
          formik.values.operation_data?.reduce((a, b) => a + Number(b?.cost), 0) +
            (formik.values.operation_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) *
              formik.values.operational_tax) /
              100
        ).toFixed(2))).toFixed(2),

        operations_amount:Number((
          formik.values.operation_data?.reduce((a, b) => a + Number(b?.cost), 0) +
            (formik.values.operation_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) *
              formik.values.operational_tax) /
              100
        ).toFixed(2)),
        materials_amount:
        Number(Number((
          formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) +
          (formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) *
            formik.values.material_tax) /
            100
        ).toFixed(2))),
        operations_tax_igst:formik.values.operational_tax,
        materials_tax_igst:formik.values.material_tax,

        phases_on_planning_project:phaseData,
        milestone_on_phases_on_planning_project:mileStone,
        materials_on_planning_project:materialData,
        operations_on_planning_project:operationData,

        work_order_or_task_on_planning_project: workOrders,
      
      };

console.log(reqBody,"this is final")
console.log(formik.values)
planProject(reqBody);
    },
  });

  console.log(formik.values.material_data)

  useEffect(()=>{
    // setprojectData()
    project_id &&
    axiosInstance.get(`${API_URLS.project}`)
    .then((res)=>setprojectData(res?.data?.data?.find((i)=>i?.id === Number(project_id))))
    .catch((e)=>console.log(e))
  },[project_id])

  console.log(projectData?.igst)

  const { mutate: planProject,isLoading } = useMutation(addProjectPlanning, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        navigate("/project-planning");
      }
      toast.success(response.data.message);
    },
  });
if(isLoading) return <Loding/>
  return (
    <>
      <div className="w-full h-full overflow-auto flex gap-2">
        <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
          <div className="h-full flex flex-col justify-between overflow-auto ">
            <form className="flex flex-col justify-evenly overflow-auto">
              <div className="overflow-scroll px-2">
               <BasicData formik={formik} setproject_id = {setproject_id} project_id = {project_id}/>
                {formik.values.project_type === "Strategic" && (
                  <Stregic formik={formik}/>
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

export default PlanNewProject;


