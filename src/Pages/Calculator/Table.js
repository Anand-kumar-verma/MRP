import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import aggregate from "./aggregate.PNG";
import bricks from "./bricks.PNG";
import concrete from "./concrete.PNG";
import cement from "./cement.PNG";
import doors from "./doors.PNG";
import electrical from "./electrical.PNG";
import flooring from "./flooring.PNG";
import kitchen from "./kitchen.PNG";
import painting from "./painting.PNG";
import sand from "./sand.PNG";
import sanitiary from "./sanitiary.PNG";
import steel from "./steel.PNG";
import windowiamge from "./window.PNG";

export default function ColumnGroupingTable({ fk }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const area = Number(fk.values.area);
  // cement calculation
  const no_of_bag_cement = area * (45 / 100);
  const cement_amount = area * (17190 / 100);

  // steel calculation
  const steel_in_kg = area * (350 / 100);
  const steel_amount = area * (15750 / 100);

  // Bricks calculation
  const bricks_per_pcs = area * (1900 / 100);
  const bricks_per_pcs_amount = area * (13300 / 100);

  // aggregate calculation
  const aggregate_per_cubic_feet = area * (190 / 100);
  const aggregate_per_cubic_feet_amount = area * (5890 / 100);

  // sand calculation
  const sand_per_cubic_feet = area * (200 / 100);
  const sand_per_cubic_feet_amount = area * (7800 / 100);

  // flooring calculation
  const flooring_per_square_feet = area * (100 / 100);
  const flooring_per_square_feet_amount = area * (8900 / 100);

  //window calculation
  const window_per_square_feet = area * (17 / 100);
  const window_per_square_feet_amount = area * (3757 / 100);

  // doors calculation
  const doors_per_square_feet = area * (18 / 100);
  const doors_per_square_feet_amount = area * (5724 / 100);

  // electrical fitting
  const electrical_fitting_per_square_feet = area * (15 / 100);
  const electrical_fitting_per_square_feet_amount = area * (870 / 100);

  // painting
  const penting_per_square_feet = area * (600 / 100);
  const penting_per_square_feet_amount = area * (14400 / 100);

  //Sanitiary fitting
  const sanitiary_per_square_feet = area * (100 / 100);
  const sanitiary_per_square_feet_amount = area * (6200 / 100);

  // kitchen works
  const kitchen_per_square_foot = area * (5 / 100);
  const kitchen_per_square_foot_amount = area * (5065 / 100);

  // cosnt concrete
  const concrete_per_square_feet = area * (100 / 100);
  const concrete_per_square_feet_amount = area * (21000 / 100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Material Name", minWidth: 170 },
    { id: "code", label: "Unit", minWidth: 170 },
    {
      id: "population",
      label: "Quantity",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Price (INR)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size };
  }

  const rows = [
    createData(
      <img src={aggregate} className="!w-[32]" />,
      "Per Cubic Feet",
      aggregate_per_cubic_feet,
      Number(aggregate_per_cubic_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={bricks} className="!w-[32]" />,
      "Per Pcs",
      bricks_per_pcs,
      Number(bricks_per_pcs_amount)?.toFixed(2)
    ),
    createData(
      <img src={concrete} className="!w-[32]" />,
      "Per Sq Feet",
      concrete_per_square_feet,
      Number(concrete_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={cement} className="!w-[32]" />,
      "Bag",
      no_of_bag_cement,
      Number(cement_amount)?.toFixed(2)
    ),
    createData(
      <img src={doors} className="!w-[32]" />,
      "Per Sq Feet",
      doors_per_square_feet,
      Number(doors_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={electrical} className="!w-[32]" />,
      "Per Sq Feet",
      electrical_fitting_per_square_feet,
      Number(electrical_fitting_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={flooring} className="!w-[32]" />,
      "Per Sq Feet",
      flooring_per_square_feet,
      Number(flooring_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={kitchen} className="!w-[32]" />,
      "Per Sq Feet",
      kitchen_per_square_foot,
      Number(kitchen_per_square_foot_amount)?.toFixed(2)
    ),
    createData(
      <img src={painting} className="!w-[32]" />,
      "Per Sq Feet",
      penting_per_square_feet,
      Number(penting_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={sand} className="!w-[32]" />,
      "Per Cubic Feet",
      sand_per_cubic_feet,
      Number(sand_per_cubic_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={sanitiary} className="!w-[32]" />,
      "Per Sq Feet",
      sanitiary_per_square_feet,
      Number(sanitiary_per_square_feet_amount)?.toFixed(2)
    ),
    createData(
      <img src={steel} className="!w-[32]" />,
      "Per Sq Feet",
      steel_in_kg,
      Number(steel_amount)?.toFixed(2)
    ),
    createData(
      <img src={windowiamge} className="!w-[32]" />,
      "Per Sq Feet",
      window_per_square_feet,
      Number(window_per_square_feet_amount)?.toFixed(2)
    ),
  ];
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Material
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>
        <p className="!font-bold">Total Price:</p>
        <p className="!font-bold">
          {rows?.reduce((a, b) => a + Number(b?.size || 0), 0)?.toFixed(2)}
        </p>
      </div>
    </Paper>
  );
}
