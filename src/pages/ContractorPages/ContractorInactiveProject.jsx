import React, {useEffect, useState} from "react";
import {fetchcontractorinactiveprojectapicall} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
const ContractorInactiveProject = () => {
  const [isContractoractiveprojectdata, setIscontractoractiveprojectdata] =
    useState([]);
  const fetchcontractoractiveprojectfunc = async () => {
    try {
      const response = await fetchcontractorinactiveprojectapicall();
      if (response.success) {
        setIscontractoractiveprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchcontractoractiveprojectfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Contractor Inactive Project" />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Project Code</TableCell>
              <TableCell align="left">Project status</TableCell>
              <TableCell align="left">Project Type</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isContractoractiveprojectdata?.response?.map((item, index) => {
              return (
                <>
                  <TableRow key={item._id}>
                    <TableCell>{item.Project_Name}</TableCell>
                    <TableCell>{item.Project_Code}</TableCell>
                    <TableCell>
                      {item.Project_Status ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell>{item.Project_Type}</TableCell>
                    <TableCell>
                      {new Date(item.Start_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.End_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/client/client-pageinfo/${item.ProjectId}`}>
                        view
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {isContractoractiveprojectdata?.contractorinactiveProjects?.map(
              (item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Status}</TableCell>
                      <TableCell>{item.Project_Type}</TableCell>
                      <TableCell>
                        {new Date(item.Start_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.End_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/employee/employee-project-info/${item.ProjectId}`}
                        >
                          view
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ContractorInactiveProject;
