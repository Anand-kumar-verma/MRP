import { Divider } from "@mui/material";
import React from "react";
import StrategicReport from "./Strategic";

const PlannedProjectsReport = () => {
  return (
    <div>
      <h2 className="text-center">Planned Projects Report</h2>
      <Divider />
      <StrategicReport />
      <div>
        <h4>Tactical</h4>
      </div>
      <div>
        <h4>Operational</h4>
      </div>
    </div>
  );
};

export default PlannedProjectsReport;
