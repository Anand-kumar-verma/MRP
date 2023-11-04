import React, { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "../../../Config/axios";
import { API_URLS } from "../../../Config/apiUrls";
import { useLocation } from "react-router-dom";

const DayBook = () => {
 const {state:state_data} = useLocation()
 const [emp_data,set_emp_data] = useState([])
console.log()

const emp_id = state_data?.emp_id || localStorage?.getItem("erp_employee_id")
const emp_name = state_data?.emp_name || localStorage?.getItem("erp_username")


  useEffect(() => {
    axiosInstance.get(`${API_URLS.day_book}?emp_id=${emp_id}`).then((res) => set_emp_data(res?.data?.data)).catch((e) => console.log(e))
  }, [])





  const tableBody = emp_data?.map((i)=>{
    return {
      
      start_date:i?.start_date?.slice(0,10) || "--",
      project_name:i?.project_name || "--",
      status:i?.status || "--",
      total_spent_time_by_emp:i?.total_spent_time_by_emp || 0,
      total_spent_cost_by_emp:i?.total_spent_cost_by_emp || 0
    }
  })


  const state = {
    series: [
      {
        data: !tableBody ? [] : tableBody?.map((i)=>{return i?.total_spent_cost_by_emp}),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories:!tableBody ? [] : tableBody?.map((i)=>{return i?.project_name}),
      },
    },
  };
  return (
    <>
      <div className="bg-gray-100 p-4">
        <p className="text-xl ">
          User : <span className="font-bold">{emp_name}</span>
        </p>
        <div className="mt-5">
              <CustomTable
                className={""}
                isLoding={false}
                tablehead={[
                  <span>Date</span>,
                  <span>Project</span>,
                  <span>Status</span>,
                  <span>Spent Time</span>,
                  <span>Cost</span>,
                ]}
                tablerow={tableBody.map((i) => {
                  return [
                    <span>{i?.start_date}</span>,
                    <span>{i?.project_name}</span>,
                    <span>{i?.status?.replaceAll("_"," ")}</span>,
                    <span>{i?.total_spent_time_by_emp}</span>,
                    <span>{i?.total_spent_cost_by_emp}</span>,
                  ];
                })}
              />

              <div className="w-full bg-green-200 flex justify-end flex items-center">
              <p className="px-10 py-2 text-center">
                  Total Time:{" "}
                  <span className="font-bold text-xl text-blue-600">
                    {tableBody?.reduce((a,b)=>a+Number(b?.total_spent_time_by_emp),0)} Hrs.
                  </span>
                </p>
                <p className="px-10 py-2 text-center">
                  Total Cost:{" "}
                  <span className="font-bold text-xl text-blue-600">
                    +{tableBody?.reduce((a,b)=>a+Number(b?.total_spent_cost_by_emp),0)} INR
                  </span>
                </p>
              </div>
            </div>
        <div id="chart" className="mt-10">
          <div className="bg-purple-700 text-white font-bold p-2 flex px-4 justify-between"><p>Project Vs Cost</p><p>Total Income : {tableBody?.reduce((a,b)=>a+Number(b?.total_spent_cost_by_emp),0)} INR</p></div>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
          
        </div>
      </div>
    </>
  );
};

export default DayBook;
