import Sales from "../Components/Sales";
import Purchase from "../Pages/Purchase";
import JobCardTab from "../Pages/MRP/JobCardTab";
import MRP from "../Pages/MRP";
import Vendors from "../Pages/Vendors";
import Contacts from "../Pages/Contacts";
import Product from "../Pages/Product";
import Setting from "../Pages/Setting";
import GeneralSetting from "../Pages/Setting/GeneralSetting";
import UnitsandMeasurements from "../Pages/Setting/UnitsandMeasurements";
// import Boq from '../Pages/Boq'
import InspectionPhase from "../Pages/MRP/InspectionPhase";
import ProductionPhase from "../Pages/MRP/ProductionPhase";
import ProductionOperations from "../Pages/MRP/ProductionOperations";
import Resource from "../Pages/MRP/Resource";
import Dashboard from "../Pages/Dashboard";
import WorkOrders from "../Pages/MRP/WorkOrders";
import CreateCustomer from "../Pages/Contacts/CreateCustomer";
import CreateVendor from "../Pages/Vendors/CreateVendor";
import ShowVendorDetails from "../Components/Purchase/ShowVendorDetails";
import CreateProduct from "../Pages/Product/CreateProduct";
import Materials from "../Pages/Materials";
import CreateMaterials from "../Pages/Materials/CreateMaterials";
import PurchaseOrderDetails from "../Components/Purchase/PurchaseOrderDetails";
import PurhaseOrderList from "../Components/Purchase/PurhaseOrderList";
import ShowCustomerDetails from "../Components/Sales/ShowCustomerDetails";
import SalesOrderList from "../Components/Sales/SalesOrderList";
import SalesOrderDetails from "../Components/Sales/SalesOrderDetails";
import CreateWorkOrder from "../Pages/MRP/WorkOrders/CreateWorkOrder";
import Category from "../Pages/Setting/Category";
import Report from "../Pages/Report";
import ProductReport from "../Components/Report/Sales/ProductReport";
import InventoryProductList from "../Pages/Inventory/InventoryProductList";
import InventoryMaterialsList from "../Pages/Inventory/InventoryMaterialsList";
import SalesReport from "../Components/Report/Sales/SalesReport";
import CustomerReport from "../Components/Report/Sales/CustomerReport";
import OrderReport from "../Components/Report/Sales/OrderReport";
import PurchaseOverview from "../Components/Report/Purchase/PurchaseOverview";
import Supplier from "../Components/Report/Purchase/Supplier";
import CustomerOverviewReport from "../Components/Report/Manufacturing/CustomerOverviewReport";
import IngredientsReport from "../Components/Report/Manufacturing/IngredientsReport";
import SingleOrdertDetails from "../Components/Sales/SalesOrderList/SingleOrdertDetails/SingleOrdertDetails";
import SinglePurchaseOrderDetails from "../Components/Purchase/PurchaseOrderDetails/SinglePurchaseOrderDetails";
import SingleWorkOrderDetails from "../Pages/MRP/WorkOrders/SingleWorkOrderDetails";
import CreateResource from "../Pages/MRP/Resource/CreateResource";
import CreateOperations from "../Pages/MRP/ProductionOperations/CreateOperation";
import SingleProductDetails from "../Pages/Product/SingleProductDetails";
import MaterialDetails from "../Pages/Materials/MaterialDetails";
import UpdateProductDetails from "../Pages/Product/UpdateProductDetails";
import UpdateMaterials from "../Pages/Materials/UpdateMaterials";
import Invoice from "../Pages/Sales/Invoice";
// import WorkOrders from "../Pages/MRP/WorkOrders";
import JobWorkouts from "../Pages/MRP/JobWorkouts";
import Forecasting from "../Pages/MRP/Forecasting";
import Boq from "../Pages/Boq";
import ChartAccount from "../Components/ChartAccount";
import InvoiceDatials from "../Pages/Sales/Invoice Detaiels";
import PrachegeInvice from "../Components/Purchase/Pracheg Invoice";
import PurchaseInvoiceDatials from "../Components/Purchase/PurchaseInvoiceDatials";
import Quotes from "../Pages/Sales/Quates";
import AddEstimates from "../Pages/Sales/Add Quate";
import Project from "../Pages/Project";
import CreateProject from "../Pages/Project/CreateProject";
import WorkersList from "../Pages/WorkersList";
import PlannedProject from "../Pages/PlannedProject";
import Estimate from "../Pages/Estimate";
import PlanNewProject from "../Pages/PlannedProject/PlanNewProject";
import AddEstimate from "../Pages/Estimate/AddEstimate";
import ProjectTracking from "../Pages/Project/ProjectTracking";
import Profit_Loss from "../Pages/Profit_Loss";
import UpdateProjectStatus from "../Pages/Project/UpdateProjectStatus";
import DayBook from "../Pages/WorkersList/DayBook";
import CreateWorkers from "../Pages/WorkersList/CreateWorkers";
import EmployeeDetails from "../Pages/WorkersList/EmployeeDetails";
import EstimatePDF from "../Pages/Estimate/EstimatePDF";
import Task from "../Pages/Project/Task";
import OpenProject from "../Pages/Project/OpenPronect";
import PlanProjectDetails from "../Pages/PlannedProject/PlanProjectDetails";
import PlannedProjectsReport from "../Components/Report/Projects/PlannedProjectsReport";
import AllProjectsReport from "../Components/Report/Projects/AllProjectsReport";
import TaskList from "../Pages/Project/Task/TaskList";
import { FaCartArrowDown } from "react-icons/fa";
import Stock from "../Pages/Stock";
import AllStock from "../Pages/Stock/AllStock";
import Designation from "../Pages/Setting/Designation";
import Permission from "../Pages/Setting/Permission";
import AllPermissions from "../Pages/Setting/Permission/AllPermissions";
import UpdatePermissions from "../Pages/Setting/Permission/UpdatePermissions";
import { GanttChart } from "../Components/GanttChart";
import AssignMaterial from "../Pages/Project/Task/AssignMaterial";

export const routes = [
  {
    id: 1,
    path: "/sales",
    component: <Sales />,
    navItem: "Sales",
  },
  {
    id: 2,
    path: "",
    component: <Purchase />,
    navItem: "Purchase",
  },
  {
    id: 3,
    path: "/purchase/job-card-tab",
    component: <JobCardTab />,
    navItem: "JOB Card Tab",
  },
  {
    id: 4,
    path: "/vendor",
    component: <Vendors />,
    navItem: "Vendors",
  },
  {
    id: 5,
    path: "/contacts",
    component: <Contacts />,
    navItem: "Contacts",
  },
  {
    id: 7,
    path: "/product",
    component: <Product />,
    navItem: "Product",
  },
  {
    id: 8,
    path: "/setting",
    component: <Setting />,
    navItem: "Setting",
  },
  {
    id: 9,
    path: "/setting/general-setting",
    component: <GeneralSetting />,
    navItem: "General Setting",
  },
  {
    id: 10,
    path: "/setting/units-measurements",
    component: <UnitsandMeasurements />,
    navItem: "Units & Measurements",
  },
  {
    id: 11,
    path: "/mrp/job-card",
    component: <JobCardTab />,
    navItem: "JOB Card",
  },
  {
    id: 12,
    path: "",
    component: <MRP />,
    navItem: "MRP",
  },
  {
    id: 13,
    path: "/boq",
    component: <Boq />,
    navItem: "BOQ",
  },
  {
    id: 14,
    path: "/mrp/inspection-phase",
    component: <InspectionPhase />,
    navItem: "Inspection Phase",
  },
  {
    id: 15,
    path: "/mrp/production-phase",
    component: <ProductionPhase />,
    navItem: "Production Phase",
  },
  {
    id: 16,
    path: "/mrp/production-operations",
    component: <ProductionOperations />,
    navItem: "Production Operations",
  },
  {
    id: 17,
    path: "/mrp/resource",
    component: <Resource />,
    navItem: "Resourse",
  },
  {
    id: 18,
    path: "/dashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },
  {
    id: 19,
    path: "/mrp/work-orders",
    component: <WorkOrders />,
    navItem: "Work Orders",
  },
  {
    id: 20,
    path: "/contact/create-contact",
    component: <CreateCustomer />,
    navItem: "Create Customer",
  },
  {
    id: 21,
    path: "/vendor/create-vendor",
    component: <CreateVendor />,
    navItem: "Create Vendor",
  },
  {
    id: 22,
    path: "/show-details/:id",
    component: <ShowVendorDetails />,
    navItem: "Vendor Details",
  },
  {
    id: 23,
    path: "/create-product",
    component: <CreateProduct />,
    navItem: "Create Product",
  },
  {
    id: 24,
    path: "/materials",
    component: <Materials />,
    navItem: "Materials",
  },

  {
    id: 25,
    path: "/create-materials",
    component: <CreateMaterials />,
    navItem: "Create Materials",
  },
  {
    id: 26,
    path: "/purchase-order",
    component: <PurchaseOrderDetails />,
    navItem: "Create Purchase Order",
  },
  {
    id: 27,
    path: "/purchase_order_list",
    component: <PurhaseOrderList />,
    navItem: "Purchase Order List",
  },
  {
    id: 28,
    path: "/customer-details/:id",
    component: <ShowCustomerDetails />,
    navItem: "Customer Details",
  },
  {
    id: 29,
    path: "/sales-order_list",
    component: <SalesOrderList />,
    navItem: "Sales Orders List",
  },
  {
    id: 30,
    path: "/sales-order",
    component: <SalesOrderDetails />,
    navItem: "Create Sales Order",
  },
  {
    id: 31,
    path: "/work-order/create-work-order",
    component: <CreateWorkOrder />,
    navItem: "Create Work Order",
  },
  {
    id: 32,
    path: "/setting/category",
    component: <Category />,
    navItem: "Category",
  },

  {
    id: 33,
    path: "/report",
    component: <Report />,
    navItem: "Report",
  },
  {
    id: 34,
    path: "/report/sales/product-report",
    component: <ProductReport />,
    navItem: "Product Report",
  },
  {
    id: 35,
    path: "/inventory/products",
    component: <InventoryProductList />,
    navItem: "Inv. Products",
  },
  {
    id: 36,
    path: "/inventory/materials",
    component: <InventoryMaterialsList />,
    navItem: "Inv. Materials",
  },
  {
    id: 37,
    path: "/report/sales/sales-report",
    component: <SalesReport />,
    navItem: "Sales Report",
  },
  {
    id: 38,
    path: "/report/sales/product-report",
    component: <ProductReport />,
    navItem: "Product Report",
  },
  {
    id: 39,
    path: "/report/sales/customer-report",
    component: <CustomerReport />,
    navItem: "Customer Report",
  },
  {
    id: 40,
    path: "/report/sales/order-report",
    component: <OrderReport />,
    navItem: "Order Report",
  },
  {
    id: 41,
    path: "/report/purchase/purchase-overview",
    component: <PurchaseOverview />,
    navItem: "Purchase Overview",
  },
  {
    id: 41,
    path: "/report/purchase/supplier",
    component: <Supplier />,
    navItem: "Supplier",
  },
  {
    id: 42,
    path: "/report/manufacturing/customer-overview",
    component: <CustomerOverviewReport />,
    navItem: "Customer Overview",
  },
  {
    id: 43,
    path: "/report/manufacturing/ingredients",
    component: <IngredientsReport />,
    navItem: "Ingredients Report",
  },
  {
    id: 44,
    path: "/sales/single-product-details/:order_id",
    component: <SingleOrdertDetails />,
    navItem: "Sales Order Details",
  },
  {
    id: 334,
    path: "/report/project/planned",
    component: <PlannedProjectsReport />,
    navItem: "Planned Projects",
  },
  {
    id: 335,
    path: "/report/project/all",
    component: <AllProjectsReport />,
    navItem: "All Project Report",
  },
  {
    id: 45,
    path: "/sales/single-purchase-order-details/:order_id",
    component: <SinglePurchaseOrderDetails />,
    navItem: "Purchase Order Details",
  },
  {
    id: 46,
    path: "/mrp/single-work-order-details/:order_id",
    component: <SingleWorkOrderDetails />,
    navItem: "Work Order Details",
  },
  {
    id: 47,
    path: "/mrp/resource/create-resource",
    component: <CreateResource />,
    navItem: "Create Resource",
  },
  {
    id: 48,
    path: "/mrp/production-operation/create-production-operation",
    component: <CreateOperations />,
    navItem: "Create Operation",
  },
  {
    id: 49,
    path: "/product/product-details/:product_id",
    component: <SingleProductDetails />,
    navItem: "Product Details",
  },
  {
    id: 50,
    path: "/material/material-details/:material_id",
    component: <MaterialDetails />,
    navItem: "Material Details",
  },
  {
    id: 51,
    path: "/product/update-product-details/:product_id",
    component: <UpdateProductDetails />,
    navItem: "Update Product Details",
  },
  {
    id: 52,
    path: "/material/update-material-details/:material_id",
    component: <UpdateMaterials />,
    navItem: "Update Material Details",
  },
  {
    id: 53,
    path: "/sales/invoice",
    component: <Invoice />,
    navItem: "Sales Invoice",
  },
  {
    id: 54,
    path: "/sales/invoicedatial/:id",
    component: <InvoiceDatials />,
    navItem: "Sales Invoice Details",
  },
  {
    id: 55,
    path: "/chart",
    component: <ChartAccount />,
    navItem: "ChartAccount",
  },
  {
    id: 56,
    path: "/purchase_Invoies",
    component: <PrachegeInvice />,
    navItem: "Purchase Invoics",
  },
  {
    id: 56,
    path: "/purchase_Invoies/purchase_invoice_datials/:id",
    component: <PurchaseInvoiceDatials />,
    navItem: "Purchase Invoice Datials",
  },
  {
    id: 56,
    path: "/quotes",
    component: <Quotes />,
    navItem: "Quotes",
  },
  {
    id: 57,
    path: "/sales/add-estimate",
    component: <AddEstimates />,
    navItem: "Add Estimates",
  },
  // {
  //   id: 4,
  //   path: "/mrp/work-orders",
  //   component: <WorkOrders />,
  //   navItem: "Work-Orders",
  // },
  {
    id: 5,
    path: "/mrp/job-work-outs",
    component: <JobWorkouts />,
    navItem: "Job-Workouts",
  },
  {
    id: 6,
    path: "/mrp/forecasting",
    component: <Forecasting />,
    navItem: "Forecasting",
  },
  {
    id: 7,
    path: "/boq",
    component: <Boq />,
    navItem: "BOQ",
  },
  {
    id: 8,
    path: "/resource",
    component: <Resource />,
    navItem: "Resource",
  },
  {
    id: 9,
    path: "/inspection-phase",
    component: <InspectionPhase />,
    navItem: "InspectionPhase",
  },
  {
    id: 10,
    path: "/production-phase",
    component: <ProductionPhase />,
    navItem: "ProductionPhase",
  },
  {
    id: 11,
    path: "/production-operations",
    component: <ProductionOperations />,
    navItem: "ProductionOperations",
  },
  {
    id: 12,
    path: "/project",
    component: <Project />,
    navItem: "Project",
  },
  {
    id: 13,
    path: "/project/create-project",
    component: <CreateProject />,
    navItem: "Create Project",
  },
  {
    id: 999,
    path: "/project/project-details/:projectId",
    component: <PlanProjectDetails />,
    navItem: "Project Details",
  },
  {
    id: 14,
    path: "/workers",
    component: <WorkersList />,
    navItem: "Employee",
  },
  {
    id: 15,
    path: "/employee-details/:empId",
    component: <EmployeeDetails />,
    navItem: "Employee Details",
  },

  {
    id: 4345,
    path: "/project-planning",
    component: <PlannedProject />,
    navItem: "Planned Project",
  },
  {
    id: 53423,
    path: "/plan-new-project",
    component: <PlanNewProject />,
    navItem: "Plan New Project",
  },

  {
    id: 6,
    path: "/estimate",
    component: <Estimate />,
    navItem: "Quotes",
  },
  {
    id: 7,
    path: "/estimate/add-estimate",
    component: <AddEstimate />,
    navItem: "Add Quotes",
  },
  {
    id: 8,
    path: "/project/project-tracking",
    component: <ProjectTracking />,
    navItem: "Track  Project",
  },
  {
    id: 9,
    path: "/profit-loss",
    component: <Profit_Loss />,
    navItem: "Profit & Loss",
  },
  {
    id: 10,
    path: "/update-project-status",
    component: <UpdateProjectStatus />,
    navItem: "Update Status",
  },
  {
    id: 11,
    path: "/day-book",
    component: <DayBook />,
    navItem: "DayBook",
  },
  {
    id: 12,
    path: "/worker/create-worker",
    component: <CreateWorkers />,
    navItem: "Create Emoloyee",
  },
  {
    id: 13,
    path: "/estimate-pdf/:estimate_project_id",
    component: <EstimatePDF />,
    navItem: "Estimate PDF",
  },
  {
    id: 13,
    path: "/task",
    component: <Task />,
    navItem: "Task",
  },
  {
    id: 1342,
    path: "/open-project",
    component: <OpenProject />,
    navItem: "Overview",
  },
  {
    id: 134342,
    path: "/task-list",
    component: <TaskList />,
    navItem: "Task List",
  },
  {
    //i want to change all item like this
    id: 134234,
    path: "/stock",
    component: <Stock />,
    navItem: "Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 134235,
    path: "/stock/all-stock",
    component: <AllStock />,
    navItem: "All Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 134235,
    path: "/stock/in-stock",
    component: <AllStock />,
    navItem: "In Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 134235,
    path: "/stock/out-of-stock",
    component: <AllStock />,
    navItem: "Out Of Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 1342357,
    path: "/designation/add-designation",
    component: <Designation />,
    navItem: "Out Of Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 1342357334,
    path: "/designation/add-designation",
    component: <Designation />,
    navItem: "Out Of Stock",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 13423574334,
    path: "/setting/permission",
    component: <Permission />,
    navItem: "Permission",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 13423574334,
    path: "/setting/permission/permission_list",
    component: <AllPermissions />,
    navItem: "Permissions",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 134235743334,
    path: "/setting/permission/update-permission",
    component: <UpdatePermissions />,
    navItem: "Updte Permission",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 1342357433344,
    path: "/emp-report",
    component: <DayBook/>,
    navItem: "Updte Permission",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
   {
    id: 2323232323,
    path: "/gantt-chart",
    component: <GanttChart/>,
    navItem: "Gantt Chart",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
  {
    id: 2323232323234,
    path: "/assign-material",
    component: <AssignMaterial/>,
    navItem: "Gantt Chart",
    navIcon: <FaCartArrowDown color="#622F22" fontSize="large" />,
    isVisible: true,
  },
];

// UpdatePermissions