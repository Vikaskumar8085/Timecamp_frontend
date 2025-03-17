import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
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

const ClientProjectTime = () => {
  const [isclientprojectTimedata, setIsclientprojectTimedata] = useState([]);
  const fetchclientprojectTimefunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-project-time"
      );
      if (response?.data?.success) {
        setIsclientprojectTimedata(response?.data?.result);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchclientprojectTimefunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Client Project TIme" />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Total Hour</TableCell>
              <TableCell>Total Entries</TableCell>
              <TableCell>Total Billed Hours</TableCell>
              <TableCell>Total Ok Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isclientprojectTimedata.length > 0 ? (
              isclientprojectTimedata.map((item, index) => (
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
                  {/* <Empty /> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ClientProjectTime;
