import React, { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { MenuItem, TextField } from "@mui/material";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import ReactApexChart from "react-apexcharts";

const UpdateProjectStatus = () => {
  const [open, setOpen] = useState(false);
  const [phaseNo, setPhaseNo] = useState("");
  const [openCustomDialogBox, setOpenCustomDialogBox] = useState(false);

  const state = {
    series: [
      {
        name: "Progress",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Total",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
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
        categories: [
          "Penting",
          "Cutting",
          "Penting",
          "Penting",
          "Cutting",
          "Penting",
          "Penting",
          "Cutting",
          "Penting",
        ],
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

  const progressInProject = {
    series: [
      {
        name: "Progress",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Total",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
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
        categories: [
          "Phase 1",
          "Phase 2",
          "Phase 3",
          "Phase 4",
          "Phase 5",
          "Phase 6",
          "Phase 7",
          "Phase 6",
          "Phase 7",
        ],
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
  return (
    <>
      <div className="bg-gray-100 p-4">
        <p className="text-xl font-bold text-gray-800 flex justify-between ">
          <span>PROJECT 1</span>
          <span className="pr-5 text-red-950">In Progress</span>
        </p>
        <p>Amit Kumar</p>
        <p className="font-bold">Updation On : 12/11/2023</p>

        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span>Phase</span>,
            <span>Start Date</span>,
            <span>End Date</span>,
            <span>Expected Time</span>,
            <span>Spent Time</span>,
            <span>Status</span>,
          ]}
          tablerow={[
            {
              no: "Phase 1",
              name: "12/11/2023",
              phase: "15/11/2023",
              start_date: "3 days",
              end_date: "2 days",
              cph: "In Progress",
            },
            {
              no: "Phase 2",
              name: "16/11/2023",
              phase: "18/11/2023",
              start_date: "5 days",
              end_date: "2 days",
              cph: "Hold",
            },
          ].map((i) => {
            return [
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setPhaseNo(i?.no);
                }}
              >
                {i?.no}
              </span>,
              <span>{i?.name}</span>,
              <span>{i?.phase}</span>,
              <span className="text-blue-700 cursor-pointer">
                {i?.start_date}
              </span>,
              <span>{i?.end_date}</span>,
              <span>{i?.cph}</span>,
            ];
          })}
        />

        <div>
          {open && (
            <div className="bg-white mt-10">
              <p className="text-white bg-blue-700 w-full p-2">{phaseNo}</p>
              <CustomTable
                className={""}
                isLoding={false}
                tablehead={[
                  <span>Operation</span>,
                  <span>Dead Line</span>,
                  <span>Assign To</span>,
                  <span>Date</span>,
                  <span>Spent Time(hrs)</span>,
                  <span>Status</span>,
                ]}
                tablerow={[
                  {
                    no: "Phase 1",
                    name: "12/11/2023",
                    phase: "15/11/2023",
                    start_date: "3 days",
                    end_date: "2 days",
                    cph: "In Progress",
                  },
                  {
                    no: "Phase 2",
                    name: "16/11/2023",
                    phase: "18/11/2023",
                    start_date: "5 days",
                    end_date: "2 days",
                    cph: "Hold",
                  },
                ].map((i) => {
                  return [
                    <span className="text-blue-800 cursor-pointer">
                      <TextField
                        id="operation"
                        variant="outlined"
                        disabled={true}
                        value={"Penting"}
                      />
                    </span>,
                    <span>
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="text"
                        disabled={true}
                        value={"2023/12/11"}
                      />
                    </span>,
                    <span>
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="text"
                        value={"vermaannd278@gmail.com"}
                        disabled={true}
                      />
                    </span>,
                    <span className="text-blue-700 cursor-pointer">
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="date"
                      />
                    </span>,
                    <div className="grid grid-cols-3 w-32">
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="number"
                        placeholder="H"
                        onChange={(e) =>
                          e.target.value > 12 ? 12 : e.target.value
                        }
                      />
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="number"
                        placeholder="M"
                      />
                      <TextField
                        id="operation"
                        variant="outlined"
                        type="number"
                        placeholder="S"
                      />
                    </div>,
                    <span
                      className="text-blue-800 cursor-pointer"
                      onClick={() => setOpenCustomDialogBox(true)}
                    >
                      New
                    </span>,
                  ];
                })}
              />
              <div id="chart">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  height={500}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white mt-10 ">
          <p className="p-4">Progress In Project</p>
          <ReactApexChart
            options={progressInProject.options}
            series={progressInProject.series}
            type="bar"
            height={500}
          />
        </div>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <div className="w-full pt-2 flex flex-col">
              <TextField
                id="operation"
                variant="outlined"
                type="text"
                select
                label="Select Status"
                className="!w-[20rem]"
                placeholder="Select Status"
                value={"New"}
              >
                <MenuItem value={"New"} selected>
                  New
                </MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"On Hold"}>On Hold</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
              </TextField>
              <TextField
                id="operation"
                variant="outlined"
                type="text"
                label="Description"
                multiline={true}
                rows={4}
                className="!w-[20rem] !mt-2"
                placeholder="Enter some description"
              />
              <TextField
                id="operation"
                variant="outlined"
                type="file"
                InputProps={{
                  shrink: true,
                }}
                className="!w-[20rem] !mt-2"
                placeholder="Enter some description"
              />
            </div>
          }
          title="Change Status:"
        />
      )}
    </>
  );
};

export default UpdateProjectStatus;
