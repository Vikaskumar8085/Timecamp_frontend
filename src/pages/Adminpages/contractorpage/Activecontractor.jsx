import React, {useEffect, useState} from "react";
import {fetchactivecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
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

const Activecontractor = () => {
  const [isActivecontractordata, setIsActivecontractordata] = useState([]);

  const getactivecontractor = async () => {
    try {
      const response = await fetchactivecontractorapicall();
      if (response.success) {
        setIsActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactivecontractor();
  }, [0]);
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Active Contractor" />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
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
            {isActivecontractordata.length > 0
              ? isActivecontractordata.map((item, index) => (
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
    </DefaultLayout>
  );
};

export default Activecontractor;
