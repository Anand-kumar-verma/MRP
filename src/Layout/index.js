import { Avatar, IconButton } from "@mui/material";
import Sidebar from "../Shared/Sidebar";
import { Notifications, Search } from "@mui/icons-material";
import BreadCrumbs from "../Shared/BreadCrumbs";
import { useEffect, useState } from "react";
import bg1 from "../Assets/bg1.png";
import { IoColorPalette } from "react-icons/io5";
import BasicMenu from "../Shared/BasiMenu";
import CustomDialogBox from "../Shared/CustomDialogBox";
const Layout = ({ component, navItem, navLink, id }) => {
  const [user_exist,setuser_exist] = useState("")
  const user = localStorage.getItem("erp_username");
  const [color, setcolor] = useState("#F0F8FF");
  const user1 = localStorage.getItem("role_user");
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);
  const role = localStorage.getItem("role_user") === "Manufacturer Based";
  const colorsData = [
    { HEX: "#F0F8FF" },
    { HEX: "#9fa494" },
    { HEX: "#659EC7" },
    { HEX: "#FFE5B4" },
    { HEX: "#BDEDFF" },

    { HEX: "#f4ecdd" },
    { HEX: "#B3D9D9" },
    { HEX: "#659EC7" },
    { HEX: "#659EC7" },
    { HEX: "#BDEDFF" },
  ];

  useEffect(()=>{
    setuser_exist(user1)
  },[user1])

  return (
    <div className={`bg-gray-100 flex`} style={{ backgroundImage: { bg1 } }}>
      {/* <img src={bg1}  className="w-screen h-screen absolute -z-10"/> */}
     { user_exist && <Sidebar />}
      {/* <Sidebar_ProjectBased/> */}
      <div className="flex flex-col gap-3 h-screen w-full   p-5">
        <div className="flex flex-col h-[17vh] w-full">
          <div className="flex w-full mb-4 items-center rounded justify-between">
            <p className="text-xl font-semibold">{navItem}</p>
            <div className="flex items-center gap-5">
              {/* <span className="bg-white shadow flex items-center rounded-md px-3 py-2">
                <input
                  className="outline-none"
                  type="text"
                  placeholder="Search..."
                />
                <Search className="!text-gray-400" />
              </span> */}
              <IoColorPalette
                onClick={() => {
                  setopenCustomDialogBox(true);
                }}
                className="text-2xl text-blue-700 cursor-pointer"
              />

              <div className="flex items-center gap-3 bg-white p-3 shadow rounded-md">
                <Avatar alt={user?.user_name} src={user?.store_logo} />
                <span className="flex flex-col">
                  <p className="font-bold text-red-500 ">{user}</p>
                  <p className="text-xs text-blue-700 capitalize">
                    {localStorage.getItem("role")?.replace("_", " ")} &nbsp;
                    {`(${user1})`}
                  </p>
                </span>
                <IconButton>
                  <Notifications />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="overflow-x-scroll w-[95%]">
            <BreadCrumbs navItem={navItem} navLink={navLink} id={id} />
          </div>
        </div>

        <div className="flex flex-col overflow-y-auto w-full h-[83vh]">
          {component}
        </div>

        <span className="flex text-secondary px-2 py-1 justify-between">
          <p>All Rights reserved to Bhaarat ERP Software 2023</p>

          <span className="flex gap-2">
            <p>Review</p> | <p>Purchase</p> | <p>Docs</p>
          </span>
        </span>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={
            <div className="grid grid-cols-5 gap-4">
              {colorsData.map((i) => {
                return (
                  <div
                    className={`h-20 w-20 bg-[${i?.HEX}] rounded`}
                    onClick={() => setcolor(i?.HEX)}
                  ></div>
                );
              })}
            </div>
          }
          title="Choose background"
        />
      )}
    </div>
  );
};

export default Layout;
