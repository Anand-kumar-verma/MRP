import React from "react";
import { useState } from "react";
import GlassDiv from "../../../Shared/GlassDiv";

export default function CrmDashboard() {
  const [activeProduct, setActiveProduct] = useState(0);
  const handleClick = (index) => {
    setActiveProduct(index);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center w-fill my-10">
        <GlassDiv
          onClick={() => handleClick(0)}
          className="flex flex-col justify-center items-center border px-32 py-3 cursor-pointer"
        >
          <p>Lead Reports</p>
        </GlassDiv>
        <GlassDiv
          onClick={() => handleClick(1)}
          className="flex flex-col justify-center items-center border px-32 py-3  cursor-pointer"
        >
          <p>Deal Reports</p>
        </GlassDiv>
      </div>
      <div className="">
        {activeProduct === 0 && <Lead />}
        {activeProduct === 1 && <Deal />}
      </div>
    </>
  );
}
