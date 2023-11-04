import { MenuItem, TextField } from "@mui/material";
import React from "react";

const DetailsBasicData = ({ formik }) => {
  return (
    <div className="grid grid-cols-4 gap-5 pt-10">
      <TextField 
        disabled={formik?.values?.state ? true : false}
        size="small"
        required
        id="project_name"
        name="project_name"
        label="Project Name"
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.project_name}
        onChange={formik.handleChange}
      />
      {console.log(formik.values.project_type, "kkkkk1")}
      <TextField
        disabled={formik?.values?.state ? true : false}
        size="small"
        id="customer_name"
        name="customer_name"
        label="Customer"
        placeholder="Customer"
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.customer_name}
        onChange={formik.handleChange}
      />

      <TextField
        disabled={formik?.values?.state ? true : false}
        size="small"
        required
        id="start_date"
        name="start_date"
        label="Start Date"
        type="date"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.start_date}
        onChange={formik?.handleChange}
      />
      <TextField
        disabled={formik?.values?.state ? true : false}
        size="small"
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
        disabled={formik?.values?.state ? true : false}
        size="small"
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
        disabled={formik?.values?.state ? true : false}
        size="small"
        select
        id="subproject_of"
        name="subproject_of"
        label="Subproject Of"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values?.subproject_of}
        // onChange={formik.handleChange}
      >
        <MenuItem value={""}>--</MenuItem>
      </TextField>

      {formik?.values?.project_type !== "Operational" && (
        <TextField
          disabled={formik?.values?.state ? true : false}
          size="small"
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
      )}
      {formik.values.type_tax === "IGST" ? (
        <TextField
          disabled={formik?.values?.state ? true : false}
          size="small"
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
          <MenuItem value={0}>0%</MenuItem>
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={12}>12%</MenuItem>
          <MenuItem value={18}>18%</MenuItem>
          <MenuItem value={28}>28%</MenuItem>
        </TextField>
      ) : (
        <TextField
          size="small"
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
          <MenuItem value={5}>0%</MenuItem>
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={12}>12%</MenuItem>
          <MenuItem value={18}>18%</MenuItem>
          <MenuItem value={28}>28%</MenuItem>
        </TextField>
      )}

      <TextField
        disabled={formik?.values?.state ? true : false}
        size="small"
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

export default DetailsBasicData;
