import { TextField } from "@mui/material";
import React from "react";
import ColumnGroupingTable from "./Table";
import { useFormik } from "formik";

const Calculator = () => {
    const initialValue = {
        area:0
    }

    const fk = useFormik({
        initialValues:initialValue,
        onSubmit:()=>{
            console.log(fk.values)
        }
    })


  return (
    <div>
      <div>
        <p>Enter Area in Square Feet</p>
        <TextField
          type="number"
          id="area"
          name="area"
          placeholder="Enter size of area"
          onChange={fk.handleChange}
        />
      </div>
      <ColumnGroupingTable fk={fk} />
    </div>
  );
};

export default Calculator;
