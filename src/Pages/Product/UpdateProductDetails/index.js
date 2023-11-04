import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoIosAddCircle } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import { getUnitOfProductFn } from "../../../Services/Product/GetUnitOfProduct";
import { updateProductDetails } from "../../../Services/Product/UpdateProductDetails";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../../../Loding";
import FormControl from "@mui/material/FormControl";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { getBomProductList } from "../../../Services/BOM/GetBomProductList";
import { getResourceList } from "../../../Services/Resources/GetResourceList";
import { getProductionOperationsList } from "../../../Services/ProductionOperations/GetProductionOperationsList";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { getCategory } from "../../../Services/Category/GetCategory";
import { getSingleProductOrderDetailsFn } from "../../../Services/Product/SingleProductDetails";
const UpdateProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [button, setButton] = useState(0);
  const [unitOfProduct, setUnitOfProduct] = useState([]);
  const [subData, setSubData] = useState({});
  const [isMade, setIsMade] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  // dropdown values
  const [bomProductList, setBomProductList] = useState([]);
  const [resource, setresource] = useState([]);
  const [produntionPhaseList, setproduntionPhaseList] = useState([]);

  const [rows, setRows] = useState([]);
  const [bomRows, setbomRows] = useState([]);
  const [proOperationRows, setproOperationRows] = useState([]);
  // bom total
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // production total
  const [totalcostProductionOperation, settotalcostProductionOperation] =
    useState(0);

  const [dataOrder, setdataOrder] = useState({});
  const [materials, setmaterials] = useState([]);
  const [operations, setoperations] = useState([]);
  const [variants, setvariants] = useState([]);
  const [formData, setFormData] = useState({
    // basic details
    name: "",
    scope: "",
    timeline: "",
    // other details
    category: "",
    description: "",
    unit_of_measure: "",
    igst: "",
    gst: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsMade(dataOrder?.is_made);
    setImage(dataOrder?.product_image);
    setFormData({
      name: dataOrder?.product_name,
      scope: dataOrder?.scope,
      timeline: dataOrder?.timeline,
      // other details
      category: dataOrder?.category,
      description: dataOrder?.description,
      unit_of_measure: dataOrder?.unit,
      igst: dataOrder?.igst,
      gst: dataOrder?.gst,
    });
  }, [dataOrder]);

  useEffect(() => {
    getUnitOfProductFn({
      setUnitOfProduct,
      setSubData,
    });
    getCategory({
      setloding,
      setCategory,
      setSubData,
      page: 1,
      pageCount: 20,
    });
  }, []);

  useEffect(() => {
    getSingleProductOrderDetailsFn({
      setloding,
      id: product_id,
      setData: setdataOrder,
      setmaterials,
      setoperations,
      setvariants,
    });
  }, [product_id]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      variant: "",
      selling_price: 0.0,
      purchasing_price: 0.0,
      stock: 0,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleFieldChange = (rowId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    // Populate the initial rows with variants data when the component mounts
    const initialRows = variants.map((variant, index) => ({
      id: index + 1,
      variant: variant.name,
      selling_price: parseFloat(variant.selling_price),
      purchasing_price: parseFloat(variant.purchasing_price),
      stock: parseInt(variant.in_stock),
    }));
    setRows(initialRows);
  }, [variants]);

  function handleDeleteItems(id) {
    setRows(rows.filter((singleItem) => singleItem.id !== id));
  }

  // bom
  const handleAddRowForBOM = () => {
    const newRow = {
      id: bomRows.length + 1,
      item: "",
      qnt: 0.0,
      notes: "",
      stock_cost: 0.0,
    };
    setbomRows((prevRows) => [...prevRows, newRow]);
  };

  const handleBOMFieldChange = (rowId, field, value) => {
    setbomRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    // Populate the initial BOM rows with materials data when the component mounts
    const initialBomRows = materials.map((material, index) => ({
      id: index + 1,
      item: material.name,
      qnt: material.quantity,
      notes: material.notes,
      stock_cost: 0.0, // Set your default value here if needed
    }));
    setbomRows(initialBomRows);
  }, [materials]); //

  function handleDeleteItemsBOM(id) {
    setbomRows(bomRows.filter((singleItem) => singleItem.id !== id));
  }

  // production Operation
  const handleAddRowForProduction = () => {
    const newRow = {
      id: proOperationRows.length + 1,
      operation: "",
      resource: "",
      cost_per_hrs: 0.0,
      hh: 0.0,
      mm: 0.0,
      ss: 0.0,
      cost: 0.0,
    };
    setproOperationRows((prevRows) => [...prevRows, newRow]);
  };

  const handleProductionFieldChange = (rowId, field, value) => {
    setproOperationRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    // Populate the initial production operation rows with operations data when the component mounts
    const initialProOperationRows = operations.map((operation, index) => ({
      id: index + 1,
      operation: operation.operation_name,
      resource: operation.resource,
      cost_per_hrs: parseFloat(operation.cost_per_hour),
      hh: parseFloat(operation.time.split(":")[0]),
      mm: parseFloat(operation.time.split(":")[1]),
      ss: parseFloat(operation.time.split(":")[2]),
      cost: parseFloat(operation.cost),
    }));
    setproOperationRows(initialProOperationRows);
  }, [operations]); //

  function handleDeleteItemsProduction(id) {
    setproOperationRows(
      proOperationRows.filter((singleItem) => singleItem.id !== id)
    );
  }

  useEffect(() => {
    const calculatedSubTotalcost = bomRows.reduce(
      (accumulator, row) => accumulator + Number(row.stock_cost),
      0
    );
    setTotalCost(calculatedSubTotalcost);
    const calculatedSubTotalqnt = bomRows.reduce(
      (accumulator, row) => accumulator + Number(row.qnt),
      0
    );
    setTotalQuantity(calculatedSubTotalqnt);
  }, [bomRows]);

  useEffect(() => {
    const calculatedSubTotalcost = proOperationRows.reduce(
      (accumulator, row) => accumulator + Number(row.cost),
      0
    );
    settotalcostProductionOperation(calculatedSubTotalcost);
  }, [proOperationRows]);

  useEffect(() => {
    handleAddRow();
    handleAddRowForProduction();
    handleAddRowForBOM();

    getBomProductList({
      setloding,
      setBomProductList,
    });

    getResourceList({
      setloding,
      page: 1,
      pageCount: 10,
      setresource,
      setSubData: setSubData,
      searchValue: setSubData,
    });

    getProductionOperationsList({
      setloding,
      page: 1,
      pageCount: 10,
      setproduntionPhaseList,
      setSubData: setSubData,
      searchValue: setSubData,
    });
  }, []);

  // console.log(bomProductList)
  function saveFunctionCalled(message) {
    if (rows.length === 0) {
      toast.warn("Please add varients");
      return;
    }

    const bom = {
      total_cost: totalCost,
    };

    const bom_data = bomRows.map((singleData) => {
      return {
        material_variant_id: singleData?.item,
        qty: singleData?.qnt,
        notes: singleData?.notes,
      };
    });

    const bom_operations = proOperationRows.map((singleData) => {
      return {
        operation_id: singleData?.operation,
        resource_id: singleData?.resource,
        cost_per_hour: singleData?.cost_per_hrs,
        time: `${singleData?.hh}:${singleData?.mm}:${singleData?.ss}`,
      };
    });

    console.log(formData);
    const fd = new FormData();
    fd.append("image", image);
    fd.append("basic_details", JSON.stringify(formData));
    fd.append("varients", JSON.stringify(rows));

    if (isMade) {
      fd.append("bom", JSON.stringify(bom));
      fd.append("bom_data", JSON.stringify(bom_data));
      fd.append("bom_operations", JSON.stringify(bom_operations));
    }

    updateProductDetails({
      formData: fd,
      setloding,
      navigate,
      link: message === "/product",
      id: product_id,
    });
  }

  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full overflow-auto flex flex-col justify-between border-2 border-gray-200">
            <p className="py-2  font-poppins font-bold bg-blue-200 flex items-center justify-between px-5">
              <span className="text-2xl">Update Product :</span>
              <p className="flex">
                {isMade
                  ? ["General Info", "BOM", "Production Operation"].map(
                      (singleItem, index) => {
                        return (
                          <span
                            onClick={() => setButton(index)}
                            key={index}
                            className={`${
                              button === index && "bg-white"
                            } cursor-pointer px-4 py-2 rounded-lg`}
                          >
                            {singleItem}
                          </span>
                        );
                      }
                    )
                  : ["General Info"].map((singleItem, index) => {
                      return (
                        <span
                          onClick={() => setButton(index)}
                          key={index}
                          className={`${
                            button === index && "bg-white"
                          } cursor-pointer px-4 py-2 rounded-lg`}
                        >
                          {singleItem}
                        </span>
                      );
                    })}
              </p>
            </p>
            <div className=" flex flex-col justify-between overflow-auto h-[90%] ">
              <form className="flex flex-col justify-evenly overflow-auto  pt-50">
                <div className="h-full">
                  {button === 0 && (
                    <div>
                      <div className="grid grid-cols-3 gap-5 mt-2">
                        <TextField
                          required
                          id="outlined-required"
                          label="Product Name"
                          placeholder="Enter product name"
                          name="name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.name}
                          onChange={handleInputChange}
                        />

                        <TextField
                          required
                          id="outlined-required"
                          label="Scope"
                          type="text"
                          placeholder="Enter Scope"
                          name="scope"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.scope}
                          onChange={handleInputChange}
                        />
                        <div className="row-span-3  h-full w-full border-2 flex justify-center items-center relative">
                          <div
                            className="
                                       w-[50%] h-[50%]
                                        flex justify-center items-center overflow-auto relative"
                          >
                            <img
                              className=" h-fit w-fit overflow-auto"
                              src={selectedImage || (image !== "" && image)}
                            ></img>
                          </div>
                          <input
                            required
                            type="file"
                            className="!absolute bottom-5 right-0  "
                            onChange={(e) => {
                              handleImageChange(e);
                              setImage(e.target.value);
                            }}
                            InputLabelProps={{
                            shrink: true,
                          }}
                          />
                        </div>

                        <TextField
                          required
                          id="outlined-required"
                          label="Time Line"
                          type="date"
                          name="timeline"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.timeline}
                          onChange={handleInputChange}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Category"
                          select
                          placeholder="Enter the product category"
                          type="text"
                          name="category"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          {category.map((singleData, index) => {
                            return (
                              <MenuItem key={index} value={singleData?.name}>
                                {singleData?.name}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                        <TextField
                          id="outlined-required"
                          label="Description"
                          placeholder="Enter the description"
                          type="text"
                          name="description"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Select Unit"
                          select
                          name="unit_of_measure"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.unit_of_measure}
                          onChange={handleInputChange}
                        >
                          {unitOfProduct.map((singleData, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={singleData?.unit_name}
                              >
                                {singleData?.unit_name}
                              </MenuItem>
                            );
                          })}
                        </TextField>

                        <TextField
                          required
                          id="outlined-required"
                          label="IGST"
                          select
                          //   defaultValue={18}
                          name="igst"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.igst}
                          onChange={handleInputChange}
                        >
                          {[5, 12, 18, 28].map((singleData, index) => {
                            return (
                              <MenuItem key={index} value={singleData}>
                                {singleData} %
                              </MenuItem>
                            );
                          })}
                        </TextField>

                        <TextField
                          required
                          id="outlined-required"
                          label="GST"
                          // defaultValue={18}
                          select
                          name="gst"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.gst}
                          onChange={handleInputChange}
                        >
                          {[5, 12, 18, 28].map((singleData, index) => {
                            return (
                              <MenuItem key={index} value={singleData}>
                                {singleData} %
                              </MenuItem>
                            );
                          })}
                        </TextField>

                        <div className="border-2 w-full rounded-lg  flex items-center pl-4 gap-3">
                          <p className="h-5 w-5 rounded-full bg-blue-700 flex items-center justify-center">
                            <p className="h-1 w-1 rounded-full bg-white"></p>
                          </p>
                          <p>{isMade ? "I Make" : "I Purchase"}</p>
                        </div>
                      </div>

                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Add Varients of Products:</p>
                        {rows.map((row) => (
                          <div
                            className="w-full grid grid-cols-8 gap-3"
                            key={row.id}
                          >
                            <TextField
                              required
                              label="Variant"
                              value={row.variant}
                              className="col-span-4"
                              onChange={(e) =>
                                handleFieldChange(
                                  row.id,
                                  "variant",
                                  e.target.value
                                )
                              }
                            />
                            <TextField
                              required
                              label="Selling Price"
                              type="number"
                              className="col-span-1"
                              value={row.selling_price}
                              onChange={(e) =>
                                handleFieldChange(
                                  row.id,
                                  "selling_price",
                                  e.target.value
                                )
                              }
                            />
                            {isMade === false && (
                              <TextField
                                required
                                label="Purchasing Price"
                                type="number"
                                className="col-span-1"
                                value={row.purchasing_price}
                                onChange={(e) =>
                                  handleFieldChange(
                                    row.id,
                                    "purchasing_price",
                                    e.target.value
                                  )
                                }
                              />
                            )}

                            <TextField
                              required
                              label="Stock"
                              className="col-span-1"
                              type="number"
                              defaultValue={0}
                              value={row.stock}
                              onChange={(e) =>
                                handleFieldChange(
                                  row.id,
                                  "stock",
                                  e.target.value
                                )
                              }
                            />

                            <p className="text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center">
                              <span
                                onClick={() => handleDeleteItems(row.id)}
                                className="cursor-pointer"
                              >
                                <AiTwotoneDelete
                                  className={rows.length === 1 && "hidden"}
                                />
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <p
                        onClick={handleAddRow}
                        component="th"
                        scope="row"
                        className="mt-3 text-white  rounded-lg px-5 py-1  cursor-pointer !flex items-center  font-bold !text-lg"
                      >
                        <span className="bg-purple-600 rounded-l-xl p-2">
                          Add Varients
                        </span>
                        <span className="text-[2rem] bg-purple-600 px-2 rounded-r-xl">
                          <IoIosAddCircle />
                        </span>
                      </p>
                    </div>
                  )}
                  {button === 1 && (
                    <div>
                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Add Varients of Products:</p>
                        {bomRows.map((row) => (
                          <div
                            className="w-full grid grid-cols-8 gap-3"
                            key={row.id}
                          >
                            {/* <TextField
                                            required
                                            select
                                            label="Item"
                                            value={row.item}
                                            className='col-span-3'
                                            onChange={(e) => handleBOMFieldChange(row.id, 'item', e.target.value)}
                                          >
                                                   <option><em>None</em></option>
                                                  { 
                                                    bomProductList.filter((singleData)=>singleData?.type === 'bom').map((singleItem,index)=>{
                                                      return  <optgroup label={singleItem?.name} key={index}>
                                                          {
                                                            singleItem?.variants.map((singleItems,index)=>{
                                                              return <option value={singleItems?.v_id} key={index} className='text-sm text-blue-600 flex w-full justify-end' >
                                                                <span>{singleItems?.variant_name}</span>
                                                              </option>
                                                            })
                                                          }
                                                        </optgroup>
                                                        })
                                          }

                                          </TextField> */}

                            <FormControl
                              sx={{ minWidth: 120 }}
                              className="col-span-3"
                            >
                              <InputLabel htmlFor="grouped-native-select">
                                Items
                              </InputLabel>
                              <Select
                                native
                                defaultValue=""
                                id="grouped-native-select"
                                label="Items"
                                onChange={(e) =>
                                  handleBOMFieldChange(
                                    row.id,
                                    "item",
                                    e.target.value
                                  )
                                }
                              >
                                <option>
                                  <em>None</em>
                                </option>
                                {bomProductList
                                  .filter(
                                    (singleData) => singleData?.type === "bom"
                                  )
                                  .map((singleItem, index) => {
                                    return (
                                      <optgroup
                                        label={singleItem?.name}
                                        key={index}
                                      >
                                        {singleItem?.variants.map(
                                          (singleItems, index) => {
                                            return (
                                              <option
                                                value={singleItems?.v_id}
                                                key={index}
                                                className="text-sm text-blue-600 flex w-full justify-end"
                                              >
                                                <span>
                                                  {singleItems?.variant_name}
                                                </span>
                                              </option>
                                            );
                                          }
                                        )}
                                      </optgroup>
                                    );
                                  })}
                              </Select>
                            </FormControl>

                            <TextField
                              required
                              label="Qnt"
                              type="number"
                              className="col-span-1"
                              value={row.qnt}
                              onChange={(e) =>
                                handleBOMFieldChange(
                                  row.id,
                                  "qnt",
                                  e.target.value
                                )
                              }
                            />

                            <TextField
                              required
                              label="Notes"
                              className="col-span-2"
                              type="text"
                              value={row.notes}
                              onChange={(e) =>
                                handleBOMFieldChange(
                                  row.id,
                                  "notes",
                                  e.target.value
                                )
                              }
                            />
                            <TextField
                              required
                              label="Stock Cost"
                              className="col-span-1"
                              type="number"
                              value={row.stock_cost}
                              onChange={(e) =>
                                handleBOMFieldChange(
                                  row.id,
                                  "stock_cost",
                                  e.target.value
                                )
                              }
                            />

                            <p className="text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center">
                              <span
                                onClick={() => handleDeleteItemsBOM(row.id)}
                                className="cursor-pointer"
                              >
                                <AiTwotoneDelete
                                  className={bomRows.length === 1 && "hidden"}
                                />
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <p
                        onClick={handleAddRowForBOM}
                        className="mt-3 text-white  rounded-lg px-5 py-1  cursor-pointer !flex items-center  font-bold !text-lg"
                      >
                        <span className="bg-purple-600 rounded-l-xl p-2">
                          Add Row
                        </span>
                        <span className="text-[2rem] bg-purple-600 px-2 rounded-r-xl">
                          <IoIosAddCircle />
                        </span>
                      </p>
                      <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <span className="">
                          <hr />
                          <hr />
                          <hr />
                          <hr />
                          <p className="gap-8 py-2 grid grid-cols-2">
                            <span className="font-bold !text-lg">
                              Total Cost:
                            </span>
                            <span className="">
                              <span className="font-bold !text-lg">
                                {totalCost}
                              </span>
                              <span>USD</span>
                            </span>
                          </p>
                          <p className=" gap-8 py-2 grid grid-cols-2">
                            <span className="font-bold !text-lg">
                              Quantity:
                            </span>
                            <span className="">
                              <span className="font-bold !text-lg">
                                {totalQuantity}
                              </span>
                              <span>pcs</span>
                            </span>
                          </p>
                          <hr />
                        </span>
                      </p>
                    </div>
                  )}

                  {button === 2 && (
                    <div>
                      <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                        <p className="p-4">Add Varients of Products:</p>
                        {proOperationRows.map((row) => (
                          <div
                            className="w-full grid grid-cols-10 gap-3"
                            key={row.id}
                          >
                            <TextField
                              required
                              select
                              label="Operation"
                              value={row.operation}
                              className="col-span-2"
                              onChange={(e) =>
                                handleProductionFieldChange(
                                  row.id,
                                  "operation",
                                  e.target.value
                                )
                              }
                            >
                              {produntionPhaseList.map((singleData, index) => {
                                return (
                                  <MenuItem key={index} value={singleData?.id}>
                                    <p className="w-full flex justify-between">
                                      <span>{singleData?.stage}</span>
                                      <span>{singleData?.cost_per_hour}</span>
                                    </p>
                                  </MenuItem>
                                );
                              })}
                            </TextField>

                            <TextField
                              required
                              select
                              label="Resource"
                              type="text"
                              className="col-span-2"
                              value={row.resource}
                              onChange={(e) =>
                                handleProductionFieldChange(
                                  row.id,
                                  "resource",
                                  e.target.value
                                )
                              }
                            >
                              {resource.map((singleData, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    value={singleData?.resource_id}
                                  >
                                    <p className="w-full flex justify-between">
                                      <span>{singleData?.resource_name}</span>
                                      <span>{singleData?.resource_type}</span>
                                    </p>
                                  </MenuItem>
                                );
                              })}
                            </TextField>

                            <TextField
                              required
                              label="Cost/hr"
                              className="col-span-1"
                              type="number"
                              defaultValue={0}
                              value={row.cost_per_hrs}
                              onChange={(e) =>
                                handleProductionFieldChange(
                                  row.id,
                                  "cost_per_hrs",
                                  e.target.value
                                )
                              }
                            />
                            <div className="col-span-3">
                              <div className="grid grid-cols-3">
                                <TextField
                                  required
                                  label="HH"
                                  className="col-span-1"
                                  type="number"
                                  defaultValue={"00"}
                                  value={row.hh}
                                  onChange={(e) =>
                                    handleProductionFieldChange(
                                      row.id,
                                      "hh",
                                      e.target.value
                                    )
                                  }
                                />
                                <TextField
                                  required
                                  label="MM"
                                  className="col-span-1"
                                  type="number"
                                  defaultValue={"00"}
                                  value={row.mm}
                                  onChange={(e) =>
                                    handleProductionFieldChange(
                                      row.id,
                                      "mm",
                                      e.target.value > 59 || e.target.value < 0
                                        ? 59
                                        : e.target.value
                                    )
                                  }
                                />
                                <TextField
                                  required
                                  label="SS"
                                  className="col-span-1"
                                  type="number"
                                  defaultValue={"00"}
                                  value={row.ss}
                                  onChange={(e) =>
                                    handleProductionFieldChange(
                                      row.id,
                                      "ss",
                                      e.target.value > 59 || e.target.value > 0
                                        ? 59
                                        : e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <TextField
                              required
                              label="Cost"
                              className="col-span-1"
                              type="number"
                              defaultValue={0}
                              value={row.cost}
                              onChange={(e) =>
                                handleProductionFieldChange(
                                  row.id,
                                  "cost",
                                  e.target.value
                                )
                              }
                            />

                            <p className="text-xl  text-red-800 col-span-1 grid grid-cols-1 w-full h-full  place-items-center">
                              <span
                                onClick={() =>
                                  handleDeleteItemsProduction(row.id)
                                }
                                className="cursor-pointer"
                              >
                                <AiTwotoneDelete
                                  className={
                                    proOperationRows.length === 1 && "hidden"
                                  }
                                />
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <p
                        onClick={handleAddRowForProduction}
                        component="th"
                        scope="row"
                        className="mt-3 text-white  rounded-lg px-5 py-1  cursor-pointer !flex items-center  font-bold !text-lg"
                      >
                        <span className="bg-purple-600 rounded-l-xl p-2">
                          Add Row
                        </span>
                        <span className="text-[2rem] bg-purple-600 px-2 rounded-r-xl">
                          <IoIosAddCircle />
                        </span>
                      </p>
                      <p className=" rounded-lg px-5 py-1 !flex items-center  justify-end ">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <p className="gap-8 py-2 grid grid-cols-2">
                          <span className="font-bold !text-lg">
                            Total Cost:
                          </span>
                          <span className="">
                            <span className="font-bold !text-lg">
                              {totalcostProductionOperation}
                            </span>
                            <span>USD</span>
                          </span>
                        </p>

                        <hr />
                      </p>
                    </div>
                  )}
                </div>
              </form>

              <div className="w-full flex gap-2 mt-8 bg-gradient-to-b from-purple-200 to-purple-500 p-2 ">
                <button
                  onClick={() => saveFunctionCalled("save")}
                  className="text-white p-3 bg-blue-600 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default UpdateProductDetails;
