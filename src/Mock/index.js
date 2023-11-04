import { Campaign } from "@mui/icons-material";
import { TfiDashboard } from "react-icons/tfi";
import { FaCartArrowDown } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FcBusinessContact } from "react-icons/fc";
import { TbBuildingWarehouse } from "react-icons/tb";
import { SiMaterialdesign } from "react-icons/si";
import { MdOutlineInventory, MdOutlineSupport } from "react-icons/md";
import { SiAmazonrds } from "react-icons/si";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdAccountTree } from "react-icons/md";
import { TbSettingsStar } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { TbSubtask } from "react-icons/tb";
import { ImUsers } from "react-icons/im";
import { FaBookMedical } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import Stock from "../Pages/Stock";

const role_user = localStorage.getItem("role_user");


export const permission_message = "You don't have permission"

export const manufacturer_Admin = [
  "Dashboard",
  "Sales",
  "Purchase",
  "Vendors",
  "Contact",
  "Stock",
  "Materials",
  "Products",
  "Inventory",
  "MRP",
  "Accounting",
  "Reports",
  "Setting",
];

export const project_Adming = [
  "Dashboard",
  "Sales",
  "Purchase",
  "Stock",
  "Vendors",
  "Contact",
  "Project Planner",
  "All Projects",
  "Task",
  "User Management",
  "Reports",
  "Setting",
  "Gantt Chart",
  "Assign Material"
];

export const associate = [
  "Dashboard",
  "Task",
  "Emp. Report",
  "Gantt Chart"
]

export const manager = [
  "Dashboard",
  "All Projects",
  "Task",
  "User Management",
  "Emp. Report",
  "Gantt Chart",
  "Assign Material"
]

// Project Base0d

export const all_Data = [
  {
    id: 1,
    navLink: "/dashboard",
    navItem: "Dashboard",
    navIcon: (
      <span>
        <TfiDashboard color="#15317E" fontSize="large" />
      </span>
    ),
  },
  {
    id: 2,
    navLink: "",
    navItem: "Sales",
    navIcon: (
      <span className="text-gray-700">
        <FaCartArrowDown color="#622F22" fontSize="large" />
      </span>
    ),
  },
  {
    id: 3,
    navLink: "",
    navItem: "Purchase",
    navIcon: (
      <span>
        <BsFillBagCheckFill color="#FF33AA" fontSize="large" />
      </span>
    ),
  },
  {
    //i want to change all item like this
    id: 134234,
    navLink: "/stock",
    component: <Stock />,
    navItem: "Stock",
    navIcon: <MdOutlineSupport color="#A74AC7" fontSize="large" />,
  },
  {
    id: 4,
    navLink: "/vendor",
    navItem: "Vendors",
    navIcon: (
      <span>
        <RiContactsLine color="#9932CC" fontSize="large" />
      </span>
    ),
  },
  {
    id: 5,
    navLink: "/contacts",
    navItem: "Contact",
    navIcon: (
      <span className="text-gray-700">
        <FcBusinessContact color="#622F22" fontSize="large" />
      </span>
    ),
  },
  {
    id: 153,
    navLink: "/project-planning",
    navItem: "Project Planner",
    navIcon: (
      <span>
        <FaBookMedical color="#6EFF33" fontSize="large" />
      </span>
    ),
  },
  {
    id: 15,
    navLink: "/project",
    navItem: "All Projects",
    navIcon: (
      <span>
        <FaBookAtlas color="#33E3FF" fontSize="large" />
      </span>
    ),
  },
  {
    id: 15334,
    navLink: "/task-list",
    navItem: "Task",
    navIcon: (
      <span>
        <TbSubtask color="#FF7133" fontSize="large" />
      </span>
    ),
  },
  {
    id: 15334323,
    navLink: "/assign-material",
    navItem: "Assign Material",
    navIcon: (
      <span>
        <TbSubtask color="#FF7133" fontSize="large" />
      </span>
    ),
  },
  {
    id: 153324,
    navLink: "/gantt-chart",
    navItem: "Gantt Chart",
    navIcon: (
      <span>
        <TbSubtask color="#FF7133" fontSize="large" />
      </span>
    ),
  },
  {
    id: 17,
    navLink: "/workers",
    navItem: "User Management",
    navIcon: (
      <span>
        <ImUsers color="#FF334F" fontSize="large" />
      </span>
    ),
  },
  {
    id: 7,
    navLink: "/materials",
    navItem: "Materials",
    navIcon: (
      <span>
        <SiMaterialdesign color="#EB5406" fontSize="large" />
      </span>
    ),
  },

  {
    id: 6,
    navLink: "/product",
    navItem: "Products",
    navIcon: (
      <span>
        <TbBuildingWarehouse color="#254117" fontSize="large" />
      </span>
    ),
  },

  {
    id: 8,
    navLink: "",
    navItem: "Inventory",
    navIcon: (
      <span>
        <MdOutlineInventory color="#EB5406" fontSize="large" />
      </span>
    ),
  },
  // {
  //   id: 9,
  //   navLink: "",
  //   navItem: "Quality Check",
  //   navIcon: <Call />,
  // },
  {
    id: 10,
    navLink: "",
    navItem: "Banks",
    navIcon: (
      <span>
        <SiAmazonrds color="#EB5406" fontSize="large" />
      </span>
    ),
  },

  {
    id: 11,
    navLink: "",
    navItem: "MRP",
    navIcon: (
      <span>
        <RiMoneyDollarBoxLine color="#EB5406" fontSize="large" />
      </span>
    ),
  },
  {
    id: 12,
    navLink: "/chart",
    navItem: "Accounting",
    navIcon: (
      <span>
        <MdAccountTree color="#FF007F" fontSize="large" />
      </span>
    ),
  },
  {
    id: 13,
    navLink: "/report",
    navItem: "Reports",
    navIcon: <Campaign />,
  },

  {
    id: 14,
    navLink: "/setting",
    navItem: "Setting",
    navIcon: (
      <span>
        <TbSettingsStar color="#FF007F" fontSize="large" />
      </span>
    ),
  },
  {
    id: 143442,
    navLink: "/emp-report",
    navItem: "Emp. Report",
    navIcon: (
      <span>
        <TbSettingsStar color="#FF007F" fontSize="large" />
      </span>
    ),
  },


];

export const salesDropdown = [
  {
    id: 123,
    navLink: "/quotes",
    navItem: "Quotes",
  },
  {
    id: 3,
    navLink: "/sales-order_list",
    navItem: "Sales Orders",
  },
  {
    id: 2,
    navLink: "/sales/invoice",
    navItem: "Sales Invoices",
  },
];
export const salesDropdown1 = [
  {
    id: 1,
    navLink: "/estimate",
    navItem: "  Estimate  ",
  },
];

export const purchaseDropDown = [
  {
    id: 1,
    navLink: "/purchase_order_list",
    navItem: "Purchase Orders",
  },
  {
    id: 2,
    navLink: "/purchase_Invoies",
    navItem: "Purchase Invoics",
  },
];

export const mrpDropDown = [
  {
    id: 1,
    navLink: "/mrp/work-orders",
    navItem: "Work Orders",
  },
  // {
  //   id: 2,
  //   navLink: "/mrp/inspection-phase",
  //   navItem: "Inspection Phase",
  //   navIcon: <Chat />,
  // },
  // {
  //   id: 3,
  //   navLink: "/mrp/production-phase",
  //   navItem: "Production Phase",
  //   navIcon: <Chat />,
  // },
  // {
  //   id: 4,
  //   navLink: "/mrp/production-operations",
  //   navItem: "Production Operations",
  //   navIcon: <Chat />,
  // },
  // {
  //   id: 2,
  //   navLink: "/mrp/job-cards",
  //   navItem: "Job Cards",
  // },
  // {
  //   id: 3,
  //   navLink: "",
  //   navItem: "JOb Work outs",
  // },
  // {
  //   id: 4,
  //   navLink: "/mrp/forecasting",
  //   navItem: "Forecasting",
  // },
  // {
  //   id: 5,
  //   navLink: "/mrp/job-card",
  //   navItem: "JOB Card",
  // },
  {
    id: 6,
    navLink: "/mrp/resource",
    navItem: "Resource",
  },
  // {
  //   id: 7,
  //   navLink: "/mrp/inspection-phase",
  //   navItem: "Inspection Phase",

  // },
  // {
  //   id: 8,
  //   navLink: "/mrp/production-phase",
  //   navItem: "Production Phase",

  // },
  // {
  //   id: 9,
  //   navLink: "/mrp/production-operations",
  //   navItem: "Production Operations",
  // },
  // {
  //   id: 5,
  //   navLink: "/mrp/job-work-outs",
  //   navItem: "JOB Card",
  // }
];

export const inventoryDropDown = [
  {
    id: 1,
    navLink: "/inventory/products",
    navItem: "Inv. Products",
  },
  {
    id: 2,
    navLink: "/inventory/materials",
    navItem: "Inv. Materials",
  },
  // {
  //   id: 3,
  //   navLink: "/mrp/job-work-outs",
  //   navItem: "JOb Work outs",
  // },
  // {
  //   id: 4,
  //   navLink: "/mrp/forecasting",
  //   navItem: "Forecasting",
  // },
  // {
  //   id: 5,
  //   navLink: "/mrp/job-card",
  //   navItem: "JOB Card",
  // },
  // {
  //   id: 5,
  //   navLink: "/mrp/job-work-outs",
  //   navItem: "JOB Card",
  // }
];

// project based

// export const navItems1 = [
//   {
//     id: 1,
//     navLink: "/dashboard",
//     navItem: "Dashboard",
//     navIcon: (
//       <span>
//         <TfiDashboard color="#15317E" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     id: 2,
//     navLink: "",
//     navItem: "Sales",
//     navIcon: (
//       <span className="text-gray-700">
//         <FaCartArrowDown color="#622F22" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     id: 3,
//     navLink: "",
//     navItem: "Purchase",

//     navIcon: (
//       <span>
//         <BsFillBagCheckFill color="#FF33AA" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     //i want to change all item like this
//     id: 134234,
//     navLink: "",
//     component: <Stock />,
//     navItem: "Stock",
//     navIcon: <MdOutlineSupport color="#A74AC7" fontSize="large" />,
//     isVisible: true,
//   },

//   {
//     id: 4,
//     navLink: "/vendor",
//     navItem: "Vendors",
//     navIcon: (
//       <span>
//         <RiContactsLine color="#9932CC" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     id: 5,
//     navLink: "/contacts",
//     navItem: "Contact",
//     navIcon: (
//       <span className="text-gray-700">
//         <FcBusinessContact color="#622F22" fontSize="large" />
//       </span>
//     ),
//   },
//   // {
//   //   id: 7,
//   //   navLink: "/materials",
//   //   navItem: "Materials",
//   //   navIcon: (
//   //     <span>
//   //       <SiMaterialdesign color="#EB5406" fontSize="large" />
//   //     </span>
//   //   ),
//   // },

//   // {
//   //   id: 8,
//   //   navLink: "",
//   //   navItem: "Inventory",
//   //   navIcon: (
//   //     <span>
//   //       <MdOutlineInventory color="#EB5406" fontSize="large" />
//   //     </span>
//   //   ),
//   // },
//   // {
//   //   id: 11,
//   //   navLink: "",
//   //   navItem: "MRP",
//   //   navIcon: (
//   //     <span>
//   //       <RiMoneyDollarBoxLine color="#EB5406" fontSize="large" />
//   //     </span>
//   //   ),
//   // },
//   // {
//   //   id: 1623,
//   //   navLink: "/estimate",
//   //   navItem: "Estimate",
//   //   navIcon: (
//   //     <span>
//   //       <TbSettingsStar color="#FF007F" fontSize="large" />
//   //     </span>
//   //   ),
//   // },
//   {
//     id: 153,
//     navLink: "/project-planning",
//     navItem: "Project Planner",
//     navIcon: (
//       <span>
//         <FaBookMedical color="#6EFF33" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     id: 15,
//     navLink: "/project",
//     navItem: "All Projects",
//     navIcon: (
//       <span>
//         <FaBookAtlas color="#33E3FF" fontSize="large" />
//       </span>
//     ),
//   },
//   {
//     id: 15334,
//     navLink: "/task-list",
//     navItem: "Task",
//     navIcon: (
//       <span>
//         <TbSubtask color="#FF7133" fontSize="large" />
//       </span>
//     ),
//   },

//   {
//     id: 17,
//     navLink: "/workers",
//     navItem: "User Management",
//     navIcon: (
//       <span>
//         <ImUsers color="#FF334F" fontSize="large" />
//       </span>
//     ),
//   },
//   // {
//   //   id: 18,
//   //   navLink: "/profit-loss",
//   //   navItem: "Profit & Loss",
//   //   navIcon: (
//   //     <span>
//   //       <TbSettingsStar color="#FF007F" fontSize="large" />
//   //     </span>
//   //   ),
//   // },
//   {
//     id: 13,
//     navLink: "/report",
//     navItem: "Reports",
//     navIcon: <Campaign />,
//   },
//   {
//     id: 14,
//     navLink: "/setting",
//     navItem: "Setting",
//     navIcon: (
//       <span>
//         <TbSettingsStar color="#FF007F" fontSize="large" />
//       </span>
//     ),
//   },
// ];

// export const salesDropdown1 = [
//   //   {
//   //     id: 1,
//   //     navLink: "/estimate",
//   //     navItem: "Quotes",
//   //   },
//   //   {
//   //     id: 3,
//   //     navLink: "/sales-order_list",
//   //     navItem: "Sales Orders",
//   //   },
//   //   {
//   //     id: 2,
//   //     navLink: "/sales/invoice",
//   //     navItem: "Sales Invoices",
//   //   },
// ];

export const stockData = [
  {
    id: 1,
    navLink: "/stock",
    navItem: "Stock Adjustment",
  },
  {
    id: 2,
    navLink: "/materials",
    navItem: "Materials",
  },
];

