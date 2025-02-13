import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientinactiveprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
const ClientInactiveProject = () => {
  const [isclientactiveproject, setIsclientactiveproject] = useState([]);
  const fetchinactiveclientproject = async () => {
    try {
      const response = await fetchclientinactiveprojectapicall();
      if (response.successs) {
        setIsclientactiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchinactiveclientproject();
  }, [0]);

  return (
    <div>
      <Layout>
        <BreadCrumb pageName="Client Inactive Project" />

        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isclientactiveproject.length > 0
                ? isclientactiveproject.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Start_Date}</TableCell>
                      <TableCell>{item.End_Date}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
                    </TableRow>
                  ))
                : "null"}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </div>
  );
};

export default ClientInactiveProject;
