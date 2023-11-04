import React, { useEffect, useState } from 'react'
import { Checkbox, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axiosInstance from '../../Config/axios';
import { API_URLS } from '../../Config/apiUrls';

export default function ProductionOperations() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [page1, setPage1] = useState([])
    const handleChange = (event, value) => {
        setPage(value);

    };
    const ResourceLists = () => {
        axiosInstance
            .get(API_URLS.ProductionOperations)
            .then((response) => {
                setData(response?.data?.production_operations);
                setPage1(response?.data)
                // setPage1(response?.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        ResourceLists()
    }, [])


    return (
        <>
            <div className="pt-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ background: "linear-gradient(90deg ,#CFEDFB, #F1EBFF)" }} className="table1">
                            <TableRow>
                                <TableCell><Checkbox
                                    id='candidate_skills'
                                    name='candidate_skills'
                                    className="!p-1 !pl-0"
                                /></TableCell>
                                <TableCell>Id.</TableCell>
                                <TableCell>cost Per Hour </TableCell>
                                <TableCell>stage</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Total Cost </TableCell>


                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((item) => {
                                return <TableRow

                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Checkbox
                                            id='candidate_skills'
                                            name='candidate_skills'
                                            className="!p-1 !pl-0"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>

                                    <TableCell>{item?.cost_per_hour}</TableCell>
                                    <TableCell>{item?.stage}</TableCell>
                                    <TableCell>{item?.time}</TableCell>
                                    <TableCell>{item?.total_cost}</TableCell>

                                    <TableCell>{item?.created_at.slice(0, 10)}</TableCell>

                                    <TableCell>{item?.updated_at.slice(0, 10)}</TableCell>
                                    <TableCell>{item?.description}</TableCell>

                                </TableRow>
                            })}



                        </TableBody>
                    </Table>
                </TableContainer>
                {page1?.total_pages !== 1 && (
                    <div className="flex justify-center p-3">
                        <Pagination
                            page={page}
                            size="large"
                            count={page1?.total_pages}
                            variant="outlined"
                            color="primary"
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
