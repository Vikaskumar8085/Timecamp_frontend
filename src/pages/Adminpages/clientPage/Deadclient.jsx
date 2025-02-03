import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {fetchdeadclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";

const Deadclient = () => {
  const [isdeadclientdata, setIsdeadclientdata] = useState([]);

  const getdeadclient = async () => {
    try {
      const response = await fetchdeadclientapicall();
      if (response.success) {
        setIsdeadclientdata(response.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getdeadclient();
  }, [0]);

  return (
    <DefaultLayout>
      <BreadCrumb pageName="Dead Client" />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Postal Code</TableCell>
              <TableCell align="left">Gst Number</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isdeadclientdata.length > 0
              ? isdeadclientdata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{item.Company_Name}</TableCell>
                    <TableCell align="left">{item.Client_Name}</TableCell>
                    <TableCell align="left">{item.Client_Email}</TableCell>
                    <TableCell align="left">{item.Client_Phone}</TableCell>
                    <TableCell align="left">{item.Address}</TableCell>
                    <TableCell align="left">
                      {item.Client_Postal_Code}
                    </TableCell>
                    <TableCell align="left">{item.GstNumber}</TableCell>
                    <TableCell align="left">{item.Client_Status}</TableCell>
                    <TableCell align="left">
                      <Link to={`/client-info/${item.Client_Id}`}>view</Link>
                    </TableCell>
                  </TableRow>
                ))
              : "null"}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Deadclient;
