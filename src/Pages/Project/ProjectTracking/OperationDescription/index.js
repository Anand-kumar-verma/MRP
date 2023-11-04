import React from "react";
import ReactApexChart from "react-apexcharts";
import CustomDialogBox from "../../../../Shared/CustomDialogBox";
import CustomTable from "../../../../Shared/CustomTable";
import { API_URLS } from "../../../../Config/apiUrls";
import axiosInstance from "../../../../Config/axios";

const OperationDescription = ({
  project_type,
  phaseNo,
  phaseData,
  p_name,
  plan_project_id,
}) => {
  const [openCustomDialogBox, setopenCustomDialogBox] = React.useState(false);
  const [planned_data, setPlanned_data] = React.useState({});

  React.useEffect(() => {
    axiosInstance
      .get(API_URLS?.projectPlanningDetails, {
        params: { planning_project_id: plan_project_id },
      })
      .then((res) => setPlanned_data(res?.data?.data?.[0] || {}))
      .catch((e) => console.log(e));
  }, [plan_project_id]);

  const planned_operations =
    (project_type === "Tactical" &&
      planned_data?.phases_on_planning_project
        ?.find((i) => i?.phase_name === p_name)
        ?.operations_on_planning_project?.map((mat) => {
          return {
            operations: mat?.operations?.stage,
            description: mat?.operations?.description,
            cost: mat?.cost,
            time: mat?.time,
            start_date: mat?.start_date?.slice(0, 10),
            end_date: mat?.end_date?.slice(0, 10),
          };
        })) ||
    (project_type === "Operational" &&
      planned_data?.work_order_or_task_on_planning_project
        ?.find((i) => i?.work_order_or_task_name === p_name)
        ?.operations_on_planning_project?.map((mat) => {
          return {
            operations: mat?.operations?.stage,
            description: mat?.operations?.description,
            cost: mat?.cost,
            time: mat?.time,
            start_date: mat?.start_date?.slice(0, 10),
            end_date: mat?.end_date?.slice(0, 10),
          };
        })) ||
    planned_data?.phases_on_planning_project
      ?.find((i) => i?.phase_name === p_name)
      ?.milestone_on_phases_on_planning_project?.find(
        (item) =>
          item?.milestone_name ===
          phaseData?.find((i) => i.id === Number(phaseNo))?.milestone_name
      )
      ?.operations_on_planning_project?.map((mat) => {
        return {
          operations: mat?.operations?.stage,
          description: mat?.operations?.description,
          cost: mat?.cost,
          time: mat?.time,
          start_date: mat?.start_date?.slice(0, 10),
          end_date: mat?.end_date?.slice(0, 10),
        };
      }) ||
    [];

  const tableBody = phaseData
    ?.find((i) => i?.id === Number(phaseNo))
    ?.operations_on_project?.map((item) => {
      return {
        id: item?.id || "",
        name: item?.operations?.stage || "--",
        description: item?.operations?.description || "--",
        cost_per_hour: item?.operations?.cost_per_hour || "--",
        time: item?.operations?.time || "--",
        start_date: item?.start_date?.slice(0, 10) || "",
        end_date: item?.end_date?.slice(0, 10) || "",
      };
    });

  console.log(planned_operations);

  const total_actual_cost =
    tableBody?.reduce((a, b) => a + Number(b?.time), 0) || 0;
  const total_planned_cost =
    planned_operations?.reduce((a, b) => a + Number(b?.time), 0) || 0;

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
        name: "Actual Time",
        data: !tableBody
          ? []
          : tableBody?.map((i) => {
              return Number(i?.time);
            }),
      },
      {
        name: "Planned Time",
        data: !planned_operations
          ? []
          : planned_operations?.map((i) => {
              return Number(i?.time);
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
          ? [""]
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
            return "$ " + val + " I";
          },
        },
      },
    },
  };

  return (
    <>
      <div className="mt-[5%] w-full flex justify-evenly bg-purple-600 text-white  py-2 font-bold text-xl">
        <p>Operation Description</p>
      </div>
      <p className="bg-blue-200 px-5 font-bold text-yellow-800 ">Actual Status</p>
      <CustomTable
        className={""}
        isLoding={false}
        tablehead={[
          <span>Operation</span>,
          <span>Description</span>,
          <span>Cost/hrs</span>,
          <span>Time</span>,
          <span>start_date</span>,
          <span>end_date</span>,
        ]}
        tablerow={tableBody?.map((i) => {
          return [
            <span className="text-blue-800 cursor-pointer">{i?.name}</span>,
            <span>{i?.description}</span>,
            <span>{i?.cost_per_hour}</span>,
            <span
              className="text-blue-700 cursor-pointer"
              // onClick={()=>setopenCustomDialogBox(true)}
            >
              {i?.time}
            </span>,
            <span>{i?.start_date}</span>,
            <span>{i?.end_date}</span>,
          ];
        })}
      />
      <div className="w-full bg-green-200 flex justify-end">
        <p className="px-10 py-2">
          Total Time:{" "}
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
          <span>Operation</span>,
          <span>Description</span>,
          <span>Cost/hrs</span>,
          <span>Time</span>,
          <span>start_date</span>,
          <span>end_date</span>,
        ]}
        tablerow={planned_operations?.map((i) => {
          return [
            <span className="text-blue-800 cursor-pointer">
              {i?.operations}
            </span>,
            <span>{i?.description}</span>,
            <span>{i?.cost}</span>,
            <span
              className="text-blue-700 cursor-pointer"
              // onClick={()=>setopenCustomDialogBox(true)}
            >
              {i?.time}
            </span>,
            <span>{i?.start_date}</span>,
            <span>{i?.end_date}</span>,
          ];
        })}
      />
      <div className="w-full bg-green-200 flex justify-end">
        <p className="px-10 py-2">
          Total Time:{" "}
          <span className="font-bold text-xl text-blue-600">
            {total_planned_cost || 0.0}
            INR
          </span>
        </p>
      </div>
      <div className="w-full bg-green-500 flex justify-end">
        <p className="px-10 py-2">
          Net Time:{" "}
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

export default OperationDescription;
