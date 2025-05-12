import React, {useState} from "react";
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
} from "@mui/material";
import {VisibilitySharp} from "@mui/icons-material";
import {fetchemployeeinactiveprojectapicall} from "../../ApiServices/EmployeeApiservices/Employee";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
const EmployeeInactiveProjects = () => {
  const [isemployleeInactiveprojects, setIsemployeeInactiveprojects] = useState(
    []
  );

  const fetchinactiveemployeeproject = async () => {
    try {
      const response = await fetchemployeeinactiveprojectapicall();
      if (response.success) {
        setIsemployeeInactiveprojects(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    fetchinactiveemployeeproject();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee Inactive Project" />
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
            {isemployleeInactiveprojects?.response?.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Project_Name}</TableCell>
                    <TableCell>{item.Project_Code}</TableCell>
                    <TableCell>{item.Project_Hours}</TableCell>
                    <TableCell>
                      {item.Project_Status === true ? "Active" : "InActive"}
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
                        <VisibilitySharp />
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {isemployleeInactiveprojects?.employeeProjects?.map(
              (item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
                      <TableCell>
                        {item.Project_Status === true ? "Active" : "InActive"}
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
                          <VisibilitySharp />
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
    </LayoutDesign>
  );
};

export default EmployeeInactiveProjects;
