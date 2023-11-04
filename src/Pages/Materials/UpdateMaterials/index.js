import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoIosAddCircle } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { getUnitOfProductFn } from "../../../Services/Product/GetUnitOfProduct";
import { updateMaterialFn } from "../../../Services/Materials/UpdateMaterial";
import { useNavigate } from "react-router-dom";
import Loding from "../../../Loding";
import { AiTwotoneDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getMaterialDetaisFn } from "../../../Services/Materials/GetMaterialDetails";
import { getCategory } from "../../../Services/Category/GetCategory";
import { Select } from "@mui/material";
const UpdateMaterials = () => {
  const { material_id } = useParams();
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [unitOfProduct, setUnitOfProduct] = useState([]);
  const [subData, setSubData] = useState({});
  const [rows, setRows] = useState([]);

  const [materialData, setmaterialData] = useState({});
  const [varients, setvarients] = useState([]);
  const [category, setCategory] = useState([]);
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getMaterialDetaisFn({
      setloding,
      material_id,
      setmaterialData,
      setvarients,
    });
  }, [material_id]);

  useEffect(() => {
    setFormData({
      name: materialData?.name,
      scope: materialData?.scope,
      timeline: materialData?.timeline,
      // other details
      category: materialData?.category,
      description: materialData?.description,
      unit_of_measure: materialData?.unit_of_measure,
      igst: materialData?.igst,
      gst: materialData?.gst,
    });
  }, [materialData]);

  // console.log(rows)

  function saveFunctionCalled(message) {
    if (rows.length === 0) {
      toast.warn("Please add varients");
      return;
    }

    const fd = new FormData();
    fd.append("basic_details", JSON.stringify(formData));
    fd.append("varients", JSON.stringify(rows));

    updateMaterialFn({
      formData: fd,
      setloding,
      navigate,
      link: "/materials",
      id: material_id,
    });
  }

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
    handleAddRow();
  }, []);

  useEffect(() => {
    // Populate the initial rows with variants data when the component mounts
    const initialRows = varients.map((variant, index) => ({
      id: index + 1,
      variant: variant.name,
      selling_price: parseFloat(variant.selling_price),
      purchasing_price: parseFloat(variant.purchasing_price),
      stock: parseInt(variant.in_stock),
    }));
    setRows(initialRows);
  }, [varients]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      variant: "",
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

  function handleDeleteItems(id) {
    setRows(rows.filter((singleItem) => singleItem.id !== id));
  }

  if (loding) return <Loding />;
  else
    return (
      <>
        <div className="w-full h-full overflow-auto flex gap-2">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg h-full flex flex-col justify-between border-2 border-gray-200">
            <p className=" pt-2 text-2xl font-poppins font-bold ">
              Update Materials :
            </p>
            <div className="h-full flex flex-col justify-between ">
              <form className="flex flex-col justify-evenly overflow-auto">
              <div className="h-full">
              <div className="grid grid-cols-3 gap-5 mt-2">
                  <TextField
                    required
                    id="outlined-required"
                    label="Material Name"
                    placeholder="Enter product name"
                    name="name"
                    shrink={true}
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
                    shrink={true}
                    value={formData.scope}
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Time Line"
                    type="date"
                    name="timeline"
                    shrink={true}
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
                    shrink={true}
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
                    shrink={true}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Select Unit"
                    select
                    name="unit_of_measure"
                    shrink={true}
                    value={formData.unit_of_measure}
                    onChange={handleInputChange}
                  >
                    {unitOfProduct.map((singleData, index) => {
                      return (
                        <MenuItem key={index} value={singleData?.unit_name}>
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
                    shrink={true}
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
                    shrink={true}
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
                </div>

                <div className=" w-full mt-4 flex flex-col gap-3 px-2">
                  <p className="p-4">Add Varients of Materials:</p>
                  {rows.map((row) => (
                    <div className="w-full grid grid-cols-9 gap-3" key={row.id}>
                      <TextField
                        required
                        label="Variant"
                        value={row.variant}
                        className="col-span-2"
                        onChange={(e) =>
                          handleFieldChange(row.id, "variant", e.target.value)
                        }
                      />
                      {/* <TextField
                                                required
                                                label="Selling Price"
                                                type='number'
                                                value={row.selling_price}
                                                onChange={(e) => handleFieldChange(row.id, 'selling_price', e.target.value)}
                                              /> */}
                      <TextField
                        required
                        className="col-span-2"
                        label="Purchasing Price"
                        type="number"
                        value={row.purchasing_price}
                        onChange={(e) =>
                          handleFieldChange(
                            row.id,
                            "purchasing_price",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        required
                        label="Stock"
                        type="number"
                        className="col-span-2"
                        value={row.stock}
                        onChange={(e) =>
                          handleFieldChange(row.id, "stock", e.target.value)
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

export default UpdateMaterials;
