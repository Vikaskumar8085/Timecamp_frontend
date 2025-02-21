import React, {useEffect, useState} from "react";
import {fetchemployeeactiveprojectapicall} from "../../ApiServices/EmployeeApiservices/Employee";
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
import Empty from "../../common/EmptyFolder/Empty";

const EmployeeActiveProject = () => {
  const [isemployeeActiveproject, setIsemployeeactiveproject] = useState([]);
  console.log(isemployeeActiveproject, "?????????..........");
  const fetchemployeeactiveproject = async () => {
    try {
      const response = await fetchemployeeactiveprojectapicall();
      if (response.success) {
        setIsemployeeactiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchemployeeactiveproject();
  }, [0]);
  return (
    <>
      <Layout>
        <BreadCrumb pageName="Employee Active Project" />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Project Status</TableCell>
                <TableCell align="left">Project Type</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isemployeeActiveproject?.response?.map((item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
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
                        <Link
                          to={`/employee/employee-project-info/${item.ProjectId}`}
                        >
                          view
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
              {isemployeeActiveproject?.employeeProjects?.map((item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
                      <TableCell>{item.Project_Status}</TableCell>
                      <TableCell>{}</TableCell>
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default EmployeeActiveProject;
