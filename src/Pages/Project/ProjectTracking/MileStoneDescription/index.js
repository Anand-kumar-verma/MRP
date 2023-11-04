import React, { useEffect, useState } from "react";
import CustomTable from "../../../../Shared/CustomTable";
import ReactApexChart from "react-apexcharts";
import MaterialDescription from "../MaterialDescription";
import OperationDescription from "../OperationDescription";
import axiosInstance from "../../../../Config/axios";
import { API_URLS } from "../../../../Config/apiUrls";

const MileStoneDescription = ({ phaseNo, phaseData, plan_project_id }) => {
  const [mileStone_id, setmileStone_id] = useState("");
  const [mileStone_data, setMileStone_data] = useState([]);
  const [planned_data, setPlanned_data] = React.useState({});

  React.useEffect(() => {
    axiosInstance
      .get(API_URLS?.projectPlanningDetails, {
        params: { planning_project_id: plan_project_id },
      })
      .then((res) => setPlanned_data(res?.data?.data?.[0] || {}))
      .catch((e) => console.log(e));
  }, [plan_project_id]);



  const tableBody = phaseData
    ?.find((i) => i.id === Number(phaseNo))
    ?.milestone_on_phases_on_project?.map((mile) => {
      return {
        id: mile?.id || "",
        milestone_name: mile?.milestone_name || "--",
        description: mile?.description || "--",
        start_date: mile?.start_date?.slice(0, 10) || "--",
        end_date: mile?.end_date?.slice(0, 10) || "--",
        spent_cost: mile?.spent_cost || "--",
        spent_time: mile?.spent_time || "--",
      };
    });


 const planned_mileStone =  planned_data?.phases_on_planning_project
    ?.find(
      (i) =>
        i?.phase_name ===
        phaseData?.find((i) => i.id === Number(phaseNo))?.phase_name
    )?.milestone_on_phases_on_planning_project?.map((item, index) => {
      return {
        name: item?.milestone_name || "",
        description: item?.description || "",
        cost: item?.spent_cost || "",
        time: item?.spent_time || "",
        start_date: item?.start_date?.slice(0, 10) || "",
        end_date: item?.end_date?.slice(0, 10) || "",
      };
    });

  


    const materialTracking = {
      series: [
        {
          name: "Actual Cost",
          data: !tableBody ? [] : tableBody?.map((i)=>{
            return i?.spent_cost
          }),
        },
        {
          name: "Planned Cost",
          data: !planned_mileStone ? [] : planned_mileStone?.map((i)=>{
            return i?.cost
          }),
        },
        {
          name: "Actual Time",
          data: !tableBody ? [] : tableBody?.map((i)=>{
            return i?.spent_cost
          }),
        },
        {
          name: "Planned Time",
          data: !planned_mileStone ? [] : planned_mileStone?.map((i)=>{
            return i?.time
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
          categories:!tableBody ? [] : tableBody?.map((i)=>{
            return i?.milestone_name
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
              return "$ " + val + " IN";
            },
          },
        },
      },
    };

  const total_planned_cost = planned_mileStone?.reduce((a,b)=>a+Number(b?.cost),0) || 0;
  const total_actual_cost = tableBody?.reduce((a,b)=>a+Number(b?.spent_cost),0) || 0;

  return (
    <>
      <div className="mt-[8%] w-full flex justify-evenly bg-purple-600 text-white  py-2 font-bold text-xl">
        <p>
          Phase{" "}
          {phaseData?.find((i) => i.id === Number(phaseNo))?.phase_name || "--"}
        </p>
        <p>Milestone Description</p>
      </div>
      <p className="bg-blue-200 px-5 font-bold text-yellow-800 ">Actual Status</p>
      <CustomTable
        className={""}
        isLoding={false}
        tablehead={[
          <span>Milestone</span>,
          <span>Description</span>,
          <span>Start Date</span>,
          <span>End Date</span>,
          <span>Cost</span>,
          <span>Time</span>,
        ]}
        tablerow={tableBody?.map((i) => {
          return [
            <span
              className="text-blue-800 cursor-pointer"
              onClick={() => {
                setmileStone_id(i?.id);
                setMileStone_data(
                  phaseData?.find((i) => i.id === Number(phaseNo))
                    ?.milestone_on_phases_on_project
                );
              }}
            >
              {i?.milestone_name}
            </span>,
            <span>{i?.description}</span>,
            <span>{i?.start_date}</span>,
            <span
              //   onClick={() => setopenCustomDialogBox(true)}
              className="text-blue-700 cursor-pointer"
            >
              {i?.end_date}
            </span>,
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
      <p className="bg-blue-200 px-5 font-bold text-yellow-800 ">Planned Status</p>
      <CustomTable
        className={""}
        isLoding={false}
        tablehead={[
          <span>Milestone</span>,
          <span>Description</span>,
          <span>Start Date</span>,
          <span>End Date</span>,
          <span>Cost</span>,
          <span>Time</span>,
        ]}
        tablerow={planned_mileStone?.map((i) => {
          return [
            <span
              className=""
            >
              {i?.name}
            </span>,
            <span>{i?.description}</span>,
            <span>{i?.start_date}</span>,
            <span
              //   onClick={() => setopenCustomDialogBox(true)}
              className="text-blue-700 cursor-pointer"
            >
              {i?.end_date}
            </span>,
            <span>{i?.cost}</span>,
            <span>{i?.time}</span>,
          ];
        })}
      />
      <div className="w-full bg-green-200 flex justify-end">
        <p className="px-10 py-2">
          Total Cost:{" "}
          <span className="font-bold text-xl text-blue-600">
            {total_planned_cost || 0.0}
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



      <div id="chart">
        <ReactApexChart
          options={materialTracking.options}
          series={materialTracking.series}
          type="bar"
          height={350}
        />
      </div>

      {mileStone_id && (
        <>
          <MaterialDescription
            project_type={"Strategic"}
            phaseNo={mileStone_id}
            phaseData={mileStone_data}
            p_name = {phaseData?.find((i) => i.id === Number(phaseNo))?.phase_name}
            plan_project_id = {plan_project_id}
          />
          <OperationDescription
            project_type={"Strategic"}
            phaseNo={mileStone_id}
            phaseData={mileStone_data}
            p_name = {phaseData?.find((i) => i.id === Number(phaseNo))?.phase_name}
            plan_project_id = {plan_project_id}
          />
        </>
      )}
    </>
  );
};

export default MileStoneDescription;
