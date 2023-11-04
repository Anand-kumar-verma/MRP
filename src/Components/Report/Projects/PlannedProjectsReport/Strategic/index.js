import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
const StrategicReport = () => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    theme: "dark2",
    animationEnabled: true,
    exportFileName: "Strategic Chart",
    exportEnabled: true,
    title: {
      text: "All Chart Data",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
        dataPoints: [
          { y: 32, label: "Health" },
          { y: 22, label: "Finance" },
          { y: 15, label: "Education" },
          { y: 19, label: "Career" },
          { y: 5, label: "Family" },
          { y: 7, label: "Real Estate" },
        ],
      },
    ],
  };
  return (
    <div>
      <h4>Strategic</h4>
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    </div>
  );
};

export default StrategicReport;
