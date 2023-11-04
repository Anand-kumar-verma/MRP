import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

// const rows = [createRow("Paperclips (Box)", 100, 1.15)];

export default function SpanningTable({ rows, currency }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="spanning table">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row?.name && (
                <TableCell align="left" title="name">
                  {row.name}
                </TableCell>
              )}
              {row?.time && (
                <TableCell align="center" title="hour">
                  {row?.time + " hr"}
                </TableCell>
              )}
              {row?.cost && (
                <TableCell align="right" title="cost">
                  {ccyFormat(row?.cost) + " " + currency}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// colSpan={3}
