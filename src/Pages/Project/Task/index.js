import { IconButton, MenuItem, Slider, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GetMemberList } from "../../../Services/ProjectTracking/GetMemberList";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Config/axios";
import { API_URLS } from "../../../Config/apiUrls";
import {
  createTask,
  updateTask,
  update_task_by_employeeFun,
} from "../../../Services/Task/CreateTask";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { BsFillStopwatchFill } from "react-icons/bs";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import CustomTable from "../../../Shared/CustomTable";
import { Delete } from "@mui/icons-material";
import { isPermission } from "../../../Services/PermissionList/BooleanFunctoinForPermissin";
import { getPermission_along_with_user_id } from "../../../Services/PermissionList";
import { permission_message } from "../../../Mock";
const Task = () => {
  const state = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const role_user = localStorage.getItem("role_user");
  const [Permission, setPermissions] = React.useState([])
  const [projectData, setProjectData] = useState([]);
  const [paragraph, setparagraph] = useState("");
  const [images, setimages] = useState();
  const [task_data, settask_data] = useState({});
  const [viewActivities_by_emp, setviewActivities_by_emp] = useState([]);
  const [openCustomDialogBox, setOpenCustomDialogBox] = useState(false);
  const [
    openCustomDialogBoxFor_View_details,
    setopenCustomDialogBoxFor_View_details,
  ] = useState(false);

  const client = useQueryClient();

  function getViewAcitviy_by_emp() {
    axiosInstance
      .get(`${API_URLS.task_update_by_employee}`, {
        params: { task_id: state?.state?.task_id },
      })
      .then((res) => {
        // console.log(res?.data,"aa")
        setviewActivities_by_emp(res?.data?.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (state?.state?.task_id) getViewAcitviy_by_emp();
  }, [state?.state?.task_id]);

  async function getTaskList() {
    // console.log(state.state.id)
    axiosInstance
      .get(`${API_URLS.create_task}`)
      .then((res) =>
        settask_data(
          res?.data?.data?.find((i) => i.id === Number(state?.state?.task_id)),
          "this"
        )
      )
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (state?.state?.task_id) getTaskList();
  }, []);

  useEffect(() => {
    setparagraph(task_data?.description);
  }, [task_data]);

  console.log(task_data);

  const initialValue = {
    task: task_data?.task_name || "",
    // paragraph: "",
    assign_to: task_data?.assignee?.emp_id || "",
    accountable: task_data?.accountable?.emp_id || "",
    estimate_time: task_data?.estimated_time || "",
    start_date: task_data?.start_date?.slice(0, 10) || "",
    end_date: task_data?.end_date?.slice(0, 10) || "",
    progress:
      parseInt(
        (Number(task_data?.spent_time) * 100) /
        Number(task_data?.estimated_time)
      ) || "",
    priority: task_data?.priority || "",

    operation_id: task_data?.operations_on_project?.operations_id || "",

    // taskupdated by emp
    task_time: "1",
    task_comment: "",
    task_status: state?.state?.task_status || "",
  };

  const formik = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const formData = new FormData();

      formData.append("task_id", state?.state?.task_id || "");
      formData.append("project_id", state?.state?.id);
      formData.append("operations_on_project_id", formik?.values?.operation_id);
      formData.append("task_name", formik.values.task);
      formData.append("description", paragraph);
      formData.append("priority", formik.values.priority);
      formData.append("estimated_time", formik.values.estimate_time);
      formData.append("assignee_emp_id", formik.values.assign_to);
      formData.append("accountable_emp_id", formik.values.accountable);

      formData.append("start_date", formik.values.start_date);
      formData.append("end_date", formik.values.end_date);

      if (images)
        for (let file of images) {
          formData.append("file_list", file);
        }

      state?.state?.task_id ? updatetask(formData) : createtask(formData);
    },
  });

  console.log(formik.values.start_date);

  function update_task_by_employee_Function(task_id, hours, comment, task_status) {
    const fd = new FormData();
    fd.append("task_id", task_id);
    fd.append("hours", hours);
    fd.append("comment", comment);
    fd.append("task_status", task_status)
    if (images) {
      if (images)
        for (let file of images) {
          fd.append("file_list", file);
        }
    }
    update_task_by_employee(fd);
  }

  const { mutate: update_task_by_employee } = useMutation(
    update_task_by_employeeFun,
    {
      onSuccess: (response) => {
        // console.log("add");
        if (response.data.response_code === 200) {
          setOpenCustomDialogBox(false);
          client.refetchQueries("taskList");
          navigate("/task-list");
        }
        toast.success(response.data.message);
      },
    }
  );

  const { mutate: createtask } = useMutation(createTask, {
    onSuccess: (response) => {
      // console.log("add");
      if (response.data.response_code === 200) {
        navigate("/task-list");
        client.refetchQueries("taskList");
      }
      toast.success(response.data.message);
    },
  });

  const { mutate: updatetask } = useMutation(updateTask, {
    onSuccess: (response) => {
      console.log("add");
      if (response.data.response_code === 200) {
        client.refetchQueries("taskList");
        navigate("/task-list");
      }
      toast.success(response.data.message);
    },
  });

  console.log(projectData, "projectdata");

  const { data: employee } = useQuery(
    ["getmemberlist"],
    () => GetMemberList({ project_id: state?.state?.id }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(state?.state?.id);
  // console.log(employee);
  // console.log(state.state.type_of_project)

  // console.log(viewActivities_by_emp,"anand")
  const tableBody = viewActivities_by_emp?.map((i) => {
    return {
      id: i?.id,
      task: i.task,
      created_at: i?.created_at,
      updated_at: i?.updated_at,
      hours: i?.hours,
    };
  });

  async function getProjectData() {
    console.log(state.state.id);
    axiosInstance
      .get(`${API_URLS.get_all_operation}?project_id=${state.state.id}`)
      .then((res) => setProjectData(res?.data?.data))
      .catch((e) => console.log(e));
  }
  // setProjectData(res?.data?.data)
  useEffect(() => {
    getProjectData();
  }, []);

  // console.log(employee?.data?.data?.employees);
  React.useEffect(() => {
    getPermission_along_with_user_id({ setPermissions })
  }, [])


  console.log(Permission)

  return (
    <div className="bg-white mt-5 rounded-lg p-5">
      <div className="bg-blue-500 py-2 mb-2 px-5 text-white flex justify-between">
        <p>New Taks : {state.state.project_name}</p>
        {state?.state?.task_id && <p>Task Id: {state?.state?.task_id}</p>}
      </div>
      <div className="grid grid-cols-2 gap-5 px-5 mt-5">
        <TextField
          className="!col-span-2"
          id="task"
          name="task"
          label="Taks"
          disabled={role === "Associate" ? true : false}
          variant="outlined"
          value={formik.values.task}
          onChange={formik.handleChange}
        />

        <span className="font-bold">Paragraph:</span>
        <ReactQuill
          className="col-span-2 row-span-2"
          id="paragraph"
          name="paragraph"
          value={paragraph}
          disabled={role === "Associate" ? true : false}
          onChange={(value) => setparagraph(value)}
          modules={{ toolbar: true }}
        />

        <TextField
          className="!mt-10"
          select
          id="operation_id"
          name="operation_id"
          label="Choose Operation"
          variant="outlined"
          disabled={state?.state?.task_id ? true : false}
          value={formik.values.operation_id}
          onChange={formik.handleChange}
        >
          {projectData?.map((i) => {
            return (
              <MenuItem value={i?.operations_id}>{i?.operations_name}</MenuItem>
            );
          })}
        </TextField>

        <TextField
          className="!mt-10"
          select
          id="assign_to"
          name="assign_to"
          label="Assign To"
          variant="outlined"
          disabled={role === "Associate" ? true : false}
          value={formik.values.assign_to}
          onChange={formik.handleChange}
        >
          {employee?.data?.data?.employees
            ?.filter((item) => item?.designation?.role?.name === "Associate")

            ?.map((i) => {
              return (
                <MenuItem value={i?.emp_id}>
                  {i?.email} | {i?.designation?.designation} |{" "}
                  {i?.current_cost_per_hours}
                </MenuItem>
              );
            })}
        </TextField>

        <TextField
          select
          id="accountable"
          name="accountable"
          label="Accountable"
          variant="outlined"
          disabled={role === "Associate" ? true : false}
          value={formik.values.accountable}
          onChange={formik.handleChange}
        >
          {employee?.data?.data?.employees
            ?.filter((item) => item?.designation?.role?.name === "Manager")
            ?.map((i) => {
              return (
                <MenuItem value={i?.emp_id}>
                  {i?.email} | {i?.designation?.designation} |{" "}
                  {i?.current_cost_per_hours}
                </MenuItem>
              );
            })}
        </TextField>
        <TextField
          className=""
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          id="estimate_time"
          name="estimate_time"
          disabled={role === "Associate" ? true : false}
          label="Estimate time In Hrs"
          variant="outlined"
          value={formik.values.estimate_time}
          onChange={formik.handleChange}
        />

        <div className="flex items-center gap-10 border-2  rounded-md border-gray-400 justify-between px-5">
          <div className="flex gap-5 items-center">
            <p>Spent Time:</p>
            <div className="flex items-center gap-5">
              <p>{formik.values.task_time}</p>
              <p
                className="text-blue-700"
                onClick={() => {
                  if (role === "Associate" && isPermission(Permission, "add_spent_log_time_on_task")) {
                    setOpenCustomDialogBox(true);
                  }
                }}
              >
                <BsFillStopwatchFill />
              </p>
            </div>
          </div>
          <div className="text-blue-500 text-lg">
            <span onClick={() => {
               if (role_user === "Project Based" || isPermission(Permission, "view_spent_log_time_on_task")) {
              setopenCustomDialogBoxFor_View_details(true)
               }else{
                toast.warn(permission_message)
               }
              }}>
              <IoEyeSharp />
            </span>
          </div>
        </div>

        <TextField
          className=""
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          id="start_date"
          name="start_date"
          label="Start_date"
          disabled={role === "Associate" ? true : false}
          variant="outlined"
          value={formik.values.start_date}
          onChange={formik.handleChange}
        />
        <TextField
          className=""
          type="date"
          id="end_date"
          InputLabelProps={{
            shrink: true,
          }}
          name="end_date"
          label="End_ Date"
          disabled={role === "Associate" ? true : false}
          variant="outlined"
          value={formik.values.end_date}
          onChange={formik.handleChange}
        />
        <div>
          <p>
            Performance :{" "}
            {parseInt(
              (Number(task_data?.spent_time) * 100) /
              Number(task_data?.estimated_time)
            )}{" "}
            %
          </p>
          <Slider
            id="progress"
            name="progress"
            size="small"
            disabled={role === "Associate" ? true : false}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={formik.values.progress}
          // onChange={formik.handleChange}
          />
        </div>
        <TextField
          select
          id="priority"
          name="priority"
          disabled={role === "Associate" ? true : false}
          label="Priority"
          variant="outlined"
          value={formik.values.priority}
          onChange={formik.handleChange}
        >
          {["Immediate", "Low", "Normal", "High"].map((i, index) => {
            return (
              <MenuItem value={i} key={index}>
                {i}
              </MenuItem>
            );
          })}
        </TextField>
        <div></div>

        {role !== "Employee" && (
          <div className="!col-span-2 !outline-none flex flex-col gap-2">
            <input
              className="!col-span-2"
              id="img"
              multiple
              name="img"
              label="img"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              //   variant="standard"
              //   value={i.img}
              onChange={(e) => {
                setimages(e.target.files);
              }}
            />
          </div>
        )}
      </div>
      {role !== "Employee" && (
        <div className="bg-blue-500 mt-5  p-4 px-5">
          <span
            onClick={formik.handleSubmit}
            className="cursor-pointer text-black bg-white px-5 py-2 rounded-lg"
          >
            Submit
          </span>
        </div>
      )}

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <div className="flex flex-col gap-5 mt-5">
              <TextField
                select
                id="task_status"
                name="task_status"
                label="Task Status"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formik.values.task_status}
                onChange={formik.handleChange}
              >
                {[
                  "New",
                  "In_Progress",
                  "In_Testing",
                  "Tested",
                  "Test_Failed",
                  "Closed",
                  "On_Hold",
                  "Rejected",
                ]?.map((i, index) => {
                  return (
                    <MenuItem value={i} key={index}>
                      {i?.replace("_", " ")}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                type="number"
                id="task_time"
                name="task_time"
                label="Hours"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formik.values.task_time}
                onChange={formik.handleChange}
              />
              <TextField
                multiline
                rows={4}
                id="task_comment"
                name="task_comment"
                label="Comment"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formik.values.task_comment}
                onChange={formik.handleChange}
              />
              <input
                className="!col-span-2"
                id="img"
                multiple
                name="img"
                label="img"
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                //   variant="standard"
                //   value={i.img}
                onChange={(e) => {
                  if (role_user === "Project Based" || isPermission(Permission, "add_files_on_spent_log_time_on_task")) {
                    setimages(e.target.files);
                  }
                }
                }
              />
              <div className=" flex justify-center">
                <p
                  className="bg-blue-800 text-white rounded-full py-2 px-5 cursor-pointer"
                  onClick={() => {
                    if (
                      !formik.values.task_time ||
                      !formik.values.task_comment ||
                      !state?.state?.task_id
                    ) {
                      toast.warn("Missings Time and Comments both.");
                    } else {
                      update_task_by_employee_Function(
                        state?.state?.task_id,
                        formik.values.task_time,
                        formik.values.task_comment,
                        formik?.values.task_status
                      );
                    }
                  }}
                >
                  SAVE
                </p>
              </div>
            </div>
          }
          title={"Spent Time: "}
        />
      )}
      {openCustomDialogBoxFor_View_details && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBoxFor_View_details}
          setOpenCustomDialogBox={setopenCustomDialogBoxFor_View_details}
          component={
            <div>
              <CustomTable
                className={""}
                isLoding={false}
                tablehead={[
                  <span>Task Id</span>,
                  <span>Date</span>,
                  <span>Spent Time</span>,
                  <span>Actions</span>,
                ]}
                tablerow={tableBody?.map((i) => {
                  return [
                    <span>{i?.task}</span>,
                    <span>{new Date(i?.created_at)?.toDateString()}</span>,
                    <span className="pl-2">{i?.hours}</span>,

                    <span>
                      <IconButton>
                        <Delete
                          className="!text-red-500"
                          onClick={() => {
                            if (role_user === "Project Based" || isPermission(Permission, "delete_spent_log_time_on_task")) {
                              {
                                update_task_by_employee({
                                  task_id: state?.state?.task_id,
                                  spent_log_time_on_task_id: i?.id,
                                })
                              }
                            }else{
                              toast.warn(permission_message)
                            }
                          }}
                        />
                      </IconButton>
                    </span>,
                  ];
                })}
              />
            </div>
          }
          title={"All Spent log:"}
        />
      )}
    </div>
  );
};

export default Task;
