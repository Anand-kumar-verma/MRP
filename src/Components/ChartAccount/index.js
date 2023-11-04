import React, { useEffect, useState } from "react";
import { get_account } from "../../Services/Account";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import axiosInstance from "../../Config/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

export default function ChartAccount() {
  const [data, setData] = useState([]);
  const [loding, setloding] = React.useState(false);
  const [dummy, setdummy] = useState("");

  useEffect(() => {
    get_account({
      setloding,
      setData,
    });
  }, [dummy]);

  const DeleteAcount = (id) => {
    axiosInstance
      .delete(`ac/get_delete_account/?id=${id}`)
      .then((response) => {
        toast.success(response.data.msg);
        setdummy(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(data, "shivam");

  return (
    <>
      <div className="flex justify-between">
        <p> </p>
        <AddAccount className="!inset-y-0 right-0" setdummy={setdummy} />
      </div>

      {data.map((row, index) => (
        <>
          <p
            className="bg-gradient-to-r
         from-blue-500 to-purple-500 font-bold  py-1 my-2 pl-5"
          >
            {row?.head}
          </p>

          {row?.groups?.map((row, index) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="hover:bg-green-100"
              >
                <p>{row?.group_name}</p>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead
                      className="bg-gradient-to-r
         from-blue-300 to-purple-300"
                    >
                      <TableRow>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Acc Name</TableCell>
                        <TableCell>Acc Code</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.accounts?.map((item, index) => (
                        <TableRow key={row.name} className="!h-6">
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{item?.account_name}</TableCell>
                          <TableCell>{item?.account_code}</TableCell>
                          <TableCell>
                            <EditAccount
                              setdummy={setdummy}
                              id={item.id}
                              AccName={item?.account_name}
                              AccCode={item?.account_code}
                              description={item?.description}
                            />
                          </TableCell>
                          <TableCell>
                            <DeleteIcon
                              onClick={() => DeleteAcount(item.id)}
                              className="text-red-500"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ))}
    </>
  );
}
