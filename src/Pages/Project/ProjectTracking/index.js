import * as React from "react";
import ReactApexChart from "react-apexcharts";
import MaterialDescription from "./MaterialDescription";
import OperationDescription from "./OperationDescription";
import CustomTable from "../../../Shared/CustomTable";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Config/axios";
import { API_URLS } from "../../../Config/apiUrls";
import MileStoneDescription from "./MileStoneDescription";

export default function ProjectTracking() {
  const state = useLocation();

  const navigate = useNavigate();
  const [phaseNo, setphaseNo] = React.useState("");
  const [projectData, setProjectData] = React.useState({});
  const [phaseData, setPhaseData] = React.useState([]);
  const [planned_data, setPlanned_data] = React.useState({});
  // console.log(state.state.plan_project_id)
  const [phase_name, setphase_name] = React.useState("");
  React.useEffect(() => {
    axiosInstance
      .get(API_URLS.project_list, {
        params: { project_id: state?.state?.project_id },
      })
      .then((res) => setProjectData(res?.data?.data ? res?.data?.data[0] : {}))
      .catch((e) => console.log(e));
  }, []);

  React.useEffect(() => {
    axiosInstance
      .get(API_URLS?.projectPlanningDetails, {
        params: { planning_project_id: state?.state?.plan_project_id },
      })
      .then((res) => setPlanned_data(res?.data?.data?.[0] || {}))
      .catch((e) => console.log(e));
  }, [state?.state?.project_id]);

  // console.log(planned_data,projectData,state?.state?.plan_project_id, "Planned_data");

  // console.log(projectData)

  const tableBody =
    projectData?.type_of_project === "Operational"
      ? projectData?.work_order_or_task_on_project?.map((i) => {
          return {
            id: i?.id || "",
            phase_name: i?.work_order_or_task_name || "--",
            description: i?.description || "--",
            start_date: i?.start_date?.slice(0, 10) || "--",
            end_date: i?.end_date?.slice(0, 10) || "--",
            spent_cost: i?.spent_cost || "--",
            spent_time: i?.spent_time || "--",
          };
        })
      : projectData?.phases_on_project?.map((i) => {
          return {
            id: i?.id || "",
            phase_name: i?.phase_name || "--",
            description: i?.description || "--",
            start_date: i?.start_date?.slice(0, 10) || "--",
            end_date: i?.end_date?.slice(0, 10) || "--",
            spent_cost: i?.spent_cost || "--",
            spent_time: i?.spent_time || "--",
          };
        });

  const tableBody_planned_data =
    planned_data?.type_of_project === "Operational"
      ? planned_data?.work_order_or_task_on_planning_project?.map((i) => {
          return {
            id: i?.id || "",
            phase_name: i?.work_order_or_task_name || "--",
            description: i?.description || "--",
            start_date: i?.start_date?.slice(0, 10) || "--",
            end_date: i?.end_date?.slice(0, 10) || "--",
            spent_cost: i?.spent_cost || "--",
            spent_time: i?.spent_time || "--",
          };
        })
      : planned_data?.phases_on_planning_project?.map((i) => {
          return {
            id: i?.id || "",
            phase_name: i?.phase_name || "--",
            description: i?.description || "--",
            start_date: i?.start_date?.slice(0, 10) || "--",
            end_date: i?.end_date?.slice(0, 10) || "--",
            spent_cost: i?.spent_cost || "--",
            spent_time: i?.spent_time || "--",
          };
        });

  const phase = {
    series: [
      {
        name: "Actual Cost",
        data: !tableBody
          ? []
          : tableBody?.map((i) => {
              return Number(i?.spent_cost);
            }),
      },
      {
        name: "Planned Cost",
        data: !tableBody_planned_data
          ? []
          : tableBody_planned_data?.map((i) => {
              return Number(i?.spent_cost);
            }),
      },
      {
        name: "Actual Time",
        data: !tableBody
          ? []
          : tableBody?.map((i) => {
              return Number(i?.spent_time);
            }),
      },
      {
        name: "Planned Time",
        data: !tableBody_planned_data
          ? []
          : tableBody_planned_data?.map((i) => {
              return Number(i?.spent_time);
            }),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: !tableBody_planned_data
          ? ""
          : tableBody_planned_data.map((i) => {
              return i?.phase_name;
            }),
      },
      yaxis: {
        title: {
          text:"INR"
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val + " INR";
          },
        },
      },
    },
  };

  const total_actual_cost = tableBody?.reduce(
    (a, b) => a + Number(b?.spent_cost),
    0
  );
  const total_planned_cost = tableBody_planned_data?.reduce(
    (a, b) => a + Number(b?.spent_cost),
    0
  );

  return (
    <div>
      <p className="text-xl  text-gray-800 flex justify-between ">
        <span className="text-gray-900 font-bold">
          {projectData?.project_name} | {projectData?.type_of_project}
        </span>
        <span className="pr-5 text-red-950 font-bold">
          {projectData?.status?.replace("_", " ")}
        </span>
      </p>
      <p
        className="text-blue-600 cursor-pointer"
        onClick={() =>
          navigate(`/customer-details/${projectData?.customer?.customer_id}`)
        }
      >
        {projectData?.customer?.name} | {projectData?.customer?.buiness_type}
      </p>
      <p className="bg-blue-200 px-5 font-bold text-yellow-800 ">Actual Status</p>
      <CustomTable
        className={"px-10"}
        isLoding={false}
        tablehead={[
          projectData?.type_of_project === "Operational" ? (
            <span>Workorder Name</span>
          ) : (
            <span>Phase Name</span>
          ),
          <span>Description</span>,
          <span>A/Start Date</span>,
          <span>A/End Date</span>,
          <span>A/Spent Cost</span>,
          <span>A/Spent Time</span>,
        ]}
        tablerow={tableBody?.map((i) => {
          return [
            <span
              onClick={() => {
                setphaseNo(i?.id);
                setphase_name(i?.phase_name);
                if (projectData?.type_of_project === "Operational") {
                  setPhaseData(projectData?.work_order_or_task_on_project);
                } else {
                  setPhaseData(projectData?.phases_on_project);
                }
              }}
              className="text-blue-800 cursor-pointer pl-5"
            >
              {i?.phase_name}
            </span>,
            <span>{i?.description}</span>,
            <span>{i?.start_date}</span>,
            <span>{i?.end_date}</span>,
            <span>{i?.spent_cost}</span>,
            <span>{i?.spent_time}</span>,
          ];
        })}
      />
      <div className="w-full bg-green-200 flex justify-end">
        <p className="px-10 py-2">
          Total Cost:{" "}
          <span className="font-bold text-xl text-blue-600">
            {total_actual_cost || 0.0}
            INR
          </span>
        </p>
      </div>
      <p className="bg-blue-200 px-5 font-bold text-yellow-800">Planned Status</p>
      <CustomTable
        className={""}
        isLoding={false}
        tablehead={[
          projectData?.type_of_project === "Operational" ? (
            <span>Workorder Name</span>
          ) : (
            <span>Phase Name</span>
          ),
          <span>Description</span>,
          <span>P/Start Date</span>,
          <span>P/End Date</span>,
          <span>P/Spent Cost</span>,
          <span>P/Spent Time</span>,
        ]}
        tablerow={tableBody_planned_data?.map((i) => {
          return [
            <span className="pl-5">
              {i?.phase_name}
            </span>,
            <span>{i?.description}</span>,
            <span>{i?.start_date}</span>,
            <span>{i?.end_date}</span>,
            <span>{i?.spent_cost}</span>,
            <span>{i?.spent_time}</span>,
          ];
        })}
      />
      <div className="w-full bg-green-200 flex justify-end">
        <p className="px-10 py-2">
          Total Cost:{" "}
          <span className="font-bold text-xl text-blue-600">
            {total_planned_cost}
            INR
          </span>
        </p>
      </div>

      <div className="w-full bg-green-500 flex justify-end">
        <p className="px-10 py-2">
          Net Cost:{" "}
          <span className="font-bold text-xl text-blue-600">
            {total_planned_cost || 0 - total_actual_cost || 0}
            INR
          </span>
        </p>
      </div>

      {phaseNo && projectData?.type_of_project === "Strategic" ? (
        <>
          <MileStoneDescription
            phaseNo={phaseNo}
            phaseData={phaseData}
            plan_project_id={state?.state?.plan_project_id}
          />
        </>
      ) : (
        phaseNo && (
          <>
            <MaterialDescription
              project_type={projectData?.type_of_project}
              phaseNo={phaseNo}
              phaseData={phaseData}
              p_name={phase_name}
              plan_project_id={state?.state?.plan_project_id}
            />
            <OperationDescription
              project_type={projectData?.type_of_project}
              phaseNo={phaseNo}
              phaseData={phaseData}
              p_name={phase_name}
              plan_project_id={state?.state?.plan_project_id}
            />
          </>
        )
      )}

      <div className="mt-5 bg-blue-100">
        <p className="bg-purple-500 w-full text-white text-xl py-2 px-4">
          Phase Vs. Cost
        </p>

        <ReactApexChart
          options={phase.options}
          series={phase.series}
          type="bar"
          height={350}
        />
      </div>

      <div className="grid grid-cols-2 mt-[5%] ">
        <p className="font-bold bg-purple-400 p-2">Description</p>
        <p className="font-bold bg-purple-400 p-2">Amount</p>

        <p className="col-span-2 p-2 bg-purple-200">Expenses</p>
        <p className="p-2 bg-purple-100">Materials Amount</p>
        <p className="p-2 bg-purple-100">{projectData?.materials_amount}INR</p>
        <p className="p-2 bg-purple-100">Operations Amount</p>
        <p className="p-2 bg-purple-100">{projectData?.operations_amount}INR</p>
        <p className="p-2 bg-purple-100">Other Expenses</p>
        <p className="p-2 bg-purple-100">00INR</p>

        <p className="font-bold bg-purple-400 p-2">Net Amount</p>
        <p className="font-bold bg-purple-400 p-2">
          {projectData?.total_amount}INR
        </p>
      </div>
    </div>
  );
}
