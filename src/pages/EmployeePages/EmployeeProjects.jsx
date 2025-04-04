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
  TablePagination,
  CircularProgress,
  Drawer,
  TextField,
} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import EmpProjectForm from "../../Component/EmployeeComponents/EmpProjectForm";
import Empty from "../../common/EmptyFolder/Empty";
import {VisibilitySharp} from "@mui/icons-material";

const EmployeeProjects = () => {
  const userdata = useSelector((state) => state?.user.values);
  const [Isemployeeprojectdata, setIsemployeeprojectdata] = useState([]);
  // states

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({});
  // states

  const [IsOpen, setIsOpen] = useState(false);
  const fetchemployeeproject = async () => {
    try {
      const response = await fetchemployeeprojectsapicall({
        params: {
          page: page + 1, // API expects 1-based page
          limit: rowsPerPage,
          search,
        },
      });
      if (response.success) {
        setIsemployeeprojectdata(response.result);
        setPagination(response.result.pagination);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchemployeeproject();
  }, [page, rowsPerPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            <EmpProjectForm />
          </Drawer>
        )}

        <TextField
          label="Search Projects"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{mb: 3}}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
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
                  {Isemployeeprojectdata?.managedProjects?.map(
                    (item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.Project_Name}</TableCell>
                            <TableCell>{item.Project_Code}</TableCell>
                            <TableCell>{item.Project_Status}</TableCell>
                            <TableCell>
                              {item.Project_Status === true
                                ? "Active"
                                : "InActive"}
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
                                <VisibilitySharp />
                              </Link>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    }
                  )}
                  {Isemployeeprojectdata?.employeeProjects?.map(
                    (item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.Project_Name}</TableCell>
                            <TableCell>{item.Project_Code}</TableCell>
                            <TableCell>
                              {item.Project_Status === true
                                ? "Active"
                                : "InActive"}
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
            <TablePagination
              component="div"
              count={
                (pagination?.totalManaged || 0) +
                (pagination?.totalEmployee || 0)
              }
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Layout>
    </div>
  );
};

export default EmployeeProjects;
