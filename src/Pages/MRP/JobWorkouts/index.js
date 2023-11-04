import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'

export default function JobWorkouts() {
    return (
        <>
            <>
                <div className="pt-5">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ background: "linear-gradient(90deg ,#CFEDFB, #F1EBFF)" }} className="table1">
                                <TableRow>
                                    <TableCell>Work Order No.</TableCell>
                                    <TableCell>Quntity</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>

                                    <TableCell>Status </TableCell>
                                    {/* <TableCell>Reminder</TableCell>
                                    <TableCell>Candidat's Details</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {
                                    data?.map((item) => { */}
                                <TableRow

                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        1
                                    </TableCell>

                                    <TableCell>hello</TableCell>
                                    <TableCell>hello</TableCell>
                                    <TableCell>hello</TableCell>
                                    <TableCell>hello</TableCell>
                                    <TableCell>hello</TableCell>
                                </TableRow>
                                {/* })
                                } */}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* {page1?.total_pages !== 1 && (
            <CustomDiv className="flex justify-center p-3">
              <Pagination
                page={page}
                size="large"
                count={page1?.total_pages}
                variant="outlined"
                color="primary"
                onChange={handleChange}
              />
            </CustomDiv>
          )} */}
                </div>
            </>
            {/* <>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Job Work Order No."
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Job Title/Description"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Customer/Client"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Date Created "
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Assigned To"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Due Date "
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Priority"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Status"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Instructions/Notes"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Attachments"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Materlals/Equipment needed"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Lobour Hours Estimate"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Cost Estimate"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Actual Hourd Spent"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Actual Cast"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Work Completed"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Issues/Challemges Encountered"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Follow-up Actions"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Customer Feedback"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Work Cornpletion Notes"
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Linked Job Requested"
                        size="small"
                    />
                </div>
                <div className='flex flex-row justify-between items-center my-3 px-2'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Linked Projects"
                        className='!rounded-md'
                        size="small"
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Linked Invoices"
                        size="small"
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label="Work Center"
                    size="small"
                />
                </div>
            </> */}
        </>
    )
}
