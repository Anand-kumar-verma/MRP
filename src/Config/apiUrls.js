export const API_URLS = {
  // mrp api
  login: "/api/user/login-api-user",
  loginEmployee: "project/login_employee_api/",
  signup: "/api/user/create-admin-user",
  create_sales_order_details: "get-or-create-sales-order-list/",
  get_or_create_purchase_order: "get-or-create-purchase-order-list/",
  delete_purchase_order: "purchase-order-delete/",
  create_get_customer_api: "/api/user/create-get-customer-api",
  create_get_vendor_api: "/api/user/create-get-vendor-api",
  create_get_product_api: "create-get-product/",
  create_bom_api: "create-get-list-bom/",
  get_unit_of_product: "create-get-unit-major/",
  delete_units_and_measurements: "delete-or-get-unit-of-major/",
  get_work_order: "create-get-work-order/",
  BoqList: "create-get-list-boq/",
  ResourceList: "create-get-resource/",
  InspectionPhase: "create-get-inspection-phase/",
  ProductionPhase: "create-get-production-phase/",
  ProductionOperations: "create-get-production-operations/",
  delete_vendor_by_id: "delete-or-get-vendor/",
  delete_product_by_id: "delete-or-get-product/",
  delete_customer_by_id: "delete-or-get-customer/",
  get_bom_product: "get_bom_product/",
  change_status_purchase_order: "purchase-order-status-changed/",
  change_status_sales_order: "sales-order-status-changed/",
  get_product_sale: "get_product_sale/",
  delete_sales_order: "sales-order-delete/",
  get_product_bom_details: "get-product-bom-details/",
  create_manufacturing_process_data: "create-get-manufacturing-process/",
  mo_order_status_changed: "mo-order-status-changed/",
  create_get_category: "create-get-categories/",
  delete_categories: "delete-or-get-categorie/",
  get_product_inventory: "product-inventory/",
  get_materials_inventory: "product_materials/",
  get_sales_order_by_id: "sales-order-delete/",
  get_purchase_order_by_id: "purchase-order-delete/",
  get_manufacturing_order_details: "get-or-delete-manufactering/",
  get_product_details_by_id: "delete-or-get-product/",
  get_material_details_by_id: "product-materials-get-delete-update/",
  category:"list-categories/",

  //update api
  update_vendor_by_id: "delete-or-get-vendor/",
  update_customer_by_id: "delete-or-get-customer/",
  update_sales_order_by_id: "sales-order-delete/",
  update_purchase_order_by_id: "purchase-order-delete/",
  update_product_by_id: "delete-or-get-product/",
  update_material_by_id: "product-materials-get-delete-update/",

  // sales report
  sales_revenue: "sales-revenue-report/",
  sales_progress: "sales-progress-report/",
  sales_profit_margin_report: "sales-profit-margin-report/",
  product_profit_margin_report: "product-profit-margin-report/",
  product_performance: "product_performance/",
  low_profitability: "low-profitability-product/",
  top_selling_product: "top-selling-product/",
  top_15_customers: "top-15-customers/",
  customer_order_summery: "customer-orders-summary/",
  customer_performance_report: "customer-performance-report/",
  order_revenue: "orders-revenue/",
  sales_order_details_row: "sales-orders-details_row/",

  // purchase reports
  purchase_spend: "purchase-spend/",
  purchase_order_overtime: "purchase_order_overtime/",
  purchse_report_product: "purchasing-report-product/",
  purchasing_report_row: "purchasing-report-row/",

  //supplier report
  supplier_report: "supplier-report/",
  top_supplier: "top-supplier-report/",
  top10Item_from_supplier: "top-items-from-suppliers/",
  supplier_report_row: "supplier-report-row/",

  // manufacturing report
  production_unit_cost: "production-unit-cost/",
  product_unit_cost: "product-unit-cost/",
  manufacturing_cost_report: "manufacturing-cost-report/",
  mo_order_status: "mo-orders-status/",
  material_and_operation_cost: "materials-and-operations-cost/",

  //ingredients report
  material_per_unit_cost: "material-per-unit-cost/",
  ingredients_usage_report: "ingredient-usage-report/",

  //dashboard chart api
  category_distribution_pie_chart: "monthly-quarterly-data/",
  donut_chart_production: "donut-chart-productions/",
  donut_chart_resources: "donut-chart-resources/",

  //Accounting api
  get_account: "ac/charts_account/",
  // delete_account:"ac/get_delete_account/"
  estimatesList: "estimate-list/",
  approveEstimates: "approve-estimate/",
  addEstimates: "estimate-list/",

  // project pannel api
  project_role: "project/role-list-api/",
  designation: "project/degination-list-api/",
  employee: "/api/user/getAllMrpUser",
  estimate: "project/estimate_project_api/",
  operations: "list-production-operations/",
  customers: "list-customer/",
  material: "list-material-bom/",
  empoyeeDetails: "project/employee_list_user_profile_api/",
  project: "project/list_estimate_project_api/",
  approved: "project/estimate_project_approval_api/",
  project_planning: "project/planning_project_api/",
  projectPlanningDetails: "project/planning_project_api/",
  UpdateProjectPlanningDetails: "project/planning_project_api/",
  projectPlanningApproval: "project/planning_project_approval_api/",


 

  //i will add all api in viewable format
  countryStateCity: "country-state-city-list-api-without-of-bhaaraterp/",
  vendor: {
    place_of_supply_list: "place-of-supply-list/",
  },
  project_list:"project/project_api/",
  employee_list:"project/list_employee_list_api/",
  add_members_for_tracking:"project/manage_employee_on_project_api/",
  create_task:"project/task_on_project_api/",
  acitivity:"project/view_activity_api/",

  task_update_by_employee:"project/spent_log_time_on_task_api/",
  get_all_operation:"project/list_operations_on_project_api/",

  get_designation_list:"project/designation-api-of-mrp/",
  day_book:"project/daybook_project_wise/",


  // permission
  list_of_employee:"project/employee-list-with-permission-with-role-with-designation-list/",
  
};