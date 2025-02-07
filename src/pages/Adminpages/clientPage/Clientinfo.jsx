import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  fetchclientprojectsapicall,
  fetchsignleclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import Card from "../../../common/Card/Card";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Clientinfo = () => {
  const {id} = useParams();
  const [IsClientdata, setIsclientdata] = useState([]);
  const [IsClientprojectsdata, setIsclientprojectsdata] = useState([]);
  const getClientInfo = async () => {
    try {
      const response = await fetchsignleclientapicall(id);
      console.log(response);
      if (response.success) {
        setIsclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getclientsprojects = async () => {
    console.log("hello");
    try {
      const response = await fetchclientprojectsapicall(id);
      console.log(response, "asdlfkasdlkf");
      if (response.success) {
        setIsclientprojectsdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getClientInfo();
    getclientsprojects();
  }, [0]);
  return (
    <Layout>
        <BreadCrumb pageName="Client Information"/>
      <Card>
        <div className="card_data">
          <p>Client Name: {IsClientdata?.Client_Name}</p>
          <p>Client Email: {IsClientdata?.Client_Email}</p>
          <p> Company Name: {IsClientdata?.Company_Name}</p>
          <p>Client Phone: {IsClientdata?.Client_Phone}</p>{" "}
        </div>
      </Card>

      <Box>
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
              {IsClientprojectsdata.length > 0
                ? IsClientprojectsdata.map((item, index) => (
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
      </Box>
    </Layout>
  );
};

export default Clientinfo;
