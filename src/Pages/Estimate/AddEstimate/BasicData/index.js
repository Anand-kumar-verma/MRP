import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../../Config/apiUrls";
import { baseUrl } from "../../../../URls";
import { toast } from "react-toastify";

const BasicData = ({ formik }) => {
  const [customer, setcustomer] = React.useState([]);
  const [loding, setloding] = useState(false);

  useEffect(() => {
    formik.setFieldValue(
      "type_tax",
      customer?.filter(
        (i) => i.customer_id === Number(formik.values.customer)
      )[0]?.type_tax === "IGST"
        ? "IGST"
        : "GST"
    );
  }, [formik.values.customer]);

  async function getcustomerFn() {
    setloding(true);
    try {
      const response = await axios.get(`${baseUrl}${API_URLS?.customers}`, {
        headers: {
          Authorization: localStorage.getItem("erp_token"),
          "Content-Type": "application/json",
        },
      });
      setcustomer(response?.data?.data);

    } catch (e) {
      console.log(e);
      toast.warn("Something went wrong");
    }
    setloding(false);
  }

  useEffect(() => {
    getcustomerFn();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-5 pt-10">
      <TextField
        required
        id="customer"
        name="customer"
        label="Select Customer"
        placeholder="Select Customer"
        type="text"
        select
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.customer}
        onChange={formik.handleChange}
      >
        {customer?.map((i) => {
          return <MenuItem value={i?.customer_id}>{i?.email}</MenuItem>;
        })}
      </TextField>

      <TextField
        required
        id="estimate_no"
        name="estimate_no"
        label="Estimate No."
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.estimate_no}
        onChange={formik.handleChange}
      />

      <TextField
        required
        id="estimate_date"
        name="estimate_date"
        label="Estimate Date"
        type="date"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.estimate_date}
        onChange={formik.handleChange}
      />
      <TextField
        required
        id="expiry_date"
        name="expiry_date"
        label="Expiry Date"
        type="date"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.expiry_date}
        onChange={formik.handleChange}
      />

      <TextField
        required
        id="project_name"
        name="project_name"
        label="Enter Project Name"
        type="text"
        sx={{ color: "red" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.project_name}
        onChange={formik.handleChange}
      />
      <TextField
        required
        id="project_type"
        name="project_type"
        select
        label="Type of project"
        className="!w-full"
        placeholder="select operation"
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.project_type}
        onChange={formik.handleChange}
      >
        {/* <MenuItem value={1}>mile Stone</MenuItem> */}

        <MenuItem value={"Strategic"}>Strategic</MenuItem>
        <MenuItem value={"Tactical"}>Tactical</MenuItem>
        <MenuItem value={"Operational"}>Operational</MenuItem>
      </TextField>

      <TextField
        select
        id="subproject_of"
        name="subproject_of"
        label="Subproject Of"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={formik.values.subproject_of}
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
        disabled
        value={formik.values.phase_data.length}
        // onChange={formik.handleChange}
      />
      {formik.values.customer &&
      customer?.filter(
        (i) => i.customer_id === Number(formik.values.customer)
      )[0]?.type_tax === "IGST" ? (
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
