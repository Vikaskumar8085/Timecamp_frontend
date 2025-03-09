import React, { useEffect, useState } from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Card,
  Grid2,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Empty from "../../common/EmptyFolder/Empty";
import apiInstance from "../../ApiInstance/apiInstance";

const ManagerProjectTime = () => {
  const [Isprojecttimedata, setIsprojecttimedata] = useState([]);

  const fetchmanagerprojectTimeFunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-project-time"
      );
      if (response?.data?.success) {
        setIsprojecttimedata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchmanagerprojectTimeFunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="ManagerProjectTime" />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Total Hour</TableCell>
              <TableCell>Total Entries</TableCell>
              <TableCell>Total Billed Hours</TableCell>
              <TableCell>Total Ok Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Isprojecttimedata.length > 0 ? (
              Isprojecttimedata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.ProjectName}</TableCell>
                  <TableCell>{item.TotalHours}</TableCell>
                  <TableCell>{item.TotalEntries}</TableCell>
                  <TableCell>{item.BilledHours}</TableCell>
                  <TableCell>{item.OkHours}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ManagerProjectTime;
