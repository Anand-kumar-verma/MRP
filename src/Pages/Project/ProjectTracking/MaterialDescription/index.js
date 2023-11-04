import React, { useEffect, useState } from "react";
import CustomDialogBox from "../../../../Shared/CustomDialogBox";
import ReactApexChart from "react-apexcharts";
import CustomTable from "../../../../Shared/CustomTable";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

const MaterialDescription = ({
  project_type,
  phaseNo,
  phaseData,
  p_name,
  plan_project_id,
}) => {
  const [openCustomDialogBox, setopenCustomDialogBox] = React.useState(false);
  // const [phaseData,setPhaseData] = useState([])
  const [planned_data, setPlanned_data] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    axiosInstance
      .get(API_URLS?.projectPlanningDetails, {
        params: { planning_project_id: plan_project_id },
      })
      .then((res) => setPlanned_data(res?.data?.data?.[0] || {}))
      .catch((e) => console.log(e));
  }, [plan_project_id]);

  console.log(planned_data);

  const tableBody = phaseData
    ?.find((i) => i?.id === Number(phaseNo))
    ?.materials_on_project?.map((item) => {
      return {
        id: item?.id || "",
        name: item?.materials?.name || "--",
        category: item?.materials?.category || "--",
        varients: item?.materials?.varients?.name || "--",
        qnt: item?.quantity || "--",
        spent_cost: Number(item?.quantity) * Number(item?.cost) || "--",
        unit_of_measure: item?.materials?.unit_of_measure || "--",
      };
    });

  const planned_materials =
    (project_type === "Operational" &&
      planned_data?.work_order_or_task_on_planning_project
        ?.find((i) => i?.work_order_or_task_name === p_name)
        ?.materials_on_planning_project?.map((mat) => {
          return {
            materials: mat?.materials?.name,
            category: mat?.materials?.category,
            varients: mat?.materials?.varients?.name,
            quantity: mat?.quantity,
            unit_of_measure: mat?.materials?.unit_of_measure,
            cost: mat?.materials?.varients?.purchasing_price,
          };
        })) ||
    (project_type === "Tactical" &&
      planned_data?.phases_on_planning_project
        ?.find((i) => i?.phase_name === p_name)
        ?.materials_on_planning_project?.map((mat) => {
          return {
            materials: mat?.materials?.name,
            category: mat?.materials?.category,
            varients: mat?.materials?.varients?.name,
            quantity: mat?.quantity,
            unit_of_measure: mat?.materials?.unit_of_measure,
            cost: mat?.materials?.varients?.purchasing_price,
          };
        })) ||
    planned_data?.phases_on_planning_project
      ?.find((i) => i?.phase_name === p_name)
      ?.milestone_on_phases_on_planning_project?.find(
        (item) =>
          item?.milestone_name ===
          phaseData?.find((i) => i.id === Number(phaseNo))?.milestone_name
      )
      ?.materials_on_planning_project?.map((mat) => {
        return {
          materials: mat?.materials?.name,
          category: mat?.materials?.category,
          varients: mat?.materials?.varients?.name,
          quantity: mat?.quantity,
          unit_of_measure: mat?.materials?.unit_of_measure,
          cost: mat?.materials?.varients?.purchasing_price,
        };
      }) ||
    [];

  const state = {
    series: [
      {
        name: "Servings",
        data: [44, 55, 41, 67],
      },
    ],
    options: {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Bananas are good",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: ["Day 1", "Day 2", "Day 3", "Day 4"],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Servings",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  };

  const materialTracking = {
    series: [
      {
        name: "Actual Cost",
        data: !tableBody
          ? []
          : tableBody?.map((i) => {
              return i?.spent_cost;
            }),
      },
      {
        name: "Planned Cost",
        data: !planned_materials
          ? []
          : planned_materials?.map((i) => {
              return i?.cost;
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
        categories: !tableBody
          ? []
          : tableBody?.map((i) => {
              return i?.name;
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
            return "$ " + val + " INR";
          },
        },
      },
    },
  };

  const total_actual_cost =
    tableBody?.reduce((a, b) => a + Number(b?.spent_cost), 0) || 0;
  const total_planned_cost =
    planned_materials?.reduce((a, b) => a + Number(b?.cost), 0) || 0;

  // console.log(phaseData?.find((i)=>i===Number(phaseNo)))

  return (
    <>
      <div className="mt-[8%] w-full flex justify-evenly bg-purple-600 text-white  py-2 font-bold text-xl">
        <p>Material Description</p>
      </div>
      <p className="bg-blue-200 px-5 font-bold text-yellow-800 ">Actual Status</p>
      <CustomTable
        className={""}
        isLoding={false}
        tablehead={[
          <span>Material</span>,
          <span>Category</span>,
          <span>Varients Name</span>,
          <span>Quantity</span>,
          <span>Unit</span>,
          <span>Cost</span>,
        ]}
        tablerow={tableBody?.map((i) => {
          return [
            <span
              className="text-blue-800 cursor-pointer"
              onClick={() => navigate("/material/material-details/19")}
            >
              {i?.name}
            </span>,
            <span>{i?.category}</span>,
            <span>{i?.varients}</span>,
            <span
            // onClick={() => setopenCustomDialogBox(true)}
            // className="text-blue-700 cursor-pointer"
            >
              {i?.qnt}
            </span>,
            <span>{i?.unit_of_measure}</span>,
            <span>{i?.spent_cost}</span>,
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
          <span>Material</span>,
          <span>Category</span>,
          <span>Varients Name</span>,
          <span>Quantity</span>,
          <span>Unit</span>,
          <span>Cost</span>,
        ]}
        tablerow={planned_materials?.map((i) => {
          return [
            <span
              className="text-blue-800 cursor-pointer"
              onClick={() => navigate("/material/material-details/19")}
            >
              {i?.materials}
            </span>,
            <span>{i?.category}</span>,
            <span>{i?.varients}</span>,
            <span
            // onClick={() => setopenCustomDialogBox(true)}
            // className="text-blue-700 cursor-pointer"
            >
              {i?.quantity}
            </span>,
            <span>{i?.unit_of_measure}</span>,
            <span>{i?.cost}</span>,
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

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={
            <div className="grid grid-cols-2">
              <CustomTable
                className={""}
                isLoding={false}
                tablehead={[
                  <span>Days</span>,
                  <span>Spent Amount</span>,
                  <span>Remaiing Amount</span>,
                  <span>Total Amount</span>,
                  <span>Cost (INR)</span>,
                ]}
                tablerow={[
                  {
                    no: "1",
                    name: "2",
                    phase: "6",
                    total: "8",
                    cost: "200INR",
                  },
                  {
                    no: "2",
                    name: "2",
                    phase: "4",
                    total: "8",
                    cost: "200INR",
                  },
                ].map((i) => {
                  return [
                    <span>{i?.no}</span>,
                    <span>{i?.name}</span>,
                    <span>{i?.phase}</span>,
                    <span>{i?.total}</span>,
                    <span>{i?.cost}</span>,
                  ];
                })}
              />
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div>
          }
          title={`Day Wise Progress`}
        />
      )}
    </>
  );
};

export default MaterialDescription;
