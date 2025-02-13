import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import HeaderTab from "../../common/HeaderTab/HeaderTab";

import Empty from "../../common/EmptyFolder/Empty";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientactiveprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
const ClientActiveProject = () => {
  const [Isactiveclientprject, setisactiveclientproject] = useState([]);

  const fetchclientactiveproject = async () => {
    try {
      const response = await fetchclientactiveprojectapicall();
      if (response.success) {
        setisactiveclientproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchclientactiveproject();
  }, [0]);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Client Active Project" />
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
              {Isactiveclientprject.length > 0
                ? Isactiveclientprject.map((item, index) => (
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
    </>
  );
};

export default ClientActiveProject;
