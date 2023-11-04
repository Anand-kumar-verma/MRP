import React, { useState } from "react";
import CustomDialogBox from "../../../../Shared/CustomDialogBox";
import { MenuItem, TextField } from "@mui/material";

const AllCalculation = ({ formik }) => {
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);

  const totalAmount =
    Number(Number((
      formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) +
      (formik.values.material_data?.reduce((a, b) => a + Number(b?.cost), 0) *
        formik.values.material_tax) /
        100
    ).toFixed(2)) +

    Number((
      formik.values.operation_data?.reduce((a, b) => a + Number(b?.cost), 0) +
        (formik.values.operation_data?.reduce(
          (a, b) => a + Number(b?.cost),
          0
        ) *
          formik.values.operational_tax) /
          100
    ).toFixed(2))).toFixed(2);



  const total_price =
    Number(
      formik.values.operation_data
        ?.reduce((a, b) => a + Number(b?.cost), 0)
        .toFixed(2)
    ) +
    Number(
      formik.values.material_data
        ?.reduce((a, b) => a + Number(b?.cost), 0)
        .toFixed(2)
    );

  return (
    <div className="w-full flex justify-end pt-5">
      <div className=" grid grid-cols-2">
        <p className="grid grid-cols-2">
          <span></span>
          <span>Total Phases:</span>
        </p>
        <p className="font-bold text-lg pl-2">
          {formik.values.phase_data.length}
        </p>
        <p className="grid grid-cols-2">
          <span
            className="text-blue-800 cursor-pointer"
            onClick={() => setopenCustomDialogBox(true)}
          >
            + TAX
          </span>
          <span>Opration Cost:</span>
        </p>
        <p className="font-bold text-lg pl-2">
          {(
            formik.values.operation_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) +
            (formik.values.operation_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) *
              formik.values.operational_tax) /
              100
          ).toFixed(2)}{" "}
          INR
        </p>
        {/* operational_tax:"",
    material_tax:"" */}
        <p className="grid grid-cols-2">
          <span
            className="text-blue-800 cursor-pointer"
            onClick={() => setopenCustomDialogBox(true)}
          >
            + TAX
          </span>
          <span>Material Cost:</span>
        </p>
        <p className="font-bold text-lg pl-2">
          {(
            formik.values.material_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) +
            (formik.values.material_data?.reduce(
              (a, b) => a + Number(b?.cost),
              0
            ) *
              formik.values.material_tax) /
              100
          ).toFixed(2)}{" "}
          INR
        </p>

        {/* <p className="grid grid-cols-2">
          <span></span> */}
        {/* <span>Total Price:</span> */}
        {/* </p> */}

        {/* <p className="font-bold text-lg pl-2">{total_price} INR</p> */}

        {/* <p className="font-bold text-lg pl-2">{formik.values.tax} %</p> */}
        <p className="grid grid-cols-2">
          <span></span>
          <span>Net Amount:</span>
        </p>
        <p className="font-bold text-lg pl-2">{totalAmount} INR</p>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={
            <div className="flex flex-col gap-5 mt-10">
              <TextField
                select
                className="!w-[500px]"
                id="material_tax"
                name="material_tax"
                label="Material Tax"
                value={formik.values.material_tax}
                onChange={formik.handleChange}
              >
                <MenuItem value={5}>5%</MenuItem>
                <MenuItem value={12}>12%</MenuItem>
                <MenuItem value={18}>18%</MenuItem>
                <MenuItem value={28}>28%</MenuItem>
              </TextField>
              <TextField
                className="!w-[500px]"
                select
                id="operational_tax"
                name="operational_tax"
                label="Operational Tax"
                value={formik.values.operational_tax}
                onChange={formik.handleChange}
              >
                <MenuItem value={5}>5%</MenuItem>
                <MenuItem value={12}>12%</MenuItem>
                <MenuItem value={18}>18%</MenuItem>
                <MenuItem value={28}>28%</MenuItem>
              </TextField>
              <div
                onClick={() => setopenCustomDialogBox(false)}
                className="bg-blue-800 rounded-lg py-2 text-white text-center text-xl cursor-pointer"
              >
                OK
              </div>
            </div>
          }
          title={"Add Tax: "}
        />
      )}
    </div>
  );
};

export default AllCalculation;
