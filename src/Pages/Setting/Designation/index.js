import * as React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useQuery } from "react-query";
import CustomTable from "../../../Shared/CustomTable";
import Pagination from "../../../Shared/Pagination";
import CustomDialogBox from "../../../Shared/CustomDialogBox";
import CreateDesignation from "./CreateDesignation";
import { GetDesignationList } from "../../../Services/Designation";
import { projectRole } from "../../../Services/Project/Employee/AddEmployee/projectRole";

export default function Designation() {

  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);

  const [pageCount, setPageCount] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [filterData, setfilterData] = React.useState("");

  const { data } = useQuery(
    ["designation", searchValue, pageCount,page,filterData],
    () =>
      GetDesignationList({
        search_value: searchValue,
        limit: pageCount,
        page: page,
        role_id:filterData
      }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log("response", res);
      },
    }
  );


  const { data: getRole } = useQuery(["role"], () => projectRole(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

const tableData = data?.data?.data
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2  px-4  text-white">
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <select
            type="search"
            placeholder="Select Role"
            className="px-2 py-2 text-black outline-none border-2 w-[30%]  border-purple-400 rounded-lg "
            onChange={(e) => setfilterData(e.target.value)}
          >
            <option value="">
              <em>--None--</em>
            </option>
            {getRole?.data?.data?.map((i) => {
              return <option value={i.id}>{i?.name}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-1">
          {/* <Button
            onClick={deleteHandler}
            className={`${
              checkedBox.length <= 0 ? "opacity-10" : "opacity-100"
            } !text-red-700 `}
            disabled={checkedBox.length > 0 ? false : true}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button> */}
          <p
            onClick={() => setOpenCustomDialogBox(true)}
            className=" bg-purple-500  px-5 py-1  cursor-pointer !flex items-center gap-3 font-bold !text-lg !rounded-full"
          >
            <span>Add Designation</span>
            <span className="text-[2rem]">
              <IoIosAddCircle />
            </span>
          </p>
        </div>
      </div>

      <div className="h-[100%] flex flex-col justify-between ">
        <CustomTable
          className={""}
          isLoding={false}
          tablehead={[
            <span>S. No.</span>,
            <span>Role</span>,
            <span>Designation</span>,
          ]}
          tablerow={tableData?.map(
            (i) => {
              return [

                <span className="ml-3">{i?.id}</span>,
                <span>{i?.role}</span>,
                <span>{i?.designation}</span>
              ];
            }
          )}
        />
        <Pagination
          className
          subData={data?.data}
          page={page}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            <div>
              <CreateDesignation setOpenCustomDialogBox={setOpenCustomDialogBox}/>
            </div>
          }
          title={""}
        />
      )}
    </>
  );
}
