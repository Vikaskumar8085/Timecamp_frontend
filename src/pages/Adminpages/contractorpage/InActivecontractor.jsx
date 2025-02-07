import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import { fetchinactivecontractorapicall } from "../../../ApiServices/AdminApiServices/Contractor";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const InActivecontractor = () => {
  const [isInActivecontractordata, setIsInActivecontractordata] = useState([]);

  const getInactivecontractor = async () => {
    try {
      const response = await fetchinactivecontractorapicall();
      if (response.success) {
        setIsInActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getInactivecontractor();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="InActive contractor" />
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
            {isInActivecontractordata.length > 0
              ? isInActivecontractordata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{item.FirstName}</TableCell>
                    <TableCell align="left">{item.LastName}</TableCell>
                    <TableCell align="left">{item.Email}</TableCell>
                    <TableCell align="left">{item.Phone}</TableCell>
                    <TableCell align="left">{item.Address}</TableCell>
                  </TableRow>
                ))
              : "null"}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default InActivecontractor;
