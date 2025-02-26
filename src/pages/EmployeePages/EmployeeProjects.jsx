import React, {useEffect, useState} from "react";
import {fetchemployeeprojectsapicall} from "../../ApiServices/EmployeeApiservices/Employee";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const EmployeeProjects = () => {
  const userdata = useSelector((state) => state?.user.values);
  const [Isemployeeprojectdata, setIsemployeeprojectdata] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const fetchemployeeproject = async () => {
    try {
      const response = await fetchemployeeprojectsapicall();
      if (response.success) {
        setIsemployeeprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchemployeeproject();
  }, [0]);

  return (
    <div>
      <Layout>
        <BreadCrumb pageName="Employee Projects" />

        {userdata?.Permission && (
          <Button
            onClick={() => setIsOpen(true)}
            sx={{
              my: 2,
              background: "#2c3e50",
              color: "white",
              padding: "10px 15px",
            }}
          >
            Create Project
          </Button>
        )}

        {IsOpen && (
          <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
            <form action="">create form</form>
          </Drawer>
        )}

        <TableContainer component={Paper} sx={{mt: 3}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Project status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Isemployeeprojectdata?.response?.map((item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Status}</TableCell>
                      <TableCell>
                        {item.Project_Status ? "Active" : "InActive"}
                      </TableCell>
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
              {Isemployeeprojectdata?.employeeProjects?.map((item, index) => {
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </div>
  );
};

export default EmployeeProjects;
