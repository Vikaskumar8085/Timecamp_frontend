import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchactiveemployeeapicall } from "../../../ApiServices/AdminApiServices/Employee";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const ActiveEmployee = () => {
  const [IsactiveEmployeedata, setIsactiveEmployeedata] = useState([]);
  const getactiveemployee = async () => {
    try {
      const response = await fetchactiveemployeeapicall();
      if (response.success) {
        setIsactiveEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactiveemployee();
  }, [0]);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Active Employee" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Employee FirstName</TableCell>
                <TableCell align="left">Employee LastName</TableCell>
                <TableCell align="left">Employee Email</TableCell>
                <TableCell align="left">Employee Phone</TableCell>
                <TableCell align="left">Employee Address</TableCell>

                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsactiveEmployeedata.length > 0
                ? IsactiveEmployeedata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{item.FirstName}</TableCell>
                      <TableCell align="left">{item.LastName}</TableCell>
                      <TableCell align="left">{item.Email}</TableCell>
                      <TableCell align="left">{item.Phone}</TableCell>
                      <TableCell align="left">{item.Address}</TableCell>
                      <TableCell align="left">
                        <Link to={`/employee-info/${item.staff_Id}`}>View</Link>
                      </TableCell>
                    </TableRow>
                  ))
                : "null"}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default ActiveEmployee;
