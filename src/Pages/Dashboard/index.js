import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loding from "../../Loding";
import { category_distribution_pie_chart_Fn } from "../../Services/Dashboard/CategoryDistibutionPieChart";
import { donut_chart_production_Fn } from "../../Services/Dashboard/DonutChartProduction";
import { donut_chart_resources_Fn } from "../../Services/Dashboard/DonutChartResource";
import { AiOutlineRightCircle } from "react-icons/ai";
import { getMaterialsInventoryList } from "../../Services/Inventory/MaterialsInventoryList";
import { getProductInventoryList } from "../../Services/Inventory/ProductInventoryList";
import { useQuery } from "react-query";
import { ProjectListFn } from "../../Services/Project/AllProjectList";
import { TaskListFunction } from "../../Services/Task/TaskList";

const Dashboard = () => {

  const [page,setpage] = useState(1)
 const [pageCount,setpageCount] =useState(1000000)
 const [subData,setSubData] = useState("")
 const [searchValue,setsearchValue] =useState("")
 const user_role = localStorage.getItem("role_user")
 /// data
  const [loding, setloding] = useState(false);
  const [cat_distribution, setCat_distribution] = useState([]);
  const [donut_chart_production, setDonut_chart_production] = useState({});
  const [dont_chart_resources, setDont_chart_resources] = useState({});
  const [material_data,setmaterial_data] = useState([])
  const [filter_stock_data,setFilter_stock_data] = useState("instock ")
  const [filter_stock_data_product,setFilter_stock_data_product] = useState("instock ")

  const [product_data,setProduct_data ]  = useState([])

  // useEffect(() => {
  //   category_distribution_pie_chart_Fn({
  //     setloding,
  //     setData: setCat_distribution,
  //   });
  //   donut_chart_production_Fn({
  //     setloding,
  //     setData: setDonut_chart_production,
  //   });
  //   donut_chart_resources_Fn({
  //     setloding,
  //     setData: setDont_chart_resources,
  //   });

  //   getMaterialsInventoryList({
  //     setloding,
  //       page,
  //       pageCount,
  //       setproduct:setmaterial_data,
  //       setSubData,
  //       searchValue
  //   })
  //   getProductInventoryList({
  //      setloding,
  //       page,
  //       pageCount,
  //       setproduct : setProduct_data,
  //       setSubData,
  //       searchValue
  //   })


  // }, []);


  // const { data } = useQuery(
  //   ["projectlist"],
  //   () => ProjectListFn({ search:"", limit: "" }),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //     onSuccess: (res) => {
  //       console.log("response", res);
  //     },
  //   }
  // );
  // const project_data = data?.data?.data || []

  // const { data: taskList } = useQuery(
  //   ["taskList"],
  //   () => TaskListFunction({ search: "" }),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  const task_data = []

  // console.log(project_data);

  // api's data
  const time_series_material_data ={
    series: [
      {
        name: "Material",
        data:[10,80,9,40]
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Material Stock Status",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Sand','Stone','Cement','Moltar']
      },
    },
  };

  //api's data
  const time_series_Product_data ={
    series: [
      {
        name: "Material",
        data:[100,20,40,200]
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Stock Status",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Sand','Stone','Cement','Moltar']
      },
    },
  };

  // api's data
  const category_distribution = {
    series: [
     10 || 0,
     20 || 0,
      6 || 0,
    ],
    options: {
      chart: {
        width: 350,
        type: "pie",
      },
      labels: ["Used in Hrs.", "Cost", "Qnt Produced"],
      // labels: ["", "", ""],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const stacked_barchart = {
    series: [{data:[10,20,30,30]},{data:[10,20,30,30]},{data:[10,20,30,30]}]
,
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Tsk with stimated time,spent time , remaining time and spent cost:",
      },
      xaxis: {
        categories: !task_data ? [] : task_data?.map((i)=>{
          return i?.id
        }),
        labels: {
          formatter: function (val) {
            return "";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  const scatter_chart = {
    series: [
      {
        name: "SAMPLE A",
        data: [
          [16.4, 5.4],
          [21.7, 2],
          [25.4, 3],
          [19, 2],
          [10.9, 1],
          [13.6, 3.2],
          [10.9, 7.4],
          [10.9, 0],
          [10.9, 8.2],
          [16.4, 0],
          [16.4, 1.8],
          [13.6, 0.3],
          [13.6, 0],
          [29.9, 0],
          [27.1, 2.3],
          [16.4, 0],
          [13.6, 3.7],
          [10.9, 5.2],
          [16.4, 6.5],
          [10.9, 0],
          [24.5, 7.1],
          [10.9, 0],
          [8.1, 4.7],
          [19, 0],
          [21.7, 1.8],
          [27.1, 0],
          [24.5, 0],
          [27.1, 0],
          [29.9, 1.5],
          [27.1, 0.8],
          [22.1, 2],
        ],
      },
      {
        name: "SAMPLE B",
        data: [
          [36.4, 13.4],
          [1.7, 11],
          [5.4, 8],
          [9, 17],
          [1.9, 4],
          [3.6, 12.2],
          [1.9, 14.4],
          [1.9, 9],
          [1.9, 13.2],
          [1.4, 7],
          [6.4, 8.8],
          [3.6, 4.3],
          [1.6, 10],
          [9.9, 2],
          [7.1, 15],
          [1.4, 0],
          [3.6, 13.7],
          [1.9, 15.2],
          [6.4, 16.5],
          [0.9, 10],
          [4.5, 17.1],
          [10.9, 10],
          [0.1, 14.7],
          [9, 10],
          [12.7, 11.8],
          [2.1, 10],
          [2.5, 10],
          [27.1, 10],
          [2.9, 11.5],
          [7.1, 10.8],
          [2.1, 12],
        ],
      },
      {
        name: "SAMPLE C",
        data: [
          [21.7, 3],
          [23.6, 3.5],
          [24.6, 3],
          [29.9, 3],
          [21.7, 20],
          [23, 2],
          [10.9, 3],
          [28, 4],
          [27.1, 0.3],
          [16.4, 4],
          [13.6, 0],
          [19, 5],
          [22.4, 3],
          [24.5, 3],
          [32.6, 3],
          [27.1, 4],
          [29.6, 6],
          [31.6, 8],
          [21.6, 5],
          [20.9, 4],
          [22.4, 0],
          [32.6, 10.3],
          [29.7, 20.8],
          [24.5, 0.8],
          [21.4, 0],
          [21.7, 6.9],
          [28.6, 7.7],
          [15.4, 0],
          [18.1, 0],
          [33.4, 0],
          [16.4, 0],
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
    },
  };

  const heatmap_chart = {
    series: [
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
      {
        name: "Jan",
        data: [10, 29, 30, 40, 10, 29, 30, 40],
      },
    ],
    options: {
      chart: {
        height: 450,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29",
      ],
      xaxis: {
        type: "category",
        categories: [
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
        ],
      },
      title: {
        text: "Heatmap with Profit Overlay:",
      },
      grid: {
        padding: {
          right: 20,
        },
      },
    },
  };

  // api's data
  const limit_min_max_chart = {
    series: [
      {
        type: "boxPlot",
        data:
        [1,2,3,4]?.map((i)=>{
          return {
            x: "Disign Building" || "",
            y: [200 || 0, 300 || 0, 400|| 0, 100 || 0,3 || 0],
          }
        })
      },
    ],
    options: {
      chart: {
        type: "boxPlot",
        height: 350,
      },
      title: {
        text: "Material Cost Vs. Operational Cost",
        align: "left",
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#5C4742",
            lower: "#A5978B",
          },
        },
      },
    },
  };

  // api's data
  const donut_chart = {
    series: [10,30] || [0, 0],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return "";
        },
      },
      title: {
        text: "Category & Quantity",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  // api's data
  const donut_chart_resources = {
    series: [23,23] || [0, 0],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return "";
        },
      },
      title: {
        text: "Resources & Quantity",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const area_chart = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  const additional_chart = {
    series: [
      {
        name: "Network",
        data: [
          {
            x: "Dec 23 2017",
            y: null,
          },
          {
            x: "Dec 24 2017",
            y: 44,
          },
          {
            x: "Dec 25 2017",
            y: 31,
          },
          {
            x: "Dec 26 2017",
            y: 38,
          },
          {
            x: "Dec 27 2017",
            y: null,
          },
          {
            x: "Dec 28 2017",
            y: 32,
          },
          {
            x: "Dec 29 2017",
            y: 55,
          },
          {
            x: "Dec 30 2017",
            y: 51,
          },
          {
            x: "Dec 31 2017",
            y: 67,
          },
          {
            x: "Jan 01 2018",
            y: 22,
          },
          {
            x: "Jan 02 2018",
            y: 34,
          },
          {
            x: "Jan 03 2018",
            y: null,
          },
          {
            x: "Jan 04 2018",
            y: null,
          },
          {
            x: "Jan 05 2018",
            y: 11,
          },
          {
            x: "Jan 06 2018",
            y: 4,
          },
          {
            x: "Jan 07 2018",
            y: 15,
          },
          {
            x: "Jan 08 2018",
            y: null,
          },
          {
            x: "Jan 09 2018",
            y: 9,
          },
          {
            x: "Jan 10 2018",
            y: 34,
          },
          {
            x: "Jan 11 2018",
            y: null,
          },
          {
            x: "Jan 12 2018",
            y: null,
          },
          {
            x: "Jan 13 2018",
            y: 13,
          },
          {
            x: "Jan 14 2018",
            y: null,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        animations: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.8,
        type: "pattern",
        pattern: {
          style: ["verticalLines", "horizontalLines"],
          width: 5,
          height: 6,
        },
      },
      markers: {
        size: 5,
        hover: {
          size: 9,
        },
      },
      title: {
        text: "Additional Profit over time",
      },
      tooltip: {
        intersect: true,
        shared: false,
      },
      theme: {
        palette: "palette1",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Bytes Received",
        },
      },
    },
  };

  if (loding) return <Loding />;
  return (
    <>
      <div>
        <div className="w-full   grid grid-cols-2 gap-5">
          <div className="bg-white rounded-lg py-3 ">
            <p className="flex gap-4 px-2">
              <span 
              onClick={()=>setFilter_stock_data("instock")}
              className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer">
                IN STOCK
              </span>
              <span 
              onClick={()=>setFilter_stock_data("outstock")}
              className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer">
                OUT STOCK
              </span>
            </p>
            <ReactApexChart
              options={time_series_material_data.options}
              series={time_series_material_data.series}
              type="line"
              height={500}
            />
          </div>
          {user_role === "Manufacturer Based" &&
            <div className="bg-white rounded-lg py-3 ">
            <p className="flex gap-4 px-2">
              <span 
              onClick={()=>setFilter_stock_data_product("instock")}
              className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer">
                IN STOCK
              </span>
              <span 
              onClick={()=>setFilter_stock_data_product("outstock")}
              className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer">
                OUT STOCK
              </span>
            </p>
            <ReactApexChart
              options={time_series_Product_data.options}
              series={time_series_Product_data.series}
              type="line"
              height={500}
            />
          </div>
          }
          {user_role === "Manufacturer Based" && <div className="bg-white rounded-lg py-3 ">
            <p className="pl-5">Category Distribution with Production:</p>
            {/* <select
            className="outline-none"
            onChange={(e)=>setProject(e.target.value)}
            >
            {
              data?.data?.data ? [...data?.data?.data] : [].map((i)=>{
                return <optioin value={i?.id}>{i?.project_name}</optioin>
              })
              }
            </select> */}
            <ReactApexChart
              options={category_distribution.options}
              series={category_distribution.series}
              type="pie"
              width={500}
            />
          </div>}
          <div className=" bg-white py-3 rounded-xl">
            <ReactApexChart
              options={stacked_barchart.options}
              series={stacked_barchart.series}
              type="bar"
              height={490}
            />
          </div>
          <div className=" bg-white py-3 rounded-xl">
            <ReactApexChart
              options={scatter_chart.options}
              series={scatter_chart.series}
              type="scatter"
              height={500}
            />
          </div>

          <div className=" bg-white py-3 rounded-xl">
            <ReactApexChart
              options={heatmap_chart.options}
              series={heatmap_chart.series}
              type="heatmap"
              height={450}
            />
          </div>

          <div className=" bg-white py-3 rounded-xl">
            <ReactApexChart
              options={limit_min_max_chart.options}
              series={limit_min_max_chart.series}
              type="boxPlot"
              height={500}
            />
            <div className="flex gap-2 text-gray-900 text-sm">
              <span>Max:Phase</span>
              <span>
              Q3:Total Price</span>
              <span>Mid:Total Amount</span>
              <span>Q1:Material Amount</span>
              <span>Min:Operation Amount</span>
            </div>
          </div>

         { user_role === "Manufacturer Based" && <div className="flex bg-white py-3 rounded-xl">
            <ReactApexChart
              options={donut_chart.options}
              series={donut_chart.series}
              type="donut"
              width={500}
            />
            <div className="h-full flex flex-col justify-center items-center ">
              {donut_chart_production?.categories &&
                donut_chart_production?.categories?.map((i) => {
                  return (
                    <p>
                      <span className="flex items-center gap-1">
                        <AiOutlineRightCircle color="blue" />
                        <span>{i}</span>
                      </span>
                    </p>
                  );
                })}
            </div>
          </div>
          }
         
          
          {user_role === "Manufacturer Based" &&  <div className="bg-white py-3 rounded-xl flex">
            <ReactApexChart
              options={donut_chart_resources.options}
              series={donut_chart_resources.series}
              type="donut"
              width={500}
            />
         

            <div className="h-full flex flex-col justify-center items-center ">
              {dont_chart_resources?.Resources &&
                dont_chart_resources?.Resources?.map((i) => {
                  return (
                    <p>
                      <span className="flex items-center gap-1">
                        <AiOutlineRightCircle color="blue" />
                        <span>{i}</span>
                      </span>
                    </p>
                  );
                })}
            </div>
          </div>}
          <div className=" bg-white py-3 rounded-xl ">
            <p className="px-5">Area Chart with Profit Over Time:</p>
            <ReactApexChart
              options={area_chart.options}
              series={area_chart.series}
              type="area"
              height={350}
            />
          </div>
          <div className=" bg-white py-3 rounded-xl col-span-2">
            <ReactApexChart
              options={additional_chart.options}
              series={additional_chart.series}
              type="area"
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
