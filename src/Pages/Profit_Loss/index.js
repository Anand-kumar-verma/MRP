import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "../../Config/axios";
import { API_URLS } from "../../Config/apiUrls";

const Profit_Loss = () => {
const [cost,setCost] = useState(0)
const [projectData,setProjectData] = useState([])


useEffect(()=>{
axiosInstance?.get(API_URLS?.project_list)?.then((res)=>setProjectData(res?.data?.data)).catch((e)=>console.log(e))
},[])

console.log(projectData)
const operational_cost = projectData?.reduce((a,b)=>a+Number(b?.operations_amount),0)
const material_cost = projectData?.reduce((a,b)=>a+Number(b?.materials_amount),0)

  const state = {
 series: [
      {
        name: "",
        data: [0,0,Number(operational_cost)+Number(material_cost),0],
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
          "Income",
          "Other Income",
          "Expenses",
          "Other Expenses",
        ],
      },
      yaxis: {
        title: {
          text: "INR",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return   val + " INR";
          },
        },
      },
    },
  };
  return (
    <div>

    <div className="grid grid-cols-2  ">
        <p className="font-bold bg-purple-400 p-2">Description</p>
        <p className="font-bold bg-purple-400 p-2">Amount</p>
        <p className="col-span-2 p-2 bg-purple-200">Income</p>
        <p className="p-2 bg-purple-100">Income</p>
        <p className="p-2 bg-purple-100">00INR</p>
        <p className="p-2 bg-purple-100">Other Income</p>
        <p className="p-2 bg-purple-100">00INR</p>

        <p className="col-span-2 p-2 bg-purple-200">Expenses</p>
        <p className="p-2 bg-purple-100">Expenses</p>
        <p className="p-2 bg-purple-100">{Number(operational_cost)+Number(material_cost)}INR</p>
        <p className="p-2 bg-purple-100">Other Expenses</p>
        <p className="p-2 bg-purple-100">00 INR</p>
     
        <p className="font-bold bg-purple-400 p-2">Net Profit / Loss</p>
        <p className="font-bold bg-purple-400 p-2">{Number(operational_cost)+Number(material_cost)}INR</p>
    </div>
      <div id="chart" className="bg-white p-2 mt-5">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default Profit_Loss;
