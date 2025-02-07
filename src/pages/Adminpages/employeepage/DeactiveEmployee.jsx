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
import { fetchinactiveemployeeapicall } from "../../../ApiServices/AdminApiServices/Employee";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const DeactiveEmployee = () => {
  const [IsInactiveEmployeedata, setIsInactiveEmployeedata] = useState([]);
  const getInactiveemployee = async () => {
    try {
      const response = await fetchinactiveemployeeapicall();
      console.log(response, "response");
      if (response.success) {
        setIsInactiveEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getInactiveemployee();
  }, [0]);
  return (
    <>
      <Layout>
        <BreadCrumb pageName="InActive Employee" />
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
              {IsInactiveEmployeedata.length > 0
                ? IsInactiveEmployeedata.map((item, index) => (
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

export default DeactiveEmployee;
