import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnitsandMeasurements from "../../../src/Pages/Setting/UnitsandMeasurements";
const Setting = () => {
  const navigate = useNavigate();
  const [component, setComponent] = useState("Units and Measurements");

  const side_setting = [
    // {
    //   id: 1,
    //   navLink: "/setting/general-setting",
    //   navItem: "General Setting",
    // },
    {
      id: 2,
      navLink: "/setting/units-measurements",
      navItem: "Units and Measurements",
    },
    {
      id: 3,
      navLink: "/setting/category",
      navItem: "Category",
    },
    {
      id: 4,
      navLink: "/mrp/production-operations",
      navItem: "Production Operations",
    },
    {
      id: 5,
      navLink: "/designation/add-designation",
      navItem: "Designation",
    },
    {
      id: 6,
      navLink: "/setting/permission",
      navItem: "Permission",
    },
  ];

  function handleFunction(SingleData) {
    navigate(SingleData.navLink);
    setComponent(SingleData.navItem);
  }
  return (
    <>
      <div className=" w-full h-full ">
        <div className="flex gap-2  font-poppins text-gray-700 border-2">
          {side_setting.map((SingleData, index) => {
            return (
              <p
                onClick={() => handleFunction(SingleData)}
                key={index}
                className={`${
                  component === SingleData.navItem
                    ? " border-b-2 border-blue-700 text-blue-500"
                    : "border-b-2 border-white"
                } rounded-lg cursor-pointer text-lg hover:bg-blue-300 p-1`}
              >
                {SingleData.navItem} <hr />
              </p>
            );
          })}
        </div>
        <div className="w-full h-[55vh]">
          <UnitsandMeasurements />
        </div>
      </div>
    </>
  );
};

export default Setting;
