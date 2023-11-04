import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axiosInstance from "../../../Config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrachegeInvice() {
  const [data, setData] = React.useState([]);
  const navegate = useNavigate();
  const Invoice = () => {
    axiosInstance
      .get(`purchase-invoice-list/`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Invoice();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-purple-300">
            <TableRow>
              <TableCell className="!font-bold">Date</TableCell>
              <TableCell className="!font-bold" align="right">
                Invoice#
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Customer Name#
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Status
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Due Date
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Due Amount
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Total Amount
              </TableCell>
              <TableCell className="!font-bold" align="right">
                Invoice Detaiels
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.updated_date.slice(0, 10)}
                </TableCell>
                <TableCell align="right">{row.invoice_no}</TableCell>
                <TableCell align="right">{row.customer}</TableCell>
                <TableCell align="right">
                  {row?.purchase_order?.order_status}
                </TableCell>
                <TableCell align="right">{row.sales_order?.due_date}</TableCell>
                <TableCell align="right">
                  {row.sales_order?.total_price}
                </TableCell>
                <TableCell align="right">{row.total_amount}</TableCell>
                <TableCell align="right">
                  <p
                    onClick={() =>
                      navegate(
                        `/purchase_Invoies/purchase_invoice_datials/${row.id}`
                      )
                    }
                    className="hover:underline cursor-pointer"
                  >
                    Detaiels
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
