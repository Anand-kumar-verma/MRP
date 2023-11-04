import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTablePagination from "../../../Shared/TablePagination";

const OutOfStock = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    createData("Cast Iron", "blackheart", "mukul", "24", "pcs"),
  ]);
  function createData(material, varient, supplier, quantity, unit) {
    return { material, varient, supplier, quantity, unit };
  }

  const [rows, setRows] = useState([
    createData("Cast Iron", "blackheart", "mukul", "24", "pcs"),
  ]);
  const handleFilter = () => {
    const updatedData = rows.filter((item) => {
      return (
        item?.material?.includes(search) ||
        item?.supplier?.includes(search) ||
        item?.quantity?.includes(search) ||
        item?.unit?.includes(search) ||
        item?.material?.includes(search)
      );
    });
    setData(updatedData);
  };
  //
  useEffect(() => {
    handleFilter();
  }, [search]);
  return (
    <div className="flex flex-col h-full relative">
      <Typography>Out Of Stock</Typography>
      <Divider />
      <Box className="p-2 bg-white">
        <TextField
          sx={{ maxWidth: 300 }}
          size="small"
          color="secondary"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="text-lg font-medium">
              <TableCell className="text-lg font-medium">
                material (stock)
              </TableCell>
              <TableCell className="text-lg !font-medium" align="right">
                varient
              </TableCell>
              <TableCell className="text-lg font-medium" align="right">
                vendor&nbsp;(#)
              </TableCell>
              <TableCell className="text-lg font-medium" align="right">
                quantity&nbsp;(q)
              </TableCell>
              <TableCell className="text-lg font-medium" align="right">
                unit measurement type&nbsp;(u)
              </TableCell>
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.material}
                </TableCell>

                <TableCell align="right">{row.varient}</TableCell>
                <TableCell align="right">{row.supplier}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full bg-pink-200 absolute bottom-0">
        <CustomTablePagination page={5} rowsPerPage={10} />
      </div>
    </div>
  );
};

export default OutOfStock;
