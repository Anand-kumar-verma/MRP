import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function Forecasting() {
    return (
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
            {/* <>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Forecating Date"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Time Period"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Item/Product"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasting Quantity "
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasting Value"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Historical Data"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasting Method"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Confidence Interval"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Assumptions"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Extemal Factors"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Accuracy Metrucs"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecast Adjustments"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasted Demond"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasted Sales"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecasted Revenue"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Production planning"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Invetory Mangement"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Resource Allocation"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Marketing Strotegy"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Salse & Marketing Budget"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Risk Assessment"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Scenario Anolysis"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecast Review"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecast Reporting"
                    size="small"
                />
            </div>
            <div className='flex flex-row justify-between items-center my-3 px-2'>
                <TextField
                    id="outlined-multiline-static"
                    label="Projected Growrth"
                    className='!rounded-md'
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecast Accuracy"
                    size="small"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Forecast Reporting"
                    size="small"
                />
            </div>
        </> */}
        </>
    )
}
