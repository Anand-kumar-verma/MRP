import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../../Config/apiUrls";
import { baseUrl } from "../../../../URls";
import { toast } from "react-toastify";
import axiosInstance from "../../../../Config/axios";

const BasicData = ({ formik, setproject_id, project_id }) => {
  const [projecList, setProjectList] = useState([]);

  async function getProjectData() {
    axiosInstance
      .get(`${API_URLS.project}`)
      .then((res) => setProjectList(res?.data?.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProjectData();
  }, []);

  // console.log(projecList)

  return (
    <div className="grid grid-cols-4 gap-5 pt-10">
      <TextField
        required
        select
        id="project_name"
        name="project_name"
        label="Enter Project Name"
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={project_id}
        onChange={(e) => setproject_id(e.target.value)}
      >
        {projecList?.map((i) => {
          return (
            <MenuItem
              value={i?.id}
            >{`${i?.project_name} | ${i?.customer?.email}`}</MenuItem>
          );
        })}
      </TextField>

      <TextField
        required
        id="customer"
        name="customer"
        label="Select Customer"
        placeholder="Select Customer"
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.customer_name}
        // onChange={formik.handleChange}
      />

      <TextField
        required
        id="start_date"
        name="start_date"
        label="Start Date"
        type="date"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.estimate_date}
        onChange={formik.handleChange}
      />
      <TextField
        required
        id="end_date"
        name="end_date"
        label="End Date"
        type="date"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.end_date}
        onChange={formik.handleChange}
      />

      <TextField
        required
        id="project_type"
        name="project_type"
        label="Type of project"
        className="!w-full"
        placeholder="select operation"
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.project_type}
        // onChange={formik.handleChange}
      />

      <TextField
        select
        id="subproject_of"
        name="subproject_of"
        label="Subproject Of"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.subproject_of}
        onChange={formik.handleChange}
      >
        <MenuItem value={""}>--</MenuItem>
      </TextField>

      <TextField
        required
        id="no_of_phase"
        name="no_of_phase"
        label="No of Phases"
        type="number"
        placeholder="1"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.phase_data?.length}
        // onChange={formik.handleChange}
      />
      {formik.values.type_tax === "IGST" ? (
        <TextField
          required
          id="tax"
          select
          name="tax"
          label="IGST"
          type="number"
          placeholder="1"
          sx={{ color: "red" }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.tax}
          onChange={formik.handleChange}
        >
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={12}>12%</MenuItem>
          <MenuItem value={18}>18%</MenuItem>
          <MenuItem value={28}>28%</MenuItem>
        </TextField>
      ) : (
        <TextField
          required
          id="tax"
          select
          name="tax"
          label="GST"
          type="number"
          placeholder="1"
          sx={{ color: "red" }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.tax}
          onChange={formik.handleChange}
        >
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={12}>12%</MenuItem>
          <MenuItem value={18}>18%</MenuItem>
          <MenuItem value={28}>28%</MenuItem>
        </TextField>
      )}

      <TextField
        required
        className="col-span-3"
        id="description"
        name="description"
        label="Description"
        placeholder="Enter Description"
        type="text"
        multiline
        rows={2}
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.description}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default BasicData;
