import React from 'react'

const AllCalculation = ({formik}) => {

    const totalAmount =
    Number(
      formik.values.operation_data
        ?.reduce((a, b) => a + Number(b?.cost), 0)
        .toFixed(2)
    ) +
    Number(
      formik.values.material_data
        ?.reduce((a, b) => a + Number(b?.cost), 0)
        .toFixed(2)
    ) +
    ((Number(
      formik.values.operation_data
        ?.reduce((a, b) => a + Number(b?.cost), 0)
        .toFixed(2)
    ) +
      Number(
        formik.values.material_data
          ?.reduce((a, b) => a + Number(b?.cost), 0)
          .toFixed(2)
      )) *
      Number(formik.values.tax)) /
      100;

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
      <p>Total Phases:</p>
      <p className="font-bold text-lg pl-2">
        {formik.values.phase_data.length}
      </p>
      <p>Opration Cost:</p>
      <p className="font-bold text-lg pl-2">
        {formik.values.operation_data
          ?.reduce((a, b) => a + Number(b?.cost), 0)
          .toFixed(2)}{" "}
        INR
      </p>
      <p>Material Cost:</p>
      <p className="font-bold text-lg pl-2">
        {formik.values.material_data
          ?.reduce((a, b) => a + Number(b?.cost), 0)
          .toFixed(2)}{" "}
        INR
      </p>
      <p>Total Price:</p>
      <p className="font-bold text-lg pl-2">
        {total_price} INR
      </p>
      <p>Tax:</p>
      <p className="font-bold text-lg pl-2">
        {formik.values.tax} %
      </p>
      <p>Net Amount:</p>
      <p className="font-bold text-lg pl-2">
        {totalAmount} INR
      </p>
    </div>
  </div>
  )
}

export default AllCalculation