import React from "react";
import { LuLink } from "react-icons/lu";
import { mock_Project_Profit_loss, mock_Project_Report, mock_Sales_Report } from "../../Mock/Report_Mock";
import { mock_Manufacturing_Report } from "../../Mock/Report_Mock";
import { mock_Purchasing_Report } from "../../Mock/Report_Mock";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  return (
    <>
      <div className="grid grid-cols-2 h-full w-full gap-10 overflow-auto">
        {/* // Sales Report */}
        <div className="bg-gradient-to-b from-white to-gray-300 z-10 p-5 h-[90%] rounded-lg shadow-lg ">
          <p className="text-lg font-bold px-3 py-1">Sales Report:</p>
          <hr />
          <div className="text-blue-700 grid grid-cols-1 ">
            {mock_Sales_Report.map((singleData, index) => {
              return (
                <div key={index} className="flex gap-5">
                  <p className="text-2xl py-2">
                    <LuLink />
                  </p>
                  <p
                    className="text-xl cursor-pointer font-poppins"
                    onClick={() => navigate(singleData?.navLink)}
                  >
                    {singleData?.navItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* // manufacturing report */}
        <div className="bg-gradient-to-b from-white to-gray-300 z-10  p-5 h-[90%] rounded-lg">
          <p className="text-lg font-bold px-3 py-1">Manufacturing Report:</p>
          <hr />
          <div className="text-blue-700 grid grid-cols-1">
            {mock_Manufacturing_Report.map((singleData, index) => {
              return (
                <div key={index} className="flex gap-5">
                  <p className="text-2xl py-2">
                    <LuLink />
                  </p>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(singleData?.navLink)}
                  >
                    {singleData?.navItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* // Purchasing report */}
        <div className="bg-gradient-to-b from-white to-gray-300 z-10   p-5 h-[100%] rounded-lg">
          <p className="text-lg font-bold px-3 py-1">Purchasing Report:</p>
          <hr />
          <div className="text-blue-700 grid grid-cols-1">
            {mock_Purchasing_Report.map((singleData, index) => {
              return (
                <div key={index} className="flex gap-5">
                  <p className="text-2xl py-2">
                    <LuLink />
                  </p>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(singleData?.navLink)}
                  >
                    {singleData?.navItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* // Project report */}
        <div className="bg-gradient-to-b from-white to-gray-300 z-10   p-5 h-[100%] rounded-lg">
          <p className="text-lg font-bold px-3 py-1">Projects Report:</p>
          <hr />
          <div className="text-blue-700 grid grid-cols-1">
            {mock_Project_Report?.map((singleData, index) => {
              return (
                <div key={index} className="flex gap-5 hover:underline">
                  <p className="text-2xl py-2">
                    <LuLink fontSize={"small"} />
                  </p>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(singleData?.navLink)}
                  >
                    {singleData?.navItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>



          {/* //Profit and loss */}
        { role === "Company_Admin" &&
           <div className="bg-gradient-to-b from-white to-gray-300 z-10   p-5 h-[100%] rounded-lg">
          <p className="text-lg font-bold px-3 py-1">Projects Report:</p>
          <hr />
          <div className="text-blue-700 grid grid-cols-1">
            {mock_Project_Profit_loss?.map((singleData, index) => {
              return (
                <div key={index} className="flex gap-5 hover:underline">
                  <p className="text-2xl py-2">
                    <LuLink  />
                  </p>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={() => navigate(singleData?.navLink)}
                  >
                    {singleData?.navItem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        }
      </div>
    </>
  );
};

export default Report;
